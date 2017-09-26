require(['lib/common'],function($){
	var codetime = 60;
	var boolClick = true;
	var info = {
		username:'',
		password:'',
		repassword:'',
		phone:'',
		code:''
	}
	$("#fa_code").on("click",function(){
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
			type:'post',
			dataType:'json',
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
		info.password = $("#passWord").val();
		info.repassword = $("#repassWord").val();
		info.phone = $("#phone").val();
		info.code = $("#code").val();
		$.log(info.username, info.password);
		if ($.isNull(info.username)) {
			$.alert("亲~请输入用户名:-)");
			return;
		}
		if ($.isNull(info.password)) {
			$.alert("亲~请输入密码");
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
		if (!info.username.match(/^[a-z0-9_-]{3,16}$/)) {
			$.alert("亲~用户名为3~16位字母数字组合,请确认:-)");
			return;
		}
		if (!info.password.match(/^[a-z0-9_-]{6,18}$/)) {
			$.alert("亲~密码为6-18位字母或数字组合，请确认:-)");
			return;
		}
		if (!info.phone.match(/^1[3|5|7|8|][0-9]{9}$/)) {
			$.alert("亲~请输入正确的电话号码，请确认:-)");
			return;
		}
		if (info.password != info.repassword) {
			$.alert("亲~两次输入的密码不一致,请从新输入");
			return;
		}
		var data = {
			type: 'post',
			url: 'register?username=' + info.username + '&password=' + info.password + "&mobile=" + info.phone + "&verifycode=" + info.code
		}
		$.loding(true);
		$.xsr(data, function(data) {
			$.loding(false);
			if (data.status == 100) {
				$.alert("注册成功,赶快去登录试下你的帐号把", function() {
					$.log("注册方法");
					window.location.href = "../login/login.html";
				});
			} else {
				$.errorlog(data.status);
			}
		});
	});
})