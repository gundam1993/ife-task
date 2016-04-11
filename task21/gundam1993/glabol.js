 $ = function (el) { return document.querySelector(el); };
 $$ = function (el) { return document.querySelectorAll(el); };
var inputList = [],//存放输入数字的数组
	textareaList = [];
 	tagInput = $('#tagInput'),
 	inputRE = /[\s,\u000D]+/i;

function show(source,target) {
	// 获得数组中的值，向队列中添加元素
	target.innerHTML = '';
	for (var i = 0; i < source.length; i++) {
		var box = document.createElement('div');
		box.innerHTML = source[i];
		var args = [i,1];
		if (source === inputList) {
			box.onmouseover = function () {
				this.innerHTML = '删除' + this.innerHTML;
			}
			box.onmouseout = function () {
				this.innerHTML = this.innerHTML.substring(2);
			}
			box.onclick = function () {
				[].splice.apply(inputList,args)
				show(inputList,$('#displayArea1'));
			}
		}
		target.appendChild(box);
	}
}

function addHobby() {
	//把textarea的值添加进队列
	var value = $('#tagTextarea').value.trim();//获得去除空格后的输入框中的数值
	var arr = value.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/i);
	for (var i = 0; i < arr.length; i++) {//去重
		if (textareaList.indexOf(arr[i]) === -1) {
			if (textareaList.length < 10) {
				textareaList.push(arr[i])
			}else{
				textareaList.shift();
				textareaList.push(arr[i]);
			}
		}
	}//把数值加入到数组末尾
	show(textareaList,$('#displayArea2'));
}

function inputTag() {
	var target = $('#tagInput');
	target.onkeyup = function () {
		var keyCode = window.event.keyCode;
		var  value = target.value.trim();
		if (keyCode === 32 || keyCode === 13) {
			if (inputList.indexOf(value) === -1 && value !== '') {
				if (inputList.length < 10) {
					inputList.push(value);
					show(inputList,$('#displayArea1'));
					target.value = '';
				}else{
					inputList.shift();
					inputList.push(value);
					show(inputList,$('#displayArea1'));
					target.value = '';
				}
			}else{
				target.value = '';
			}
		}else if(value[value.length - 1] === ',' || value[value.length - 1] === '，') {
			if (inputList.indexOf(value) === -1 && value.substring(0,value.length - 1) !== '') {
				if (inputList.length < 10) {
					inputList.push(value.substring(0,value.length - 1));
					show(inputList,$('#displayArea1'));
					target.value = '';
				}else{
					inputList.shift();
					inputList.push(value.substring(0,value.length - 1));
					show(inputList,$('#displayArea1'));
					target.value = '';
				}
			}else{
				target.value = '';
			}
		}
	}
}
//按钮功能初始化
window.onload = function () {
	$('#decide').onclick = function () {addHobby();}
	inputTag();
}