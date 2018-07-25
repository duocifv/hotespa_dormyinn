//初期表示
$(function() {
    try {
        DYNns.System.TEST = DYNns.setupBinary(DYNns.System.TEST);
        DYNns.System.UNITTEST = DYNns.setupBinary(DYNns.System.UNITTEST);
        $.each(DYNns.panelset, function(suffix, objPanel) {
            objPanel.tabs = DYNns.setTabToPanel(objPanel.tabs);
            if (_.isUndefined(objPanel.tabs)) return false;
            DYNns.execPanel(objPanel, suffix);
        });
    } catch (error) {
        if (DYNns.System.errortext != "") {
            DYNns.ErrorTextDisplay(DYNns.System.errortext);
        } else {
            if (DYNns.System.TEST) DYNns.ErrorTextDisplay(error);
        }
    }
});

(function(DYNns, $, _, undefined) {
    "use strict";
    DYNns.$ = $;
    DYNns._ = _;

    //パネル生成関数
    DYNns.execPanel = function(objPanel, suffix) {
        //suffixに該当するformが存在するか判定
        if ($("#" + suffix).length <= 0) {
            DYNns.ErrorTextDisplay("ERROR:ID=" + suffix + "を満たすForm要素が見つかりません");
            return 0;
        }
        $("#" + suffix).attr("id", "dynSearch" + suffix);
        objPanel.formid = "#dynSearch" + suffix;
        //各パネル毎の初期設定
        objPanel.idSuffix = suffix;
        objPanel.sts = {};

        //各タブ毎の初期設定
        _.forEach(objPanel.tabs, function(objTab, tabcount) {
            //親参照設定
            objTab.objPanel = objPanel;
            //Words設定
            objTab.words = DYNns.setWordsToTab(objTab.words);
            if (_.isUndefined(objTab.words)) return false;
            //suffix設定
            objTab.idSuffix = suffix;
            objTab.thisTabNum = tabcount;
            objTab.sts.idSuffix = suffix;
            objTab.sts.thisTabNum = tabcount;
            objTab.words.idSuffix = suffix;
            objTab.words.thisTabNum = tabcount;
            objTab.formid = objPanel.formid;
            //Binary設定
            _.forEach(objTab.sts.nowdisp, function(display) {
                display = DYNns.setupBinary(display);
            });
            objTab.sts.windowOpenSubmit = DYNns.setupBinary(objTab.sts.windowOpenSubmit);
            objTab.sts.windowOpenCancel = DYNns.setupBinary(objTab.sts.windowOpenCancel);
            objTab.sts.bookingDate.usecalendar = DYNns.setupBinary(objTab.sts.bookingDate.usecalendar);
            //自動表示判定
            DYNns.autoSetupDisplay.set(objTab);
            objTab.sts.olddisp = {};
            //group設定
            objTab.sts.hdata = DYNns.setValArray(objTab.sts.hdata);
            objTab.sts.groupNum = 0;
        });

        //専用メソッドを生成
        DYNns.panelFunctionSetup(objPanel);

        //タブ毎の項目生成
        objPanel.execTab(objPanel.tabs[objPanel.initialization.starttab]);
        DYNns.setupTabDispunit(objPanel);

        //保存情報の初期化
        DYNns.pushTabDate(objPanel);
        DYNns.pushTabChkymd(objPanel);
        DYNns.pushTabChkpsn(objPanel);
        DYNns.pushTabDispunit(objPanel);
    };

    //各パネルの専用メソッドを生成
    DYNns.panelFunctionSetup = function(objPanel) {
        //タブ生成関数
        objPanel.execTab = function(objTab) {
            var objPanel = this;
            var startday = new Date();
            //tab番号設定
            objPanel.nowTab = objTab.thisTabNum;
            //表示モード記憶
            objPanel.nowMode = DYNns.getAdressMode(objTab);
            //自動表示判定
            DYNns.autoSetupDisplay.set(objTab);
            //一旦消す
            $(objTab.formid).css("display", "none");
            //日付の初期設定
            DYNns.setupDateRange(objTab);
            startday = DYNns.copyDate(objTab.startday);

            //tab選択部分の生成
            if (objTab.sts.nowdisp.tabs) {
                DYNns.setupBrocks.set(objTab, "tabs", "dynTabsHead");
                DYNns.setupTabs(this);

                //選択されてるtabの選別
                $(objPanel.formid + " [class^=Tab]").each(function(tabcount, tabHead) {
                    if (objTab.thisTabNum === tabcount) {
                        $(tabHead).addClass("current");
                    } else {
                        $(tabHead).removeClass("current");
                    }
                });
            }

            DYNns.setupBrocks.set(objTab, "button", "dynSubmit");

            DYNns.setupBrocks.set(objTab, "bookingdate", "bookingDate");

            DYNns.setupBrocks.set(objTab, "persons", "dynPersons");

            DYNns.setupBrocks.set(objTab, "dpselect", "dynDP", "WBFplan");

            DYNns.setupBrocks.set(objTab, "group", "dynGroup", "group");

            DYNns.setupBrocks.set(objTab, "bookingnights", "bookingNights", "nights");

            DYNns.setupBrocks.set(objTab, "bookingrooms", "bookingRooms", "rooms");

            DYNns.setupBrocks.set(objTab, "chkymd", "undecided", "chkymd");

            DYNns.setupBrocks.set(objTab, "chkpsn", "lbchkpsn", "chkpsn");

            DYNns.setupBrocks.set(objTab, "price", "dynPrice", "budgets");

            DYNns.setupBrocks.set(objTab, "categorybooking", "dynCategoryBooking", "categorybooking");

            DYNns.setupBrocks.set(objTab, "categoryroom", "dynCategoryRoom", "categoryroom");

            DYNns.setupBrocks.set(objTab, "categoryroomtype", "dynCategoryRoomType", "categoryroomtype");

            DYNns.setupBrocks.set(objTab, "dispunit", "dynDispunit");
            DYNns.setupBrocks.set(objTab, "dispunitPlan", "dispPlanRoot", "dispunitPlan");
            DYNns.setupBrocks.set(objTab, "dispunitRoom", "dispRoomRoot", "dispunitRoom");
            DYNns.setupBrocks.set(objTab, "dispunitCalendar", "dispCaldRoot", "dispunitCalendar");
            DYNns.setupTabDispunit(this);

            DYNns.setupGroups(objTab);
            DYNns.getAirPortJsonp.get(objTab);
            if (objTab.sts.nowdisp.nights) DYNns.setupNightsRooms(objPanel.formid + " .cmbNights", objTab.sts.bookingDate.nights);
            if (objTab.sts.nowdisp.rooms) DYNns.setupNightsRooms(objPanel.formid + " .cmbRooms", objTab.sts.bookingDate.rooms);
            DYNns.setupPersons(objTab);
            if (objTab.sts.nowdisp.budgets) {
                DYNns.setupBudget.get(objPanel.formid + " .minPrice", objTab.sts.budgets.min, objTab, 0);
                DYNns.setupBudget.get(objPanel.formid + " .maxPrice", objTab.sts.budgets.max, objTab, 1);
            }
            DYNns.setupCategory.set(objTab);

            //日付選択項目のセット
            $(objPanel.formid).off("click change", ".cmbARRY,.cmbARRM,.cmbARRD");
            if (objTab.sts.bookingDate.usecalendar) {
                //カレンダー使う場合
                DYNns.setupCalendar(this);
                DYNns.pullDate(this, startday);

                $(objPanel.formid).on("click", ".cmbARRY,.cmbARRM,.cmbARRD", function() {
					
                    objPanel.cal.write();
                });
                $(objPanel.formid).on("change", ".cmbARRY,.cmbARRM,.cmbARRD", function() {
                    objPanel.cal.getFormValue();
                    objPanel.cal.hide();
                });
                if (!objTab.sts.nowdisp.year) $(objPanel.formid + " .cmbARRY").attr("type", "hidden");
                if (objTab.sts.nowdisp.year) $(objPanel.formid + " .cmbARRY").after(_.template("<%=bookingDatePunctuation%>")(objTab.words));
            } else {
                //カレンダー使わない場合
                DYNns.setupSelectDate.get(objTab, startday);
                $(objPanel.formid).on("change", ".cmbARRY,.cmbARRM,.cmbARRD", function() {
                    DYNns.setupSelectDate.push(objTab);
                    DYNns.pushTabDate(objPanel);
                    DYNns.setupSelectDate.get(objTab, objPanel.sts.date);
                });
            }

            //その他イベントハンドラ設定
            $(objPanel.formid).on("click", ".chkymd", function() { objPanel.cngchkymd(); });
            $(objPanel.formid).on("click", ".chkpsn", function() { objPanel.cngchkpsn(); });
            $(objPanel.formid).on("click", ".buttonSubmit", function() { objPanel.submit(); });
            $(objPanel.formid).on("click", ".buttonCancel", function() { objPanel.btnCancel(); });
            $(objPanel.formid + " [class^=Tab]").each(function(tabcount, tabHead) {
                $(tabHead).on("click", function() { objPanel.viewchange(tabcount); });
            });
            $(window).on("resize", function() {
                if (objPanel.nowMode !== DYNns.getAdressMode(objTab)) objPanel.viewchange();
            });

            //完成したら表示
            $(objTab.formid).css("display", "block");
        };

        //tab切り替え関数
        objPanel.viewchange = function(toChangeTab) {
            if (_.isUndefined(toChangeTab)) toChangeTab = this.nowTab;
            var objTab = this.tabs[toChangeTab];
            //情報保存
            DYNns.pushTabDate(this);
            DYNns.pushTabChkymd(this);
            DYNns.pushTabChkpsn(this);
            DYNns.pushTabDispunit(this);
            var oldPlanMode = this.tabs[this.nowTab].sts.submit.plan;
            objTab.sts.olddisp = $.extend({}, this.tabs[this.nowTab].sts.nowdisp);

            //切り替え
            this.execTab(objTab);

            //情報復帰      
            if (oldPlanMode === objTab.sts.submit.plan) {
                DYNns.pullDate(this);
                DYNns.pullChkymd(this);
                DYNns.pullChkpsn(this);
                DYNns.pullDispunit(this);
            }

            //日付・日程未定時の入力禁止設定
            this.cngchkymd();
            this.cngchkpsn();
        };

        //日付未定をクリックしたとき
        objPanel.cngchkymd = function() {
            if ($(this.formid + " .chkymd").length > 0) {
                var bochkymd = $(this.formid + " .chkymd").prop("checked");
                $(this.formid + " .cmbARRY").prop("disabled", bochkymd);
                $(this.formid + " .cmbARRM").prop("disabled", bochkymd);
                $(this.formid + " .cmbARRD").prop("disabled", bochkymd);
                if (this.tabs[this.nowTab].sts.nowdisp.rooms) $(this.formid + " .cmbRooms").prop("disabled", bochkymd);
                if (this.tabs[this.nowTab].sts.nowdisp.nights) $(this.formid + " .cmbNights").prop("disabled", bochkymd);
            }
        };

        //人数未定をクリックしたとき
        objPanel.cngchkpsn = function() {
            if ($(this.formid + " .chkpsn").length > 0) {
                var bochkpsn = $(this.formid + " .chkpsn").prop("checked");
                $(this.formid + " .dynPersons [class^=cmbPerson]").prop("disabled", bochkpsn);
            }
        };

        //検索をクリックしたとき
        objPanel.submit = function() {
            var form = document.getElementById("dynSearch" + this.idSuffix);
            var url = DYNns.getSearchUrl(this.tabs[this.nowTab]);
            var arg = new Object;
            // 変数pairにURLの?の後ろを&で区切ったものを配列にして代入
            var pair=location.search.substring(1).split('&');
            // location.search.substring(1)は、URLから最初の1文字 (?記号) を除いた文字列を取得する
            // .split('&')は&で区切り配列に分割する
            // for文でrairがある限りループさせる
            for(var i=0;pair[i];i++) {
              　　// 変数kvにpairを=で区切り配列に分割する
              var kv = pair[i].split('=');// kvはkey-value
              　　// 最初に定義したオブジェクトargに連想配列として格納
              arg[kv[0]]=kv[1];  // kv[0]がkey,kv[1]がvalue
            }
// 　　　　　　var login = (arg.login) ? "1" : "0";
            // url = url + 'bcid=' + arg.bcid + '&login=' + login;
            if (DYNns.System.TEST) alert(url);
            //if (DYNns.System.TEST) alert(arg.bcid);
            if (DYNns.System.TEST) alert(arg.login);
            var windowStatus = "";
            _.forEach(this.tabs[this.nowTab].sts.windowSts, function(status, key) {
                if (windowStatus !== "") windowStatus = windowStatus + ",";
                windowStatus = windowStatus + key + "=" + status;
            });
            if (this.tabs[this.nowTab].sts.windowOpenSubmit) {
                if (DYNns.System.TEST) alert(windowStatus);
                window.open(url, "planlist", windowStatus);
            } else {
                form.action = url;
                form.method = "POST";
                form.submit();
            }
        };

        //ご予約の確認をクリックしたとき
        objPanel.btnCancel = function() {
            var form = document.getElementById("dynSearch" + this.idSuffix);
            var url = DYNns.getCanceUrl.get(this.tabs[this.nowTab], $(window).width());
            if (DYNns.System.TEST) alert(url);
            var windowStatus = "";
            _.forEach(this.tabs[this.nowTab].sts.windowSts, function(status, key) {
                if (windowStatus !== "") windowStatus = windowStatus + ",";
                windowStatus = windowStatus + key + "=" + status;
            });
            if (this.tabs[this.nowTab].sts.windowOpenCancel) {
                if (DYNns.System.TEST) alert(windowStatus);
                window.open(url, "planlist", windowStatus);
            } else {
                form.action = url;
                form.method = "POST";
                form.submit();
            }
        };

    };

}(window.DYNns = window.DYNns || {}, jQuery, _));





$(document).ready(function(){
	$('#datPhong > div[class != "tab1"]').hide();
  	$("#tab li span").click(function(){
		var liText2 = $(this).attr('class'); 
		$("#datPhong > div").each(function(){
		var liText = $(this).attr('class'); 
     if(liText == liText2)   
        $(this).show();
     else
        $(this).hide();           
    });      
 });
 
  $('#tab li').click(function() {
        $(this).siblings('li').removeClass('active');
        $(this).addClass('active');
    });
	
});