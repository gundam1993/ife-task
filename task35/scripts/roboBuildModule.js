function ChessboardWalker() {//小格子的原型对象
	this.x = 306;//格子所处的横向位置
	this.y = 306;//格子所处的纵向位置
	this.position = 0;
	this.direction = 0;//格子的方向，数值是数组directions中方向的位置
	this.orders = [];
}
	
ChessboardWalker.prototype.show = function () {
	$('#moveArea').innerHTML = '';
	var div =document.createElement('div');
	div.style.top = this.y + 'px';
	div.style.left = this.x +'px';
	div.id = 'target';
	$('#moveArea').appendChild(div);
};

ChessboardWalker.prototype.go = function (target) {
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