 $ = function (el) { return document.querySelector(el); };
 $$ = function (el) { return document.querySelectorAll(el); };

var chessboardWalker = new ChessboardWalker(),
    orderList = new OrderList(),
	run = $('#run'),
	refresh = $('#refresh');

window.onload = function () {
	chessboardWalker.show();
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
	$('#commander-lines').style.top = -event.target.scrollTop + 'px';
}