require(['lib/common'], function($) {
	$.menu();
	var type = $.url.getParam("type");
	if (type == 1) {
		$("title").html("水费帐户充值");
		$(".htcolor").html("水费帐户充值");
	}
	var userInfo = {
		thcookie: $.cookie.get("th_userName"),
		thtoken: $.cookie.get("th_token")
	}
	if ($.isNull(userInfo.thcookie)) {
		window.location.href = "../login/login.html?returnurl=" + window.location.href
	}
	$("#J_chongzhi").on("click", function() {
		var money = $("#money").val();
		if ($.isNull(money)) {
			$.alert("请输入要充值的金额");
			return;
		}
		if (isNaN(parseInt(money))) {
			$.alert("请输入真确的充值金额");
			return;
		}
		var dataInfo = {
			type: 'post',
			url: 'delta?username=' + userInfo.thcookie + "&token=" + userInfo.thtoken + "&money=" + money
		}
		$.loding(true);
		$.xsr(dataInfo, function(data) {
			$.loding(false);
			if (data.status == 100) {
				window.location.href="../Recharge/Recharge_s.html?money="+money
			} else {
				$.errorlog(data.status);
			}
		});
	});
})