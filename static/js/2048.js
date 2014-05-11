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
	var move2Left = function (a) {
		var _a = [],i,j,k,x,y,
		empNum = [],
		move = false;
		var _a = a.map(function (list) {
			var _list = list.slice();
			var e1, e2, emp = [],
			r = [];
			for (i = 0, len = list.length; i < len; i++) {
				e1 = list[i];
				if (e1 == 0) {
					emp.push(e1);
					continue;
				}
				r.push(e1);
				move = move || (list[i - 1] === 0)
				do {
					e2 = list[++i];
					if (e2 > 0) {
						if (e1 == e2) {
							move = true;
							emp.push(list[i] = 0);
							game.score += (r[r.length - 1] = e1 * 2);
						} else {
							i--;
						}
						break;
					} else if (e2 == 0) {
						emp.push(e2);
					}
				} while (i < len);
			}
			console.log(_list, '-->', r, emp)
			empNum.push((empNum[empNum.length - 1] || 0) + emp.length);
			return r.concat(emp);
		});

		//0的个数
		var sum = empNum[empNum.length - 1];
		if (game.moved=move) {
			var n, m, r = j = Math.random() * sum | 0;
			for (i = 0, len = empNum.length - 1; i < len; i++) {
				n = empNum[i];
				m = empNum[i + 1]
				if (r < n)break;
				if (r < m) {
					i++;
					j = r - n;
					break;
				}
			}
			var newNum = [2, 2, 2, 2, 2, 2, 2, 2, 4]
			newNum = newNum[Math.random() * newNum.length | 0]
			x = i;
			y = _a[i].length - j - 1;
			console.log('移动后[' + x + '][' + y + ']的值是' + _a[x][y], '放入', newNum)
			_a[x][y] = newNum;
		}
		var canmove=true;
		if(sum<2){
			//当格子满时检测是否可移动，做24次检测
			var next;
			canmove=false
			for(i=2;i--;)
				for(j=4;j--;)
					for(k=3;k--;){
						x=i?j:k;
						y=i?k:j;
						next=i?_a[x][y+1]:_a[x+1][y];
						if(_a[x][y]==next){
							canmove=true;
							break;
						}
					}
		}
		game.canmove=canmove;
		return _a;
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
			vm.score=0;
			vm.canmove=true;
			var arr=initdata(2);
			vm.history=[arr];
			vm.arr = arr;
		}
		vm.move = function (key) {
			console.log(key)
			vm.key = key;
			var arr=action[key](game.arr);
			if(vm.moved){
				vm.arr=arr;
				vm.history.unshift(arr);
			}
			if(!vm.canmove){
				alert('Game Over !');
			}
		}
	});
        game.restart();
        var keymap = {
            37: 'left',
            38: 'up',
            39: 'right',
            40: 'down'
        }
        var action = {
            left: function (arr) {
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
        document.body.addEventListener('keydown', function (e) {
            var keycode = e.keyCode | e.which,
                key = keymap[keycode];
				if(key){
					game.move(key);
					e.preventDefault();
				}
        })
})()
