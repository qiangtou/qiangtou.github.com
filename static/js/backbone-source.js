(function(){
var p,np,f,$l,$p,insertAfter,id;
f={
2:'初始化',
3:'保存全局对象（浏览器环境是<code>window</code>，服务器环境是<code>exports</code>）的引用',
4:'保存之前定义的Backbone变量的值，使用noConflict的话，可以释放其控制权',
5:'为我们之后要用到的数组方法创建局部引用',
6:'顶层命名空间。所有的Backbone公共类和模块都将附加其上。用于浏览器和服务器Exported',
7:'库的当前版本号，保持和package.json同步',
8:'需要Underscore，如果在服务器上，它是不存在的',
9:'为了backbone，持有jQuery，Zepto，Ender，或“我的库”（开玩笑）拥有的$变量。 ',
10:'在noConflict模式下运行Backbone.js，交回backbone变量的控制权给之前的持有者，并把当前的Backbone返回',
11:'打开emulateHTTP以支持古老的HTTP 服务器。设置这个选项会把"put"和"delete"请求以_method参数方式发送，同时会设置X-Http-Method-Override请求头',
12:'打开emulateJSON以支持古老的不能直接支持application/json请求的服务器，会把body以application/x-www-form-urlencoded方式编码，并且将model以表单表单参数（参数名叫model）的形式发送',
13:'BACKBONE事件',
14:'一个模块能够和任何对象结合以提供自定义事件支持。你可以用on绑定或者用off删除回调函数到一个事件；trigger方法会连续触发所有回调函数',
15:'为事件绑定回调函数。传"all"参数会将回调函数绑定至所有事件上',
16:'绑定一个仅触发一次的事件。回调函数在第一次被调用后，事件会被删除',
17:'删除一个或多个回调函数。如果不指定context，该事件的绑定在context的回调方法都会被删除，如果不指定callback,该事件绑定的所有方法将被删除，如果连name也不指定，删除对象上绑定的所有事件的所有回调方法', 
18:'触发一个或多个事件，触发绑定事件的回调函数。trigger的参数去掉第一个参数（事件名）后的参数数组会传入回调函数,当事件名是"all"的话，会把所有参数都传入回调函数',
19:'告诉对象停止监听指定事件或者每个对象当前正在监听的事件',
20:'用于分割字符串的正则表达式',
21:'实现事件API的花哨功能，多事件支持，形如"change blur",或者jquery风格{change:action}',
22:'处理事件maps',
23:'处理空格连接的事件字符串',
24:'难以置信，但为触发事件而优化的内部分发函数，为了速度呀~~~（大多数backbone内部事件都只有3个参数）--call的效率比apply高哦',
25:'对on和off反转控制，告诉这个对象来监听另一个对象中的事件，跟踪原来监听的函数',
26:'为兼容性设置别名',
27:'让Backbone充当一个全局的事件总线，使人们可以方便地使用全局环境下的发布者－订阅者模式',
29:'Backbone Models是基本的数据对象，常用于表现服务器数据库内表中的一行数据。一个离散的数据块和一些有用的，相关的方法用于对这些数据进行计算和转换。<br/>用特定的属性创建一个新的model实例。客户端标识(cid)自动生成并分配',
30:'一个列表，里面包括需要直接附加到model上的选项，如果外部有设置的话',
31:'将可继承的方法附加到Model的原型上',
32:'hash集合,存放那些值改变了的属性',
33:'最近一次验证失败时返回的值',
34:'默认的JSON的id的属性名是"id",MongoDB和CouchDB用户可以设置成"_id"',
35:'Initialiize是一个空方法，你可以覆盖他，实现你自己的逻辑',
36:'返回model的属性集合（Object）',
37:'这是默认的代理方法，除非你想自定义同服务器的同步策略，重写他吧',
38:'取得某属性的值',
39:'取得某属性html转义后的值',
40:'如果model中包含这个值(非空)，则返回true',
41:'在对象上设置模型属性，并触发"change"事件。这是模型的核心－原语操作，更新数据并通知需要知道状态变化的订阅者。重中之重呀',
42:'处理参数：key-value键值对和{key:value}map风格',
43:'执行验证',
44:'抽取出属性和设置选项',
45:'检查是否设置了id属性名',
46:'对每一个set的属性，更新或者删除原来的值',
47:'触发相关的change事件',
48:'为什么这里会用while？。change事件能够递归嵌套调用哦',
49:'',
50:'',
51:'',
52:'',
53:'',
54:'',
55:'',
56:'',
57:'',
58:'',
59:'',
60:'',
61:'',
62:'',
63:'',
64:'',
65:'',
66:'',
67:'',
68:'',
69:'',
70:'',
71:'',
72:'',
73:'',
74:'',
75:'',
76:'',
77:'',
78:'',
79:'',
80:'',
81:'',
82:'',
83:'',
84:'',
85:'',
86:'',
87:'',
88:'',
89:'',
90:'',
91:'',
92:'',
93:'',
94:'',
95:'',
96:'',
97:'',
98:'',
99:'',
100:'',
101:'',
102:'',
103:'',
104:'',
105:'',
106:'',
107:'',
108:'',
109:'',
110:'',
111:'',
112:'',
113:'',
114:'',
115:'',
116:'',
117:'',
118:'',
119:'',
120:'',
121:'',
122:'',
123:'',
124:'',
125:'',
126:'',
127:'',
128:'',
129:'',
130:'',
131:'',
132:'',
133:'',
134:'',
135:'',
136:'',
137:'',
138:'',
139:'',
140:'',
141:'',
142:'',
143:'',
144:'',
145:'',
146:'',
147:'',
148:'',
149:'',
150:'',
151:'',
152:'',
153:'',
154:'',
155:'',
156:'',
157:'',
158:'',
159:'',
160:'',
161:'',
162:'',
163:'',
164:'',
165:'',
166:'',
167:'',
168:'',
169:'',
170:'',
171:'',
172:'',
173:'',
174:'',
175:'',
176:'',
177:'',
178:'',
179:'',
180:'',
181:'',
182:'',
183:'',
184:'',
185:'',
186:'',
187:'',
188:'',
189:'',
190:'',
191:'',
192:'',
193:'',
194:'',
195:''
};
	   
   $l=function(id){
   return document.getElementById('section-'+id); 
   }
   $p=function(li){
   return li.children[0].children[1];
   }
   insertAfter=function(elem,newElem){
    elem.parentElement.appendChild(newElem);
   }
   for(id in f){
   p=$p($l(id));
   np=document.createElement('p');
   np.innerHTML=f[id];
   insertAfter(p,np);
}

})();;
