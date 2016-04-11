 $ = function (el) { return document.querySelector(el); };
 $$ = function (el) { return document.querySelectorAll(el); };
var boxList = [];//存放输入数字的数组

var numRE = /^\d+$/;//检验输入值合法性的正则表达式

function createBox() {
	// 获得数组中的值，向队列中添加元素
	$('#displayArea').innerHTML = '';
	for (var i = 0; i < boxList.length; i++) {
		var box = document.createElement('div');
		box.className = 'point';
		box.innerHTML = boxList[i];
		var args = [i,1];
		box.onclick = function () {
			getOut([].splice,args);
		}
		$('#displayArea').appendChild(box);
	}
}
function stringCut() {
	var value = $('#input').value.trim();//获得去除空格后的输入框中的数值
	var result = value.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/i);
	return result;
}

function addIn(func) {
	/*把textarea的值添加进队列
	 *加入方向由传入的func决定
	 *传入[].push,由右侧加入
	 *传入[].unshift,由左侧加入*/
	 var result = stringCut();
	for (var i = 0; i < result.length; i++) {
		func.apply(boxList, [result[i]]);
	}//把数值加入到数组末尾
	createBox();
}

function getOut(func,args) {
	/*去除队列中的元素
	 *去除方向由传入func决定
	 *[].pop右侧去除
	 *[].shift左侧去除*/
	var a = func.apply(boxList,args);
	if (!args) {
		alert(a);
	}
	createBox();
}
//搜索部分
function searchArr() {
	createBox();
	var key = $('#searchValue').value.toString();
	var searchList = [];
	for (var i = 0; i < boxList.length; i++) {
		if (boxList[i].indexOf(key) !== -1) {
			searchList.push(i);
		}
	}
	var point = $$('.point');
	for (var j = 0; j < searchList.length; j++) {
		point[searchList[j]].style.backgroundColor = '#CB4042';
	}
}
//按钮功能初始化
window.onload = function () {
	$('#leftIn').onclick = function () {addIn([].unshift);}
	$('#rightIn').onclick = function () {addIn([].push);}
	$('#leftOut').onclick = function () {getOut([].shift);}
	$('#rightOut').onclick  = function () {getOut([].pop);}
	$('#search').onclick = function () {searchArr();}
}