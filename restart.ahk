#SingleInstance force
menu,TRAY,icon,favicon.ico
menu,TRAY,tip,alt+r����jekyll���񲢴���ҳ

!r::
t= C:\Windows\system32\cmd.exe
IfWinExist, %t%
{	
	WinClose, %t%
}
run,run.bat,A_ScriptDir,min
sleep 900
run,http://localhost:4000
return 

