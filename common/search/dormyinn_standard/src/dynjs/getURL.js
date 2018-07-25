(function(DYNns, $, _, undefined) {
    "use strict";
    DYNns.$ = $;
    DYNns._ = _;

    //キャンセルURL取得オブジェクト
    DYNns.getCanceUrl = {
        get: function(objTab, width) {
            var adress = DYNns.getAdressMode(objTab, width);
            var plan = objTab.sts.submit.plan;
            if (DYNns.getGroupsMode(objTab) === 1) {
                var arrHcod = $(objTab.formid + " .selectGroup").val().split(",");
                objTab.sts.hdata[objTab.sts.groupNum].hcod1 = arrHcod[0];
                objTab.sts.hdata[objTab.sts.groupNum].hcod2 = arrHcod[1];
            }


            // return "https://asp.hotel-story.ne.jp/" + this.set.asp[adress][plan] + "?" +
            //     this.set.cod[adress][plan] + "1=" + objTab.sts.hdata[objTab.sts.groupNum].hcod1 + "&" +
            //     this.set.cod[adress][plan] + "2=" + objTab.sts.hdata[objTab.sts.groupNum].hcod2 + "";

            /**
            * SSOに関するパラメーター追加
            * t.yamaguchi
            */
            var login_status=0;
            $.ajax({
                url:'https://renewal.hotespa.net/dormyinn/common/get_login_status.php',
                dataType:'text',
                async:false
            }).done(function(status){
                login_status=status;
            });

            return "https://asp.hotel-story.ne.jp/" + this.set.asp[adress][plan] + "?" +
                this.set.cod[adress][plan] + "1=" + objTab.sts.hdata[objTab.sts.groupNum].hcod1 + "&" +
                this.set.cod[adress][plan] + "2=" + objTab.sts.hdata[objTab.sts.groupNum].hcod2 + "" + 
                '&test=1&bcid=C02&login=' + login_status;
        },
        set: {
            asp: [
                ["ver3d/ASPY0300.asp", "ver3m/ASPY0300.asp", "restaurant/RST20050.asp"],
                ["ktai/ZKETAI0300.asp", "ktai/ZKETAI0300.asp", "restaurantk/KRSTC001.asp"]
            ],
            cod: [
                ["cod", "cod", "hcod"],
                ["cod", "cod", "hcod"]
            ]
        }
    };

    //URL取得関数群を逐次実行させる
    DYNns.getSearchUrl = function(objTab) {
        var url = "",
            and = "";
        _.forEach(DYNns.getUrlFuncs, function(objGetUrlFunc) {
            objGetUrlFunc.HeadQuery = objGetUrlFunc.set[0][objTab.sts.submit.plan];
            if (objGetUrlFunc.get(objTab) !== "") url += objGetUrlFunc.get(objTab) + and;
            and = "&";
        });
        return url;
    };

    //URL取得関数・データ群
    DYNns.getUrlFuncs = {
        getSearchUrl: {
            get: function(objTab) {
                return "https://asp.hotel-story.ne.jp/" + this.HeadQuery + "?";
            },
            set: [
                ["ver3d/planlist.asp", "ver3m/planlist.asp", "restaurant/RST20000.asp"],
                ["ver3d/planlist.asp", "ver3m/planlist.asp", "restaurantk/planlist.asp"]
            ]
        },
        getHcod: {
            get: function(objTab) {
                if (DYNns.getGroupsMode(objTab) === 1) {
                    var arrHcod = $(objTab.formid + " .selectGroup").val().split(",");
                    objTab.sts.hdata[objTab.sts.groupNum].hcod1 = arrHcod[0];
                    objTab.sts.hdata[objTab.sts.groupNum].hcod2 = arrHcod[1];
                }
                return this.HeadQuery + "1=" + objTab.sts.hdata[objTab.sts.groupNum].hcod1 +
                    "&" + this.HeadQuery + "2=" + objTab.sts.hdata[objTab.sts.groupNum].hcod2;
            },
            set: [
                ["hcod", "hcod", "hcod"],
                ["cod", "cod", "hcod"]
            ]
        },
        getReffrom: {
            get: function(objTab) {
                if (this.HeadQuery.head === "") return "";
                return this.HeadQuery.head + "=" + this.HeadQuery.value;
            },
            set: [
                [
                    { head: "", value: "" },
                    { head: "", value: "" },
                    { head: "", value: "" }
                ],
                [
                    { head: "reffrom", value: "ZKETAI0010" },
                    { head: "reffrom", value: "ZKETAI0010" },
                    { head: "", value: "" }
                ]
            ]
        },
        getMode: {
            get: function() {
                if (this.HeadQuery === "") return "";
                return "mode=" + this.HeadQuery;
            },
            set: [
                ["seek", "seek", "seek"],
                ["seek", "seek", "seek"]
            ]
        },
        getHidMode: {
            get: function() {
                if (this.HeadQuery.head === "") return "";
                return this.HeadQuery.head + "mode=" + this.HeadQuery.value;
            },
            set: [
                [
                    { head: "hid", value: "select" },
                    { head: "hid", value: "select" },
                    { head: "seek", value: "form" }
                ],
                [{ head: "", value: "" }, { head: "", value: "" }, { head: "s", value: "d" }]
            ]
        },
        getDPMode: {
            get: function(objTab) {
                if (this.HeadQuery.head === "") return "";
                if (!objTab.sts.nowdisp.WBFplan) return "";
                return this.HeadQuery + "=1";
            },
            set: [
                ["nWBFplanmode", "nWBFplanmode", ""],
                ["", "", ""]
            ]
        },
        gettout: {
            get: function(objTab) {
                if (this.HeadQuery === "") return "";
                var today = new Date();
                return this.HeadQuery + "=" + GetAccesstime(today);
            },
            set: [
                ["", "", ""],
                ["", "", "tout"]
            ]
        },
        getDPAirport: {
            get: function(objTab) {
                if (!objTab.sts.nowdisp.WBFplan) return "";
                var slinkUrl = "";
                if (this.HeadQuery.dep !== "") slinkUrl += this.HeadQuery.dep + "=" + $(objTab.formid + " .DepartureAirPort").val();
                if (this.HeadQuery.dep !== "" && this.HeadQuery.arr !== "") slinkUrl += "&";
                if (this.HeadQuery.arr !== "") slinkUrl += this.HeadQuery.arr + "=" + $(objTab.formid + " .ArrivalAirPort").val();
                return slinkUrl;
            },
            set: [
                [
                    { dep: "DepartureAirPort", arr: "ArrivalAirPort" },
                    { dep: "DepartureAirPort", arr: "ArrivalAirPort" },
                    { dep: "", arr: "" }
                ],
                [{ dep: "", arr: "" }, { dep: "", arr: "" }, { dep: "", arr: "" }]
            ]
        },
        getDispunit: {
            get: function(objTab) {
                if (this.HeadQuery === "") return "";
                var arrDisp = ["", "room", "calendar"];
                var defaultDisp = objTab.sts.defaultDispunit;
                var checkedJQuery = $(objTab.formid + " .dynDispunit [name=dispUnit]:checked");
                if (defaultDisp !== 0 && defaultDisp !== 1 && defaultDisp !== 2) defaultDisp = 0;
                if (checkedJQuery.length <= 0) return this.HeadQuery + "=" + arrDisp[defaultDisp];
                return this.HeadQuery + "=" + checkedJQuery.val();
            },
            set: [
                ["Dispunit", "Dispunit", "Dispunit"],
                ["", "", ""]
            ]
        },
        getPrice: {
            get: function(objTab) {
                var slinkUrl = "";
                if (this.HeadQuery.min !== "") slinkUrl += this.HeadQuery.min + "=" + $(objTab.formid + " .minPrice").val();
                if (this.HeadQuery.min !== "" && this.HeadQuery.max !== "") slinkUrl += "&";
                if (this.HeadQuery.max !== "") slinkUrl += this.HeadQuery.max + "=" + $(objTab.formid + " .maxPrice").val();
                return slinkUrl;
            },
            set: [
                [
                    { min: "hidSELECTminPrice", max: "hidSELECTmaxPrice" },
                    { min: "hidSELECTminPrice", max: "hidSELECTmaxPrice" },
                    { min: "", max: "" }
                ],
                [{ min: "", max: "" }, { min: "", max: "" }, { min: "", max: "" }]
            ]
        },
        getPersons: {
            get: function(objTab) {
                if (objTab.sts.nowdisp.chkpsn) {
                    if ($(objTab.formid + " .chkpsn").prop("checked")) { //人数未定
                        if (this.HeadQuery.chk === "") return "";
                        return this.HeadQuery.chk + "=1";
                    }
                }
                var slinkUrl = this.HeadQuery.psnA + "=" + $(objTab.formid + " .dynPersons [class*=cmbPerson0]").val();
                var subpsn = this.HeadQuery.psnC;
                var CSuffix = this.HeadQuery.CSuffix;
                if (subpsn !== "") {
                    $(objTab.formid + " .dynPersons [class*=cmbPerson]").each(function(psncount, person) {
                        if (psncount > 0) {
                            slinkUrl += "&" + subpsn;
                            if (CSuffix) slinkUrl += String.fromCharCode(97 + psncount - 1);
                            slinkUrl += "=" + $(person).val();
                        }
                        //文字コードからa～jのアルファベットを持ってくる
                    });
                }
                return slinkUrl;
            },
            set: [
                [
                    { chk: "chkpsn", psnA: "hidSELECTadult", psnC: "hidSELECTchild", CSuffix: true },
                    { chk: "chkpsn", psnA: "hidSELECTadult", psnC: "hidSELECTchild", CSuffix: true },
                    { chk: "chkpsn", psnA: "cmbPSN", psnC: "", CSuffix: false }
                ],
                [
                    { chk: "", psnA: "adult", psnC: "child", CSuffix: false },
                    { chk: "", psnA: "adult", psnC: "child", CSuffix: false },
                    { chk: "", psnA: "cmbPSN", psnC: "", CSuffix: false }
                ]
            ]
        },
        getBookingDate: {
            get: function(objTab) {
                if (objTab.sts.nowdisp.chkymd) {
                    if ($(objTab.formid + " .chkymd").prop("checked")) { //日程未定
                        if (this.HeadQuery.chk === "") return "";
                        return this.HeadQuery.chk + "=1";
                    }
                }
                var slinkUrl = "";
                _.forEach(this.HeadQuery, function(ymdHead, ymdKey) {
                    if (ymdKey !== "chk") {
                        if (ymdHead !== "") {
                            if (slinkUrl !== "") slinkUrl += "&";
                            slinkUrl += ymdHead + "=";
                        } else {
                            if (slinkUrl !== "") slinkUrl += "/";
                        }
                        if (slinkUrl !== "") {
                            if (ymdKey === "arry") slinkUrl += $(objTab.formid + " .cmbARRY").val();
                            if (ymdKey === "arrm") slinkUrl += $(objTab.formid + " .cmbARRM").val();
                            if (ymdKey === "arrd") slinkUrl += $(objTab.formid + " .cmbARRD").val();
                        }
                    }
                });
                if (slinkUrl === "") slinkUrl = "chkymd=1";
                return slinkUrl;
            },
            set: [
                [
                    { chk: "chkymd", arry: "hidSELECTARRYMD", arrm: "", arrd: "" },
                    { chk: "chkymd", arry: "hidSELECTARRYMD", arrm: "", arrd: "" },
                    { chk: "chkymd", arry: "cmbARRY", arrm: "cmbARRM", arrd: "cmbARRD" }
                ],
                [
                    { chk: "", arry: "", arrm: "arrm", arrd: "arrd" },
                    { chk: "", arry: "", arrm: "arrm", arrd: "arrd" },
                    { chk: "", arry: "arryear", arrm: "arrmonth", arrd: "arrday" }
                ]
            ]
        },
        getRoom: {
            get: function(objTab) {
                if (this.HeadQuery === "") return "";
                if (!objTab.sts.nowdisp.rooms) return this.HeadQuery + "=1";
                if ($(objTab.formid + " .cmbRooms").val() === "") return this.HeadQuery + "=1";
                return this.HeadQuery + "=" + $(objTab.formid + " .cmbRooms").val();
            },
            set: [
                ["room", "room", ""],
                ["rooms", "rooms", ""]
            ]
        },
        getNights: {
            get: function(objTab) {
                if (this.HeadQuery === "") return "";
                if (!objTab.sts.nowdisp.nights) return this.HeadQuery + "=1";
                if ($(objTab.formid + " .cmbNights").val() === "") return this.HeadQuery + "=1";
                return this.HeadQuery + "=" + $(objTab.formid + " .cmbNights").val();
            },
            set: [
                ["hidSELECTHAKSU", "hidSELECTHAKSU", ""],
                ["haks", "haks", ""]
            ]
        },
        getArea: {
            get: function(objTab) {
                if (this.HeadQuery === "") return "";
                if (DYNns.getGroupsMode(objTab) !== 2) return "";
                if ($(objTab.formid + " .selectGroup").val() === "") return "";
                return this.HeadQuery + "=" + $(objTab.formid + " .selectGroup").val();
            },
            set: [
                ["sAreacode", "sAreacode", "direction"],
                ["", "", "di"]
            ]
        },
        getCategory: {
            get: function(objTab) {
                var slinkUrl = "";
                slinkUrl = slinkUrl + this.parts(objTab, "booking");
                if (slinkUrl !== "" && this.parts(objTab, "room") + this.parts(objTab, "roomType") !== "") slinkUrl = slinkUrl + "&";
                slinkUrl = slinkUrl + this.parts(objTab, "room");
                if (slinkUrl !== "" && this.parts(objTab, "roomType") !== "") slinkUrl = slinkUrl + "&";
                slinkUrl = slinkUrl + this.parts(objTab, "roomType");
                return slinkUrl;
            },
            set: [
                [
                    { booking: "c2plan", room: "hidSELECTroomtype", roomType: "c2type" },
                    { booking: "c2plan", room: "hidSELECTroomtype", roomType: "c2type" },
                    { booking: "", room: "", roomType: "" }
                ],
                [
                    { booking: "", room: "", roomType: "" },
                    { booking: "", room: "", roomType: "" },
                    { booking: "", room: "", roomType: "" }
                ]
            ],
            parts: function(objTab, keyname) {
                var getset = DYNns.setupCategory.get[keyname];
                if (this.HeadQuery[keyname] === "") return "";
                if (!getset.display(objTab)) return "";
                if ($(objTab.formid + " ." + getset.classname).val() === "") return "";
                return this.HeadQuery[keyname] + "=" + $(objTab.formid + " ." + getset.classname).val();
            }
        },
        /**
        * SSOに関するパラメーター追加
        * t.yamaguchi
        */
        getBcid:{
            get:function(objTab){
                //return 'bcid=C02';
                return '';
            },
            set:[
                [''],['']
            ]
        },
        getLogin:{
            get:function(objTab){
                var q='login=0';
                $.ajax({
                    url:'https://renewal.hotespa.net/dormyinn/common/get_login_status.php',
                    dataType:'text',
                    async:false
                }).done(function(status){
                    q='login='+status;
                });
                return q;
            },
            set:[
                [''],['']
            ]
        }
    };

    // レストランスマートフォン版のtoutクエリの取得
    function GetAccesstime(objNowTime) {
        var nowyear, nowmonth, nowday, nowhour, nowmin;
        var tmpyear, tmpmonth, tmpday, tmphour, tmpmin, tmp;

        nowyear = objNowTime.getFullYear();
        nowmonth = objNowTime.getMonth() + 1;
        nowday = objNowTime.getDate();
        nowhour = objNowTime.getHours();
        nowmin = objNowTime.getMinutes();

        tmp = new Date(nowyear, nowmonth - 1, nowday, nowhour, nowmin + 15);

        tmpyear = tmp.getFullYear();
        tmpmonth = tmp.getMonth() + 1;
        tmpday = tmp.getDate();
        tmphour = tmp.getHours();
        tmpmin = tmp.getMinutes();

        if (tmpmonth < 10) {
            tmpmonth = "0" + tmpmonth;
        }
        if (tmpday < 10) {
            tmpday = "0" + tmpday;
        }
        if (tmphour < 10) {
            tmphour = "0" + tmphour;
        }
        if (tmpmin < 10) {
            tmpmin = "0" + tmpmin;
        }

        return "" + tmpmin + tmpday + tmpyear + tmphour + tmpmonth + "";
    }

}(window.DYNns = window.DYNns || {}, jQuery, _));
