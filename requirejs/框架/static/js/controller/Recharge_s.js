require(['lib/common'], function($) {
	$.menu();
	var userInfo = {
		thcookie: $.cookie.get("th_userName"),
		thtoken: $.cookie.get("th_token")
	}
	if ($.isNull(userInfo.thcookie)) {
		window.location.href = "../login/login.html?returnurl=" + window.location.href
	}
	var type = $.url.getParam("type");
	if (type == 1) {
		$("title").html("水表余额查询");
		$(".htcolor").html("水表余额查询");
	}
	var datainfo = {
		dataType: 'jsonp',
		url: 'querybalance?username=' + userInfo.thcookie + "&token=" + userInfo.thtoken
	}
	$.log(datainfo);
	$.loding(true);
	$.xsr(datainfo, function(datas) {
		$.loding(false);
		if (datas.status == 100) {
			$("#J_username").html(userInfo.thcookie);
			$("#J_money").html("￥"+$.url.getParam("money"));
			$("#J_Balance").html("￥"+datas.data.balance );
		} else {
			$.errorlog(datas.status);
		}
	});
});