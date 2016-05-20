

var Waterfall = function (selector,colunms,margin,pics) {
    this.element = document.querySelector(selector);
    this.colunms = colunms || 4;
    this.margin = margin || 16;
    this.pics = pics;

    this.init();
};

Waterfall.prototype.buildColunms = function() {
    this.element.className = "waterfall";
    for (var i = 0; i < this.colunms; i++) {
        var colunm  = document.createElement("div");
        colunm.className = "waterfall-colunms";
        colunm.id = "colunms-" + (i + 1);
        colunm.style.margin = this.margin + "px";
        colunm.style.width = "100%";
        this.element.appendChild(colunm);
    }
};

Waterfall.prototype.buildPicBox = function(pic,target,i) {
    var picbox = document.createElement("div"),
        img = document.createElement("img"),
        content = document.createElement("div");
    content.innerHTML = "<h3>Title" + (i + 1) + "</h3>\n<p>This is a picture</p>";
    content.className = "content";
    picbox.className = "pic-box";
    img.src = pic;
    picbox.appendChild(img);
    picbox.appendChild(content);
    target.appendChild(picbox);
};

Waterfall.prototype.colunmSort = function() {
    var colunms = document.querySelectorAll(".waterfall-colunms"),
        colunmsArr = [];
        for (var i = 0; i < colunms.length; i++) {
            colunmsArr.push(colunms[i]);
        }
        var sortedColunms = colunmsArr.sort(function (a,b) {
            //console.log(a.offsetHeight);
            //console.log(b.offsetHeight);
            return a.offsetHeight - b.offsetHeight;
        });
        return sortedColunms;
};

Waterfall.prototype.buildWaterfall = function() {
    var target = this.colunmSort();
        this.buildPicBox(this.pics[0],target[0],1);
};


Waterfall.prototype.popBigPic = function(event) {
    // body...
};


Waterfall.prototype.init = function() {
    this.buildColunms();
    for (var i = 0; i < this.pics.length; i++) {
        var target = this.colunmSort();
        //console.log(target);
        this.buildPicBox(this.pics[i],target[0],i);
    }
    window.addEventListener('load',this.colunmSort.bind(this))
};

new Waterfall("#main-block",4,16,["img/1.png","img/2.png","img/3.png","img/4.png","img/3.png","img/1.png","img/2.png","img/2.png"]);