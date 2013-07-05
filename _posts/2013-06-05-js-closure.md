---
layout: post
title: js闭包中级应用
tags: closure js
categories: it
---
##经典案例

<iframe width="100%" height="180" src="http://jsfiddle.net/dQHVx/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>
这是每个学习闭包的入门案例，函数的本来意图是让每个按钮alert不同的i，但是结果却alert都是相同的数。

解决方法很简单，把i用闭包的形式存起来，看下面的例子

<iframe width="100%" height="340" src="http://jsfiddle.net/dQHVx/3/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>


##中级应用

先来看看下面的场景

<iframe width="100%" height="360" src="http://jsfiddle.net/CVQH3/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

在js的模块化编程中，可能会用到一些数据仓库，如果直接放在模块中，每次调用都会赋值，占用空间，那放在全局变量中呢？当然也行，不过js的最佳实践就是尽量少的污染全局变量。基于上面的考虑，我们可以把它放在闭包中。

<iframe width="100%" height="400" src="http://jsfiddle.net/CVQH3/1/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

attr被移到外面的闭包里面去了

再来一发，下面是菲波那契数列。变量storage是亮点哦

<iframe width="100%" height="320" src="http://jsfiddle.net/qiangtou/aN5P2/1/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

##结语

闭包在很多现代的框架中已被大量应用，数据仓库只是冰山一角，希望大家可以举一反三。

