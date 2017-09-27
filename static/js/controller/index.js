require(['lib/common'],function($){
	$.menu();
	var info = {
		thcookie:$.cookie.get("th_userName"),
		thtoken:$.cookie.get("th_token")
	}
	if ($.isNull(info.thcookie)) {
		//window.location.href = "../login/login.html?returnurl="+window.location.href;
	}

})