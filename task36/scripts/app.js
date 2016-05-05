 $ = function (el) { return document.querySelector(el); };
 $$ = function (el) { return document.querySelectorAll(el); };

var chessboardWalker = new ChessboardWalker(),
    orderList = new OrderList(),
	run = $('#run'),
	refresh = $('#refresh');

window.onload = function () {
	var mapbuilder = new MapBuilder()
	mapbuilder.build();
	mapbuilder.drawAxis();
	chessboardWalker.show(mapbuilder);
}

window.onclick =function () {
	var target = $("#target");
	switch (event.target)
	{
		case run :
			orderList.getOrders();
            orderList.runOrders();
			break;
		case refresh :
			$('#order').value = '';
            orderList.orders = [];
			break;
	}
}

$('#order').oninput = function () {
	orderList.commblock();
	orderList.scroll();
}
$('#boxnum').onchange = function () {
	var mapbuilder = new MapBuilder(),
		chessboardWalker = new ChessboardWalker(),
		orderList = new OrderList();
	mapbuilder.build();
	mapbuilder.drawAxis();
	chessboardWalker.show(mapbuilder);
}

function Application() {
	this.mapBuilder = new MapBuilder();
	this.chessboardWalker = new ChessboardWalker();
	this.orderList = new OrderList();

	this.$run = $('#run');
	this.$refresh = $('#refresh');
	this.$target = $("#target");
	this.$order = $('#order');
	this.$boxnum = $('#boxnum');

	this.init();
}
new Application();