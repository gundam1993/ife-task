
var opList = [],//存放输入数字的数组
 	inputRE = /[\s,\u000D]+/i;

function show(source,target) {
	// 获得数组中的值，向队列中添加元素
	target.innerHTML = '';
	for (var i = 0; i < source.length; i++) {
		var box = document.createElement('div');
		box.innerHTML = source[i];
		var args = [i,1];
		if (source === opList) {
			box.onmouseover = function () {
				this.innerHTML = '删除' + this.innerHTML;
			}
			box.onmouseout = function () {
				this.innerHTML = this.innerHTML.substring(2);
			}
			box.onclick = function () {
				[].splice.apply(opList,args)
				show(opList,opDisplay);
			}
		}
		target.appendChild(box);
	}
}

function inputTag() {
	var target = $('#opInput'),
		opDisplay = $('#opDisplay')
	target.onkeyup = function () {
		var keyCode = window.event.keyCode;
		var  value = target.value.trim();
		if (keyCode === 32 || keyCode === 13) {
			if (opList.indexOf(value) === -1 && value !== '') {
				if (opList.length < 10) {
					opList.push(value);
					show(opList,opDisplay);
					target.value = '';
				}else{
					opList.shift();
					opList.push(value);
					show(opList,opDisplay);
					target.value = '';
				}
			}else{
				target.value = '';
			}
		}else if(value[value.length - 1] === ',' || value[value.length - 1] === '，') {
			if (opList.indexOf(value) === -1 && value.substring(0,value.length - 1) !== '') {
				if (opList.length < 10) {
					opList.push(value.substring(0,value.length - 1));
					show(opList,opDisplay);
					target.value = '';
				}else{
					opList.shift();
					opList.push(value.substring(0,value.length - 1));
					show(opList,opDisplay);
					target.value = '';
				}
			}else{
				target.value = '';
			}
		}
	}
}

window.onload = function () {
	inputTag();
}