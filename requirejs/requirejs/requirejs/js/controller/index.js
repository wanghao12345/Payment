define(['lib/zepto', 'lib/template', 'api/iconlistApi'], function(undefined, tpl, indexapi) {

//	var data = {
//		title: '标签',
//		list: ['文艺', '博客', '摄影', '电影', '民谣', '旅行', '吉他']
//	};
//	var html = tpl('test', data);

		console.log(indexapi);
		var html= tpl("test",indexapi);
		console.log(html);
		$(".content").html(html);
		
		$("li").on("click",function(){
			alert(1);
		})
})