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
		$("title").html("缴水费");
		$(".htcolor").html("缴水费");
		$("#Lastmonth").html("缴上个月水费");
	}
	$(".J_lastmonth").on("click", function() {
		if (type == 1) {
			var hrefstr = $(this).attr("href");
			$(this).attr("href", hrefstr + "?type=1");
		}else{
			var hrefstr = $(this).attr("href");
		$(this).attr("href", hrefstr + "?type=2");
		}
	})
});