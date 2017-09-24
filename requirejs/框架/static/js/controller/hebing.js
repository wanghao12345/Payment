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
	var starttime = $.url.getParam("starttime");
	var endtime = $.url.getParam("endtime");
	if (type == 1) {
		$("title").html("缴水费");
		$(".htcolor").html("缴水费");
	}

	var datainfo = {
		dataType: 'jsonp',
		url: 'qmonthrangedata?username=' + userInfo.thcookie + "&startmonth=" + starttime + "&endmonth=" + endtime + "&type=" + type + "&token=" + userInfo.thtoken
	}
	var dataList = {
		dataTime: starttime + '至' + endtime,
		totalMoney: 0,
		listinfo:[]
	}
	$.loding(true);
	$.xsr(datainfo, function(datas) {
		$.loding(false);
		if (datas.status == 100) {
			$.each(datas.data, function(index, info) {
				dataList.totalMoney += info.money;
			});
			$(".J_timeStr").html(dataList.dataTime);
			$(".J_totalMoney").html(dataList.totalMoney);
			$.log(datas);
			$.tplRender("payinfo", datas)
		} else {
			$.errorlog(datas.status);
		}
	});
});