 $ = function (el) { return document.querySelector(el); };
 $$ = function (el) { return document.querySelectorAll(el); };

function Application() {
	this.chessboardWalker = new ChessboardWalker();
	this.orderList = new OrderList();

	this.$run = $('#run');
	this.$refresh = $('#refresh');
	this.$target = $("#target");
	this.$order = $('#order');

	this.init();
}
/*
 *初始化，绑定所有事件
 */
Application.prototype.init = function() {
	this.chessboardWalker.show();
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
};

var application = new Application();