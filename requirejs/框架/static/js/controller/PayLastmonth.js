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
	var monthurl = $.url.getParam("month");
	var codenum = $.url.getParam("barcode");
	if (type == 1) {
		$("title").html("缴上个月水费");
		$(".htcolor").html("缴上个月水费");
	}
	var myDate = new Date();
	var year = myDate.getFullYear(); //获取完整的年份(4位,1970-????)
	var month = myDate.getMonth(); //获取当前月份(0-11,0代表1月)
	if (month < 10) {
		month = "0" + month;
	}
	var dataTime = year + "-" + month;
	if (!$.isNull(monthurl)) {
		dataTime = monthurl;
	}
	if (!$.isNull(codenum)) {
		var datainfo = {
			dataType: 'jsonp',
			url: 'querybilldetail?username=' + userInfo.thcookie + "&barcode=" + codenum+ "&type=" + type + "&token=" + userInfo.thtoken
		}
	} else {
		var datainfo = {
			dataType: 'jsonp',
			url: 'querybinddata?username=' + userInfo.thcookie + "&month=" + dataTime + "&type=" + type + "&token=" + userInfo.thtoken
		}
	}
	$.loding(true);
	$.xsr(datainfo, function(data) {
		$.loding(false);
		if (data.status == 100) {
			$.log(data);
			$.tplRender("payinfo", data);
			jiaofei();
		} else {
			$.errorlog(data.status);
		}
	});

	function jiaofei() {
		$(".J_addCart").on("click", function() {
			var datainfo = {
				type: 'post',
				url: 'paybarcode?username=' + userInfo.thcookie + "&barcode=" + $(this).attr("data-paynum") + "&type=" + type + "&token=" + userInfo.thtoken
			}
			$.loding(true);
			$.xsr(datainfo, function(data) {
				$.loding(false);
				if (data.status == 100) {
					$.log(data);
					$.alert("缴费成功", function() {
						window.location.href = window.location.href;
					});
				} else {
					$.errorlog(data.status);
				}
			});
		});
	}
});