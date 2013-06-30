---
layout: post
title: dom-javascript读书笔记
tags: js
categories: readnote
---
##第一章.遵循最佳实践

###1.2让js运行起来
1.2.1把行为和结构分离

    <script type="text/javascript">
    var fun=function(){
    	return 123;
    }
    </script>
    <a href="javascript:fun()"></a>

href里面运行function，如果有返回值，会把返回值输出到当前页中


##第二章.创建可重用的对象

###2.2.创建你自己的对象

2.2.5.对象字面量

浏览器中的解释程序在执行JavaScript代码之前，首先要对代码进行变量初始化，即初始化window对象之下的所有顶级变量。

看下面的例子：

<iframe width="50%" height="200" src="http://jsfiddle.net/h7hce/1/embedded/js,result" allowfullscreen="allowfullscreen" frameborder="1"></iframe>

	b();	
	function b(){
	    alert('bbb');
        }

上面这种方式，如果是在最顶层声明的，会首先在初始化阶段将这个函数赋值给全局上下文,也就是window对象，所以可以在函数前调用b();

	a();
	var a=function(){
		alert('aaa');
	}

而这种方式，因为用了var关键字，虽然最终效果都是把a放到window里面去，但是这种方式只是在运行到这一行时，才会把函数给赋值到window.a上，在之前window.a的值是undefined,所以在前面运行a()时会报错，具体的错误可以看看控制台，嘿嘿。


##第三章.DOM2核心和DOM2 HTML

###3.4.DOM核心

3.4.2.核心Node对象

4.节点的ownerDocument属性

一个结点的ownerDocument属性引用的是文档的根对象，一般来说是document对象，既然document对象有了，那么为什么还要用这个呢？请看下面的例子

	function example(node){
		var document='hehe';	
		//这个是对的
		var node1=node.ownerDocument.getElementById('id');
	
		//下面这个就是不行的了，因为局部变量已经把document给覆盖了
		var  node2=document.getElementById('id');
	}

ownerDocument属性的值是不可改变的，如果硬是要改变，去强行赋值的话，是不起作用的，在使用这个属性的时候，它始终是指向文档根对象的。

这就是我对这个属性的理解，做为一个document对象的备用吧。
