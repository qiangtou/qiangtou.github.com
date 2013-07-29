---
layout: post
title: Pushing and Popping with the History API
tags: js
---

原文链接：<http://html5doctor.com/history-api/>

##摘要

直到最近，我们都不能利用浏览器的state和history做更多的事情。我们可以检查history条目数来驱动用户前进或者后退，但是这对用户受益不大。随着动态网页的增多，我们需要控制。谢天谢地，通过扩展js History API,HTML5给我们带来了这种控制.


一个html5 history api的体验，注意在点击三个链接时访问时刻是不变的，但是地址栏的url是变化的。在点击多次后，可以使用浏览器的前进后退，这时，访问时刻还是不变，也可以把三个地址复制下来，直接访问相应的资源。如果用老浏览器，也可平稳退化至刷新模式。

为什么要搞什么当前时刻和访问时刻这个东西？就是为了想表明这个页面是不动的，但是好像不太直观，如果是用一首不间断播放的歌来呈现就会更好。


##话不多说，举个粟子！！

<http://historyapi.sturgeon.mopaas.com/>
