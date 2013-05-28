(function(){
	   var p,np,f,$l,$p,insertAfter,id;
	   f={
	   3:'保存全局对象（浏览器环境是<code>window</code>，服务器环境是<code>exports</code>）的引用',
	   4:'保存之前定义的Backbone变量的值，使用noConflict的话，可以释放其控制权',
	   5:'为我们之后要用到的数组方法创建局部引用',
6:'顶层命名空间。所有的Backbone公共类和模块都将附加其上。用于浏览器和服务器Exported'
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

	   }

	   })();;
