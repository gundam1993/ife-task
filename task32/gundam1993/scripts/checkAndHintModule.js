 function countLen(str) {//判断字符数
 	 	var len = 0;
 	for (var i = 0; i < str.length; i++) {
 		var charcode = str.charCodeAt(i)
 		if (charcode >= 0 && charcode <= 128) {
 			len++;
 		}else{
 			len +=2;
 		}
 	}
 	return len;
 }
 
function hint (obj,target,parent) {//添加默认提示
	if (obj.input == 'input' || obj.input == 'textarea') {
		target.addEventListener('focus',function () {
			var n = parent.children,
			hint = n[n.length - 1];
			hint.style.color = '#999';
			target.style.border = '1px solid #999';
			if (obj.must) {
				hint.innerHTML = '必填，长度为' + obj.minLen + '~' + obj.maxLen + '个字符';
			}else{
				hint.innerHTML = '非必填，长度为' + obj.minLen + '~' + obj.maxLen + '个字符';
			}
		});
	}else{
		var n = parent.children,
		hint = n[n.length - 1];
		hint.style.color = '#999';
		target.style.border = '1px solid #999';
		if (obj.must) {
			hint.innerHTML = '必填,请选择一项';
		}else{
			hint.innerHTML = '非必填项';
		}
	}
}

function check(obj,target,parent,span) {//输入检测
	target.addEventListener('blur',function () {
		var n = parent.children,
			hint = n[n.length - 1];
		switch(obj.input) 
		{
			case 'input':
				var len = countLen(target.value);
				if (obj.RErules.test(target.value)) {
					if (obj.datatype === 'pho' || obj.datatype === 'mail') {
						hint.innerHTML = '格式正确';
						hint.style.color = 'green';
						target.style.border = '2px solid green';
						span.className = '';
					}else{
						if (len < obj.minLen) {
							hint.innerHTML = '输入框内容长度不能小于' + obj.minLen + '个字符';
							hint.style.color = 'red';
							target.style.border = '2px solid red';
						}else if (len > obj.maxLen) {
							hint.innerHTML = '输入框内容长度不能大于' + obj.maxLen + '个字符';
							hint.style.color = 'red';
							target.style.border = '2px solid red';
						}else{
							hint.innerHTML = '格式正确';
							hint.style.color = 'green';
							target.style.border = '2px solid green';
							span.className = '';
						}
					}
				}else{
					if (len == 0 ) {
						hint.innerHTML = '输入框内容不能为空';
						hint.style.color = 'red';
						target.style.border = '2px solid red';
					}else{
						target.value = '';
					}
				}
				break;
			case 'checkbox':
				if (target.checked) {
					hint.innerHTML = '已选择';
					hint.style.color = 'green';
					span.className = '';
				}
				break;
			case 'radio':
				if (target.checked) {
					hint.innerHTML = '已选择';
					hint.style.color = 'green';
					span.className = '';
				}
				break;
			case 'select':
				if (target.value !== '') {
					hint.innerHTML = '已选择';
					hint.style.color = 'green';
					target.style.border = '2px solid green';
					span.className = '';
				}
				break;
			case 'textarea':
				if (countLen(target.value) < obj.minLen) {
					hint.innerHTML = '文本域内容长度不能小于' + obj.minLen + '个字符';
					hint.style.color = 'red';
					target.style.border = '2px solid red';
				}else if (countLen(target.value) > obj.maxLen) {
					hint.innerHTML = '文本域内容长度不能大于' + obj.maxLen + '个字符';
					hint.style.color = 'red';
					target.style.border = '2px solid red';
				}else{
					hint.innerHTML = '格式正确';
					hint.style.color = 'green';
					target.style.border = '2px solid green';
					span.className = '';
				}
				break;
		}
	});
}

function checkAll() {
	if ($$('.must').length == 0 ) {
		alert('提交成功');
		return  false;
	}else{
		var text = '';
		for (var i = 0; i < $$('.must').length; i++) {
			var parent = $$('.must')[i].parentElement,
				children = parent.children,
				hint = children[children.length - 1].innerHTML;
			text = text + hint + '\n';
		}
		alert(text);
		return  false;
	}
}