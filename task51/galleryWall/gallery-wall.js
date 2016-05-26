/**
 * gallery-wall.js
 * desciption, by gundam1993
 * Use with gallery-wall.css
 * @author gundam1993
 */

/**
 * @constructor
 * @param {string} selector 
 * @param {array} pics     
 */
var GalleryWall =  function (selector,pics) {
    this.element = document.querySelector(selector);
    this.pics = pics.slice(0,6);

    this.showPic();
    this.styleFix();
};

/**
 * 添加图片，标题
 */
GalleryWall.prototype.showPic = function() {
    for (var i = 0; i < this.pics.length; i++) {
        var img = document.createElement("img");
        var div = document.createElement("div");
        var content = document.createElement("div");
        content.innerHTML = "<h3>Title</h3>\n<p>This is a picture</p>";
        content.className = "content";
        div.className = "gallery-box";
        img.className = "gallery-item";
        img.src = this.pics[i];
        div.appendChild(img);
        div.appendChild(content);
        this.element.appendChild(div);
    }
    this.element.className += 'gallerys gallery-' + this.pics.length;
};

/**
 * 修正部分样式（如正方形）
 */
GalleryWall.prototype.styleFix = function() {
   var picNum =  this.element.getElementsByClassName('gallery-box');
   switch (picNum.length) 
   {
    case 3 :
        picNum[1].style.width = picNum[1].offsetHeight +"px";
        picNum[2].style.width = picNum[2].offsetHeight +"px";
        picNum[0].style.width = this.element.offsetWidth - picNum[1].offsetWidth + "px";
        break;
    case 5 :
        picNum[1].style.height = picNum[1].offsetWidth + "px";
        picNum[4].style.height = this.element.offsetHeight - picNum[1].offsetHeight + "px";
   }

};

new GalleryWall("#albim1",["http://placehold.it/2000x1000/E97452/fff"]);
new GalleryWall("#albim2",["http://placehold.it/1550x1250/A5DEE4/fff","http://placehold.it/450x1350/FEDFE1/fff"]);
new GalleryWall("#albim3",["http://placehold.it/1450x750/F05E1C/fff","http://placehold.it/2150x350/113285/fff","http://placehold.it/850x350/5DAC81/fff"]);
new GalleryWall("#albim4",["http://placehold.it/2000x750/FEDFE1/fff","http://placehold.it/1300x750/227D51/fff","http://placehold.it/950x750/2EA9DF/fff","http://placehold.it/950x750/FFC408/fff"]);
new GalleryWall("#albim5",["http://placehold.it/1950x350/42602D/fff","http://placehold.it/350x750/B55D4C/fff","http://placehold.it/650x1750/36563C/fff","http://placehold.it/2950x250/7B90D2/fff","http://placehold.it/1150x1050/64363C/fff"]);
new GalleryWall("#albim6",["http://placehold.it/1450x1650/7B90D2/fff","http://placehold.it/950x350/E97452/fff","http://placehold.it/750x750/A5DEE4/fff","http://placehold.it/550x2350/FEDFE1/fff","http://placehold.it/950x150/5DAC81/fff","http://placehold.it/950x750/51A8DD/fff"]);