$ = function (el) { return document.querySelector(el); };
$$ = function (el) { return document.querySelectorAll(el); };

/**
 * 日历对象构建函数
 */
function Calender() {
    this.target = $("#calenderUnit");
    this.date = new Date();

    this.displayYear = this.date.getFullYear();
    this.displayMonth = this.date.getMonth();
    this.chosenDate = this.date.getDate();

    this.init();
}

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
    var head = document.createElement('div');
    head.id = "calenderHead";
    head.innerHTML = this.displayYear + "." + (this.displayMonth + 1);
    var days = ["Su","Mo","Tu","We","Th","Fr","Sa"];
    var dayBlock = document.createElement('div');
    for (var i = 0; i < days.length; i++) {
        var div = document.createElement("div");
        div.innerHTML = days[i];
        div.className = "block days";
        dayBlock.appendChild(div);
    }
    var body = document.createElement('div');
    body.id = "calenderBody";
    var upArrow = document.createElement("div");
    upArrow.id ="upArrow";
    var downArrow = document.createElement("div");
    downArrow.id ="downArrow";
    head.appendChild(upArrow);
    head.appendChild(downArrow);
    this.target.appendChild(head);
    this.target.appendChild(dayBlock);
    this.target.appendChild(body);
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
            $("#calenderBody").appendChild(emptyDiv);
        }
    }
    for (var j = 0; j < daysNum; j++) {
        var dayBlock = document.createElement("div");
        dayBlock.innerHTML = j + 1;
        dayBlock.className = "block dayBlock";
        if (j + 1 == this.chosenDate && this.chosenDate == this.date.getDate()) {
             dayBlock.id = 'chosen';
        }
        $("#calenderBody").appendChild(dayBlock);
    }
};

/**
 * 改变显示的月份，重新构建日历
 * @param  {string} "add":月份增加，"minus":月份减少
 */
Calender.prototype.changeMonth = function(change) {
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
        this.chosenDate =  undefined;
    }
    $("#calenderUnit").innerHTML = "";
    this.init();
};

/**
 * 初始化日历，绑定事件
 */
Calender.prototype.init = function() {
    this.buildHead();
    this.buildcalendar();
    $("#upArrow").addEventListener("click",this.changeMonth.bind(this,"minus"));
    $("#downArrow").addEventListener("click",this.changeMonth.bind(this,"add"));
    $("#calenderUnit").onclick = function (event) {
        if (event.target.className == "block dayBlock") {
            $("#chosen").id = "";
            event.target.id = 'chosen';
        }
    };
};

new Calender();