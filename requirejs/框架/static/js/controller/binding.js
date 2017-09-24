require(['lib/common'], function($) {
	$.menu();
	var codetime = 60;
	var boolClick = true;
	var info = {
		thcookie: $.cookie.get("th_userName"),
		thtoken: $.cookie.get("th_token"),
		username: '',
		idcard: '',
		num: '',
		phone: '',
		code: '',
		type: $.url.getParam('type'),
		returnurl:$.url.getParam('returnurl')
	}
	if ($.isNull(info.thcookie)) {
		window.location.href = "../login/login.html?returnurl=" + window.location.href
	}
	if (info.type == 1) {
		$("title").html("绑定水费");
		$(".htcolor").html("绑定水费");
	}
	$("#fa_code").on("click", function() {
		info.phone = $("#phone").val();
		if ($.isNull(info.phone)) {
			$.alert("亲~请输入手机号码");
			return;
		}
		if (!info.phone.match(/^1[3|5|7|8|][0-9]{9}$/)) {
			$.alert("亲~请输入正确的电话号码，请确认:-)");
			return;
		}
		var data = {
			type: 'post',
			dataType: 'json',
			url: 'verifycode?mobile=' + info.phone
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
	});
	$("#buttom").on("click", function() {
		info.username = $("#userName").val();
		info.idcard = $("#idcard").val();
		info.num = $("#num").val();
		info.phone = $("#phone").val();
		info.code = $("#code").val();
		if ($.isNull(info.username)) {
			$.alert("亲~请输入用户名:-)");
			return;
		}
		if ($.isNull(info.idcard)) {
			$.alert("亲~请输入身份证");
			return;
		}
		if ($.isNull(info.num)) {
			$.alert("亲~请输入表号");
			return;
		}
		if ($.isNull(info.phone)) {
			$.alert("亲~请输入手机号码");
			return;
		}
		if ($.isNull(info.code)) {
			$.alert("亲~请输入验证码");
			return;
		}
		if (!info.phone.match(/^1[3|5|7|8|][0-9]{9}$/)) {
			$.alert("亲~请输入正确的电话号码，请确认:-)");
			return;
		}
		var data = {
			type: 'post',
			dataType: 'json',
			url: 'bindingdata?username=' + info.thcookie + '&accountname=' + info.username + "&idcard=" + info.idcard + "&tableno=" + info.num + "&type=" + info.type + "&verifycode=" + info.code + "&token=" + info.thtoken
		}
		$.loding(true);
		$.xsr(data, function(data) {
			$.loding(false);
			if (data.status == 100) {
				$.alert("绑定成功",function(){
					if(!$.isNull(info.returnurl)){
						window.location.href="../bind/Binding_s.html";
					}
				});
			} else {
				$.errorlog(data.status);
			}
		});
	});
});