function PathNode(position,parent) {
    this.position = position;
    this.parent = parent || [0,0]
    this.child = [];
    this.f = 0;
}

PathNode.prototype.getChild = function(chessboardWalker) {
    var offSets = [[0,1],[1,0],[0,-1],[-1,0]];
    for (var i = 0; i < offSets.length; i++) {
        var positionX = this.position[0] + offSets[i][0],
            positionY = this.position[1] +  offSets[i][1],
            positionID = positionX * chessboardWalker.blockSize + ':' + positionY * chessboardWalker.blockSize;
        if (positionX > 0 && positionX <= 20 && positionY > 0 && positionY <= 20 && chessboardWalker.wallID.indexOf(positionID) === -1 && [positionX,positionY] !== this.parent) {
            this.child.push([positionX,positionY]);
        }   
    }
};

function Navigater(goal) {
    this.open = [];
    this.closed = [];
    this.goal = goal;
    this.orderList = [];
}

Navigater.prototype.heuristic = function(position) {
    var dx = Math.abs(position[0] - parseInt(this.goal[0])),
        dy = Math.abs(position[1] - parseInt(this.goal[1]));
    return 10 * (dx + dy);
};

Navigater.prototype.astar = function(node,chessboardWalker) {
    node.getChild(chessboardWalker);
    var chosenNode = [],
        chessboardWalker1 = chessboardWalker;
    this.open.pop();
    this.open.push(node.position); 
    for (var i = 0; i < node.child.length; i++) {
        var childs = new PathNode(node.child[i],node.position);
        childs.f = this.heuristic(childs.position) + 10;
        if (chosenNode.length == 0) {
            chosenNode.push(childs);
        }else{
            if (chosenNode[0].f > childs.f) {
                this.closed.push(chosenNode[0]);
                chosenNode = [childs];
            }else{
                this.closed.push(childs.position);
            }
        }
    }
    this.open.push(chosenNode[0].position);
    if (chosenNode[0].position[0] !== this.goal[0] || chosenNode[0].position[1] !== this.goal[1]) {
        this.astar(chosenNode[0],chessboardWalker1);
    }
    
};

Navigater.prototype.translateOrder = function() {
    for (var i = 1; i < this.open.length; i++) {
        var x = this.open[i][0] - this.open[i - 1][0],
            y = this.open[i][1] - this.open[i - 1][1];
        console.log(x);
        if (x == 1 && y == 0) {
            this.orderList.push('mov rig');
        }else if (x == -1 && y == 0) {
            this.orderList.push('mov lef');
        }else if (x == 0 && y == 1) {
            this.orderList.push('mov bot');
        }else if (x == 0 && y == -1) {
            this.orderList.push('mov top');
        }
    }
};