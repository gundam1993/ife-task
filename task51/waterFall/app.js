/**
 * 用于生成随机的图片顺序
 * @param  {int} num 生成的项数
 * @return {array}   生成的数量
 */
function randomPicLoad(num) {
    var randomPic = [];
    for (var i = 0; i < num; i++) {
        var picNum = (Math.round(10*Math.random()));
        if (picNum !== 0) {
            randomPic.push("img/" + picNum + ".png");
        }else{
            picNum = (Math.round(10*Math.random()));
            randomPic.push("img/" + picNum + ".png");
        }
    }
    return randomPic;
}

var setStyle = document.querySelector("#setStyle"),
    checkRE = /^[1-9]\d*$/;
    setStyle.addEventListener("click",function () {
        var mainBlock = document.querySelector("#main-block"),
            colunmSelect = document.querySelector("#colunmSelect");
            marginSelect = document.querySelector("#marginSelect");
            if (checkRE.test(colunmSelect.value) && checkRE.test(marginSelect.value)) {
                mainBlock.innerHTML = "";
                new Waterfall("#main-block",colunmSelect.value,marginSelect.value,imgs);
            }else{
                alert("请输入正整数！");
            }
    });

var imgs = ["img/1.png","img/2.png","img/3.png","img/4.png","img/6.png","img/8.png","img/9.png","img/7.png","img/2.png","img/10.png","img/2.png","img/3.png","img/2.png","img/6.png","img/8.png"];
new Waterfall("#main-block",4,16,imgs);



