notepad = "D:\Notepad++\notepad++.exe"
;重启
!1::
t= C:\Windows\system32\cmd.exe
WinClose, %t%
run F:\my_doc\run.bat
sleep 800
WinMinimize, %t%
run http://localhost:4000
return 

;打开资源管理器
!c::run c:\
!d::run d:\
!e::run e:\
!f::run f:\
!s::run C:\Users\qiangtou\Desktop\sgfmplay

;hosts
#h::run %notepad% C:\Windows\System32\drivers\etc\hosts
;tomcat配置
;#t::run %notepad% F:\apache-tomcat-6.0.35\conf\server.xml

;搜索
#s::run D:\everything\everything.exe
;google搜索剪贴板内容
#g:: 
send ^c
run https://www.google.com.hk/search?q=%clipboard%
return

#f::
send ^c
run www.flvcd.com/parse.php?kw=%clipboard%
return

#o::run C:\Users\qiangtou\AppData\Local\Google\Chrome\Application\chrome.exe %clipboard%
#q::run D:\Tencent\QQ2013\Bin\QQ.exe

#f9::send qiangtou{tab}
#f10::send qiangtoutou{tab}
#f11::send qiangtou@gmail.com{tab}
#f12::send 032826091{tab}

#8::run http://www.zhibo8.cc
#t::run http://www.taobao.com/
#3::run http://3.cn/
#z::run http://z.cn/
#y::run http://www.51buy.com/
#j::run http://api.jquery.com/
#m::run http://money.feidee.com/u06/tally/new.do