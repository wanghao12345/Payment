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
	$(".J_addCart").on("click", function() {
		if($.isNull($("#beginTime").val())){
			$.alert("请输入月份");
			return;
		}
		var datainfo = {
			dataType: 'jsonp',
			url: 'querybinddata?username=' + userInfo.thcookie + "&month=" + $("#beginTime").val() + "&type=" + type + "&token=" + userInfo.thtoken
		}
		$.loding(true);
		$.xsr(datainfo, function(data) {
			$.loding(false);
			if (data.status == 100) {
				$.log(data);
				window.location.href="../payment/PayLastmonth.html?type="+type+"&month="+$("#beginTime").val();
			} else {
				$.errorlog(data.status);
			}
		});
	});

});