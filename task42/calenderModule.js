$ = function (el) { return document.querySelector(el); };
$$ = function (el) { return document.querySelectorAll(el); };

/**
 * 日历对象构建函数
 * @param {node} target     构建日历的元素
 * @param {string} chosentype 确定选择方式 "point" 选择单日 "range" 选择范围 默认单日
 * @param {int} maxRange   选择范围时的最大范围，默认28天
 */
function Calender(target,chosentype,maxRange) {
    this.target = target;
    this.date = new Date();

    this.displayYear = this.date.getFullYear();
    this.displayMonth = this.date.getMonth();
    this.chosenDate = this.date.getDate();

    this.calenderButton = undefined;
    this.dateInput  = undefined;
    this.calenderUnit  = undefined;
    this.calenderHead = undefined;
    this.calenderBody = undefined;
    this.upArrow = undefined;
    this.downArrow = undefined;
    this.confirmBtn = undefined;
    this.cancelBtn = undefined;

    this.chosentype = chosentype || "point";
    this.maxRange = maxRange || 28;
    this.firstRangePoint = undefined;
    this.secondRangePoint = undefined;

    this.Range = undefined;
    this.point = undefined;

    this.init();
}

/**
 * 构建日历的输入框部分以及日历容器
 */
Calender.prototype.buildInputBlock = function() {
    this.calenderButton =  document.createElement("div"),
    this.dateInput = document.createElement("input"),
    this.calenderUnit = document.createElement("div");
    this.calenderButton.className = "calenderButton";
    this.dateInput.className = "dateInput";
    this.dateInput.type = "text";
    this.dateInput.name = "date";
    this.calenderUnit.className = "calenderUnit hidden";
    this.target.appendChild(this.calenderButton);
    this.target.appendChild(this.dateInput);
    this.target.appendChild(this.calenderUnit);
};


/**
 * 获取某个月的天数
 * @param  {int} year  年份
 * @param  {int} month 月份
 * @return {int}       该年该月的天数
 */
Calender.prototype.getDays = function(year,month) {
    return new Date(year,month + 1,0).getDate();
};

/**
 * 构建日历的头部部分,如果是选择日期范围，还要添加确认和取消按钮
 */
Calender.prototype.buildHead = function() {
    this.calenderHead = document.createElement('div');
    this.calenderHead.className = "calenderHead";
    this.calenderHead.innerHTML = this.displayYear + "-" + (this.displayMonth + 1);
    var days = ["Su","Mo","Tu","We","Th","Fr","Sa"];
    var dayBlock = document.createElement('div');
    for (var i = 0; i < days.length; i++) {
        var div = document.createElement("div");
        div.innerHTML = days[i];
        div.className = "block days";
        dayBlock.appendChild(div);
    }
    this.calenderBody = document.createElement('div');
    this.calenderBody.className = "calenderBody";
    this.upArrow = document.createElement("div");
    this.upArrow.className ="upArrow";
    this.downArrow = document.createElement("div");
    this.downArrow.className ="downArrow";
    this.calenderHead.appendChild(this.upArrow);
    this.calenderHead.appendChild(this.downArrow);
    this.calenderUnit.appendChild(this.calenderHead);
    this.calenderUnit.appendChild(dayBlock);
    this.calenderUnit.appendChild(this.calenderBody);
    if (this.chosentype == "range") {
        this.confirmBtn = document.createElement("div");
        this.cancelBtn = document.createElement("div");
        this.confirmBtn.innerHTML = "Confirm";
        this.cancelBtn.innerHTML = "Cancel";
        this.confirmBtn.className = "btn";
        this.confirmBtn.id = "confirmBtn";
        this.cancelBtn.className = "btn";
        this.cancelBtn.id = "cancelBtn";
        this.calenderUnit.appendChild(this.confirmBtn);
        this.calenderUnit.appendChild(this.cancelBtn);
    }
};

/**
 * 构建日历的日期部分，包括日期和需要空出的部分
 */
Calender.prototype.buildcalendar = function() {
    var first = new Date(this.displayYear,this.displayMonth,1);
    var day = first.getDay();
    var daysNum =  this.getDays(this.displayYear,this.displayMonth);
    if (day > 0) {
        for (var i = 0; i < day; i++) {
            var emptyDiv = document.createElement("div");
            emptyDiv.className = "block";
            this.calenderBody.appendChild(emptyDiv);
        }
    }
    for (var j = 0; j < daysNum; j++) {
        var dayBlock = document.createElement("div");
        dayBlock.innerHTML = j + 1;
        dayBlock.className = "block dayBlock";
        dayBlock.id = j + 1;
        if (j + 1 == this.chosenDate && this.chosenDate == this.date.getDate()) {
            dayBlock.className += ' chosen';
            dayBlock.id = "today";
        }
        this.calenderBody.appendChild(dayBlock);
    }
};

/**
 * 改变显示的月份，重新构建日历
 * @param  {string} "add":月份增加，"minus":月份减少
 */
Calender.prototype.changeMonth = function(change,event) {
    if (change == "add") {
            this.displayMonth += 1;
        if (this.displayMonth > 11) {
            this.displayMonth = 0;
            this.displayYear += 1;
        }
    }else if (change  == "minus") {
        this.displayMonth -= 1;
        if (this.displayMonth < 0) {
            this.displayMonth = 11;
            this.displayYear -= 1;
        }
    }
    if (this.displayYear == this.date.getFullYear() && this.displayMonth == this.date.getMonth()) {
        this.chosenDate = this.date.getDate();
    }else{
        this.chosenDate =  '';
    }
    this.calenderUnit.innerHTML = "";
    this.buildHead();
    this.buildcalendar();
    this.upArrow.addEventListener("click",this.changeMonth.bind(this,"minus"));
    this.downArrow.addEventListener("click",this.changeMonth.bind(this,"add"));
};

