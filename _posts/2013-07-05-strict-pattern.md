---
layout: post
title: js严格模式下function的this
tags: js
---
##1.普通情况

如果我们向下面这样，在控制台下看到的都是window对象

		function a(){
			console.log(this);
		}
		a()
		window.a()
		a.call(null);
		a.call();
		a.call(window);

##2.严格模式

如果我们使用了严格模式，则情况又会有大不同：

		'use strict'
		function a(){
			console.log(this);
		}
		a()
		window.a()
		a.call(null);
		a.call();
		a.call(window);

大家可以在控制台下试试看看有什么结果。

在这种情况下，this不会被默认指向window了，而是严格按照调用时的环境指向相应的对象，如果没有定义，当然就是undefined了，
