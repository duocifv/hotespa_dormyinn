$(document).ready(function(){
/* ==================================================
Show & Hide Header Page Nav SP
================================================== */
var navsp = {
	show : function() {
		$('.headerPage_nav-sp_ctn').show();
		$('.headerPage_nav-sp_ctn_inner').animate({marginLeft : "20%"});
		$('.headerPage_nav-sp_btn').animate({right: "80%"}, function() {
			$(this).addClass('opened');
		});
		$('body').css("position", "relative");
		$('body').animate({left : "-80%"}, function() {
			$('.headerPage_nav-sp_ctn').addClass('opened');
		});
		
	},
	hide : function() {
		$('.headerPage_nav-sp_ctn_inner').animate({marginLeft : "100%"});
		$('.headerPage_nav-sp_btn').animate({right: "0"}, function() {
			$(this).removeClass('opened');
		});
		$('body').animate({left : "0%"}, function() {
			$('body').css("position", "static");
			$('.headerPage_nav-sp_ctn').hide().removeClass('opened');
		});
		
	}
}
$('.headerPage_nav-sp_btn').click(function(){
	navsp.show();
});
$('body').click(function(){
	if ($('.headerPage_nav-sp_ctn').hasClass('opened')) {
		navsp.hide();
	}
});
$('.headerPage_nav-sp_ctn_inner').click(function(event) {
	event.stopPropagation();
});


/* ==================================================
Checin Fixed
================================================== */
var checkin = {
	fixed : function() {
		$('.checkin').addClass('fixed');
	},
	none : function() {
		$('.checkin').removeClass('fixed');
	}
}
var contentCmn03Pos = $(".contentCmn03").offset().top;
var windowHeight = $(window).height();
if(($(window).scrollTop() + windowHeight) < contentCmn03Pos) {
	checkin.fixed();
};
$(window).scroll(function() {
	if (($(window).scrollTop() + windowHeight) < contentCmn03Pos - 40) {
		checkin.fixed();
	} else {
		checkin.none();
	}
});


/* ==================================================
Date Picker
================================================== */
$(function() {
	$('#i_day').datepicker({
		numberOfMonths: 2,
		showButtonPanel: false
	});
	$('#i_day').datepicker('setDate', new Date());
});


});