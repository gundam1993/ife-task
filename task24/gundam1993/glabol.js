 $ = function (el) { return document.querySelector(el); };
 $$ = function (el) { return document.querySelectorAll(el); };



function TreeWalker() {
	this.stack = [];
	this.queue = [];
	this.inner = [];
	this.now,
	this.chosenNode,
	this.isWalking = false;
	this.classNameList = ['child1','child2','child3','child4'];
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

TreeWalker.prototype.chosen = function () {
	var classlist = this.classNameList;
	window.onclick = function () {
		var target = this.event.target;
		if (target.nodeName.toLowerCase() === 'div') {
			this.chosenNode = target;
			parent = this.chosenNode.parentNode;
			if (target.style.backgroundColor == ''|| target.style.backgroundColor == 'rgb(255, 255, 255)') {
				target.style.backgroundColor = '#FFC408';
			}else{
				target.style.backgroundColor = '#FFF';
			}
			var deleteNode = $('#deleteNode');
			var addNode = $('#addNode');
			deleteNode.onclick = function () {//删除节点
				if (target === $('#root')) {
					target.remove();
				}else{
					parent.removeChild(target);
				}
			}
			addNode.onclick =  function () {//增加节点
				var newNode = document.createElement('div'),
					nodeInner = $('#nodeInner').value,
					nodeClass = target.className; 
					if (nodeClass !==  'child4') {
						newNode.className = classlist[classlist.indexOf(nodeClass) + 1];
					}
				newNode.innerHTML = nodeInner;
				target.appendChild(newNode);
			}
		}
	}
}

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
	breadthSearch = $('#breadthSearch'),
	deleteNode = $('#deleteNode'),
	root = $('#root');
	deep.onclick = function () {
		treeWalker.stack = [];
		treeWalker.deep(root);
		treeWalker.animate();
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
	treeWalker.chosen();
})();


