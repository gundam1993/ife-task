 $ = function (el) { return document.querySelector(el); };
 $$ = function (el) { return document.querySelectorAll(el); };

function ChessboardWalker() {//小格子的原型对象
	this.x = 306;//格子所处的横向位置
	this.y = 306;//格子所处的纵向位置
	this.position = 0;
	this.direction = 0;//格子的方向，数值是数组directions中方向的位置
}

ChessboardWalker.prototype.show = function() {
	$('#moveArea').innerHTML = '';
	var div =document.createElement('div');
	div.style.top = this.y + 'px';
	div.style.left = this.x +'px';
	div.id = 'target';
	$('#moveArea').appendChild(div);
};

ChessboardWalker.prototype.go = function(target) {
	switch (this.direction) 
	{
		case 0 :
			if (this.y > 62 ) {
				this.y -= 61;
				target.style.top = this.y + 'px';
			};
			break;
		case 2 :
			if (this.y < 611) {
				this.y += 61;
				target.style.top = this.y + 'px';
			};
			break;
		case 1 :
			if (this.x < 611) {
				this.x += 61;
				target.style.left = this.x + 'px';
				};
			break;
		case 3 :
			if (this.x > 62) {
				this.x -= 61;
				target.style.left = this.x + 'px';
				};
			break;
	}
};

ChessboardWalker.prototype.turn = function(path,target) {
	if (path == 'right') {
		this.position += 90;
		target.style.transform = 'rotate(' + this.position + 'deg)';
		this.direction ++;
		if (this.direction > 3) {
			this.direction -= 4;
		};
	}else if (path == 'left') {
		this.position -= 90;
		target.style.transform = 'rotate(' + this.position + 'deg)';
		this.direction --;
		if (this.direction < 0) {
			this.direction += 4;
		}
	}else if (path == 'back') {
		this.position += 180;
		target.style.transform = 'rotate(' + this.position + 'deg)';
		this.direction += 2;
		if (this.direction > 3) {
			this.direction -= 4;
		};
	}
};

function runOrder() {
	var order = $('#order').value.toLowerCase(),
		hint = $('#hint');
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
	var target = $("#target");
	switch (event.target)
	{
		case gobtn :
			chessboardWalker.go(target);
			break;
		case lefbtn :
			chessboardWalker.turn('left',target);
			break;
		case rigbtn :
			chessboardWalker.turn('right',target);
			break;
		case bacbtn :
			chessboardWalker.turn('back',target);
			break;
		case run :
			runOrder();
			break;
	}
}