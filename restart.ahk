#SingleInstance force
menu,TRAY,icon,favicon.ico
menu,TRAY,tip,alt+r重启jekyll服务并打开网页

!r::
t= C:\Windows\system32\cmd.exe
IfWinExist, %t%
{	
	WinClose, %t%
}
run,run.bat,A_ScriptDir,min
sleep 1000
run,http://localhost:4000
return 

