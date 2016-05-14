function PathNode(position,parent) {
    this.position = position;
    this.child = [];
    this.f = 0;
}

PathNode.prototype.getChild = function(chessboardWalker) {
    var offSets = [[0,1],[1,0],[0,-1],[-1,0]];
    for (var i = 0; i < offSets.length; i++) {
        var positionX = this.position[0] + offSets[i][0],
            positionY = this.position[1] +  offSets[i][1],
            positionID = positionX * chessboardWalker.blockSize + ':' + positionY * chessboardWalker.blockSize;
        if (positionX > 0 && positionX <= 20 && positionY > 0 && positionY <= 20 && chessboardWalker.wallID.indexOf(positionID) === -1) {
            this.child.push([positionX,positionY]);
        }   
    }
};

function Navigater(goal,start) {
    this.open = [];
    this.closed = [];
    this.start = start;
    this.goal = goal;
    this.orderList = [];
    this.chosenNode = [];
}

Navigater.prototype.heuristic = function(position) {
    var dx = Math.abs(position[0] - parseInt(this.goal[0])),
        dy = Math.abs(position[1] - parseInt(this.goal[1]));
    return (dx + dy);
};

Navigater.prototype.astar = function(startl,goall,chessboardWalker) {
    var closedl = {},
        closedposition = [];
        openl = [],
        openposition = [];
        cameFrom = {};
    openl.push(startl);
    openposition.push(startl.position);
    while (openl.length !== 0)
    {
        var current = undefined;
        for (var i = 0; i < openl.length; i++) {
            openl[i].f = this.heuristic(openl[i].position)
            if (current == undefined) {
                current = openl[i];
                current.getChild(chessboardWalker);
            }else if (openl[i].f < current.f) {
                current = openl[i];
                current.getChild(chessboardWalker);
            }
        }
        if (current.position[0] === goall.position[0] && current.position[1] === goall.position[1]) {
            return cameFrom;
        }
        openl.splice(openl.indexOf(current),1);
        openposition.splice(openposition.indexOf(current.position),1);
        closedl[current.position] = current.position;
        for (var i = 0; i < current.child.length; i++) {
            var childs = new PathNode(current.child[i],current.position);
            var position = childs.position;
            if (closedl[position]) {
                continue;
            }
            var tentative_gScore =  current.f + dist_between(current,childs);
            childs.f = this.heuristic(childs.position)
            if (openposition.indexOf(childs.position) < 0) {
                openl.push(childs);
                openposition.push(childs.position);
            }else if (tentative_gScore >= childs.f) {
                continue;
            }
            if (!cameFrom[childs.position]) {
                cameFrom[childs.position] = current.position;
            }
        }
    }
    console.log("failure");
}

function dist_between (current,childs) {
    var dx = Math.abs(childs.position[0] - current.position[0]),
        dy = Math.abs(childs.position[1] - current.position[1]);
    return (dx + dy);
};

Navigater.prototype.cameFrom = function(cameFrom,a,b) {
    console.log(cameFrom);
    if (this.open.length === 0) {
        this.open.push(b);
    }
    this.open.unshift(cameFrom[b]);
    if (cameFrom[b] != a) {
        this.cameFrom(cameFrom,a,cameFrom[b]);
    }
};

Navigater.prototype.translateOrder = function() {
    for (var i = 1; i < this.open.length; i++) {
        var x = this.open[i][0] - this.open[i - 1][0],
            y = this.open[i][1] - this.open[i - 1][1];
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