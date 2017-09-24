define('lib/common', ['lib/zepto', 'lib/makeUrl', 'lib/cookie', 'lib/url', 'lib/log', 'lib/template'], //
	function(undefined, makeUrl, cookie, url, log, template) {
		/**
		 * make service url
		 */
		$.makeUrl = makeUrl;
		/**
		 * cookie
		 */
		$.cookie = cookie;

		$.url = url;
		$.log = function(o, title) {
			if (window._debug_) {
				log.log.apply(this, arguments);
			}
		}
		window.Logger = log;

		$.tpl = template;

		$.mix = function() {
			var re = {};
			for (var i = 0; i < arguments.length; i++) {
				var o = arguments[i];
				for (var p in o) {
					if (p in re) {
						if (o[p] != undefined) {
							re[p] = o[p];
						}
					} else {
						re[p] = o[p];
					}
				}
			}
			return re;
		}

		/**
		 * 把参数2,3...的所有不为undefined的key复制到参数1上
		 */
		$.merge = function() {
				if (arguments.length > 0) {
					var re = arguments[0];
					for (var i = 1; i < arguments.length; i++) {
						var o = arguments[i];
						for (var p in o) {
							if (o[p] != undefined) {
								re[p] = o[p];
							}
						}
					}
					return re;
				}
				return undefined;
			}
			/**
			 * 判断是否为空
			 */
		$.isNull = function(o) {
			return o == undefined || o == "undefined" || o == null || o == '';
		}

		/**
		 * jsonparse
		 */
		$.parseJSON = function(str) {
			try {
				return JSON.parse(str);
			} catch (e) {
				//todo
				return undefined;
			}
		}


		/**
		 * 节点替换成制定HTML
		 */
		$.replaceHTML = function(element, html) {
			var div = document.createElement('div');
			div.innerHTML = html;
			for (var i = 0, a = div.childNodes; i < a.length;) {
				if (element.parentNode) {
					element.parentNode.insertBefore(a[0], element);
				}
			}
			div = null;
			element.parentNode.removeChild(element);
		}
		$.insertHTML = function(element, html, pos) {
			var div = document.createElement('div');
			div.innerHTML = html;
			pos = pos || 'after';
			for (var i = 0, a = div.childNodes; i < a.length;) {
				switch (pos.toLowerCase()) {
					case 'before':
						element.parentNode.insertBefore(a[0], element);
						break;
					case 'after':
						if (element.parentNode.lastChild == element) {
							element.parentNode.appendChild(a[a.length - 1]);
						} else {
							element.parentNode.insertBefore(a[a.length - 1], element.nextSibling);
						}
						break;
				}
			}
			div = null;
		}

		$.tplRender = function(id, data, pos) {
			var el = $('#' + id);
			var rendered = $.tpl(id, data);
			if (typeof pos == 'undefined') {
				pos = el.attr('data-insert-pos');
			}
			if (pos == '') {
				pos = 'after';
			}
			if (pos == 'replace') {
				$.replaceHTML(el[0], rendered);
			} else {
				$.insertHTML(el[0], rendered, pos);
			}
		}


		$.xsr = function(datainfo, callback) {
			$.log(datainfo);
			$.ajax({
				type: datainfo.type || 'get',
				url: datainfo.url,
				dataType: datainfo.dataType || 'json',
				success: callback,
				error: function() {
					$.loding(false);
					$.alert("亲~当前网络不稳定请稍后在试");
				}
			});
		}

		$.errorlog = function(errorData) {
			if (errorData == 101) {
				$.alert("亲~对不起您请求失败啦!请再次操作!");
			} else if (errorData == 102) {
				$.alert("数据库异常");
			} else if (errorData == 103) {
				$.alert("请求参数非法");
			} else if (errorData == 104) {
				$.alert("对象已经存在");
			} else if (errorData == 105) {
				$.alert("对象不存在");
			} else if (errorData == 106) {
				$.alert("验证码错误");
			} else if (errorData == 107) {
				$.alert("空数据");
			} else if (errorData == 108) {
				$.alert("超时");
			} else if (errorData == 109) {
				$.alert("不能识别");
			} else if (errorData == 110) {
				$.alert("已处理，不能重复处理");
			} else if (errorData == 111) {
				$.alert("未知错误");
			} else if (errorData == 112) {
				$.alert("认证错误,请重新登录", function() {
					window.location.href = '../login/login.html?returnurl=' + window.location.href;
				});
			} else if (errorData == 113) {
				$.alert("余额不足");
			} else if (errorData == 114) {
				$.alert("已付款");
			}
		}

		$.alert = function(msg, calblack) {
			if (typeof msg == 'undefined') {
				return '';
			}
			var html = '<div class="hidelevel" style="display: block;"><div class="alertinfo" id="reception"><div id="closeb" style="position:absolute;right:4px;top:4px"><a href="javascript:;" id="close"  title="关闭" class="ui-link"><img src="../static/images/closeb1.png" width="22"></a></div><h2 id="msg">' + msg + '</h2><p><a id="confirm" href="javascript:void(0)" class="addCart ui-link">确定</a></p></div></div>';
			if ($(".hidelevel").length == 0) {
				$("body").append(html);
			} else {
				$("#msg").html(msg);
				$(".hidelevel").show();
			}
			$("#reception").css({
				"left": ($(window).width() - $("#reception").width()) / 2,
				"top": ($(window).height() - $("#reception").height()) / 2
			});
			$("#close").on("click", function() {
				$("#msg").html(msg);
				$(".hidelevel").hide();
			})
			$("#confirm").on("click", function() {
				$.log("进入确认");
				$("#msg").html(msg);
				$(".hidelevel").hide();
				if (!$.isNull(calblack)) {
					calblack();
				}

			})
		}
		$.loding = function(boolLoding) {
			var html = '<div class="J_Mask"><div class="timer"></div></div>';
			if ($(".J_Mask").length == 0) {
				$("body").append(html);
			}
			$(".timer").css({
				"top": ($(window).height() - 48) / 2
			});
			if (boolLoding) {
				$(".J_Mask").show();
			} else {
				$(".J_Mask").hide();
			}
		}

		$.menu = function() {
			var html = '<div class="wrap"><div class="menu"><img class="icon_menu" src="../static/images/menu.png"><span></span></div><div class="btn btn1" data-num="1"><span><img src="../static/images/iconfont-shouye.png" width="25px" height="25px"></span></div><div class="btn btn2" data-num="2"><span><img src="../static/images/iconfont-yonghu.png" width="25px" height="25px"></span></div><div class="btn btn3" data-num="3"><span><img src="../static/images/iconfont-suoding.png" width="25px" height="25px"></span></div><div class="btn btn4" data-num="4"><span><img src="../static/images/iconfont-shoujidianzhao.png" width="25px" height="25px"></span></div></div>';
			if(!$("body").hasClass("wrap")){
				$("body").append(html);
			}
			$(".menu").click(function() {
				var span = $(this).find("span");
				if (span.hasClass("open")) {
					span.removeClass("open").addClass("close");
					$(".btn").removeClass("open").addClass("close");
				} else {
					span.removeClass("close").addClass("open");
					$(".btn").removeClass("close").addClass("open");
				}
			});
			$(".btn1").click(function(){
				window.location.href="../index/index.html";
			});
			$(".btn2").click(function(){
				window.location.href="../index/Account.html";
			});
			$(".btn3").click(function(){
				window.location.href="../index/Center.html";
			});
			$(".btn4").click(function(){
				window.location.href="../userinfo/userinfo.html";
			});
		}

		return $;
	});