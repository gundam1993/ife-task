 $ = function (el) { return document.querySelector(el); };
 $$ = function (el) { return document.querySelectorAll(el); };

var directions = ['top','right','bottom','left']

function ChessboardWalker() {//小格子的原型对象
	this.x = 4;//格子所处的横向位置
	this.y = 4;//格子所处的纵向位置
	this.position = '#cell44'
	this.direction = 0;//格子的方向，数值是数组directions中方向的位置
}

ChessboardWalker.prototype.show = function() {
	$(this.position).innerHTML = '';
	var div =document.createElement('div'),
		position ='#cell' + this.x  + this.y;
	div.className = directions[this.direction];//为格子增加方向信息
	div.id = 'target';
	$(position).appendChild(div);
	this.position = position;
};

ChessboardWalker.prototype.go = function() {
	switch (this.direction) 
	{
		case 0 :
			if (this.x > 0 ) {
				this.x --;
			};
			break;
		case 2 :
			if (this.x != 9) {
				this.x ++;
			}
			break;
		case 1 :
			if (this.y != 9) {
				this.y ++;
			}
			break;
		case 3 :
			if (this.y != 0) {
				this.y --;
			}
			break;
	}
	this.show();
};

ChessboardWalker.prototype.turn = function(path) {
	if (path == 'right') {
		this.direction ++;
		if (this.direction > 3) {
			this.direction -= 4;
		};
	}else if (path == 'left') {
		this.direction --;
		if (this.direction < 0) {
			this.direction += 4;
		}
	}else if (path == 'back') {
		this.direction += 2;
		if (this.direction > 3) {
			this.direction -= 4;
		};
	}
	this.show();
};

function runOrder() {
	var order = $('#order').value.toLowerCase(),
		hint = $('#hint');
		hint.style.color = 'green';
	if (order == 'go') {
		chessboardWalker.go();
		hint.innerHTML = 'Moved';
	}else if (order == 'tun lef') {
		chessboardWalker.turn('left');
		hint.innerHTML = 'Turned';
	}else if (order == 'tun rig') {
		chessboardWalker.turn('right');
		hint.innerHTML = 'Turned';
	}else if (order == 'tun bac') {
		chessboardWalker.turn('back');
		hint.innerHTML = 'Turned';
	}else{
		hint.style.color = 'red';
		hint.innerHTML = 'Error';
	}
}

var chessboardWalker = new ChessboardWalker(),
	gobtn = $('#go'),
	lefbtn = $('#lef'),
	rigbtn = $('#rig'),
	bacbtn = $('#bac'),
	run = $('#run');

window.onload = function () {
	chessboardWalker.show();
}

window.onclick =function () {
	switch (event.target)
	{
		case gobtn :
			chessboardWalker.go();
			break;
		case lefbtn :
			chessboardWalker.turn('left');
			break;
		case rigbtn :
			chessboardWalker.turn('right');
			break;
		case bacbtn :
			chessboardWalker.turn('back');
			break;
		case run :
			runOrder();
			break;
	}
}