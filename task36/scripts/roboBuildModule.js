function ChessboardWalker() {//小格子的原型对象
	this.x = 0;//格子所处的横向位置
	this.y = 0;//格子所处的纵向位置
	this.blockSize = 0;
	this.position = 0;
	this.direction = 2;//格子的方向，0上1右2下3左
	this.orders = [];

	this.wall = [];//记录每堵墙的信息
    this.wallID = [];//记录每堵墙的ID
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
			if (this.y > this.blockSize && !this.detectiveWall(this.x ,(this.y - this.blockSize))) {
				this.y -= this.blockSize;
				target.style.top = this.y + 1 + 'px';
			};
			break;
		case 2 :
			if (this.y <= $('#moveArea').offsetHeight - this.blockSize - 2 && !this.detectiveWall(this.x,(this.y + this.blockSize))) {
				this.y += this.blockSize;
				target.style.top = this.y + 1 + 'px';
			};
			break;
		case 1 :
			if (this.x < $('#moveArea').offsetWidth - this.blockSize - 2 && !this.detectiveWall((this.x + this.blockSize),this.y)) {
				this.x += this.blockSize;
				target.style.left = this.x + 1 + 'px';
				};
			break;
		case 3 :
			if (this.x > this.blockSize && !this.detectiveWall((this.x - this.blockSize),this.y)) {
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
			if (this.y > this.blockSize && !this.detectiveWall(this.x ,(this.y - this.blockSize))) {
				this.y -= this.blockSize;
				target.style.top = this.y + 1 + 'px';
			};
			break;
		case 'bot' :
			if (this.y < $('#moveArea').offsetHeight - this.blockSize - 2 && !this.detectiveWall(this.x,(this.y + this.blockSize))) {
				this.y += this.blockSize;
				target.style.top = this.y + 1 + 'px';
			};
			break;
		case 'rig' :
			if (this.x < $('#moveArea').offsetHeight - this.blockSize - 2 && !this.detectiveWall((this.x + this.blockSize),this.y)) {
				this.x += this.blockSize;
				target.style.left = this.x + 1 + 'px';
				};
			break;
		case 'lef' :
			if (this.x > this.blockSize && !this.detectiveWall((this.x - this.blockSize),this.y)) {
				this.x -= this.blockSize;
				target.style.left = this.x + 1 + 'px';
				};
			break;
	}
};

ChessboardWalker.prototype.buildWall = function() {
	var wall = new Object();
    wall.size = this.blockSize;
    switch (this.direction) 
    {
    	case 0 :
    		try
    			{
    				wall.y = this.y - this.blockSize;
					wall.x = this.x;
					if (this.y < 2 * this.blockSize) throw "Error！Can't build wall out of the map!";
				}
			catch(err)
				{
					console.log(err);
					return;
				}
			break;
		case 2 :
			try
    			{
    				wall.y = this.y + this.blockSize;
					wall.x = this.x;
					if (this.y > $('#moveArea').offsetHeight - this.blockSize - 2) throw "Error！Can't build wall out of the map!";
				}
			catch(err)
				{
					console.log(err);
					return;
				}
			break;
		case 1 :
			try
    			{
    				wall.x = this.x + this.blockSize;
					wall.y = this.y;
					if (this.x > $('#moveArea').offsetWidth - 2 * this.blockSize) throw "Error！Can't build wall out of the map!";
				}
			catch(err)
				{
					console.log(err);
					return;
				}
			break;
		case 3 :
			try
    			{
    				wall.x = this.x - this.blockSize;
					wall.y = this.y;
					if (this.x < 2 * this.blockSize) throw "Error！Can't build wall out of the map!";
				}
			catch(err)
				{
					console.log(err);
					return;
				}
			break;    
    }
    var wallID = wall.x.toString() + ':' + wall.y.toString();
    if (this.wallID.indexOf(wallID) != -1) 
    {
    	console.log("Error！There's already a wall here!")
    	return;
    }
    this.wall.push(wall);
    this.wallID.push(wallID);
};

ChessboardWalker.prototype.randomWall = function() {
	var wall = new Object();
		xx = 0;
    wall.size = this.blockSize;
    wall.x = (Math.round((application.mapBuilder.blockNum - 1)* Math.random()) + 1) * this.blockSize;
    wall.y = (Math.round((application.mapBuilder.blockNum - 1)* Math.random()) + 1) * this.blockSize;
    var wallID = wall.x.toString() + ':' + wall.y.toString();
    if (this.wallID.indexOf(wallID) != -1) 
    {
    	console.log("Error！There's already a wall here!")
    	return;
    }
    this.wall.push(wall);
    this.wallID.push(wallID);
    this.showWall();
};

ChessboardWalker.prototype.showWall = function() {
	if (this.wall.length > 0) {
		var i = this.wall.length - 1,
		div = document.createElement('div');
		div.style.width = this.wall[i].size - 1 + 'px';
		div.style.height = this.wall[i].size - 1 +'px'; 
		div.style.top = this.wall[i].y + 1 + 'px';
		div.style.left = this.wall[i].x + 1 +'px';
		div.style.backgroundColor = '#0f2540';
		div.className = 'wall';
		div.id = this.wallID[i];
		$('#moveArea').appendChild(div);
	}
};

ChessboardWalker.prototype.detectiveWall = function(x,y) {
	var targetId =  x + ':' + y;
		if (document.getElementById(targetId)) {
			return document.getElementById(targetId)
		};
};

ChessboardWalker.prototype.brushWall = function(color) {
	var target = '';
	switch (this.direction) 
    {
    	case 0 :
			target = this.detectiveWall(this.x ,(this.y - this.blockSize));
			break;
		case 2 :
    		target = this.detectiveWall(this.x,(this.y + this.blockSize));
			break;
		case 1 :
			target = this.detectiveWall((this.x + this.blockSize),this.y);
			break;
		case 3 :
			target = this.detectiveWall((this.x - this.blockSize),this.y);
			break;    
    }
    if (target){
    	target.style.backgroundColor = color;
    }else{
    	console.log("Error！No wall here!");
    }
};