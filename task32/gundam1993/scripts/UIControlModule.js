 $ = function (el) { return document.querySelector(el); };
 $$ = function (el) { return document.querySelectorAll(el); };

function typeChange() {
	/*1.切换类型时显示需要使用的面板
	 */
	var typeSelect = $('#typeSelect'),
		set = $('#set'),
		rule = $('#rule'),
		length = $('#length'),
		option = $('#option'),
		name = $("#name");
	for (var i = 1; i < typeSelect.children.length; i++) {
		if (typeSelect.children[i].checked) {
			switch (i)
			{
				case 1:
					rule.className = '';
					option.className = 'hide';
					for (var i = 0; i < rule.children.length; i++) {
						if (rule.children[10].checked || rule.children[7].checked) {
							length.className = 'hide';
						}else{
							length.className = '';
						}
					}
					name.value = '输入框';
					break;
				case 3:
					rule.className = 'hide';
					length.className = 'hide';
					option.className = '';
					name.value = '多选框';
					break;
				case 5:
					rule.className = 'hide';
					length.className = 'hide';
					option.className = '';
					name.value = '单选框';
					break;
				case 7:
					rule.className = 'hide';
					length.className = 'hide';
					option.className = '';
					name.value = '下拉框';
					break;
				case 9:
					rule.className = 'hide';
					length.className = '';
					option.className = 'hide';
					name.value = '文本域';
					break;
			}
		}
	}
}

var controlBlock = $('#controlBlock');
controlBlock.onchange = function () {
	typeChange();
}