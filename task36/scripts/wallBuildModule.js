function WallBuilder() {
    this.wall = [];
    this.wallnum = 0;
    this.wallID = [];
}

WallBuilder.prototype.buildWall = function(chessboardWalker) {
    var wall = new Object();
    wall.name = 'wall' + this.wallnum;
    wall.size = chessboardWalker.blockSize;
    switch (chessboardWalker.direction) 
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