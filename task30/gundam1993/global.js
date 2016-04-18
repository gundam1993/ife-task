 $ = function (el) { return document.querySelector(el); };
 $$ = function (el) { return document.querySelectorAll(el); };
 var originHint = ['必填，长度为4~16字符','6到16位数字和字母','重复输入密码','example@abc.com','请输入11位手机号码'],
 	input = $$('input');

function showhint() {//input获得焦点时提示
	for (var i = 0; i < input.length; i++) {
		input[i].addEventListener('focus',function(){
			for (var i = 0; i < input.length; i++) {
				if (this === input[i]) {
					var x = i;
				}
			}
			this.nextElementSibling.innerHTML = originHint[x]; 
		})
	}
}

 function checkName() {//检查用户名
 	var input = $('#nameInput')
 	var name = input.value;
 	var hint = $('#nameHint')
 	var len = countLen(name);
 	if (name === '') {
 		hint.innerHTML = '名称不能为空！';
 		hint.style.color = 'red';
 		input.style.border = '2px solid red';
 	}else if (len >= 4 && len <= 16) {
 		hint.innerHTML = '格式正确!';
 		hint.style.color = 'green';
 		input.style.border = '2px solid green';
 	}else{
 		hint.innerHTML = '长度需为4~16字符!';
 		hint.style.color = 'red';
 		input.style.border = '2px solid red';
 	}
 }

 function countLen(name) {//判断用户名字符数
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

 function pwdCheck() {
 	var pwdRE = /^[0-9a-zA-Z]{6,16}$/i,
 		pwd = $('#pwdInput').value,
 		hint = $('#pwdHint');
 	if (pwdRE.test(pwd)) {
 		hint.innerHTML = '格式正确!';
 		hint.style.color = 'green';
 		$('#pwdInput').style.border = '2px solid green';
 	}else{
 		hint.innerHTML = '请输入6到16位数字和字母!';
 		hint.style.color = 'red';
 		$('#pwdInput').style.border = '2px solid red';
 	}

 }

 function rePwdCheck() {
 	var rePwd = $('#rePwdInput').value,
 		pwd = $('#pwdInput').value,
 		hint = $('#rePwdHint');
 	if (rePwd === pwd) {
 		hint.innerHTML = '格式正确!';
 		hint.style.color = 'green';
 		$('#rePwdInput').style.border = '2px solid green';
 	}else{
 		hint.innerHTML = '请再次输入密码';
 		hint.style.color = 'red';
 		$('#rePwdInput').style.border = '2px solid red';
 	}
 }

 function mailCheck() {
	var mail = $('#mailInput').value,
 		hint = $('#mailHint'),
 		mailRE = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
 	if (mailRE.test(mail)) {
 		hint.innerHTML = '格式正确!';
 		hint.style.color = 'green';
 		$('#mailInput').style.border = '2px solid green';
 	}else{
 		hint.innerHTML = '请输入正确的邮箱地址';
 		hint.style.color = 'red';
 		$('#mailInput').style.border = '2px solid red';
 	}
 }

  function phoneCheck() {
	var phone = $('#phoneInput').value,
 		hint = $('#phoneHint'),
 		phoneRE = /^[0-9]{11}$/;
 	if (phoneRE.test(phone)) {
 		hint.innerHTML = '格式正确!';
 		hint.style.color = 'green';
 		$('#phoneInput').style.border = '2px solid green';
 	}else{
 		hint.innerHTML = '请输入正确的手机号码';
 		hint.style.color = 'red';
 		$('#phoneInput').style.border = '2px solid red';
 	}
 }

 var nameInput = $('#nameInput'),
 	 pwdInput = $('#pwdInput'),
 	 rePwdInput = $('#rePwdInput'),
 	 mailInput = $('#mailInput'),
 	 phoneInput = $('#phoneInput');
 nameInput.onblur = function () {
 	checkName();
 }
 pwdInput.onblur = function () {
 	pwdCheck();
 }
 rePwdInput.onblur = function () {
 	rePwdCheck();
 }
 mailInput.onblur = function () {
 	mailCheck();
 }
 phoneInput.onblur = function () {
 	phoneCheck();
 }
 window.onload = function () {
 	showhint();
 }