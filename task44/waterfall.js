/**
 * @constructor
 * @param {str} selector 创建位置，querySelector格式
 * @param {int} colunms  瀑布流栏数
 * @param {int} margin   瀑布栏之间的外边距
 * @param {array} pics   图片地址的数列
 */
var Waterfall = function (selector,colunms,margin,pics) {
    this.element = document.querySelector(selector);
    this.colunms = colunms || 4;
    this.margin = margin || 16;
    this.pics = pics;
    this.picNum = pics.length || 0;

    this.init();
};

/**
 * 创建瀑布流容器
 */
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

/**
 * 创建瀑布流中每张图片的容器
 * @param  {node} img    图片对象
 * @param  {node} target 插入的目标栏位
 * @param  {int} i      图片的排序
 */
Waterfall.prototype.buildPicBox = function(img,target,i) {
    var picbox = document.createElement("div"),
        content = document.createElement("div");
    content.innerHTML = "<h3>Title" + (i + 1) + "</h3>\n<p>This is a picture</p>";
    content.className = "content";
    picbox.className = "pic-box";
    
    img.addEventListener('click',function () {
        var img = new Image(),
            body = document.querySelector("body");
            mask = document.querySelector("#mask");
        mask.className = "";
        img.src = event.target.src;
        img.id = "bigPic";
        body.appendChild(img);
        setTimeout(function () {
            var bigPic = document.querySelector("#bigPic");
            bigPic.style.transform = 'translate(-50%, -50%)';
        },10);
    });

    picbox.appendChild(img);
    picbox.appendChild(content);
    target.appendChild(picbox);
};

/**
 * 选出最短的瀑布流栏位
 */
Waterfall.prototype.colunmSort = function() {
    var colunms = document.querySelectorAll(".waterfall-colunms"),
        colunmsArr = [];
        for (var i = 0; i < colunms.length; i++) {
            colunmsArr.push(colunms[i]);
        }
        var sortedColunms = colunmsArr.sort(function (a,b) {
            return a.offsetHeight - b.offsetHeight;
        });
        return sortedColunms;
};

/**
 * 创建点击图片后的遮罩层
 */
Waterfall.prototype.mask = function() {
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
 * 预加载图片时回调用
 * @param  {node} img 图片对象
 * @param  {array} url 图片地址数组
 * @param  {int} i   图片的排序
 */
Waterfall.prototype.preLoadX = function(img,url,i) {
    var colunm = this.colunmSort(); 
    this.buildPicBox(img,colunm[0],i);
    if (i < url.length - 1) {
        this.preLoad(url,i + 1);
    }
};

/**
 * 图片预加载，然后添加到瀑布流中
 * @param  {array} url 图片地址数组
 * @param  {int} i   图片的排序
 */
Waterfall.prototype.preLoad = function(url,i) {
    var img = new Image();
    img.src = url[i];
    if (img.complete) {
        this.preLoadX(img,url,i);
    }else{
        img.addEventListener("load",this.preLoadX.bind(this,img,url,i));
    }
};

/**
 * 滚动到预定位置是加载并添加图片
 */
Waterfall.prototype.scollLoad = function() {
    var screenHeight = (document.documentElement.scrollTop || document.body.scrollTop) +(document.documentElement.clientHeight || document.body.clientHeight);
    var colunm = this.colunmSort();
    var containerHeight = colunm[0].offsetTop  + colunm[0].offsetHeight;
    if (containerHeight < screenHeight) {
        var as = randomPicLoad(10);
        this.preLoad(as,0);
    }
};

/**
 * 初始化，绑定滚动时间
 * @return {[type]} [description]
 */
Waterfall.prototype.init = function() {
    this.buildColunms();
    this.mask();
    this.preLoad(this.pics,0);

    window.addEventListener("scroll",this.scollLoad.bind(this));
};