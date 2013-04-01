#SingleInstance force
;÷ÿ∆Ù
!1::
t= C:\Windows\system32\cmd.exe
WinClose, %t%
run G:\work_space\my_doc\run.bat
sleep 800
WinMinimize, %t%
run http://localhost:4000
return 

