function createBox() {
	// 获得输入框中的值，制作
	var input = document.getElementById('input');
	var box = document.createElement('div');
	var numRE = /^\d+$/;
	if (input.value.match(numRE) && input.value !== '') {//检验输入值合法
		box.innerHTML = input.value;
		return box;
	}else{
		alert('请输入数字！');
	};
}

function leftIn() {
	// 左侧入
	var displayArea = document.getElementById('displayArea');
	var box = createBox();
	box.addEventListener('click',deleBox,false);//添加点击后删除的事件
	if (displayArea.firstChild) {//从左侧向队列中添加元素
		displayArea.insertBefore(box,displayArea.firstChild);
	}else{
		displayArea.appendChild(box);
	};
}

function rightIn() {
	// 右侧入
	var displayArea = document.getElementById('displayArea');
	var box = createBox();
	box.addEventListener('click',deleBox,false);// 添加点击后删除的事件
	displayArea.appendChild(box);// 从队列最末添加元素
}

function deleBox() {
	// 删除队列中的某个元素
	var displayArea = document.getElementById('displayArea');
	// 获取是那个元素被点击
	if (window.event) {
		var deleBox = window.event.target;
	}else{
		var deleBox = window.srcElement.target;
	}
	displayArea.removeChild(deleBox);
}

function leftOut() {
	// 左侧出
	var displayArea = document.getElementById('displayArea');
	var box = displayArea.firstChild;
	displayArea.removeChild(box);
	alert(box.innerHTML);
}

function rightOut() {
	// 右侧出
	var displayArea = document.getElementById('displayArea');
	var box = displayArea.lastChild;
	displayArea.removeChild(box);
	alert(box.innerHTML);
}

function initBtn() {
	// 初始化所有按钮的功能
	var leftInBtn = document.getElementById('leftIn');
	var	leftOutBtn = document.getElementById('leftOut');
	var	rightInBtn = document.getElementById('rightIn');
	var	rightOutBtn = document.getElementById('rightOut');
	leftInBtn.addEventListener('click',leftIn);
	leftOutBtn.addEventListener('click',leftOut);
	rightInBtn.addEventListener('click',rightIn);
	rightOutBtn.addEventListener('click',rightOut);
}

window.onload = function () {
	initBtn();
}