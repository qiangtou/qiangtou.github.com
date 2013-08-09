---
layout: post
title: backbone源码笔记1-事件
tags: backbone 笔记
categories: js
---
以前进入了一个误区，就是把标签当做分类来用了。。标签应该像是文章的关键字一样，分类才是一个类别目录，惭愧呀，以后改过来吧。
看此篇文章可以参考我的[backbone1.0源码注释中文翻译](/js/2013/05/28/backbone-source-js/)。

##先来看看注册--on

	on:function(name,callback,context){
		if (!eventsApi(this, 'on', name, [callback, context]) || !callback) return this;
		this._events || (this._events = {});
		var events = this._events[name] || (this._events[name] = []);
		events.push({callback: callback, context: context, ctx: context || this});
		return this;
	}

backbone的事件是通过回调数组来实现的。以name参数为key，callback回调数组为value,保存在this._events中。

我们来说说第三个参数，看名字就知道这是设置callback中的this指向context的，执行效果等同于callback.call(context),这个参数在backbone内部
的listenTo函数也用到了，这个以后再说。

off的过程也很简单，就是把this._events对象处理一下就行了，就不贴出来了。

我们可以看下面代码的结果。 点击result标签后查看cosole控制台。

<iframe width="100%" height="240" src="http://jsfiddle.net/bkRTd/2/embedded/js,result" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

在上面的代码中，我们为hello注册了2个回调函数，分别是hello1和hello2,为world注册了一个回调函数，在我们打印出来的e._events对象中，
应该就能看到我所说的数据结构。

##再来看看触发--trigger

	trigger: function(name) {
		  if (!this._events) return this;
		  var args = slice.call(arguments, 1);
		  if (!eventsApi(this, 'trigger', name, args)) return this;
		  var events = this._events[name];
		  var allEvents = this._events.all;
		  if (events) triggerEvents(events, args);
		  if (allEvents) triggerEvents(allEvents, arguments);
		  return this;
    },

触发其实就是一个调用_events对象的过程，这里面有一点特殊的是加入了一个'all'事件的处理，如果on了'all'的话，当你trigger任何事件的时候，all中的回调都
会跟随触发。代码中的allEvents就是其实现

<iframe width="100%" height="300" src="http://jsfiddle.net/bkRTd/1/embedded/js,result" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

切换到result页面后你将会在控制台看到

	hello1 
	hello2 
	------------all--------
	world 
	------------all-------- 

##最后说说listenTo,stopListening

    var listenMethods = {listenTo: 'on', listenToOnce: 'once'};
	_.each(listenMethods, function(implementation, method) {
    Events[method] = function(obj, name, callback) {
      var listeners = this._listeners || (this._listeners = {});
      var id = obj._listenerId || (obj._listenerId = _.uniqueId('l'));
      listeners[id] = obj;
      if (typeof name === 'object') callback = this;
      obj[implementation](name, callback, this);
      return this;
    };
	});

listenTo是对on的封装，用法为

<iframe width="100%" height="240" src="http://jsfiddle.net/bkRTd/3/embedded/js,result" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

当触发了e1的hello事件时，e2监听的事件也执行了，同时e2的this引用也传进去了。

这里有个小疑问，既然这只是对on的简单封装，那为什么在代码里面还用到了e2.listeners来存e1._listenerId呢，这多余吗？其实这是为了stopListening做的处
理。

    stopListening: function(obj, name, callback) {
      var listeners = this._listeners;
      if (!listeners) return this;
      var deleteListener = !name && !callback;
      if (typeof name === 'object') callback = this;
      if (obj) (listeners = {})[obj._listenerId] = obj;
      for (var id in listeners) {
        listeners[id].off(name, callback, this);
        if (deleteListener) delete this._listeners[id];
      }
      return this;
    }

看上面的代码，其实这个listeners是用于在stopListening()无参调用时，找到监听的所有obj，再依次obj.off所有回调。在前面例子中，要停止监听e1的hello，
我们只需

	e2.stopListening(e1,'hello');

看stopListening的源码，在off中还传入了第三个参数：this,这是为了防止把e1中自己或是其他对象注册的hello回调也给删掉，因此会把e2本身的引用也给传进去，
用于标识，告诉e1的off,你只能删e2监听的，其他的不准动哦。这个函数的意思就是把e1中hello事件的回调－－e2监听的回调给删掉。

##其他小tips
backbone核心的事件原理就差不多了，发现里面还有点小的技巧可能总结一下。

on为了支持{hello:fun1,hello:fun2}和"hello1 hello"风格的事件注册，专门做了嵌套处理，大家可以自己看看eventsApi方法。

backbone内部调用的方法的参数绝大部分是3个参数，因此，作者在trigger里面用到的triggerEvents方法采取了一个对参数个数不同而分别采用不同的call来调用。

	 switch (args.length) {
      case 0: while (++i < l) (ev = events[i]).callback.call(ev.ctx); return;
      case 1: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1); return;
      case 2: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2); return;
      case 3: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2, a3); return;
      default: while (++i < l) (ev = events[i]).callback.apply(ev.ctx, args);
    }

我的理解是call的性能要比apply高，这个我自己也测过了。。

##最后
backbone事件模块基本上全分析完了。睡觉！！！！

