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
            var _a = [],
                empNum = [],
                move = false;
            var _a = a.map(function (list) {
                var _list = list.slice();
                var e1, e2, emp = [],
                    r = [];
                for (var i = 0, len = list.length; i < len; i++) {
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

            if (move) {
                var j, n, m, sum = empNum[empNum.length - 1];
                var r = j = Math.random() * sum | 0;
                for (var i = 0, len = empNum.length - 1; i < len; i++) {
                    n = empNum[i];
                    m = empNum[i + 1]
                    if (r < n) {
                        break;
                    }
                    if (r < m) {
                        i++;
                        j = r - n;
                        break;
                    }
                }
                var nn = [2, 2, 2, 2, 2, 2, 2, 2, 4]
                nn = nn[Math.random() * nn.length | 0]
                var xx = i;
                var yy = _a[i].length - j - 1;
                console.log('移动后[' + xx + '][' + yy + ']的值是' + _a[xx][yy], '放入', nn)
                _a[xx][yy] = nn;
				game.addHistory();
            }
            return _a;
        }

        var initdata = function (num) {
            var arr = [
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
            ];
            while (num--) {
                var x = Math.random() * 4 | 0;
                var y = Math.random() * 4 | 0;
                if (arr[x][y] > 0) num++;
                arr[x][y] = 2;
            }
            game.h = [arr]
            return arr;
        }

        var game = avalon.define('2048', function (vm) {
            vm.score = 0;
            vm.arr = [];
            vm.h = [];
            vm.key = '';
            vm.hu = function () {
                if (vm.h.length > 1) {
                    vm.h.shift();
                    vm.arr = vm.h[0];
                }
            }
            vm.restart = function () {
            	vm.score=0;
                vm.arr = initdata(2);
            }
			vm.addHistory=function(){
                vm.h.unshift(clone(game.arr));
			}
            vm.check = function () {

            }
            vm.move = function (key) {
                console.log(key)
                vm.key = key;
                vm.arr = action[key](game.arr)
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
            },
            other: function () {
                console.log('hehe')
            }
        }
        var clone = function (arr) {
            return arr.map(function (list) {
                return list.map(function (e) {
                    return e;
                });
            });
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
