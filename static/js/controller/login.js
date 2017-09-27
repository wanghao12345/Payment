require(['lib/common'],function($){
	
	var info = {
		returnurl:$.url.getParam('returnurl'),
		username:'',
		password:''
	}
	$("#buttom").on("click",function(){
		info.username = $("#userName").val();
		info.password = $("#passWord").val();

		$.log(info.username,info.password);
		if ($.isNull(info.username)) {
			$.alert("亲~请输入用户名");
			return;
		}
		if ($.isNull(info.password)) {
			$.alert("亲~请输入密码");
			return;
		}
/*		if (!info.username.match(/^[a-z0-9_-]{3,16}$/)) {
			$.alert("亲~用户名为3~16位字母数字组合,请确认:-)");
			return;
		}
		if (!info.password.match(/^[a-z0-9_-]{6,18}$/)) {
			$.alert("亲~密码为6-18位字母或数字组合，请确认:-)");
			return;
		}*/

		/*var data = {
			dataType:'jsonp',
			url:'login?username='+info.username+'&password'+info.password
		}
		$.loding(true);
		window.location.href = "../index/index.html";
		$.xsr(data,function(data){
			$.loding(false);
			if (data.status == 100) {
				var time = 60 * 60 * 24 * 365; //设置cookie时间为1年
				$.cookie.add('th_userName', info.username,'/',time);
				$.cookie.add('th_token', data.token,'/',time);
				$.log($.cookie.get("th_userName"));
				var h5Cookie = $.cookie.get("th_userName");
				if (!$.isNull(h5Cookie)) {
					if(!$.isNull(info.returnurl)){
						window.location.href=info.returnurl;
					}else{
						window.location.href = "../index/index.html";
					}
				}
			} else {
				$.errorlog(data.status);
			}
		});*/
		var thcookie = {
			th_userName:$.cookie.get("th_userName"),
			th_password:$.cookie.get("th_password")
		}

		if (!$.isNull(thcookie.th_userName)&&!$.isNull(thcookie.th_password)) {
			window.location.href = "../index/index.html";
		} else {
			$.alert("亲~该账号还没有注册");
		}



	});



})