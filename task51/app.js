var imgs = ["img/1.png","img/10.png","img/3.png","img/4.png","img/6.png","img/8.png","img/2.png","img/7.png"];
var style = {
    layout : 2,
    gutter : 10,
    squareSize : 20
};
var setting = document.querySelector("#setting");

var a = new Ggallery("#ggalleryContainer");
a.setImage(imgs,style);
a.enableFullscreen();

setting.onclick = function () {
    var controler = document.querySelector("#controler");
    controler.className === "hidden" ? controler.className = "" : controler.className += "hidden";
};