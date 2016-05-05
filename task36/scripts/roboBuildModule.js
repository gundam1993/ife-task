function ChessboardWalker() {//小格子的原型对象
	this.x = 0;//格子所处的横向位置
	this.y = 0;//格子所处的纵向位置
	this.blockSize = 0;
	this.position = 1;
	this.direction = 2;//格子的方向，数值是数组directions中方向的位置
	this.orders = [];
}
	
ChessboardWalker.prototype.show = function (map) {
	$('#moveArea').innerHTML = '';
	var div =document.createElement('div');
	div.style.width = map.blockSize - 1 + 'px';
	div.style.height = map.blockSize - 1 +'px'; 
	div.style.top = map.blockSize + 1 + 'px';
	div.style.left = map.blockSize + 1 +'px';
	div.style.borderBottom = map.blockSize / 4 + 'px solid #00896C'
	div.id = 'target';
	$('#moveArea').appendChild(div);
	this.x = map.blockSize;
	this.y = map.blockSize;
	this.blockSize = map.blockSize;
};

ChessboardWalker.prototype.go = function (target) {
	switch (this.direction) 
	{
		case 0 :
			if (this.y > this.blockSize ) {
				this.y -= this.blockSize;
				target.style.top = this.y + 1 + 'px';
			};
			break;
		case 2 :
			if (this.y <= $('#moveArea').offsetHeight - this.blockSize - 2) {
				this.y += this.blockSize;
				target.style.top = this.y + 1 + 'px';
			};
			break;
		case 1 :
			if (this.x < $('#moveArea').offsetWidth - this.blockSize - 2) {
				this.x += this.blockSize;
				target.style.left = this.x + 1 + 'px';
				};
			break;
		case 3 :
			if (this.x > this.blockSize) {
				this.x -= this.blockSizee;
				target.style.left = this.x + 1 + 'px';
				};
			break;
	}
};

ChessboardWalker.prototype.turn = function (path,target) {
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
ChessboardWalker.prototype.translation = function (path,target) {
	switch (path) 
	{
		case 'top' :
			if (this.y > 62 ) {
				this.y -= 61;
				target.style.top = this.y + 'px';
			};
			break;
		case 'bot' :
			if (this.y < 611) {
				this.y += 61;
				target.style.top = this.y + 'px';
			};
			break;
		case 'rig' :
			if (this.x < 611) {
				this.x += 61;
				target.style.left = this.x + 'px';
				};
			break;
		case 'lef' :
			if (this.x > 62) {
				this.x -= 61;
				target.style.left = this.x + 'px';
				};
			break;
	}
};