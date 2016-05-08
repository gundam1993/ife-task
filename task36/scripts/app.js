 $ = function (el) { return document.querySelector(el); };
 $$ = function (el) { return document.querySelectorAll(el); };

function Application() {
	this.mapBuilder = new MapBuilder();
	this.chessboardWalker = new ChessboardWalker();
	this.orderList = new OrderList();
	this.navigater = new Navigater();

	this.$run = $('#run');
	this.$refresh = $('#refresh');
	this.$target = $("#target");
	this.$order = $('#order');
	this.$boxnum = $('#boxnum');
	this.$build = $('#buildwall');

	this.init();
}
/*
 *初始化，绑定所有事件
 */
Application.prototype.init = function() {
		this.mapBuilder.build();
		this.mapBuilder.drawAxis();
		this.chessboardWalker.show(this.mapBuilder);
	this.$order.addEventListener('input',function () {
		application.orderList.commblock();
	})
	this.$order.addEventListener('scroll',function () {
		application.orderList.scroll();
	})
	this.$run.addEventListener('click',function () {
		application.orderList.getOrders();
        application.orderList.runOrders();
	})
	this.$refresh.addEventListener('click',function () {
		$('#order').value = '';
        application.orderList.orders = [];
	})
	this.$boxnum.addEventListener('change',function () {
		application.mapBuilder = new MapBuilder();
		application.chessboardWalker = new ChessboardWalker();
		application.orderList = new OrderList();
		application.mapBuilder.build();
		application.mapBuilder.drawAxis();
		application.chessboardWalker.show(application.mapBuilder);
	})
	this.$build.addEventListener('click',function () {
		application.chessboardWalker.randomWall();
		application.chessboardWalker.showWall();
	})
};

var application = new Application();