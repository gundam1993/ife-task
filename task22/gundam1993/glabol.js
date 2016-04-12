 $ = function (el) { return document.querySelector(el); };
 $$ = function (el) { return document.querySelectorAll(el); };



function TreeWalker() {
	this.stack = [];
	this.isWalking = false;
}

TreeWalker.prototype.preOrder = function (node) {
	this.stack.push(node);
	if (node.firstElementChild) {
		this.preOrder(node.firstElementChild);
	} 
	if (node.lastElementChild) {
		this.preOrder(node.lastElementChild);
	}
}

TreeWalker.prototype.inOrder = function (node) {
	if (node.firstElementChild) {
		this.inOrder(node.firstElementChild);
	}
	this.stack.push(node);
	if (node.lastElementChild) {
		this.inOrder(node.lastElementChild);
	}
}

TreeWalker.prototype.postOrder = function (node) {
	if (node.firstElementChild) {
		this.postOrder(node.firstElementChild);
	}
	if (node.lastElementChild) {
		this.postOrder(node.lastElementChild);
	}
	this.stack.push(node);
}

TreeWalker.prototype.animate = function() {
	var stack = this.stack,
		i = 0,
		self = this,
		ani;
		if (!self.isWalking) {
			self.isWalking = true;
			stack[0].style.backgroundColor = '#3A8FB7';
		};
		ani = setInterval(function () {
			if (i == stack.length - 1) {
				stack[i].style.backgroundColor = '#fff';
				self.isWalking = false;
				clearInterval(ani);
				self.stack = [];
			}else{
				i +=1;
				stack[i].style.backgroundColor = '#3A8FB7';
				stack[i - 1].style.backgroundColor = '#FFF';
			}
	},300);
};

(function () {
	var treeWalker = new TreeWalker(),
	preOrder = $('#preOrder'),
	inOrder = $('#inOrder'),
	postOrder = $('#postOrder'),
	root = $('#root');
	preOrder.onclick = function () {
		treeWalker.preOrder(root);
		treeWalker.animate();
	}
	inOrder.onclick = function () {
		treeWalker.inOrder(root);
		treeWalker.animate();
	}
	postOrder.onclick = function () {
		treeWalker.postOrder(root);
		treeWalker.animate();
	}
})();