function MapBuilder() {
    this.blockNum = 0;
    this.blockSize = 0;
    this.mapSize = 0;
}

MapBuilder.prototype.build = function() {
    $('#map-block').innerHTML = '';
    this.blockNum = parseInt($('#boxnum').value);
    if (this.blockNum == 20) {
        this.blockSize = 40;
    }else{
        this.blockSize = 25;
    }
    var html = '',
        map = $('#map'),
        mapBlock = $('#map-block'),
        moveArea = $('#moveArea');
    for (var i = 0; i < this.blockNum + 1; i++) {
        var tr = '';
        for (var j = 0; j < this.blockNum + 1; j++) {
            var td = '<td width="' + this.blockSize + 'px" height="' + this.blockSize + 'px"></td>'
            tr += td
        }
        tr = '<tr>' + tr + '</tr>';
        html += tr;
    }
    mapBlock.innerHTML = html;
    moveArea.style.width = map.offsetWidth + 'px';
    moveArea.style.height = map.offsetHeight + 'px';
    this.mapSize = moveArea.offsetWidth;
};

MapBuilder.prototype.drawAxis = function() {
    var mapBlock = $('#map-block'),
        Xaxis = $('#map-block').firstChild;
    Xaxis.id = 'Xaxis';
    for (var i = 1; i < Xaxis.children.length; i++) {
        Xaxis.children[i].innerHTML = i;
    }
    for (var i = 1; i < mapBlock.children.length; i++) {
        var Yaxis = mapBlock.children[i].children[0];
        Yaxis.className = 'Yaxis';
        Yaxis.innerHTML = i
    }
};