function ChessboardWalker() {//小格子的原型对象
	this.x = 0;//格子所处的横向位置
	this.y = 0;//格子所处的纵向位置
	this.blockSize = 0;
	this.position = 0;
	this.direction = 2;//格子的方向，0上1右2下3左
	this.orders = [];

	this.wall = [];//记录每堵墙的信息
    this.wallnum = 0;//记录墙的总数
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
	console.log(this.x);
	switch (this.direction) 
	{
		case 0 :
			if (this.y > this.blockSize) {
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
				this.x -= this.blockSize;
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
			if (this.y > this.blockSize ) {
				this.y -= this.blockSize;
				target.style.top = this.y + 1 + 'px';
			};
			break;
		case 'bot' :
			if (this.y < $('#moveArea').offsetHeight - this.blockSize - 2) {
				this.y += this.blockSize;
				target.style.top = this.y + 1 + 'px';
			};
			break;
		case 'rig' :
			if (this.x < $('#moveArea').offsetHeight - this.blockSize - 2) {
				this.x += this.blockSize;
				target.style.left = this.x + 1 + 'px';
				};
			break;
		case 'lef' :
			if (this.x > this.blockSize) {
				this.x -= this.blockSize;
				target.style.left = this.x + 1 + 'px';
				};
			break;
	}
};

ChessboardWalker.prototype.buildWall = function() {
	var wall = new Object();
    wall.name = 'wall' + this.wallnum;
    wall.size = this.blockSize;
    switch (this.direction) 
    {
    	case 0 :
			if (this.y > this.blockSize) {
				wall.y = this.y - this.blockSize;
				wall.x = this.x;
				this.wall.push(wall);
				this.wallnum ++;
			}else{
				console.log('error');
			}
			break;
		case 2 :
			if (this.y <= $('#moveArea').offsetHeight - this.blockSize - 2) {
				wall.y = this.y + this.blockSize;
				wall.x = this.x;
				this.wall.push(wall);
				this.wallnum ++;
			}else{
				console.log('error');
			}
			break;
		case 1 :
			if (this.x < $('#moveArea').offsetWidth - this.blockSize - 2) {
				wall.x = this.x + this.blockSize;
				wall.y = this.y;
				this.wall.push(wall);
				this.wallnum ++;
			}else{
				console.log('error');
			};
			break;
		case 3 :
			if (this.x > this.blockSize) {
				wall.x = this.x - this.blockSize;
				wall.y = this.y;
				this.wall.push(wall);
				this.wallnum ++;
			}else{
				console.log('error');
			};
			break;    
    }
    console.log(this.wall);
};

ChessboardWalker.prototype.showWall = function() {
	for (var i = 0; i < this.wall.length; i++) {
		var div = document.createElement('div');
		div.style.width = this.wall[i].size - 1 + 'px';
		div.style.height = this.wall[i].size - 1 +'px'; 
		div.style.top = this.wall[i].y + 1 + 'px';
		div.style.left = this.wall[i].x + 1 +'px';
		div.style.backgroundColor = '#0f2540';
		div.className = 'wall';
		$('#moveArea').appendChild(div);
	}
};