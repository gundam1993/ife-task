 $ = function (el) { return document.querySelector(el); };

 function checkName() {
 	var input = $('#input')
 	var name = input.value;
 	var hint = $('#hint')
 	var len = countLen(name);
 	if (name === '') {
 		hint.innerHTML = '名称不能为空！'
 		hint.style.color = 'red';
 		input.style.border = '2px solid red';
 	}else if (len >= 4 && len <= 16) {
 		hint.innerHTML = '格式正确!'
 		hint.style.color = 'green';
 		input.style.border = '2px solid green';
 	}else{
 		hint.innerHTML = '长度需为4~16字符!'
 		hint.style.color = 'red';
 		input.style.border = '2px solid red';
 	}
 }

 function countLen(name) {
 	 	var len = 0;
 	for (var i = 0; i < name.length; i++) {
 		var charcode = name.charCodeAt(i)
 		if (charcode >= 0 && charcode <= 128) {
 			len++;
 		}else{
 			len +=2;
 		}
 	}
 	return len;
 }

 var button = $('#check');
 button.onclick = function () {
 	checkName();
 }