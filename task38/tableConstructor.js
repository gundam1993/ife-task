$ = function (el) { return document.querySelector(el); };
$$ = function (el) { return document.querySelectorAll(el); };

/**
 * 构建表格对象
 * @param {Array} thead [表头数据]
 * @param {Array} tbody [表格数据，每行的数据组成一个数组，再构成一个大数组]
 */
function TableConstructor(thead,tbody) {
    this.target = $('#table');

    this.thead = thead;
    this.tbody = tbody;

    this.init();
}

/**
 * 添加箭头
 * @param {node} target    [箭头的父节点]
 * @param {string} className [剪头的类名，用于设置样式]
 */
TableConstructor.prototype.addArrow = function(target,className) {
    var arrow = document.createElement("div");
    arrow.className = className + " arrow";
    target.appendChild(arrow);
};

/**
 * 添加表头
 * @param thead  表头数据
 */
TableConstructor.prototype.buildTableHead = function(thead) {
    if (thead) {
            for (var i = 0; i < this.thead.length; i++) {
            var td = document.createElement("td");
            td.className = "thead-td";
            td.innerHTML = this.thead[i];
            if (i > 0) {
                this.addArrow(td,"upArrow");
                this.addArrow(td,"downArrow");
            }
            this.target.children[0].children[0].appendChild(td);
        }
    }
};

/**
 * 添加表格本体
 * @param tbody 表格数据
 */
TableConstructor.prototype.buildTableBody = function(tbody) {
    this.target.children[1].innerHTML = '';
    if (tbody) {
        for (var i = 0; i < tbody.length; i++) {
            var tr = document.createElement("tr");
            for (var j = 0; j < tbody[i].length; j++) {
                var td = document.createElement("td");
                td.className = "tbody-td";
                td.innerHTML = tbody[i][j];
                tr.appendChild(td);
            }
            this.target.children[1].appendChild(tr);
        }
    }
};

/**
 * 排序函数
 * @param  Node targetClassName 触发排序的按钮
 * @param  {string} func  排序方法，传入"rise"为升序，传入"fall"为降序
 */
TableConstructor.prototype.sort = function(targetClassName,func) {
    var arrayForSort = [];
    var result = [];
    var num = 0;
    for (var i = 0; i < targetClassName.length; i++) {
        if (targetClassName[i] === event.target) {
            num = i;
        }
    }
    for (var j = 0; j < this.tbody.length; j++) {
        arrayForSort.push(this.tbody[j][num + 1]);
    }
    var sortedArray = this.tbody.slice();
    if (func == "rise") {
        sortedArray.sort(function (a,b) { return a[num + 1] - b[num + 1];});
    }else if (func =='fall') {
        sortedArray.sort(function (a,b) { return b[num + 1] - a[num + 1];});
    }
    for (var k = 0; k < sortedArray.length; k++) {
        var x = this.tbody.indexOf(sortedArray[k]);
        result.push(this.tbody[x]);
    }
    this.buildTableBody(result);
};

/**
 * 初始化表格对象，绑定事件
 */
TableConstructor.prototype.init = function() {
    this.buildTableHead(this.thead);
    this.buildTableBody(this.tbody);
    for (var i = 0; i < $$(".upArrow").length; i++) {
        $$(".upArrow")[i].addEventListener("click",this.sort.bind(this,$$(".upArrow"),"rise"));
    }
    for (var j = 0; j < $$(".downArrow").length; j++) {
        $$(".downArrow")[j].addEventListener("click",this.sort.bind(this,$$(".downArrow"),"fall"));
    }
};

new TableConstructor(["姓名","语文","数学","英语","总分"],[['小明',80,90,70,240],['小红',90,60,90,240],['小亮',60,100,70,230]]);