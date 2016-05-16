$ = function (el) { return document.querySelector(el); };
$$ = function (el) { return document.querySelectorAll(el); };

function TableConstructor(thead,tbody,style,upfunc,downfunc) {
    this.target = $('#table');
    this.defaultstyle = {
        width : '150px',
        height : '55px',
        color : '#FFF',
        backgroundColor : '#777',
        border :  "1px solid #000"
    };

    this.thead = thead;
    this.tbody = tbody;
    this.style = style || this.defaultstyle;

    this.init();
}

TableConstructor.prototype.addArrow = function(target,direction,className) {
    var arrow = document.createElement("div");
    arrow.style.width = 0;
    arrow.style.height = 0;
    arrow.style.cursor = 'pointer';
    arrow.style.position = "absolute";
    arrow.style.right = '10px';
    arrow.style.borderLeft = "7px solid transparent";
    arrow.style.borderRight = "7px solid transparent";
    arrow.className = className;
    if (direction == 'up') {
        arrow.style.borderBottom = "14px solid " + this.style.color;
        arrow.style.top = '12px';
        target.appendChild(arrow);
    }else if (direction == 'down') {
        arrow.style.borderTop = "14px solid " + this.style.color;
        arrow.style.bottom = '12px';
        target.appendChild(arrow);
    }
};

TableConstructor.prototype.buildTableHead = function() {
    this.target.style.borderCollapse = 'collapse';
    this.target.style.textAlign = "center";
    for (var i = 0; i < this.thead.length; i++) {
        var td = document.createElement("td");
        td.style.width = this.style.width;
        td.style.height = this.style.height;
        td.style.backgroundColor = this.style.backgroundColor;
        td.style.color = this.style.color;
        td.style.border = this.style.border;
        td.style.position = "relative";
        td.innerHTML = this.thead[i];
        if (i > 0) {
            this.addArrow(td,"up","upArrow");
            this.addArrow(td,"down","downArrow");
        }
        this.target.children[0].children[0].appendChild(td);
    }
};

TableConstructor.prototype.buildTableBody = function(tbody) {
    this.target.children[1].innerHTML = '';
    if (tbody) {
        for (var i = 0; i < tbody.length; i++) {
            var tr = document.createElement("tr");
            for (var j = 0; j < tbody[i].length; j++) {
                var td = document.createElement("td");
                td.style.width = this.style.width;
                td.style.height = this.style.height;
                td.style.border = this.style.border;
                td.innerHTML = tbody[i][j];
                tr.appendChild(td);
            }
            this.target.children[1].appendChild(tr);
        }
    }
};

TableConstructor.prototype.sort = function(targetClassName,func) {
    var arrayForSort = [];
    var result = [];
    for (var i = 0; i < targetClassName.length; i++) {
        if (targetClassName[i] === event.target) {
            var num = i;
        }
    }
    for (var i = 0; i < this.tbody.length; i++) {
        arrayForSort.push(this.tbody[i][num + 1]);
    }
    var sortedArray = this.tbody.slice();
    if (func == "rise") {
        sortedArray.sort(function (a,b) { return a[num + 1] - b[num + 1];});
    }else if (func =='fall') {
        sortedArray.sort(function (a,b) { return b[num + 1] - a[num + 1];});
    }
    for (var i = 0; i < sortedArray.length; i++) {
        var x = this.tbody.indexOf(sortedArray[i]);
        result.push(this.tbody[x]);
    }
    this.buildTableBody(result);
};

TableConstructor.prototype.init = function() {
    this.buildTableHead();
    this.buildTableBody(this.tbody);
    for (var i = 0; i < $$(".upArrow").length; i++) {
        $$(".upArrow")[i].addEventListener("click",this.sort.bind(this,$$(".upArrow"),"rise"));
    }
    for (var i = 0; i < $$(".downArrow").length; i++) {
        $$(".downArrow")[i].addEventListener("click",this.sort.bind(this,$$(".downArrow"),"fall"));
    }
};

new TableConstructor(["姓名","语文","数学","英语","总分"],[['小明',80,90,70,240],['小红',90,60,90,240],['小亮',60,100,70,230]])