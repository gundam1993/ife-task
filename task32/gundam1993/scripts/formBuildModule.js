var btn = document.createElement('button');
btn.innerHTML = '提交';
btn.id = 'check';
btn.type ='button';
var unitList = [btn],//记录表单中的所有元素
	counter = 1;//ID计数器	
function produceHintBox(obj,div) {//用于给每个加入的项添加hint框
	var p = document.createElement('p');
	p.className = 'hint';
	p.id = 'hint ' + obj.id;
	div.appendChild(p);
}

function FormObject() {
	this.idno = 0;
	this.label = '';//表单名称
	this.input = '';//表单类型
	this.datatype = '';
	this.must = false;
	this.RErules = null;//正则表达式规则
	this.maxLen = null;//最大长度
	this.minLen = null;//最小长度
	this.op = [];//单选/多选框的选项
};

FormObject.prototype.builder = function() {
	// 构建表格对象
	var typeSelect = $("#typeSelect"),
		rule = $('#rule');
	for (var i = 1; i < typeSelect.children.length; i++) {
		if (typeSelect.children[i].checked) {
			this.input = typeSelect.children[i].value;
		}
	};
	this.label = $("#name").value;
	if ($('#set').children[3].checked) {
		this.must = true;
	this.idno = counter;
	counter +=1;
	}
	
	for (var j = 1; j < rule.children.length; j++) {
		if (rule.children[j].checked) {
			var value = rule.children[j].value;
			switch(value)
			{
				case 'str':
					this.RErules = /^[0-9a-zA-Z\u4e00-\u9fa5]+$/i;
					this.datatype = 'str';
					break;
				case 'num':
					this.RErules = /^[0-9]+$/;
					this.datatype = 'num';
					break;
				case 'mail':
					this.RErules = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
					this.datatype = 'mail';
					break;
				case 'pho':
					this.RErules = /^[0-9]{11}$/;
					this.datatype = 'pho';
					break;
				case 'pwd':
					this.RErules = /^[0-9a-zA-Z]+$/i;
					this.datatype = 'pwd';
					break;
			}
		}
	}
	this.maxLen = $("#maxLen").value;
	this.minLen = $('#minLen').value;
	this.op = opList;
	console.log(this);
};

FormObject.prototype.drawInput = function() {//绘制输入框
	var input = document.createElement('input'),
		span = document.createElement('span'),
		div = document.createElement('div');
		if (this.must) {
			span.className = 'must';
		}
	if (this.datatype == 'pwd') {
		input.type = "password";
	}else{
		input.type = "text";
	}
	input.id=this.datatype + 'input ' + this.idno;
	span.innerHTML = this.label + ':';
	hint(this,input,div);
	div.appendChild(span);
	div.appendChild(input);
	produceHintBox(this,div);
	check(this,input,div,span);
	unitList.splice(unitList.length - 1,0,div);
};

FormObject.prototype.drawCheckBox = function() {//绘制多选框
	var span = document.createElement('span'),
		div = document.createElement('div');
	span.innerHTML = this.label + ':';
	if (this.must) {
			span.className = 'must';
		}
	div.appendChild(span);
	for (var i = 0; i < opList.length; i++) {
		var checkBox = document.createElement('input'),
			label = document.createElement('label'),
			id = this.idno + ' ' + i; 
		checkBox.type = 'checkbox';
		checkBox.name = opList[i];
		checkBox.id = id;
		label.innerHTML = opList[i];
		label.htmlFor = id;
		div.appendChild(checkBox);
		div.appendChild(label);
		check(this,checkBox,div,span);
	}
	produceHintBox(this,div);
	unitList.splice(unitList.length - 1,0,div);
	hint(this,checkBox,div);
};

FormObject.prototype.drawRadio = function() {//绘制单选框
	var span = document.createElement('span'),
		div = document.createElement('div');
	span.innerHTML = this.label + ':';
	if (this.must) {
			span.className = 'must';
		}
	div.appendChild(span);
	for (var i = 0; i < opList.length; i++) {
		var radio = document.createElement('input'),
			label = document.createElement('label'),
			id = this.idno + ' ' + i;
		radio.type = 'radio';
		radio.value = opList[i];
		radio.name = this.label;
		radio.id = id;
		label.innerHTML = opList[i];
		label.htmlFor = id;
		div.appendChild(radio);
		div.appendChild(label);
		check(this,radio,div,span);
	}
	produceHintBox(this,div);
	unitList.splice(unitList.length - 1,0,div);
	hint(this,radio,div);
};

FormObject.prototype.drawSelect = function() {
	var selector = document.createElement("select"),
		span = document.createElement('span'),
		div = document.createElement('div');
	span.innerHTML = this.label + ':';
	if (this.must) {
			span.className = 'must';
		}
	div.appendChild(span);
	for (var i = 0; i < opList.length; i++) {
		var option = document.createElement('option');
		option.innerHTML = opList[i];
		option.value = opList[i]
		selector.appendChild(option);
	}
	div.appendChild(selector);
	selector.id = 'select' + this.idno;
	produceHintBox(this,div);
	unitList.splice(unitList.length - 1,0,div);
	hint(this,selector,div);
	check(this,selector,div,span);
};

FormObject.prototype.drawTextarea = function() {
	var textarea = document.createElement('textarea'),
		span = document.createElement('span'),
		div = document.createElement('div');
	span.innerHTML = this.label + ':';
	if (this.must) {
			span.className = 'must';
		}
	textarea.id = 'textarea' + this.idno;
	hint(this,textarea,div);
	check(this,textarea,div,span);
	div.appendChild(span);
	div.appendChild(textarea);
	produceHintBox(this,div);
	unitList.splice(unitList.length - 1,0,div);
};