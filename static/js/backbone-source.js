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
17:'删除一个或多个回调函数。如果context是null,', 
	18:'',
	19:'',
	20:'',
	21:'',
	22:'',
	23:'',
	24:'',
	25:'',
	26:'',
	27:'',
	28:'',
	29:'',
	30:'',
	31:'',
	32:'',
	33:'',
	34:'',
	35:'',
	36:'',
	37:'',
	38:'',
	39:'',
	40:'',
	41:'',
	42:'',
	43:''

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
	   console.log(p);
	   insertAfter(p,np);
6
	   }

	   })();;
