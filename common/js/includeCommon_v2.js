/********/
var prm;
var zoomOn;
var jsOn = 1;
var qstr = window.location.search.substring(1).split('&');

for(var i = 0; i < qstr.length; i++) {
  prm = qstr[i].split('=');
  if(prm[0].toLowerCase() == 'js' && prm[1].toLowerCase() == 'off') {
    jsOn = 0;
    break;
  }
}
if(jsOn) {
  var $tmpl = jQuery.noConflict();
  (function() {
/********/
new function() {
	/****************************************
	 * Private
	 ***************************************/
	// CONST
	var SMALL_BORDER_WIDTH = 640;
	var BODY_CLASS_SMALL = "tmpl_small";
	var DURATION_SLIDE = 200;
	var SLIDE_EASING = "easeInOutQuad";
	var SLIDE_COOKIE_NAME = "HMPG-GN";
	var COOKIE_EXPIRE = 999999;

	// Variable
	var isSmallScreen = false;
	var headerHeight = 0;
	var initResize = true;
	var lrgScreenCorpInfoOpen = null;

/********/
	// for Mobile Home
	var isTop = false;
	var label, splink;
	var about1, about2;
	var isNewTop = false;
//	var location = window.location.href;
	var location = window.location.pathname;
	if( location.indexOf("/index.html") != -1 ){
		location = location.replace("/index.html", "/");
	}

	if( location.match(/\/top\/mobile\/$/) && initResize ) {
		if( $tmpl("html").attr("lang") == "ja" ) {
			label = 'モバイル版へ';
		} else {
			label = 'View Mobile Site';
		}
		splink = '<li class="tmpl_util_sml_border" id="tmpl_mobile"><a href="/top/mobile/" onclick="return setDispMode(\'mobile\')">' + label + '</a></li>';
		isTop = true;
	}
//	if( location.match(/\/renewal\/$/) && initResize ) {
	if( ( location.match(/^\/renewal\/$/) || location.match(/^\/$/) ) && initResize ) {
		isNewTop = true;
	}
/********/
	// onLoad
	$tmpl(function(){
		$tmpl(window).resize(resizeFunc);
		$tmpl("#tmpl_utilityOpen").click(menuOpen);
		$tmpl(".tmpl_noscript").removeClass("tmpl_noscript");
		$tmpl(".tmpl_noscript_sml_visible_block ").removeClass("tmpl_noscript_sml_visible_block ");
		$tmpl('#tmpl_aboutSony').css("margin-right", "0");
		$tmpl('#tmpl_aboutSonyHome').css("display", "inline-block");
		$tmpl("#tmpl_aboutSonyHome > a").click(corpInfoClick);
		$tmpl(".tmpl_noscript_sml_invisible").removeClass("tmpl_noscript_sml_invisible");


	});

	// private method
	var resizeFunc = function () {
		var $w = $tmpl(window);
		var w_width = $w.width();

		$body = $tmpl("body");
/********/
		if( isTop && initResize ) {
			$tmpl("#tmpl_support").before(splink);
		}
/********/


		if( ! ($tmpl.browser.msie && $tmpl.browser.version < 9 ) && w_width < SMALL_BORDER_WIDTH ) {
/********/
			qstr = window.location.search.substring(1).split('&');
			for( var i = 0; i < qstr.length; i++ ) {
				prm = qstr[i].split('=');
				if( prm[0].toLowerCase() == 'zoom' ) {
					if( prm[1].toLowerCase() == 'on' ) {
						zoomOn = 1;
						break;
					}
					if( prm[1].toLowerCase() == 'off' ) {
						zoomOn = 0;
						break;
					}
				}
			}
			
			
//			if( zoomOn == 1 || ( location.match(/\/SonyInfo\/Jobs\/newgrads\/tour\//) && zoomOn != 0 ) ) {
			if( zoomOn == 1 ) {
				$tmpl('html').css({"zoom" : w_width / 480});
			}
/********/
			if( ! $body.hasClass(BODY_CLASS_SMALL) || initResize ) {
				if( ! initResize ) {
					lrgScreenCorpInfoOpen = $tmpl("#tmpl_aboutSonyHome").hasClass("tmpl_open");
				}
/********/
				if( isTop ){
					$tmpl("#tmpl_mobile").hide();
				}
/********/
				$body.addClass(BODY_CLASS_SMALL);
				$tmpl('.tmpl_sml_only').show();
				$tmpl('.tmpl_lrg_only').hide();
				$tmpl('#tmpl_searchForm').appendTo('#tmpl_search_small');
				$tmpl("#tmpl_utilityOpen").removeClass("tmpl_open").addClass("tmpl_close");
				$tmpl("#tmpl_utilityOpenMark > img").attr("alt",$tmpl("#tmpl_utilityOpenMark > img").attr("data-open"));
				$tmpl("#tmpl_util").hide();
				$tmpl("#tmpl_aboutSonyHome").removeClass("tmpl_open").addClass("tmpl_close");
				$tmpl("#tmpl_aboutSonyBtn > img").attr("alt",$tmpl("#tmpl_aboutSonyBtn > img").attr("data-open"));
				$tmpl('#tmpl_corpInfoList_sml').hide();

				$tmpl('#tmpl_aboutSony').appendTo('#tmpl_corpInfoList_sml');
				$tmpl('#tmpl_aboutSony a').text(about2);
				$tmpl('#tmpl_aboutSonyTxt').text(about1);

				$tmpl('#tmpl_corpInfo').appendTo('#tmpl_corpInfoList_sml');
				$tmpl('#tmpl_news').appendTo('#tmpl_corpInfoList_sml');
				$tmpl('#tmpl_ir').appendTo('#tmpl_corpInfoList_sml');
				$tmpl('#tmpl_csr').appendTo('#tmpl_corpInfoList_sml');
				$tmpl('#tmpl_jobs').appendTo('#tmpl_corpInfoList_sml');
				$tmpl('#tmpl_tech').appendTo('#tmpl_corpInfoList_sml');
				$tmpl('#tmpl_sd').appendTo('#tmpl_corpInfoList_sml');
//
if( isNewTop ){
	$tmpl("#tmpl_aboutSonyBtn").show();
}
//
				isSmallScreen = true;
			}
		} else {
			if( $body.hasClass(BODY_CLASS_SMALL) || initResize ) {
				corpInfoReset();
/********/
				if( isTop ){
					$tmpl("#tmpl_mobile").show();
				}
/********/
				$body.removeClass(BODY_CLASS_SMALL);
				$tmpl('html').css({"zoom" : 1});
				$tmpl("#tmpl_util").css({display:""});
				$tmpl('.tmpl_sml_only').hide();
				$tmpl('.tmpl_lrg_only').show();

				$tmpl('#tmpl_aboutSonyHome').before($tmpl('#tmpl_aboutSony'));
				$tmpl('#tmpl_aboutSony a').text(about1);
				$tmpl('#tmpl_aboutSonyTxt').text(about2);

				$tmpl('#tmpl_corpInfo').appendTo('#tmpl_globalNavi');
				$tmpl('#tmpl_news').appendTo('#tmpl_globalNavi');
				$tmpl('#tmpl_ir').appendTo('#tmpl_globalNavi');
				$tmpl('#tmpl_csr').appendTo('#tmpl_globalNavi');
				$tmpl('#tmpl_jobs').appendTo('#tmpl_globalNavi');
				$tmpl('#tmpl_tech').appendTo('#tmpl_globalNavi');
				$tmpl('#tmpl_sd').appendTo('#tmpl_globalNavi');

				var $corpInfo = $tmpl("#tmpl_aboutSonyHome");
				var cookieVal = $tmpl.cookie(SLIDE_COOKIE_NAME);
//				if( cookieVal != null ){
				$aboutSonyBtnImg = $tmpl("#tmpl_aboutSonyBtn > img");
if( isNewTop ){
	$corpInfo.removeClass("tmpl_close").addClass("tmpl_open");
	$aboutSonyBtnImg.attr("alt",$aboutSonyBtnImg.attr("data-open"));
	$tmpl("#tmpl_aboutSonyBtn").hide();
}
else if( cookieVal != null ){
//
					if( cookieVal == 0 ) {
						$corpInfo.addClass("tmpl_close");
						$aboutSonyBtnImg.attr("alt",$aboutSonyBtnImg.attr("data-open"));
					}else{
						$corpInfo.removeClass("tmpl_close").addClass("tmpl_open");
						$aboutSonyBtnImg.attr("alt",$aboutSonyBtnImg.attr("data-close"));
					}
				}
				if ( lrgScreenCorpInfoOpen != null ) {
					lrgScreenCorpInfoOpen ?
						$corpInfo.removeClass("tmpl_close").addClass("tmpl_open"):
						$corpInfo.removeClass("tmpl_open").addClass("tmpl_close");

					$aboutSonyBtnImg.attr("alt", ($corpInfo.hasClass("tmpl_close") ? $aboutSonyBtnImg.attr("data-open") : $aboutSonyBtnImg.attr("data-close")));
				}
				if( $corpInfo.hasClass("tmpl_close") ) {
					$tmpl("#tmpl_globalNavi").hide();
				}else{
					$tmpl("#tmpl_globalNavi").show();
				}

				isSmallScreen = false;
			}
		}
		initResize = false;
	};

	var corpSlidable = true;
	var globalNaviOpenable = true;
	var corpInfoClick = function(){
		if( isSmallScreen ) {
			if( corpSlidable ) {
				corpSlidable = false;
				var $corpInfo = $tmpl("#tmpl_aboutSonyHome");
				$corpInfo.hasClass("tmpl_close") ? 
					$corpInfo.removeClass("tmpl_close").addClass("tmpl_open") : 
					$corpInfo.removeClass("tmpl_open").addClass("tmpl_close") ; 

				var $img = $tmpl("#tmpl_aboutSonyBtn > img");
				$img.attr("alt", ($corpInfo.hasClass("tmpl_close") ? $img.attr("data-open") : $img.attr("data-close")));

				$tmpl('#tmpl_corpInfoList_sml').slideToggle(DURATION_SLIDE, SLIDE_EASING ,
					function() { corpSlidable = true; }
				);
			}
			return false;
		}else{
			if( globalNaviOpenable ) {
				globalNaviOpenable = false;
				var $corpInfo = $tmpl("#tmpl_aboutSonyHome");
				var $img = $tmpl("#tmpl_aboutSonyBtn > img");
				if( $corpInfo.hasClass("tmpl_close") ){
					$corpInfo.removeClass("tmpl_close").addClass("tmpl_open");
					$img.attr("alt", $img.attr("data-close"));
					$tmpl.cookie(SLIDE_COOKIE_NAME, "1", { expires: COOKIE_EXPIRE , path: '/' });
				}else{
					$corpInfo.removeClass("tmpl_open").addClass("tmpl_close") ;
					$img.attr("alt", $img.attr("data-open"));
					$tmpl.cookie(SLIDE_COOKIE_NAME, "0", { expires: COOKIE_EXPIRE , path: '/' });
				}

				$tmpl('#tmpl_globalNavi').slideToggle(DURATION_SLIDE, SLIDE_EASING ,
					function() { globalNaviOpenable = true; }
				);
			}
			return false;
		}
	};

	var corpInfoReset = function() {
	}

	var menuOpenable = true;
	var menuOpen = function() {
		if( menuOpenable ) {
			menuOpenable = false;

			var $utilOpen = $tmpl("#tmpl_utilityOpen");
			$utilOpen.hasClass("tmpl_close") ?
				$utilOpen.removeClass("tmpl_close").addClass("tmpl_open") : 
				$utilOpen.removeClass("tmpl_open").addClass("tmpl_close") ; 

			var $img = $tmpl("#tmpl_utilityOpenMark > img");
			$img.attr("alt", ($utilOpen.hasClass("tmpl_close") ? $img.attr("data-open") : $img.attr("data-close")));

			var $menu = $tmpl("#tmpl_util");
			$menu.slideToggle(DURATION_SLIDE, SLIDE_EASING ,
				function() {
					menuOpenable = true;
				}
			);
			corpInfoReset();
		}
		return false;
	};
};
/********/
  })();
}
/********/




