 $ = function (el) { return document.querySelector(el); };
 $$ = function (el) { return document.querySelectorAll(el); };
var boxList = [];//存放输入数字的数组

var numRE = /^\d+$/;//检验输入值合法性的正则表达式

function createBox(arr) {
	// 获得数组中的值，向队列中添加元素
	$('#displayArea').innerHTML = '';
	for (var i = 0; i < arr.length; i++) {
		var box = document.createElement('div');
		box.className = 'strip'; 
		box.style.height = 3 * arr[i] + 'px';
		box.style.lineHeight = arr[i] + 'px';
		if (arr[i] <= 40) {//根据高度选择不同颜色
			var color = '#1B813E';
		}else if(arr[i] <= 60) {
			var color = '#3A8FB7';
		}else if(arr[i] <= 80){
			var color = '#AB3B3A';
		}else{
			var color = '#FFC408'
		}
		box.style.backgroundColor = color;
		var args = [i,1];
		box.onclick = function () {
			getOut([].splice,args);
		}
		$('#displayArea').appendChild(box);
		box.style.left = box.offsetWidth * i +'px';
	}
}

function addIn(func) {
	/*把input的值添加进队列
	 *加入方向由传入的func决定
	 *传入[].push,由右侧加入
	 *传入[].unshift,由左侧加入*/
	var value = $('#input').value.trim();//获得去除空格后的输入框中的数值
	if (value.match(numRE) && value >= 10 && value <= 100) {//检验合法性
		if (boxList.length < 60) {
			func.apply(boxList, [parseInt(value)]);//把数值加入到数组中
		}else{
			alert('输入数值已超过上限！');
		}
	}else{
		alert('请输入10到100范围内的数字！');
	}
	createBox(boxList);
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
	createBox(boxList);
}
//随机生成60个数填充到数组中
function arrCharge() {
	if (true) {
		var x = Math.ceil(Math.random() * 100);
		if (x >= 10) {
			boxList.push(x);
		}
		if (boxList.length === 60) {
			createBox(boxList);
			return boxList;
		}else{
			arrCharge();
		}
	}
}
//清除数组
function clean() {
	boxList = [];
	createBox(boxList);
	snapshots = [];
}
//排序部分
var  snapshots = [];
var i = 0;
function bubbleSort() {
	for (var i = 0; i < boxList.length; i++) {
		for (var j = 0; j < boxList.length-i-1; j++) {
			if (boxList[j] > boxList[j + 1]) {
				var wait = boxList[j + 1];
				boxList[j + 1] = boxList[j];
				boxList[j] = wait;
				wait = null;
				snapshots.push(boxList.slice());
			}
		}
	}
}
var play = 0;
function playSort() {
	createBox(snapshots[play]);
	if (play < snapshots.length-1) {
		play += 1
		window.setTimeout(playSort,10);
	}else{
		createBox(boxList);
	}
}
function arrSort() {
	bubbleSort();
	playSort();
}
//页面功能初始化
window.onload = function () {
	$('#leftIn').onclick = function () {addIn([].unshift);}
	$('#rightIn').onclick = function () {addIn([].push);}
	$('#leftOut').onclick = function () {getOut([].shift);}
	$('#rightOut').onclick  = function () {getOut([].pop);}
	$('#charge').onclick = function () {arrCharge();}
	$('#sort').onclick = function () {arrSort();}
	$('#cleanAll').onclick = function () {clean();}
}

window.onresize = function () {
	createBox(boxList);
}