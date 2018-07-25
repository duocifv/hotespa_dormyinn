function writeHeader(){

	$.ajax({
		url: "/common/include/header_b.html", //パスはcommon.jsが読み込まれたHTMLファイルが基準になります
		cache: false, //キャッシュを利用するか（お好みで）
		async: false, //非同期で読み込むか（お好みで）
		success: function(html){
			document.write(html);	
		}
	});

}

function header_global(){

	$.ajax({
		url: "/common/include/header_g.html", //パスはcommon.jsが読み込まれたHTMLファイルが基準になります
		cache: false, //キャッシュを利用するか（お好みで）
		async: false, //非同期で読み込むか（お好みで）
		success: function(html){
			document.write(html);	
		}
	});

}



function header_spa(){

	$.ajax({
		url: "/common/include/header_s.html", //パスはcommon.jsが読み込まれたHTMLファイルが基準になります
		cache: false, //キャッシュを利用するか（お好みで）
		async: false, //非同期で読み込むか（お好みで）
		success: function(html){
			document.write(html);	
		}
	});

}


function header_resort(){

	$.ajax({
		url: "/common/include/header_r.html", //パスはcommon.jsが読み込まれたHTMLファイルが基準になります
		cache: false, //キャッシュを利用するか（お好みで）
		async: false, //非同期で読み込むか（お好みで）
		success: function(html){
			document.write(html);	
		}
	});

}


function header_neutral(){

	$.ajax({
		url: "/common/include/header_n.html", //パスはcommon.jsが読み込まれたHTMLファイルが基準になります
		cache: false, //キャッシュを利用するか（お好みで）
		async: false, //非同期で読み込むか（お好みで）
		success: function(html){
			document.write(html);	
		}
	});

}







$(window).scroll(function() {
 var scrollWindow = $(window).scrollTop() + $(window).height();
 var posFixed = ($('.contentCmn02').offset().top + $('.contentCmn02').outerHeight() + 40) + $('.checkin').height();

 if (scrollWindow <= posFixed) {
  $('.checkin').css({
   position: 'fixed',
   bottom: 0,
   left: 0
        });
    } else {
  $('.checkin').css('position', 'static');
    }
});