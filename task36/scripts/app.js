 $ = function (el) { return document.querySelector(el); };
 $$ = function (el) { return document.querySelectorAll(el); };

function Application() {
	this.mapBuilder = new MapBuilder();
	this.chessboardWalker = new ChessboardWalker();
	this.orderList = new OrderList();

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
Application.prototype.run = function() {
	this.orderList.getOrders();
    this.orderList.runOrders(this.orderList.orders,this.chessboardWalker);
};

Application.prototype.changeMap = function() {
	this.mapBuilder = new MapBuilder();
	this.chessboardWalker = new ChessboardWalker();
	this.orderList = new OrderList();
	this.mapBuilder.build();
	this.mapBuilder.drawAxis();
	this.chessboardWalker.show(this.mapBuilder);
};

Application.prototype.init = function() {
	this.mapBuilder.build();
	this.mapBuilder.drawAxis();
	this.chessboardWalker.show(this.mapBuilder);

	this.$order.addEventListener('input',this.orderList.commblock.bind(this));
	this.$order.addEventListener('scroll',this.orderList.scroll.bind(this));
	this.$run.addEventListener('click',this.run.bind(this));
	this.$refresh.addEventListener('click',this.orderList.refresh.bind(this));
	this.$boxnum.addEventListener('change',this.changeMap.bind(this));
	this.$build.addEventListener('click',this.chessboardWalker.randomWall.bind(this.chessboardWalker))
};

new Application();