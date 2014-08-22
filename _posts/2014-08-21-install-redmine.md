---
layout: post
title: 从零开始安装redmine
tags: redmine
categories: dev
---

## 说明
[redmine]是一个开源的用于项目管理的web应用,基于[ruby]语言编写,使用[ruby on rails][ror]框架.

## 准备工作
本文是在windows 7 64位下安装的,安装前需要下载好以下东西,自行到官网下.

* `mysql-5.5.37-winx64.zip`,数据库,这是手动安装包,当然也可以自行选择自动安装
* `mysql-connector-c-noinstall-6.0.2-win32.zip` 这个东西是在[ruby]环境里面要用的,用来支持mysql2的,切记是32位的,不要下错了
* `HeidiSQL_8.3_Portable.zip` 这是数据库管理工具,已有其他的管理工具可以不用下了
* `rubyinstaller-1.9.3-p545.exe` [ruby]运行环境
* `DevKit-tdm-32-4.5.2-20111229-1559-sfx.exe` [ruby]的开发套件,这个是必须有的
* `redmine-2.5.2.zip` 这就是[redmine]的安装包了

**注意:上面所有东西解压安装的路径必须是纯英文,不得带有中文,空格等字符.**

## 安装数据库
若机子原来安装好的,这一步可以直接跳过,下面是介绍手动安装方法.

1. 解压`mysql-connector-c-noinstall-6.0.2-win32.zip`,命令行下进入解压后的根目录

2. 在命令行下一行一行运行下面命令,**rem**命令是注释,可以不管

		rem 安装服务
		bin\mysqld --install mysql
		net start mysql
		rem 设置root密码,会弹出改密码的提示,连输入两次新的密码就ok
		bin\mysqladmin -uroot password
		rem 重启服务
		net stop mysql
		net start mysql

## 安装[ruby]和开发套件
1. 双击`rubyinstaller-1.9.3-p545.exe`,注意在选择安装目录的时候有三个选择框,要钩选第二个(`add
	ruby executables to your path`),表示可以直接在命令行下运行[ruby],一路下一步,ok!

2. 双击解压`DevKit-tdm-32-4.5.2-20111229-1559-sfx.exe`,然后命令行下进入解压根目录,运行下面命令

		ruby dk.rb init
   
   再运行下面命令

		ruby dk.rb install

3. [ruby]源不稳定,可能会一时联不上,可以考虑用taobao的源

		$ gem sources --remove https://rubygems.org/
		$ gem sources -a https://ruby.taobao.org/
		$ gem sources -l
		*** CURRENT SOURCES ***

		https://ruby.taobao.org

	要注意得先删除官方源,`gem sources -l`可以查看当前使用的源.  
    官方源和淘宝源可以切换着用,哪个能用用哪个,这两个源都会时不时抽风.

4. [ruby]环境下安装mysql2模块.
   
   [ruby]下mysql需要*mysqllib.dll*的支持,这个dll在网上的链接基本都失效了,后来去mysql官网找到了.  
   解压`mysql-connector-c-noinstall-6.0.2-win32.zip`,*mydqllib.dll*这个文件在解压路径下的lib目录里,拷到{ruby安装目录}\bin\目录下,然后在命令行下执行下面命令:

		gem install mysql2 --platform=ruby -- --with-mysql-dir=C:/Users/Administrator/Desktop/mysql-connector-c-noinstall-6.0.2-win32

	--with-mysql-dir参数的值就是`mysql-connector-c-noinstall-6.0.2-win32.zip`解压路径,路径不能有空格,中文等字符,注意斜杠.在安装过程中可能网络会掉,原因你懂的,掉了就切换一下源.

## redminde的安装
1. 解压`redmine-2.5.2.zip`.下面的操作都在在解压后的根目录下进行.

2. 创建数据库,数据库用户.

	进入数据库管理工具,运行下面命令

		CREATE DATABASE redmine CHARACTER SET utf8;
		CREATE USER 'redmine'@'localhost' IDENTIFIED BY 'redmin';
		GRANT ALL PRIVILEGES ON redmine.* TO 'redmine'@'localhost';

3. 配置数据库

	进入**config**目录,将*database.yml.example*改为*database.yml*,并修改这个文件,如下

		production:
		  adapter: mysql2
		  database: redmine
		  host: localhost
		  username: redmine
		  password: redmine
		  encoding: utf8

	这个数据库配置和上面的建库的要对应哦,adapter一定要用**mysql2**,不要漏掉后面的2,只写mysql的话会出问题

4. 配置服务器*mongrel*

	在根目录建立一个文件*Gemfile.local*,内容如下:

		# Gemfile.local
		gem 'mongrel','1.2.0.pre2'

    这里一定要注意mongrel的**版本号**,如果不写的话,就默认使用1.1.5,这样会有冲突的,一定要写好版本号.
    到时下一步bundle批量安装的时候就会选择这个版本下载

5. 为[redmine]安装其他依赖

	以命令行模式进入[redmine]根目录,运行下面命令,安装bundler

        gem install bundler -V

	bundler安装好后就可以批量加载依赖了

		bundle install --without development test rmagick -V

	**注意**:[ruby]安装依赖会联外网,可能会时断时续,如果联不上,可以用taobao的源,在根目录下的Gemfile第一行是这样的

		source 'https://rubygems.org'

	可以换成下面这样

		source 'https://ruby.taobao.org'

6. Session store secret generation
    
    还在是命令行下,运行下面的命令,是为了会话加密的

		rake generate_secret_token

7. 初始化数据

	[redmine]根目录命令行下,逐一运行下面的命令初始化数据

		set RAILS_ENV=production
		rake db:migrate
		set REDMINE_LANG=zh
		rake redmine:load_default_data

## 启动服务
在[redmine]根目录下运行下面命令启动服务

	ruby script/rails server mongrel -e production

访问地址是<http://localhost:3000>




[redmine]: http://www.redmine.org/
[ruby]: https://www.ruby-lang.org/zh_cn/
[ror]: http://rubyonrails.org/
