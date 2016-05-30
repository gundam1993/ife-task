var imgs = ["img/1.png","img/10.png","img/3.png","img/4.png","img/6.png","img/8.png"];
var style = {
    layout : 2,
    gutter : 20
};

var a = new Ggallery("#ggalleryContainer");
a.setImage(imgs,style);
a.enableFullscreen();