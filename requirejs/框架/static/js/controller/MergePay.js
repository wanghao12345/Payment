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
			$.alert("请输入开始月份");
			return;
		}
		if($.isNull($("#endTime").val())){
			$.alert("请输入结束月份");
			return;
		}
		var datainfo = {
			dataType: 'jsonp',
			url: 'qmonthrangedata?username=' + userInfo.thcookie + "&startmonth=" + $("#beginTime").val() +"&endmonth="+$("#endTime").val()+ "&type=" + type + "&token=" + userInfo.thtoken
		}
		$.loding(true);
		$.xsr(datainfo, function(data) {
			$.loding(false);
			if (data.status == 100) {
				$.log(data);
				window.location.href="../payment/hebing.html?type="+type+"&starttime="+$("#beginTime").val()+"&endtime="+$("#endTime").val();
			} else {
				$.errorlog(data.status);
			}
		});
	});

});