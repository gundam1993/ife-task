/**
 * @constructor
 * @param {str} selector 创建位置，querySelector格式
 * @param {int} height      图片的基础高度
 * @param {int} maxRowWidth 最大宽度
 * @param {array} pics   图片地址的数列
 */
var RowsLayout = function (selector,height,maxRowWidth,pics) {
    this.element = selector;
    this.height = height;
    this.pics = pics;
    this.maxRowWidth = maxRowWidth|| 1900;
    this.aspectRatio = (this.maxRowWidth / this.height);//宽高比
    this.aspectRationow = 0;
    this.checkedPic = [];


    this.init();
};

/**
 * 构建行
 */
RowsLayout.prototype.buildRow = function() {
    var target = document.querySelector(this.element);
    var row = document.createElement("div");
    row.className = "rowslayout-rows";
    row.style.width = this.maxRowWidth + "px";
    for (var i = 0,len = this.checkedPic.length; i < len; i++) {
        var picBox = document.createElement("div");
        picBox.className = "rowslayout-picBox";
        if (this.aspectRationow >= this.aspectRatio) {
            picBox.style.width = (this.maxRowWidth / this.aspectRationow * ((this.checkedPic[i].width) / this.checkedPic[i].height)) + "px";
            picBox.style.height = (this.checkedPic[i].height * (this.checkedPic[i].width / picBox.offsetWidth)) + "px";
        }else{
            picBox.style.width = (this.maxRowWidth / this.aspectRatio * ((this.checkedPic[i].width) / this.checkedPic[i].height)) + "px";
            picBox.style.height = (this.checkedPic[i].height * (this.checkedPic[i].width / picBox.offsetWidth)) + "px";
        }

        this.checkedPic[i].addEventListener('click',this.showBigPic.bind(this,this.checkedPic[i]));
        picBox.appendChild(this.checkedPic[i]);
        row.appendChild(picBox);
    }
    target.appendChild(row);
};

/**
 * 图片预加载，然后添加到瀑布流中
 * @param  {array} url 图片地址数组
 * @param  {int} i   图片的排序
 */
RowsLayout.prototype.preLoad = function(url,i) {
    var img = new Image();
    img.src = url[i];
    if (img.complete) {
        this.preLoadX(img,url,i);
    }else{
        img.addEventListener("load",this.preLoadX.bind(this,img,url,i));
    }
};

/**
 * 预加载图片时回调用
 * @param  {node} img 图片对象
 * @param  {array} url 图片地址数组
 * @param  {int} i   图片的排序
 */
RowsLayout.prototype.preLoadX = function(img,url,i) {
    this.aspectRationow += ((img.width + 15) / img.height);
    if (this.aspectRationow < this.aspectRatio) {
        this.checkedPic.push(img);  
    }else{
        this.checkedPic.push(img);
        this.buildRow();
        this.checkedPic = [];
        this.aspectRationow = 0;
    }
    if (i < url.length - 1) {
        this.preLoad(url,i + 1);
    }else{
        this.buildRow();
    }
};

/**
 * 创建点击图片后的遮罩层
 */
RowsLayout.prototype.mask = function() {
    var mask = document.createElement("div"),
        body = document.querySelector("body");
    mask.id = "mask";
    mask.className = "hidden";
    body.appendChild(mask);
    mask.addEventListener('click',function () {
        var bigPic = document.querySelector("#bigPic");
        bigPic.style.transform = 'translate(-50%, -50%) scale(0.01,0.01)';
        setTimeout(function () {
            var bigPic = document.querySelector("#bigPic");
            bigPic.remove();
        },300);
        event.target.className = "hidden";
    });
};

/**
 * 点击图片后展示大图
 * @param  {node} target 
 */
RowsLayout.prototype.showBigPic = function(target) {
    var img = new Image(),
        body = document.querySelector("body");
        mask = document.querySelector("#mask");
    mask.className = "";
    img.src = target.src;
    img.id = "bigPic";
    body.appendChild(img);
    setTimeout(function () {
        var bigPic = document.querySelector("#bigPic");
        bigPic.style.transform = 'translate(-50%, -50%)';
    },10);
};

/**
 * 滚动到预定位置时加载并添加图片
 */
RowsLayout.prototype.scollLoad = function() {
    var screenHeight = (document.documentElement.scrollTop || document.body.scrollTop) +(document.documentElement.clientHeight || document.body.clientHeight);
    var container = document.querySelector(this.element);
    var containerHeight = container.offsetTop  + container.offsetHeight;
    if (containerHeight - 400 < screenHeight) {
        var as = randomPicLoad(10);
        this.preLoad(as,0);
    }
};

/**
 * 初始化
 */
RowsLayout.prototype.init = function() {
    this.mask();
    this.preLoad(this.pics,0);

    window.addEventListener("scroll",this.scollLoad.bind(this));
};

