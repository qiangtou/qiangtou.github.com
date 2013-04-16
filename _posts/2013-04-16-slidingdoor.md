---
layout: post
title: css中的滑动门
category: it
tags: css js
---

##什么是滑动门
滑动门就是一个自适应宽度的按钮的实现技术，通过在一个标签里放一个标签，内外分别用按钮的左边图和右边图作为背景，随着里面标签内文字的长短而自适应宽度，
看起来就像是滑动的两扇门来实现一个按钮一样。

##用在哪里
css2中一个标签只能设置一个背景图，如果相同类型的标签长度不同，那岂不是要为每种图都画一个？如果用到滑到门技术的话，就只要准备固定的几张图就行了。

##最终效果
<iframe width="100%" height="300" src="http://jsfiddle.net/V4EVe/3/embedded/result,html,css" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

##用到的图片
* 带有下边框的背景图:![bg.gif](http://i.imgur.com/apsYDzC.gif)
* 左按钮:![left.gif](http://i.imgur.com/Pr85rLq.gif)
* 右按钮：![right.gif](http://i.imgur.com/d9Z05TH.gif)
* 左按下按钮：![left_on.gif](http://i.imgur.com/Uy0u2EU.gif)
* 右按下按钮：![right_on.gif](http://i.imgur.com/JP1stMO.gif)