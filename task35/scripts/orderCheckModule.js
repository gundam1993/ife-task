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
			if (parseInt(lastUnit) && orderUnit[0] != 'tun') {
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

OrderList.prototype.runOrders = function () {
	var order = this.orders,
		that = this,
		hint = $('#hint'),
		i = 0;
		hint.style.color = 'green';	
	var x = setInterval(function () {
			that.runlist(order[i]);
			i++;
			if (i > order.length || that.error == true) {
				clearInterval(x);
			}
		},1000);
};

OrderList.prototype.commblock = function() {
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

OrderList.prototype.runlist = function(order) {
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
	}else if (order == 'mov lef') {
		chessboardWalker.position = 0;
		chessboardWalker.direction = 0;
		chessboardWalker.turn('left',target);
		chessboardWalker.go(target);
		hint.innerHTML = 'Moved';
	}else if (order == 'mov rig') {
		chessboardWalker.position = 0;
		chessboardWalker.direction = 0;
		chessboardWalker.turn('right',target);
		chessboardWalker.go(target);
		hint.innerHTML = 'Moved';
	}else if (order == 'mov top') {
		chessboardWalker.position = -90;
		chessboardWalker.turn('right',target);
		chessboardWalker.direction = 0;
		chessboardWalker.go(target);
		hint.innerHTML = 'Moved';
	}else if (order == 'mov bot') {
		chessboardWalker.position = 0;
		chessboardWalker.direction = 0;
		chessboardWalker.turn('back',target);
		chessboardWalker.go(target);
		hint.innerHTML = 'Moved';
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