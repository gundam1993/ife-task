function OrderList() {
	this.orders = [];
	this.error = false;
	this.lines = 0;
}

OrderList.prototype.getOrders = function () {
	this.error = false;
	var rawOrders = $('#order').value.split('\n'),
		orders = [];
	this.lines = rawOrders.length + 1;
	for (var i = 0; i < rawOrders.length; i++) {
		var orderUnit = rawOrders[i].split(' '),
			lastUnit = orderUnit[orderUnit.length - 1];
		if (orderUnit.length === 1 && orderUnit[0] !== '') {
			orders.push(rawOrders[i].trim().toLowerCase());
		}else{
			if (parseInt(lastUnit) && orderUnit[0] != 'tun' && orderUnit[1] != 'to') {
				var trueOrder = rawOrders[i].substring(0,rawOrders[i].length - lastUnit.length);
				for (var j = 0; j < parseInt(lastUnit); j++) {
					orders.push(trueOrder.trim().toLowerCase());
				}
			}else if (parseInt(lastUnit) && orderUnit[0] == 'tun') {
				var trueOrder = rawOrders[i].substring(0,rawOrders[i].length - lastUnit.length);
				orders.push(trueOrder.trim().toLowerCase());
			}else{
				orders.push(rawOrders[i].trim().toLowerCase());
			}
		}
	}
	this.orders = orders;
};

OrderList.prototype.runOrders = function (order,chessboardWalker) {
	var that = this,
		hint = $('#hint'),
		i = 0;
		hint.style.color = 'green';	
	var x = setInterval(function () {
			that.runlist(order[i],chessboardWalker);
			if (i > 0) {
				$$(".commander-block")[i-1].style.backgroundColor = '';
			}
			$$(".commander-block")[i].style.backgroundColor = '#227D51';
			i++;
			if (i == order.length || that.error == true) {
				clearInterval(x);
			}
		},100);
};

OrderList.prototype.commblock = function() {//编辑器部分的行标
	var html = '',
		orders = $('#order').value,
		lines = orders.match(/\n/g);
		lines = lines ? lines.length + 1 : 1
   	for (var i = 1; i <= lines; i++) {
   		var box = '<div class="commander-block">' + i + '</div>'
   		html += box;
   	}
   	$('#commander-lines').innerHTML = html;
};

OrderList.prototype.runlist = function(order,chessboardWalker) {
	var	hint = $('#hint');
		hint.style.color = 'green';
	if (order == 'go') {
		chessboardWalker.go(target);
		hint.innerHTML = 'Moved';
	}else if (order == 'tun lef') {
		chessboardWalker.turn('left',target);
		hint.innerHTML = 'Turned';
	}else if (order == 'tun rig') {
		chessboardWalker.turn('right',target);
		hint.innerHTML = 'Turned';
	}else if (order == 'tun bac') {
		chessboardWalker.turn('back',target);
		hint.innerHTML = 'Turned';
	}else if (order == 'tra lef') {
		chessboardWalker.translation('lef',target);
		hint.innerHTML = 'Moved';
	}else if (order == 'tra rig') {
		chessboardWalker.translation('rig',target);
		hint.innerHTML = 'Moved';
	}else if (order == 'tra top') {
		chessboardWalker.translation('top',target);
		hint.innerHTML = 'Moved';
	}else if (order == 'tra bot') {
		chessboardWalker.translation('bot',target);
		hint.innerHTML = 'Moved';
	}else if (order == 'mov rig') {
		chessboardWalker.position = 0;
		chessboardWalker.direction = 2;
		chessboardWalker.turn('left',target);
		chessboardWalker.go(target);
		hint.innerHTML = 'Moved';
	}else if (order == 'mov lef') {
		chessboardWalker.position = 0;
		chessboardWalker.direction = 2;
		chessboardWalker.turn('right',target);
		chessboardWalker.go(target);
		hint.innerHTML = 'Moved';
	}else if (order == 'mov bot') {
		chessboardWalker.position = -90;
		chessboardWalker.turn('right',target);
		chessboardWalker.direction = 2
		chessboardWalker.go(target);
		hint.innerHTML = 'Moved';
	}else if (order == 'mov top') {
		chessboardWalker.position = 0;
		chessboardWalker.direction = 2;
		chessboardWalker.turn('back',target);
		chessboardWalker.go(target);
		hint.innerHTML = 'Moved';
	}else if (order == 'build') {
		chessboardWalker.buildWall();
		chessboardWalker.showWall();
	}else if (order.split(' ')[0] === 'bru' && order.split(' ').length == 2 && /^#[0-9a-fA-F]{6}$/.test(order.split(' ')[1])) {
		chessboardWalker.brushWall(order.split(' ')[1]);
	}else if (order.substring(0,6) === 'mov to' && order.split(' ').length == 3 && /^([1-9]|(1[0-9])|20),([1-9]|(1[0-9])|20)$/.test(order.split(' ')[2])) {
		var goal = [];
		goal.push(parseInt(order.split(' ')[2].split(',')[0]));
		goal.push(parseInt(order.split(' ')[2].split(',')[1]));
		this.findPath(goal,chessboardWalker);
	}else{
		hint.style.color = 'red';
		hint.innerHTML = 'Error';
		this.error = true;
		this.lines = this.orders.indexOf(order);
		this.errorHint();
	}
};

OrderList.prototype.errorHint = function() {
	var blocks = $$('.commander-block');
	blocks[this.lines].style.backgroundColor = '#EB7A77';
	blocks[this.lines].style.color = '#FFF';
};

OrderList.prototype.scroll = function() {
	$('#commander-lines').style.top = -event.target.scrollTop + 'px';
};

OrderList.prototype.refresh = function() {
	$('#order').value = '';
    this.orders = [];
};

OrderList.prototype.findPath = function(goal,chessboardWalker) {
	var navigater = new Navigater(goal,[(chessboardWalker.x / chessboardWalker.blockSize),(chessboardWalker.y / chessboardWalker.blockSize)]),
	start = new PathNode([(chessboardWalker.x / chessboardWalker.blockSize),(chessboardWalker.y / chessboardWalker.blockSize)]);
	goalN = new PathNode([goal[0],goal[1]]);
	if (goal[0] != start.position[0] || goal[1] != start.position[1]) {
		var a = navigater.astarxx(start,goalN,chessboardWalker);
		navigater.cameFrom(a,start.position,goalN.position);
		console.log(navigater.open);
		navigater.translateOrder();
		this.runOrders(navigater.orderList,chessboardWalker);
	}
};