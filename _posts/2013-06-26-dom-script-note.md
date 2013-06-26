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


