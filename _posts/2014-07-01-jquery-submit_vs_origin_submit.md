---
layout: post
title: easyui-form使用有感
tags: easyui,form
categories: js
---
## easyui简介

在项目中使用到了easyui这个ui框架，此框架包含了后台开发中常用的组件ui，对于前台开发来说很有帮助。

## form组件简介

form是其中的一个表单组件，里面的ajax提交其实是用到了iframe的load事件，返回iframe中body的文本内容，因此，其成功回调
接收的数据就是文本形式，还要自己转成json对象。

## form重用问题

在使用form的过程中，有一个需求会经常用到，在做多个表单的提交时，如：新增和修改同一类型的资源，可以使用相同的表单，只是url，或者是少数几
个参数变化而已，大部分的选项都可以保留重用。这时希望在原来的form组件中做扩展，却发现不起作用。

例子如下

	var $f=$(form);
	$f.form(opt).submit();
	$f.form(newOpt).submit();

当希望用newOpt扩展之前的选项时，发现提交时仍然使用原来的opt。

## 问题原因

经过查看源码

	if (!$.data(this, 'form')){
		$.data(this, 'form', {
			options: $.extend({}, $.fn.form.defaults, options)
		});
	}

在构造方法中，做了一个检测，如果form已经初始化过了就使用初始化时的opt,不会再去管新传入的opt，而检测是否初始化的依据的是表单dom中是否存入key值
为form的data。这时我们要找一个切入点来改变这种行为。

我们可以扩展form的方法，传入新的opt时，和旧的opt合并，覆盖之，然后把opt数据从元素中移除，最后再使用合并后的opt重新初始化表单。

具体的扩展方法如下

	$.fn.form.methods.opt=function($this,options){
		$this.each(function(){
			var opt=$.data(this,'form'),
			//合并opt
			opts = $.extend({}, 
				$.fn.form.defaults, 
				opt ? opt.options : {},
				options||{}
				);
			//移除旧的opt数据
			$.removeData(this,'form')
			//使用新的opt重新初始化form
			$(this).form(opts);
			});
	}

要使用时，可以如下使用,可以保证form的重用

	$f.form('opt',newOpt);

## 碰巧碰到的一个问题

在使用form的过程中，无意中发现的一个问题，就是js原生的submit()方法不会触发jquery监听的submit事件方法

	$form.submit(function(){
		console.log('submit')
	});
	$form[0].submit();//运行到这里，并不会打印上面的'submit'



