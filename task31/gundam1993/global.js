 $ = function (el) { return document.querySelector(el); };
 $$ = function (el) { return document.querySelectorAll(el); };
 var op1 = ['北京','上海','苏州'],
 	 op2 = [['北京大学','清华大学','中国人民大学'],['复旦大学','上海交通大学','同济大学'],['苏州大学','西交利物浦大学','苏州科技大学']],
	 radioBlock = $('#radioBlock'),
	 citySelect = $('#citySelect'),
	 schoolSelect = $('#schoolSelect');

 function radioChange() {
 	var notStudent = $('#radioBlock').children[0],
 		notStudentBlock = $('#notStudentBlock'),
 		studentBlock = $('#studentBlock');
 	if (notStudent.checked) {
 		notStudentBlock.className = '';
 		studentBlock.className = 'hide';
 	}else{
 		notStudentBlock.className = 'hide';
 		studentBlock.className = '';
 	}
 }

 function selectChange() {
 	for (var i = 0; i < op1.length; i++) {
 		if (op1[i] == citySelect.value) {
 			schoolSelect.innerHTML = '';
 			var school = op2[i];
 			for (var j = 0; j < school.length; j++) {
 				var op = document.createElement('option');
 				op.innerHTML = school[j];
 				op.value = school[j];
 				schoolSelect.appendChild(op);
 			}
 		}
 	}
 }

 radioBlock.onchange = function () {
 	radioChange();
 }
 citySelect.onchange = function () {
 	selectChange();
 }