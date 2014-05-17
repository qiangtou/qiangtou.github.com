(function(){
	console = console || {};
	console.log = console.log || function () {}

	var transform = {
		right: function (arr) {
			var a = [];
			var col = arr[0].length,
			row = arr.length;
			for (var i = 0; i < col; i++) {
				a[i] = a[i] || []
				for (var j = 0; j < row; j++) {
					a[i][row - 1 - j] = arr[j][i]
				}
			}
			return a;
		},
		left: function (arr) {
			var a = [];
			var col = arr[0].length,
			row = arr.length;
			for (var i = 0; i < col; i++) {
				for (var j = 0; j < row; j++) {
					a[col - 1 - i] = a[col - 1 - i] || [];
					a[col - 1 - i][j] = arr[j][i]
				}
			}
			return a;
		}

	}
	var move2Left = function (arr) {
		var empNum=[];
		var zeroNum=0;
		var moved=false;
		var score=0;
		//移动
		for(var i=0,len=arr.length;i<len;i++){
			var lastIndex=-1,hasAdd=false,a=arr[i];
			for(var j=0,len2=a.length;j<len2;j++){
				var now=a[j];
				if(now==0){
					zeroNum++;
					continue;
				}
				var last=a[lastIndex];
				if(last==void 0){
					a[++lastIndex]=now;
					if(j>lastIndex){
						a[j]=0;
						moved=true;
					}
					continue;
				}
				if(last==now){
					if(hasAdd=!hasAdd){
						zeroNum++;
						a[lastIndex]=now*2;
						score+=now*2;
						a[j]=0;
					}else{
						a[++lastIndex]=now;
						if(j>lastIndex){
							a[j]=0;
							moved=true;
						}
					}
				}else{
					hasAdd=false;
					a[++lastIndex]=now;
					if(j>lastIndex){
						a[j]=0;
						moved=true;
					}
				}
			}
			empNum[i]=zeroNum;
		}
		//有移动操作就填新数
		if(game.moved=moved||score>0){
			zeroNum--;
			var x,y;
			var r=Math.random()*zeroNum|0
			for(x=0;x<4;x++){
				var sum=empNum[x];
				if(r<sum){
					//y=[3,2,1,0][sum-r];
					y=r+4-sum
					var v=arr[x][y]
					arr[x][y]=2;
					break;
				}
			}
		}
		//能否移动检测
		var canmove=true;
		if(zeroNum==0){
			//当格子满时检测是否可移动，做24次检测
			var _a=arr;
			var current,next;
			canmove=false;
			checkcanmove:
			for(i=2;i--;)
				for(j=4;j--;)
					for(k=3;k--;){
						x=i?j:k;
						y=i?k:j;
						current=_a[x][y];
						next=i?_a[x][y+1]:_a[x+1][y];
						if(current==next || current==0 || next==0 ){
							canmove=true;
							break checkcanmove;//中断三层循环
						}
					}
		}
		game.canmove=canmove;
		game.score+=score;
		return arr;
	}

	var initdata = function (num) {
		var arr=[
			[0,0,0,0],
			[0,0,0,0],
			[0,0,0,0],
			[0,0,0,0]
		];
		while (num--) {
			var x = Math.random() * 4 | 0,
			y = Math.random() * 4 | 0;
			if (arr[x][y] > 0) num++;
			arr[x][y] = 2;
		}
		return arr;
	}

	var game = avalon.define('2048', function (vm) {
		vm.score = 0;
		vm.arr = [];
		vm.history = [];
		vm.key = '';
		vm.moved=false;
		vm.canmove=true;
		vm.start=false;
		vm.time=0;
		vm.$colors=[
			'#ffffff',
			'#eee4da',
			'#ede0c8',
			'#f2b179',
			'#f59563',
			'#f67c5f',
			'#f65e3b',
			'#edcf72',
			'#edcc61',
			'#edc850',
			'#edc53f',
			'#edc22e',
			'#3c3a32'
		]	
		vm.getColor=function(n){
			return vm.$colors[Math.log(n)/Math.log(2)|0]; 
		}
		vm.regret = function () {
			if (vm.history.length > 1) {
				vm.history.shift();
				vm.arr = vm.history[0];
			}
		}
		vm.restart = function () {
			vm.start=false;
			vm.score=0;
			vm.canmove=true;
			var arr=initdata(2);
			vm.history=[arr];
			vm.arr = arr;
		}
		vm.move = function (key) {
			if(!vm.start){
				vm.start=true;
			}
			console.log(key)
			vm.key = key;
			var arr=action[key](game.arr);
			if(vm.moved){
				vm.arr=arr;
				vm.history.unshift(arr);
				if(vm.history.length>10)vm.history.pop()
			}
			if(!vm.canmove){
				alert('Game Over !');
			}
		}
	});
	game.$watch('start',(function(){
		var iv;
		return function(start){
			if(start){
				var time=0
				iv=setInterval(function(){
					time++;
					game.time=time;
				},1000);
			}else{
				clearInterval(iv);
			}

		}
	})())
	
        game.restart();
        var keymap = {
            37: 'left',
            38: 'up',
            39: 'right',
            40: 'down'
        }
        var action = {
            left: function (arr) {
                arr = transform.left(arr);
                arr = transform.right(arr);
                return move2Left(arr);
            },
            up: function (arr) {
                arr = transform.left(arr);
                arr = move2Left(arr);
                arr = transform.right(arr);
                return arr
            },
            right: function (arr) {
                arr = transform.left(arr);
                arr = transform.left(arr);
                arr = move2Left(arr);
                arr = transform.right(arr);
                arr = transform.right(arr);
                return arr
            },
            down: function (arr) {
                arr = transform.right(arr);
                arr = move2Left(arr);
                arr = transform.left(arr);
                return arr;
            }
        }
        document.addEventListener('keydown', function (e) {
            var keycode = e.keyCode | e.which,
                key = keymap[keycode];
				if(key){
					game.move(key);
					e.preventDefault();
				}
        })
})()
