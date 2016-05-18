$ = function (el) { return document.querySelector(el); };
$$ = function (el) { return document.querySelectorAll(el); };

/**
 * 日历对象构建函数
 */
function Calender(target) {
    this.target = target;
    this.date = new Date();

    this.displayYear = this.date.getFullYear();
    this.displayMonth = this.date.getMonth();
    this.chosenDate = this.date.getDate();

    this.calenderButton;
    this.dateInput;
    this.calenderUnit;
    this.calenderHead;
    this.calenderBody;
    this.upArrow;
    this.downArrow;

    this.init();
}

/**
 * 构筑输入框，按钮以及表格容器
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
 * 构建日历的头部部分
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
 * 绑定日历主体中的点击事件
 * @return {[type]} [description]
 */
Calender.prototype.bindEvent = function() {
    if (event.target == this.upArrow) {
        this.changeMonth("minus");
    }else if(event.target == this.downArrow) {
        this.changeMonth("add");
    }else if (event.target.className == "block dayBlock") {
        if ($(".chosen")) {
            $(".chosen").className = "block dayBlock";
        }
        event.target.className += " chosen";
        this.calenderUnit.className = "calenderUnit hidden";
        this.chosenDate = parseInt(event.target.innerHTML);
        this.dateInput.value = this.displayYear + "-" + (this.displayMonth + 1) + '-' + this.chosenDate;
        var chosen = this.returnDate();
        console.log(chosen);
    }
};

/**
 * 获取选择日期的接口
 * @return {obj} 日期对象
 */
Calender.prototype.returnDate = function() {
    return new Date(this.displayYear,this.displayMonth,this.chosenDate);
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
    this.calenderButton.addEventListener("click",this.display.bind(this));
    this.dateInput.addEventListener("click",this.display.bind(this));
};

new Calender($("#main-block"));