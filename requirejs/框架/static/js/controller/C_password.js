require(['lib/common'], function($) {
	$.menu();
	var userInfo={
		thcookie:$.cookie.get("th_userName"),
		thtoken:$.cookie.get("th_token"),
		yuan:'',
		xin:'',
		rexin:''
	}
	if($.isNull(userInfo.thcookie)){
		window.location.href="../login/login.html?returnurl="+window.location.href
	}
	
	$(".J_addCart").on("click",function(){
		userInfo.yuan=$("#yuan").val();
		userInfo.xin=$("#xin").val();
		userInfo.rexin=$("#rexin").val();
		$.log(userInfo.yuan,userInfo.xin,userInfo.rexin);
		if ($.isNull(userInfo.yuan)) {
			$.alert("亲~请输入原密码:-)");
			return;
		}
		if ($.isNull(userInfo.xin)) {
			$.alert("亲~请输入新密码:-)");
			return;
		}
		if ($.isNull(userInfo.rexin)) {
			$.alert("亲~请确认你的新密码:-)");
			return;
		}
		if(userInfo.xin!=userInfo.rexin){
			$.alert("两次输入的密码不一致");
			return;
		}
		if (!userInfo.yuan.match(/^[a-z0-9_-]{6,18}$/)||!userInfo.xin.match(/^[a-z0-9_-]{6,18}$/)||!userInfo.rexin.match(/^[a-z0-9_-]{6,18}$/)) {
			$.alert("亲~密码为6-18位字母或数字组合，请确认:-)");
			return;
		}
		var datainfo={
			type:'post',
			url: "changepassword?username=" + userInfo.thcookie + "&oldpassword=" + userInfo.yuan+"&newpassword="+userInfo.xin+"&token="+userInfo.thtoken
		}
		$.loding(true);
		$.xsr(datainfo,function(data){
			$.loding(false);
			if (data.status == 100) {
				$.alert("修改密码成功!重新登录后生效!",function(){
					$.cookie.add('th_userName', '','/',1);
					$.cookie.add('th_token', '','/',1);
					window.location.href="../login/login.html";
				});
			} else {
				$.errorlog(data.status);
			}
		});
	});
})