/**
 * 控制日历模块的显示和隐藏
 */
Calender.prototype.display = function() {
    if (this.calenderUnit.className == "calenderUnit hidden") {
        this.calenderUnit.className = "calenderUnit";
    }else{
        this.calenderUnit.className = "calenderUnit hidden";
    }
};

/**
 * 选择日期
 * @param event 传入事件
 */
Calender.prototype.choosePoint = function(event) {
    if ($(".chosen")) {
            $(".chosen").className = "block dayBlock";
        }
        event.target.className += " chosen";
        this.calenderUnit.className = "calenderUnit hidden";
        this.chosenDate = parseInt(event.target.innerHTML);
        this.dateInput.value = this.displayYear + "-" + (this.displayMonth + 1) + '-' + this.chosenDate;
        var chosen = this.returnDate();
        console.log(chosen);
};

/**
 * 选择日期范围
 * @param  event 传入事件
 */
Calender.prototype.chooseRange = function(event) {
    var firstPoint = 0,
        secondPoint = 0,
        points = this.target.getElementsByClassName('chosen');
    if (points && points.length == 1) {
        this.firstRangePoint = this.target.getElementsByClassName('chosen')[0];
        this.secondRangePoint = event.target;
    }else if (points && points.length == 2) {
        this.firstRangePoint.className = "block dayBlock";
        this.firstRangePoint = this.secondRangePoint;
        this.secondRangePoint = event.target;
    }else{
        this.firstRangePoint = event.target;
        event.target.className += " chosen";
    }
    firstPoint =  parseInt(this.firstRangePoint.innerHTML);
    secondPoint = parseInt(this.secondRangePoint.innerHTML);
    if (Math.abs(firstPoint - secondPoint) > this.maxRange || Math.abs(firstPoint - secondPoint) < 2) {
        alert("时间跨度不在范围内！");
        return;
    }
    event.target.className += " chosen";
    if (points.length == 2) {
        var colored = this.target.getElementsByClassName('block dayBlock');
        for (var i = 0; i < colored.length; i++) {
            colored[i].style.backgroundColor = "";
            if (i > firstPoint && i < secondPoint) {
                colored[i - 1].style.backgroundColor = "rgba(153,153,153,0.7)";
                this.range = this.returnRange(firstPoint,secondPoint);
            }else if (i > secondPoint && i < firstPoint) {
                colored[i - 1].style.backgroundColor = "rgba(153,153,153,0.7)";
                this.range = this.returnRange(secondPoint,firstPoint);
            }
        }
    }
    console.log(this.range.startDate.getFullYear());
};

/**
 * 获取选择日期的接口
 * @return {obj} 日期对象
 */
Calender.prototype.returnDate = function() {
    this.point = new Date(this.displayYear,this.displayMonth,this.chosenDate)
    return this.point;
};

/**
 * 获取选择日期范围的接口
 * @param  {int} firstPoint  起始日
 * @param  {int} secondPoint 结束日
 * @return {obj} 日期范围对象
 */
Calender.prototype.returnRange = function(firstPoint,secondPoint) {
    var range = {};
    range.startDate = new Date(this.displayYear,this.displayMonth,firstPoint);
    range.endDate = new Date(this.displayYear,this.displayMonth,secondPoint);
    return range;
};

/**
 * 绑定日历主体中的点击事件
 */
Calender.prototype.bindEvent = function() {
    switch (event.target)
    {
        case this.dateInput :
        case this.calenderButton :
            this.display();
            break;
        case this.upArrow :
            this.changeMonth("minus");
            break;
        case this.downArrow :
            this.changeMonth("add");
            break;
        case this.confirmBtn :
            this.dateInput.value = this.range.startDate.getFullYear() + "-" + (this.range.startDate.getMonth() + 1) + '-' + this.range.startDate.getDate() + " —— " + this.range.endDate.getFullYear() + "-" + (this.range.endDate.getMonth() + 1) + '-' + this.range.endDate.getDate()
            this.display()
            break;
        case this.cancelBtn :
            var points = this.target.getElementsByClassName('chosen');
            var colored = this.target.getElementsByClassName('block dayBlock');
            for (var i = 0; i < points.length; i++) {
                points[i].className = 'block dayBlock';
            }
            for (var j = 0; j < colored.length; j++) {
                colored[j].style.backgroundColor = "";
            }
            break;

    }
    if (event.target.className == "block dayBlock" && this.chosentype == "point") {
        this.choosePoint(event);
    }else if (event.target.className == "block dayBlock" && this.chosentype == "range") {
        this.chooseRange(event);
    }
};

/**
 * 初始化日历，绑定事件
 */
Calender.prototype.init = function() {
    this.buildInputBlock();
    this.buildHead();
    this.buildcalendar();
    this.dateInput.value = this.displayYear + "-" + (this.displayMonth + 1) + '-' + this.chosenDate;

    this.target.addEventListener("click",this.bindEvent.bind(this));
};

new Calender($("#main-block"),"point");

new Calender($("#second-block"),"range",10);