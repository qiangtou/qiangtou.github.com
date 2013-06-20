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
48:'为什么这里会用while？。change事件能够递归嵌套调用哦.--官方解释成这样还是不明白',
49:'删除属性，并触发change事件。如果属性不存在则不操作',
50:'删除所有属性，触发change事件',
51:'判断自上次change事件以来，model是否改变。如果指定了属性名则判断这个属性是否改变过',
52:'返回所有改变的属性集合对象，如果没有改变的则返回false.用于确定视图中的哪些部分需要进行更新和或属性需要被保存到服务器。未设置的属性将被设置为undefined.也可以传一个属性map对象进来，比较map和原来的值有何不同，返回map中和model不同的属性',
53:'返回某个属性change事件之前的值',
54:'返回change事件之前的所有属性的值的集合',
55:'从服务器抓取数据，如果服务器上的数据和当前属性有不同，当前的数据会被覆盖，并触发change事件',
56:'保存model属性集，r同步到服务器上。如果服务器返回不同的数据，model会再次set本身',
57:'处理key:value和{key:value}风格参数',
58:'',
59:'不持久化验证不通过的model',
60:'如果设置了{wait:true},设置临时属性',
61:'当服务端保存成功后，客户端更新服务端状态（更新）',
62:'确保属性在同步时被保存',
63:'设置属性',
64:'销毁服务器端的model如果该model已经持久化过。如果集合中存在此model则删除。如果传入wait:true，将回等待响应后再操作',
65:'model的默认url，如果你使用backbone的restful方法，重写此方法改变url',
66:'parse将转换响应至set方法的model中，默认实现是直接返回响应',
67:'创建一个具有相同属性的model',
68:'如果一个model没有持久化到服务器上则是new,这样的model没有id',
69:'检查model是否是有效状态',
70:'对完全的属性进行验证，包括传入的，如果都通过则返回true，否则触发invalid事件',
71:'将要实现的underscore里面的model的方法',
72:'将underscore中model的一些方法附加进model中',
74:'如果model趋向于表现一行数据，则Backbone Collection更像是充满数据的表，可以是表中的一个小片段，又或者是某些因为特定理由而聚在一起的集合－－所有的文件的信息，某个作者的所有文档，等等等等，Collection维护model的索引，还有顺序，通过id检索。</br>创建一个新的Collection,可能包含特定的model类型。如果设置了comparator方法，当添加或删除model时Collection会按此方法排序',
75:'Collection#set的默认选项',
76:'定义Collection的继承方法',
77:'Collection默认的model类型是Backbone.Model.这个属性强烈建议设置',
78:'默认的初始化方法，重写实现你自己的初始化逻辑吧',
79:'将Collection中的model属性转成json以array的形式返回',
80:'默认的同步代理Backnone.sync',
81:'添加一个model，或者一堆model到collection中',
82:'从collection中移除一个model，或者一堆model',
83:'更新集合通过传入的model数组，加入新的，删除没有的，合并原来有的。类似于model#set，这是Collection用于更新数据的核心操作',
84:'将对象转换成model，防止添加无效的model',
85:'如果发现重复model,防止添加进集合，对原来的model进行合并操作',
86:'这是一个新的model，放入toAdd列表中去',
87:'监听model的所有事件，通过id或cid索引model',
88:'在适当的情况下删除不存在的model',
89:'看是否要排序，更新length和拼接新的model',
90:'静默排序，如果要合适的话',
91:'触发add事件',
92:'如果collection排序的话，触发sort事件',
93:'当你有远多于1个的项目要添加或者删除时，你可以reset的整个collection而不触发add或者remove事件。当完成时仅会触发reset事件。对于大量操作和性能优化是很有用的',
94:'添加model至collection尾',
95:'从collection尾移除model',                                                                                                                         
96:'添加model至collection头',
97:'从collection头移除model',
98:'从collection截取model子数组',
99:'通过id取model',
100:'通过索引取model',
101:'返回匹配属性的models,对于filter很有用哦',
102:'返回第一个匹配的属性的model,对于find有用哦',
103:'强制让Collection排序。通常情况下你不必调用此方法，因为在添加新元素进来时会自动维护集合的排序',
104:'运行基于comparator的排序',
105:'计算传入的model在collection中的排序索引。',
106:'获取集合中某个属性的值的数组－－（返回每个model[attr]组成的数组）',
107:'向服务器拉取默认的models,重置collection。如果设置了reset:true,响应数据将传入reset,而不是set方法',
108:'在collection中创建一个新的model实例。除非传入wait:true,model会马上加入到collection中，传入wait:true会等待服务器同意',
109:'parse转换即将被添加到collection的model列表，默认是空实现，即什么也不做',
110:'创建一个新的collection,持有相同models的引用',
111:'重置内部状态的私有方法，当collection第一次初始化或者reset时会调用此方法',
112:'预处理要被加入到coleection的hash对象或其他model',
113:'内部方法，切断model和collection的引用关系',
114:'内部方法，当集合中的model触发事件时调用。集合需要更新索引和id。所有其他事件仅是简单代理。其他集合中的add和remove事件会被忽略',
115:'我们要在collection中实现的underscore方法，90%的核心方法在这里面也要用到',
116:'融合上面的underscore方法到collection中去',
117:'把属性名作为参数的underscore方法',
118:'上面那些方法在underscore里面collection用点直接取对象属性，在backbone里面取model的属性是用get方法，model的属性是放在model.attributes里面的',
120:'Backbone Views约定多于编码，一个视图是一个简单的js对象，表现dom中的一个ui逻辑块。可能是一个项目，整个列表，工具栏或面板，甚至包围你的整个应用的框架。定义一个ui块为视图允许你定义dom事件，无需关心渲染顺序。很容易将model状态的变化反应到view上。<br/>如果页面中已存在的dom元素没有传入，则使用dom之外的元素，即创建一个新的',
121:'缓存切割delegate的正则表达式',
122:'要合并的视图选项列表',
123:'设置Backbone.view的原型对象',
124:'默认的tagName值，视图默认使用div',
125:'使用jquery委托查找元素，范围是在当前的视图中。在可能的情况下优先全局查找',
126:'initialize默认为空，可以重写你的初始化逻辑',
127:'render是一个核心函数，你应该要重写它,用适当的html填充元素(this.el),render约定总是返回this',
128:'移除这个view通过将元素脱离Dom并且移除这个元素的所有事件',
129:'改变视图所绑定的dom元素（this.el属性），同时重新委托元素事件',
130:'设置回调，this.event由hash对象组成',
131:'清除之前用delegateEvents绑定的所有回调。通常是不需要使用这个方法的，但是在多个view附在同一个dom元素上时可能会用到',
132:'利用options执行视图的初始化配置',
133:'确保视图有一个dom元素来渲染。如果this.el的值是通过字符串的形式传入$(),this.el会取第一个Dom元素。否则将从id,className和tagName创建一个元素分配给this.el',
135:'重写这个函数改变Backbone持久化model到服务器的行为。这个方法会传入请求类型和model。默认的实现是发送RESTful Ajax请求到model的url().下面是一些可自定义的实践：</br>'+
	'<ul><li>使用setTimeout把批量快速的更新处理成一次请求</li>'
	+'<li>使用xml替换json</li>'
	+'<li>使用websockets替换ajax</li>'
	+'</ul>'
	+'开启Backbone.emulateHTTP来模拟PUT和DELETE请求，这样会在post请求参数中加入一个_method参数，存放真实的请求类型，同时所有请求的页面文档类型会变成application/x-www-form-urlencoded而不是原来的application/json,原来model中的数据会被放入名为model的参数中。这样对于面向服务端的语言如php是很有用的，这类语言在读取PUT请求是相当困难的。',
