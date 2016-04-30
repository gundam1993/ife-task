function judgeInput(obj) {
	switch (obj.input) 
	{
		case 'input':
			obj.drawInput();
			break;
		case 'checkbox':
			if (obj.op.length === 0) {
				alert('你还没有添加多选框的选项');
			}else{
				obj.drawCheckBox();
			}
			break;
		case 'radio':
			if (obj.op.length === 0) {
				alert('你还没有添加单选框的选项');
			}else{
				obj.drawRadio();
			}
			break;
		case 'select':
			if (obj.op.length === 0) {
				alert('你还没有添加下拉框的选项');
			}else{
				obj.drawSelect();
			}
			break;
		case 'textarea':
			obj.drawTextarea();
			break;
	}
}

(function () {
	var addBtn = $('#add');
	addBtn.onclick = function () {
		$('#result').innerHTML = '';
		var formObject = new FormObject();
		formObject.builder();
		judgeInput(formObject);
		for (var i = 0; i < unitList.length; i++) {
			$('#result').appendChild(unitList[i]);
		}
		$('#check').removeEventListener('click',checkAll);
		opList = [];
		show(opList,opDisplay);
		$('#check').addEventListener('click',checkAll)
	}
})();
	

