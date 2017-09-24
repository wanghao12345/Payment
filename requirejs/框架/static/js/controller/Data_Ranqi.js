require(['lib/common'], function($) {
	$.menu();
	var type = $.url.getParam("type");
	if (type == 1) {
		$("title").html("我的水费");
		$(".htcolor").html("我的水费");
	}
	var userInfo = {
		thcookie: $.cookie.get("th_userName"),
		thtoken: $.cookie.get("th_token")
	}
	if ($.isNull(userInfo.thcookie)) {
		window.location.href = "../login/login.html?returnurl=" + window.location.href
	}
	var datainfo = {
		url: "querybindinfo?username=" + userInfo.thcookie + "&type=" + type + "&token=" + userInfo.thtoken,
		dataType: 'jsonp'
	}
	$.loding(true);
	$.xsr(datainfo, function(data) {
		$.loding(false);
		if (data.status == 100) {
			$.log(data);
			$.tplRender("feiyong", data)
			closeNum();
		} else {
			$(".data").hide();
			$(".login").show();
			$(".J_addCart").attr("href", "../bind/binding.html?type=" + type+"&returnurl="+window.location.href)
			$.errorlog(data.status);
		}
	});

	function closeNum() {
		$(".ck_num").on("click", function() {
			var closeType = $(this).prop("checked");
			$.log("closeType：：", closeType);
			var closeTypeNum = 0;
			if (closeType) {
				closeTypeNum = 1;
			} else {
				closeTypeNum = 0;
			}
			var closeNum = $(this).attr("data-num");
			$.log(closeTypeNum, closeNum);
			var closeInfo = {
				type: 'post',
				url: 'handlevalve?username=' + userInfo.thcookie + "&tablenumber=" + closeNum + "&type=" + type + "&token=" + userInfo.thtoken + "&handletype=" + closeTypeNum
			}
			$.log(userInfo.thcookie, closeNum, type, userInfo.thtoken, closeTypeNum);
			$.loding(true);
			$.xsr(closeInfo, function(data) {
				$.loding(false);
				if (data.status == 100) {
					$.log(data);
					if (closeTypeNum == 1) {
						$.alert("成功打开阀门：" + closeNum);
					} else {
						$.alert("成功关闭阀门：" + closeNum);
					}
				} else {
					$.errorlog(data.status);
				}
			});
		});
		$(".ck_cancle").on("click", function() {
			var closeType = $(this).prop("checked");
			var closeTypeNum = 0;
			if (closeType) {
				closeTypeNum = 1;
			} else {
				closeTypeNum = 0;
			}
			var closeNum = $(this).attr("data-num");
			$.log(closeTypeNum, closeNum);
			var closeInfo = {
				type: 'post',
				dataType: 'json',
				url: 'bindingcancel?username=' + userInfo.thcookie + "&type=" + type + "&verifycode=000000&token=" + userInfo.thtoken
			}
			$.log(userInfo.thcookie, closeNum, type, userInfo.thtoken, closeTypeNum);
			$.loding(true);
			$.xsr(closeInfo, function(data) {
				$.loding(false);
				if (data.status == 100) {
					$.log(data);
					$.alert("成功取消绑定");
					$(".data").hide();
					$(".login").show();
					$(".J_addCart").attr("href", "../bind/binding.html?type=" + type+"&returnurl="+window.location.href)
				} else {
					$.errorlog(data.status);
				}
			});
		});
	}
})