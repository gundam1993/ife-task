 $ = function (el) { return document.querySelector(el); };
 $$ = function (el) { return document.querySelectorAll(el); };



function TreeWalker() {
	this.stack = [];
	this.queue = [];
	this.inner = [];
	this.now;
	this.isWalking = false;
}

TreeWalker.prototype.deep = function (node) {
	this.stack.push(node);
	var nodeNow = node.childNodes[0].nodeValue.trim();
	this.inner.push(nodeNow);
	var child = node.childElementCount;
	for (var i = 0; i < child; i++) {
		this.deep(node.children[i]);
	}
}

TreeWalker.prototype.breadth = function (node) {
	this.stack.push(node);
	var nodeNow = node.childNodes[0].nodeValue.trim();
	this.inner.push(nodeNow);
	if (node.childElementCount) {
		for (var i = 0; i < node.childElementCount; i++) {
			this.queue.push(node.children[i]);
		}
	}
	this.now = this.queue.shift()
	if (this.now) {
		this.breadth(this.now);
	}
}

TreeWalker.prototype.Search = function (target) {
	if (target != '') {
		for (var i = 0; i < this.inner.length; i++) {
			if (this.inner[i] ===  target) {
				this.stack = this.stack.slice(0,i + 1);
				return;
			}
		}
	}else{
		this.stack = [];
	}
}

TreeWalker.prototype.animate = function(search) {
	var stack = this.stack,
		i = 0,
		self = this,
		ani;
		if (!self.isWalking) {
			self.isWalking = true;
			stack[0].style.backgroundColor = '#3A8FB7';
		};
		ani = setInterval(function () {
			if (i == stack.length - 1 && search !== 'search') {
				stack[i].style.backgroundColor = '#fff';
				self.isWalking = false;
				clearInterval(ani);
				self.stack = [];
			}else if (i == stack.length - 1 && search === 'search') {
				stack[i].style.backgroundColor = '#3A8FB7';
				stack[i - 1].style.backgroundColor = '#FFF';
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

function clean() {
	var div = $$('div');
	for (var i = 0; i < div.length; i++) {
		div[i].style.backgroundColor = '#FFF';
	};
}

(function () {
	var treeWalker = new TreeWalker(),
	deep = $('#deep'),
	deepSearch=$('#deepSearch'),
	breadth = $('#breadth'),
	breadthSearch = $('#breadthSearch')
	root = $('#root');
	deep.onclick = function () {
		treeWalker.stack = [];
		treeWalker.deep(root);
		treeWalker.animate();
		console.log(treeWalker.inner);
	}
	breadth.onclick = function () {
		treeWalker.stack = [];
		treeWalker.breadth(root);
		treeWalker.animate();
	}
	deepSearch.onclick = function () {
		clean();
		treeWalker.stack = [];
		treeWalker.inner = [];
		var target = $('#target').value.trim();
		treeWalker.deep(root);
		treeWalker.Search(target);
		treeWalker.animate('search');	
	}
	breadthSearch.onclick = function () {
		clean();
		treeWalker.stack = [];
		treeWalker.inner = [];
		var target = $('#target').value.trim();
		treeWalker.breadth(root);
		treeWalker.Search(target);
		treeWalker.animate('search');
	}
})();