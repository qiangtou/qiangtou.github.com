---
layout: post
title: 在windows下运行jekyll
---

因为是别人的文章，这里就做个链接吧

[running_jekyll_on_windows](http://www.madhur.co.in/blog/2011/09/01/runningjekyllwindows.html)

里面碰到一个问题，就是中文问题，貌似是 jekyll 的一个 bug

	Problem3 "Ruby193/lib/ruby/gems/1.9.1/gems/jekyll-0.11.2/lib/jekyll/convertible.rb:29:in ‘read_yaml’: invalid byte sequence in GBK (ArgumentError)"

将 convertible.rb 的第29行改为：

	self.content = File.read(File.join(base, name), :encoding => "utf-8")
	
