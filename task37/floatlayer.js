function FloatLayer(target) {
    this.target = target;
    this.visible = false;
    this.maskEle = null;

    this.popBtn = $("#popOut");
    this.title = this.target.children[0];
    this.popOff = $("#popYes");
    this.sizer = $("#sizer");

    this.init();
}

FloatLayer.prototype.show = function() {
    if (this.visible === false) {
        this.target.style.visibility = "visible";
        this.maskEle.style.visibility = "visible";
        this.target.style.transform = 'translate(0%, 0%) scale(1,1)';
        this.target.style.left = '35%';
        this.target.style.top = '35%';
        this.target.style.width = '30%';
        this.target.style.height = '30%';
        this.visible = true;
    }
};

FloatLayer.prototype.hide = function() {
    if (this.visible === true) {
        this.target.style.transform = 'translate(-50%, -50%) scale(0,0)';
        setTimeout('$("#floatLayer").style.visibility = "hidden"',300);
        this.maskEle.style.visibility = "hidden";
        this.visible = false;
    }
};

FloatLayer.prototype.mask = function() {
    if (this.maskEle == null) {
        var mask = document.createElement("div");
        mask.id = "mask";
        mask.style.width = "100%";
        mask.style.height = "100%";
        mask.style.backgroundColor = "rgba(108,108,108,0.7)";
        mask.style.zIndex = "10";
        mask.style.visibility = "hidden";
        $("body").appendChild(mask);
        this.maskEle = mask;
    }
};

FloatLayer.prototype.drag = function() {
    var that = this;
    this.title.style.cursor = "move";
    var disX = event.clientX - this.target.offsetLeft;
    var disY = event.clientY - this.target.offsetTop;
    function move() {
        that.target.style.left = event.clientX - disX + "px";
        that.target.style.top = event.clientY - disY + "px";
    }
    document.addEventListener('mousemove', move)
    document.addEventListener('mouseup', function() {
        document.removeEventListener('mousemove', move);
        that.title.style.cursor = "auto";
    });
};

FloatLayer.prototype.resizer = function(first_argument) {
    var that = this;
    this.target.style.cursor = "se-resize";
    var disX = event.clientX,
        disY = event.clientY,
        width = that.target.offsetWidth,
        height = that.target.offsetHeight
    function size() {
        console.log(that.target.offsetWidth);
        that.target.style.width = width + (event.clientX - disX) + "px";
        that.target.style.height = height + (event.clientY - disY) + "px";
    }
    document.addEventListener('mousemove', size)
    document.addEventListener('mouseup', function() {
        document.removeEventListener('mousemove', size);
        that.target.style.cursor = "auto";
    });
};

FloatLayer.prototype.init = function() {
    this.mask();
    this.popBtn.addEventListener("click",this.show.bind(this));
    this.popOff.addEventListener("click",this.hide.bind(this));
    this.maskEle.addEventListener("click",this.hide.bind(this));
    this.title.addEventListener("mousedown",this.drag.bind(this));
    this.sizer.addEventListener("mousedown",this.resizer.bind(this));
};

$ = function (el) { return document.querySelector(el); };

new FloatLayer($('#floatLayer'));