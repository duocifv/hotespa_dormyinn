$(function () {
	gmapRouteSearch();
});

var gmapRouteSearch = function() {
	var that = {};
	that.type ="car";
	that.$tab = $("#type-tab");
	that.$btnTrain = $("#type-train");
	that.$btnCar = $("#type-car");
	that.$btnWalk = $("#type-walk");


	that.$fromPlace = $("#from-place");
	that.$toPlace = $("#to-place");

	that.$cngBtn = $("#btn-change-form-to");
	that.$cngBtn02 = $("#btn-change-form-to02");
	that.$srcBtn = $("#gmap-route-search");
	
	that.init = function() {
		that.$btnCar.click(function(){
			that.tyepChange($(this),"car");
		});
		that.$btnTrain.click(function(){
			that.tyepChange($(this),"train");
		});		
		that.$btnWalk.click(function(){
			that.tyepChange($(this),"walk");
		});


		that.$cngBtn.click(function() {
			that.toFromChange();
		});
		that.$cngBtn02.click(function() {
			that.toFromChange02();
		});
		that.$srcBtn.click(function(){
			var fromText = that.$fromPlace.find("textarea").val()
			var toText = that.$toPlace.find("textarea").val();
			that.routeSearch(fromText,toText,that.type);
			return false;
		});
	};
	
	that.tyepChange = function($target,typeStr) {
		that.$tab.find(".select").removeClass("select");
		$target.addClass("select");
		that.type = typeStr;
	};
	
	that.toFromChange = function() {
		that.$fromPlace.append(that.$toPlace.find("textarea:first"));
		that.$toPlace.append(that.$fromPlace.find("textarea:first"));
	};
	that.toFromChange02 = function() {
		that.$fromPlace.append(that.$toPlace.find("textarea:first"));
		that.$toPlace.append(that.$fromPlace.find("textarea:first"));
	};
	
	that.routeSearch = function(from,to,type) {
		var dirflg;
		var from = encodeURI(from); 
		var to = encodeURI(to); 
		if(type == "car") {
			dirflg = "d";
		}
		
		if(type == "train") {
			dirflg = "r";
		}

	
		if(type == "walk") {
			dirflg = "w";
		}


	
		var gmapURL = "https://maps.google.co.jp/maps?saddr=" + from + "&daddr=" + to + "&t=m&dirflg=" + dirflg;
		window.open(gmapURL);
	};
	
	that.init();
	return that;
};