136:'默认选项处理',
137:'默认的JSON请求的选项',
138:'确保url存在',
139:'确保有适当的请求数据',
140:'对于老的服务器，通过form表单提交的方式来仿真json',
141:'对于老的服务器，通过_method参数和X-HTTP-Method-Override请求头来模拟HTTP方法',
142:'禁止对非GET的请求的数据进行处理',
143:'如果发送的是patch请求，且在老式ie下，ActiveX默认开启的情况下，覆盖jquery的XHR。当jquery支持ie8的patch时这行代码就可以移除了',
144:'产生请求，允许用户覆盖任何的Ajax请求',
145:'为默认的Backbone.sync实现提供的增删改查Map对象',
146:'使用Backbone.$库代理Backbone.ajax请求。也可以用其他的库重写这个方法',
148:'路由映射url至相应的action,当匹配到url时触发相应的事件。如果没有设置routes,将会创建一个新的routes集合',
149:'缓存匹配路由的正则表达式',
150:'扩展Backbone.Router的原型',
151:'Initialize是一个空方法。可以重写你自己的初始化逻辑',
152:"手工绑定路由映射，映射至一个回调。－－代码就不翻译了",
153:'简单的Backbone.history代理，将小片段存到history中去',
154:'绑定所有路由规则至Backbone.history.这里反转路由的顺序，为了支持定义在路由集合下面的规则作为优先级高的规则',
155:'将路由字符串转换成正则表达式，针对当前的哈希做适当的匹配',
156:'传入一个路由，一个它所匹配的URL片断，返回编码后的参数数组。空或者未匹配参数会返回null,使跨浏览器行为正常',
158:'处理跨浏览器的history管理器，基于pushState和真实URLs,或者onhashchange和URL片断。如果浏览器都不支持（当然指的是老ie），',
159:'确保History能用于浏览器之外？',
160:'缓存正则，去掉前面的井号，斜线，后面的空格',
161:'缓存正则，去掉前后斜线',
162:'缓存正则，侦测ie',
163:'缓存正则，移除尾部斜线',
164:'history处理是否已经开始?',
165:'扩展Backbone.History原型属性和方法',
166:'轮循哈希变化间隔，如果必要的话，每秒20次',
167:'取得哈希值，不能直接使用location.hash,因为firefox的一个bug，location.hash总是被编码过的',
168:'获取跨浏览器的标准URL片断，从URL，hash或者override',
169:'启动hash改变处理，如果当前URL匹配存在的路由，返回true,否则返回false',
170:'计算初始配置。我们需要一个框架吗？pushState是强烈要求的？他是有效的？',
171:'确保root头尾只有一个/包住',
172:'取决于我们用pushState还是hash,onhashchange是否被支持，来决定我们如何来检查URL状态',
173:'确定我们是否需要改变基本url，当一个pushState链接被不支持pushState浏览器打开时',
174:'如果路由开启于支持pushState的浏览器，但是目前我们在一个不支持的浏览器中',
175:'马上返回当浏览器重定向到新的url时',
176:'',
177:'停用Backbone.history,可能是暂时的。在实际应用中不是很有用，但在单元测试中会用到。',
178:'添加路由，当片断改变时可测。后添加的路由会覆盖之前的路由规则',
179:'检测当前url是否改变，改变则调用loadUrl,兼容跨域隐藏的iframe',
180:'尝试加载当前URL片断。如果一个路由成功匹配，返回true,否则返回false',
181:'保存片断到历史的hash中，或者替换URL状态如果传入replace参数的话。你有责任预先进行URL编码。<br/>如果你希望路由回调被触发，可以在options中传入trigger:true.你想不通过添加实体到history而修改当前URL，可以传入replace:true',
182:'如果pushState是有效的，我们使用它来设置片断作为实际的url',
183:'如果hash的改变没有明确停用，更新hash片断并存储history',
184:'打开和关闭框架欺骗ie7以下的版本以将历史实体放入到哈希标签改变中去。当replace为trur时，我们不想这样',
185:'如果你告诉我们，你明确不想基于hashchange的历史的回退，则navigate成为刷新页面。',
186:'更新哈希的位置，无论是取代当前条目，或添加一个新的浏览器的历史记录。',
187:'有些浏览器需要哈希包含前导＃',
188:'创建默认Backbone.history。',
190:'辅助函数用来正确设置原型链，为实现子类。与goog.inherits相似，但使用原型属性和类属性的哈希来进行继承。',
191:'子类的构造函数可以由你定义（在protoProps.constructor中定义），也可以默认返回父类的简单包装',
192:'如果提供了静态属性的话则添加到新的子类中去。',
193:'设置继承于父类的原型链，不是通过直接new父类的构造函数哦（直接new父类的话，内部会初始化各种属性，方法，代价太大。这里采用了一个间接的surrogate的小封装，原型只是一个引用而已，new的代价会小点）',
194:'如果传入了原型属性，添加至child.prototype中去',
195:'',
196:'',
197:'',
198:'',
199:''
};

$l=function(id){
	return document.getElementById('section-'+id); 
}
$p=function(li){
	var child=li && li.children[0];
	return child && child.children[1];
}
insertAfter=function(elem,newElem){
	elem && elem.parentElement.appendChild(newElem);
}
for(id in f){
	p=$p($l(id));
	np=document.createElement('p');
	np.innerHTML=f[id];
	insertAfter(p,np);
}

})();;
