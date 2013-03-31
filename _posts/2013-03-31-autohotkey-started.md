---
layout: post
title: autohotkey快速上手
tags: ahk
---
##autohotkey是什么

autohotkey是一个自动化工具，模拟键盘，鼠标操作。

##autohotkey能做什么

下面是[官方][ahk]的介绍

* Automate almost anything by sending keystrokes and mouse clicks. You can write a mouse or keyboard macro by hand or use the macro recorder.
* Create hotkeys for keyboard, joystick, and mouse. Virtually any key, button, or combination can become a hotkey.
* Expand abbreviations as you type them. For example, typing "btw" can automatically produce "by the way".
* Create custom data-entry forms, user interfaces, and menu bars. See GUI for details.
* Remap keys and buttons on your keyboard, joystick, and mouse.
* Respond to signals from hand-held remote controls via the WinLIRC client script.
* Run existing AutoIt v2 scripts and enhance them with new capabilities.
* Convert any script into an EXE file that can be run on computers that don't have AutoHotkey installed.

简单来说，就是能帮你做一个全局的快速键，可以一键打开你喜欢的网页，可以在你的游戏里面一键放大招，可以一键输入你的常用字符串等等。让你在多任务切换中游刃有余。

##快速入门
去他们家的[官方][ahk]下载安装文件，安装后随便建一个ahk后缀的文件，双击就能使用了。

##语法简要说明
	# win
	! alt
	^ control
	+ shift
	& 组合键
	* 即使附加的修饰键被按住也能激发热键. 这常与 重映射 按键或按钮组合使用. 
	~ 追加
	$ send发送本身不会递归

##我的常用脚本
上面还太难说清的话，看看我在用的例子就很清楚了

	;全局变量必须放在文件开头才能被其他子程序识别
	chrome="C:\Program Files\Google\Chrome\Application\chrome.exe"
	firefox="D:\Mozilla Firefox\firefox.exe"
	brower=%chrome%
	;alt+d,alt+e,alt+f分别打开d,e,f盘
	!d::run d:
	!e::run e:
	!f::run f:
	;win+c打开计算器
	#c::Run Calc.exe
	;一键打开网页和程序
	#s::run D:\everything\everything.exe
	#z::run %brower% http://z.cn
	#3::run %brower% http://3.cn

有个注意的地方就是文件的编码问题，一定要是*utf-8*.不能是*utf-8无bom*,只有这样在send时才能发送中文字符。

##附帮助文档
<http://ahkcn.sourceforge.jp/download/AutoHotkey_L_Help_CN.zip>	
[ahk]: http://www.autohotkey.com/