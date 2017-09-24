require(['lib/common'], function($) {
	$.menu();
	var codetime = 60;
	var boolClick = true;
	var userInfo = {
		thcookie: $.cookie.get("th_userName"),
		thtoken: $.cookie.get("th_token"),
		username: '',
		phone: "",
		code: ""
	}
	if ($.isNull(userInfo.thcookie)) {
		window.location.href = "../login/login.html?returnurl="+window.location.href
	}
	var datainfo = {
		url: 'userdata?username=' + userInfo.thcookie + '&token=' + userInfo.thtoken,
		dataType: 'jsonp'
	}
	$.loding(true);
	$.xsr(datainfo, function(data) {
		$.loding(false);
		if (data.status == 100) {
			$.tplRender("tpl_userinfo", data);
			returnData();
		} else {
			$.errorlog(data.status);
		}
	})

	function returnData() {
		$("#fa_code").on("click", function() {
			userInfo.phone = $("#phoneNum").val();
			if ($.isNull(userInfo.phone)) {
				$.alert("亲~请输入手机号码");
				return;
			}
			if (!userInfo.phone.match(/^1[3|5|7|8|][0-9]{9}$/)) {
				$.alert("亲~请输入正确的电话号码，请确认:-)");
				return;
			}
			var data = {
				type: 'post',
				url: 'verifycode?mobile=' + userInfo.phone
			}
			$.loding(true);
			$.xsr(data, function(data) {
				$.loding(false);
				if (data.status == 100) {
					$.alert("发送验证码成功,请注意短信");
					if (boolClick) {
						$("#fa_code").val(codetime + "秒");
						$.log(boolClick);
						boolClick = false;
						var time = setInterval(function() {
							codetime--;
							$("#fa_code").val(codetime + "秒");
							if (codetime == 1) {
								clearInterval(time);
								codetime = 60;
								$("#fa_code").val("获取验证码");
								boolClick = true;
							}
						}, 1000);
					}
				} else {
					$.errorlog(data.status);
				}
			});
		})
		$("#updmobile").on("click", function() {
			userInfo.username = $("#J_username").html();
			userInfo.phone = $("#phoneNum").val();
			userInfo.code = $("#code").val();
			if ($.isNull(userInfo.phone)) {
				$.alert("亲~请输入手机号码");
				return;
			}
			if ($.isNull(userInfo.code)) {
				$.alert("亲~请输入验证码");
				return;
			}
			if (!userInfo.phone.match(/^1[3|5|7|8|][0-9]{9}$/)) {
				$.alert("亲~请输入正确的电话号码，请确认:-)");
				return;
			}
			var datainfo = {
				type: 'post',
				url: 'changemobile?username=' + userInfo.username + '&mobile=' + userInfo.phone + '&verifycode=' + userInfo.code + '&token=' + userInfo.thtoken
			}
			$.loding(true);
			$.xsr(datainfo, function(data) {
				$.loding(false);
				if (data.status == 100) {
					$.alert("重新绑定手机成功");
				} else {
					$.errorlog(data.status);
				}
			});
		});
	}

})