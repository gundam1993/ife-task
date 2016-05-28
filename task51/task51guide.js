(function (window) {

    // 由于是第三方库，我们使用严格模式，尽可能发现潜在问题
    'use strict';



    function Ggallery(id) {
        // 布局的枚举类型
        this.LAYOUT = {
            PUZZLE: 1,    // 拼图布局
            WATERFALL: 2, // 瀑布布局
            BARREL: 3,     // 木桶布局
            SQUARE: 4       //  正方形布局
        };
        // 公有变量可以写在这里
        // this.xxx = ...
        this.containerSelector = id || "#ggalleryContainer";
        this.container = document.querySelector(this.containerSelector);
        this.picBox = "ggalleryBox";
        

    }

    // 私有变量可以写在这里
    var _options = {
        layout : '',
        puzzleHeight:'',
        coulumn : '',
        heightMin : '',
        gutter : '',
        mdSquareSize:'',
        smSquareSize:'',
        fullscreenState : '',
        image: []
    };

    var _createFullscreen = function (event) {
        if (event.target.getAttribute('src').trim()) {
            var fullscreen = document.createElement("div"),
            img = document.createElement("img"),
            body = document.querySelector("body");
            fullscreen.id = "fullscreen";
            fullscreen.className = "hidden";
            img.src = event.target.src;
            img.id = "bigPic";
            fullscreen.appendChild(img);
            body.appendChild(fullscreen);
        }
    };

    var _puzzleStyleFix = function (picBox,parent) {
        var len = picBox.length;
        switch (len) {
            case 3 :
                picBox[1].style.width = picBox[1].offsetHeight +"px";
                picBox[2].style.width = picBox[2].offsetHeight +"px";
                picBox[0].style.width = parent.offsetWidth - picBox[1].offsetWidth + "px";
                break;
            case 5 :
                picBox[1].style.height = picBox[1].offsetWidth + "px";
                picBox[4].style.height = parent.offsetHeight - picBox[1].offsetHeight + "px";
                break;
            default :
                for (var i = 0; i < len; i++) {
                    picBox[i].style.height = "";
                    picBox[i].style.width = "";
                }
        }
    };
    
    /************* 以下是本库提供的公有方法 *************/

    /**
     * 初始化并设置相册
     * 当相册原本包含图片时，该方法会替换原有图片
     * @param {(string|string[])} image  一张图片的 URL 或多张图片 URL 组成的数组
     * @param {object}            option 配置项
     */
    Ggallery.prototype.setImage = function (image,opt) {
        if (typeof image === 'string') {
            // 包装成数组处理
            this.setImage([image]);
            return;
        }
        this.container.innerHTML = "";

        var _opt = opt || {};
        _options.layout = _opt.layout || 2;
        _options.fullscreenState = _opt.fullscreenState || true;
        _options.puzzleHeight = _opt.puzzleHeight || 800;
        _options.coulumn = _opt.coulumn || 4;
        _options.heightMin = _opt.heightMin || 300;
        _options.gutter = _opt.gutter || 10;
        _options.mdSquareSize = _opt.mdSquareSize || 300;
        _options.smSquareSize = _opt.smSquareSize || 150;
        
        this.setLayout(_options.layout);
        this.addImage(image);
    };



    /**
     * 获取相册所有图像对应的 DOM 元素
     * 可以不是 ，而是更外层的元素
     * @return {HTMLElement[]} 相册所有图像对应的 DOM 元素组成的数组
     */
    Ggallery.prototype.getImageDomElements = function() {
        return document.querySelector(".ggalleryBox");
    };

    Ggallery.prototype.preLoad = function(url,i) {
        var img = new Image();
        img.src = url[i];
        console.log(img);
        if (img.complete) {
            this.preLoadX(img,url,i);
        }else{
            img.addEventListener("load",this.preLoadX.bind(this,img,url,i));
        }  
    };

    Ggallery.prototype.preLoadX = function(img,url,i) {
        var container = document.createElement("div");
        container.className = this.picBox;
        container.appendChild(img);
        _options.image.push(container);
        //imageList.push(container);
        if (i < url.length - 1) {
            this.preLoad(url,i + 1);
        }
};

    /**
     * 向相册添加图片
     * 在拼图布局下，根据图片数量重新计算布局方式；其他布局下向尾部追加图片
     * @param {(string|string[])} image 一张图片的 URL 或多张图片 URL 组成的数组
     */
    Ggallery.prototype.addImage = function (image) {
        var imageList = [];
        //this.preLoad(image,0);
        for (var i = 0, leni = image.length; i < leni; i++) {
            var img = new Image(),
            container = document.createElement("div");
            img.src = image[i];
            container.className = this.picBox;
            container.appendChild(img);
            _options.image.push(container);
            imageList.push(container);
        }
       console.log(_options.image);
        var picBox = imageList,
            len = imageList.length;
        switch(_options.layout) {
            case 1 :
                if (picBox.length > 6) {
                    throw "PUZZLE layout only can contain 6 photos";
                }
                for (var j = 0; j < len; j++) {
                    this.container.appendChild(picBox[j]);
                    picBox[j].style.border = _options.gutter / 2 + "px solid transparent";
                }
                this.container.style.height = _options.puzzleHeight + "px";
                this.container.className = this.containerSelector.slice(1) + ' puzzle-' + _options.image.length;
                _puzzleStyleFix(_options.image,this.container);
                break;
            case 2 :
                for (var k = 0; k < len; k++) {
                    var targetCoulumn = this.getMinWaterfallCoulumn();
                    console.log(targetCoulumn[0]);
                    picBox[k].className = "ggalleryBox";
                    targetCoulumn[0].appendChild(picBox[k]);
                }
                break;
        }

    };

    /**
     * 移除相册中的图片
     * @param  {(HTMLElement|HTMLElement[])} image 需要移除的图片
     * @return {boolean} 是否全部移除成功
     */
    Ggallery.prototype.removeImage = function (image) {

    };



    /**
     * 设置相册的布局
     * @param {number} layout 布局值，IfeAlbum.LAYOUT 中的值
     */
    Ggallery.prototype.setLayout = function (layout) {
        var picBox = _options.image;
        _options.layout = layout || 2;
        switch(_options.layout) {
            case 2 :
                this.container.className = this.containerSelector.slice(1) + ' waterfall';
                var len = _options.coulumn;
                for (var i = 0; i < len; i++) {
                    var coulumn = document.createElement("div");
                    coulumn.className = "ggalleryWaterfallColunms";
                    coulumn.id = "coulumn-" + (i + 1);
                    this.container.appendChild(coulumn);
                }
                break;
                
        }
    };



    /**
     * 获取相册的布局
     * @return {number} 布局枚举类型的值
     */
    Ggallery.prototype.getLayout = function() {
        return _options.layout;
    };



    /**
     * 设置图片之间的间距
     * 注意这个值仅代表图片间的间距，不应直接用于图片的 margin 属性，如左上角图的左边和上边应该紧贴相册的左边和上边
     * 相册本身的 padding 始终是 0，用户想修改相册外框的空白需要自己设置相框元素的 padding
     * @param {number}  x  图片之间的横向间距
     * @param {number} [y] 图片之间的纵向间距，如果是 undefined 则等同于 x
     */
    Ggallery.prototype.setGutter = function (x, y) {

    };



    /**
     * 允许点击图片时全屏浏览图片
     */
    Ggallery.prototype.enableFullscreen = function () {
        _options.fullscreenState = true;
        this.container.addEventListener('click', _createFullscreen, false);
    };



    /**
     * 禁止点击图片时全屏浏览图片
     */
    Ggallery.prototype.disableFullscreen = function () {
        _options.fullscreenState = false;
        this.container.removeEventListener('click', _createFullscreen, false);
    };



    /**
     * 获取点击图片时全屏浏览图片是否被允许
     * @return {boolean} 是否允许全屏浏览
     */
    Ggallery.prototype.isFullscreenEnabled = function () {
        return _options.fullscreenState;
    };


    Ggallery.prototype.getMinWaterfallCoulumn = function() {
        var colunms = document.querySelectorAll(".ggalleryWaterfallColunms"),
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
     * 设置木桶模式每行图片数的上下限
     * @param {number} min 最少图片数（含）
     * @param {number} max 最多图片数（含）
     */
    Ggallery.prototype.setBarrelBin = function (min, max) {

        // 注意异常情况的处理，做一个健壮的库
        if (min === undefined || max === undefined || min > max) {
            console.error('...');
            return;
        }

        // 你的实现

    };




    /**
     * 设置木桶模式每行高度的上下限，单位像素
     * @param {number} min 最小高度
     * @param {number} max 最大高度
     */
    Ggallery.prototype.setBarrelHeight = function (min, max) {

    };


    /**
     * 获取木桶模式每行高度的下限
     * @return {number} 最少图片数（含）
     */
    Ggallery.prototype.getBarrelHeightMin = function () {

    };

    
    /************* 以上是本库提供的公有方法 *************/



    // 实例化
    if (typeof window.Ggallery === 'undefined') {
        // 只有当未初始化时才实例化
        window.Ggallery = function (id) {
            return new Ggallery(id);
        };
    }

}(window));