(function(DYNns, $, _, undefined) {
    "use strict";
    DYNns.$ = $;
    DYNns._ = _;

    DYNns.render = {
        get: function(tmplName) {
            var that = this;
            if (_.isUndefined(that.tmplCache)) {
                that.tmplCache = {};
            }
            if (_.isUndefined(that.tmplCache[tmplName])) {
                var tmplUrl = (DYNns.System.UNITTEST ? "." : "") + "/common/search/dormyinn_standard/src/" + "dynviews/" + tmplName + ".html";
                var tmplString;
                $.ajax({
                    url: tmplUrl,
                    method: "GET",
                    async: false,
                    dataType: "html",
                    success: function(data) {
                        tmplString = data;
                    }
                });
                that.tmplCache[tmplName] = tmplString;
            }
            return that.tmplCache[tmplName];
        },
        tmplCache: {}
    };

    DYNns.setValArray = function(value) { // 配列でない項目を単一要素の配列に変換
        if (!_.isArray(value)) return [value];
        return value;
    };

    DYNns.setTabToPanel = function(tabs, onDispError) { // tabをpanelに紐づけ
        if (_.isUndefined(onDispError)) onDispError = true;
        tabs = DYNns.setValArray(tabs);
        return _.map(tabs, function(tabvalue, tabcount) {
            if (_.isObject(tabvalue)) return tabvalue;
            var retrunTab;
            _.forEach(DYNns.tabset, function(tab, tabname) {
                if (tabname === tabvalue) retrunTab = $.extend({}, tab);
            });
            if (_.isUndefined(retrunTab) && onDispError) DYNns.ErrorTextDisplay("ERROR:" + tabvalue + "タブが見つかりません");
            return retrunTab;
        });
    };

    DYNns.setWordsToTab = function(words, onDispError) { // wordsをtabに紐づけ
        if (_.isUndefined(onDispError)) onDispError = true;
        if (_.isObject(words)) return words;
        var retrunWords;
        _.forEach(DYNns.wordset, function(wordset, wordsname) {
            if (words === wordsname) retrunWords = $.extend({}, wordset);
        });
        if (_.isUndefined(retrunWords) && onDispError) DYNns.ErrorTextDisplay("ERROR:テキストセット" + words + "が見つかりません");
        return retrunWords;
    };

    DYNns.setupDateRange = function(objTab) { //日付の初期設定
        var initial = new Date(objTab.sts.bookingDate.fixedInitialDate);
        if (_.isNaN(initial.getFullYear())) initial = new Date();
        if (_.isNaN(initial.getMonth())) initial = new Date();
        if (_.isNaN(initial.getDay())) initial = new Date();
        var aYearLater = new Date(initial.getFullYear() + 1, initial.getMonth(), initial.getDate() - 1);
        objTab.startDate = DYNns.copyDate(initial, objTab.sts.bookingDate.defaultStayDate);
        objTab.endDate = DYNns.copyDate(objTab.startDate, objTab.sts.bookingDate.datelimit);
        if (objTab.sts.nowdisp.WBFplan && objTab.sts.bookingDate.defaultStayDate < 3) objTab.startDate = DYNns.copyDate(initial, 3);
        if (objTab.endDate > aYearLater) objTab.endDate = DYNns.copyDate(aYearLater);
        objTab.startday = DYNns.copyDate(objTab.startDate);
        objTab.startday = DYNns.normalizationDate(objTab, objTab.startday);
    };

    DYNns.normalizationDate = function(objTab, setday) { // 日数データの調整
        setday = setday || new Date();
        if (setday < objTab.startDate) setday = DYNns.copyDate(objTab.startDate);
        if (setday > objTab.endDate) setday = DYNns.copyDate(objTab.endDate);
        return setday;
    };

    DYNns.copyDate = function(setday, plusday) { // 日数データのコピー
        plusday = plusday || 0;
        return new Date(setday.getFullYear(), setday.getMonth(), setday.getDate() + plusday);
    };

    //現在表示している日時を取得
    DYNns.getTabDate = function(objPanel) {
        DYNns.pushTabDate(objPanel);
        return DYNns.copyDate(objPanel.sts.date);
    };

    DYNns.setupCalendar = function(objPanel) { // カレンダーのセットアップ
        DYNns.getHoliday();
        var objTab = objPanel.tabs[objPanel.nowTab];
        objPanel.cal = new DYNns.JKL.Calendar("dynCalendar", "dynSearch", "hidSELECTARRYMD", objPanel.idSuffix);
        objPanel.cal.min_date = DYNns.copyDate(objTab.startday); // スタート日
        objPanel.cal.max_date = DYNns.copyDate(objTab.endDate); // ラスト日指定
        if (!_.isUndefined(objTab.words.calender)) objPanel.cal.wordsset = objTab.words.calender; // 表記指定
    };

    //日数設定項目を表示
    DYNns.setupSelectDate = {
        get: function(objTab, setday) {
            var that = this;
            setday = setday || DYNns.copyDate(objTab.startday);
            setday = DYNns.normalizationDate(objTab, setday);
            var compiled = _.map(that.set, function(setdate) {
                setdate.valueset = setdate.getValueset(objTab, setday);
                setdate.bookingDatePunctuation = setdate.and(objTab);
                $(objTab.formid + " ." + setdate.classname).attr("type", "hidden");
                return _.template("<select class='<%-classname%> style_inputArea'>" +
                    "<% _.forEach(valueset,function(value){ %>" +
                    "<option value='<%-value%>'><%-value%></option>" +
                    "<% })%></select><%=bookingDatePunctuation%>")(setdate);
            });
            $(objTab.formid + " .dynDate").html(compiled);
            _.forEach(that.set, function(setdate) {
                $(objTab.formid + " ." + setdate.classname).val("" + setdate.getSelected(setday));
                if (that.terms(objTab) && setdate.classname === "cmbARRY") $(objTab.formid + " ." + setdate.classname).css("display", "none");
            });
            that.push(objTab);
            if (objTab.sts.nowdisp.year) $(objTab.formid + " .cmbARRY").after(_.template("<%=bookingDatePunctuation%>")(objTab.words));
        },
        push: function(objTab) {
            var selectY = $(objTab.formid + " .cmbARRY");
            var selectM = $(objTab.formid + " .cmbARRM");
            var selectD = $(objTab.formid + " .cmbARRD");
            var startYear = objTab.startDate.getFullYear();
            var startMonth = objTab.startDate.getMonth() + 1;
            var endYear = objTab.endDate.getFullYear();
            var endMonth = objTab.endDate.getMonth() + 1;
            var setday = new Date(selectY.val(), selectM.val() - 1, selectD.val());

            if (selectD.val() > DYNns.checkDate.get(setday)) selectD.val(DYNns.checkDate.get(setday));
            if (this.terms(objTab) && startYear + 1 === endYear && startMonth > endMonth) {
                if (selectM.val() >= startMonth) selectY.val(startYear);
                if (selectM.val() <= endMonth) selectY.val(endYear);
            }
        },
        terms: function(objTab) {
            return !objTab.sts.nowdisp.year;
        },
        set: [{
            classname: "cmbARRY",
            and: function() {
                return "";
            },
            getSelected: function(setday) {
                return setday.getFullYear();
            },
            getValueset: function(objTab) {
                return DYNns.getArray(this.getSelected(objTab.startDate), this.getSelected(objTab.endDate));
            }
        }, {
            classname: "cmbARRM",
            and: function(objTab) {
                return objTab.words.bookingDatePunctuation;
            },
            getSelected: function(setday) {
                return setday.getMonth() + 1;
            },
            getValueset: function(objTab, setday) {
                var boolyear = objTab.sts.nowdisp.year;
                var startYear = objTab.startDate.getFullYear();
                var endYear = objTab.endDate.getFullYear();
                var setYear = setday.getFullYear();
                var startMonth = 1;
                var endMonth = 12;

                if (setYear === startYear || !boolyear) startMonth = this.getSelected(objTab.startDate);
                if (setYear === endYear || !boolyear) endMonth = this.getSelected(objTab.endDate);
                if (!boolyear) {
                    if (startYear + 1 === endYear && startMonth > endMonth) return _(DYNns.getArray(startMonth, 12)).concat(DYNns.getArray(1, endMonth)).value();
                    if (startYear < endYear) return DYNns.getArray(1, 12);
                }
                return DYNns.getArray(startMonth, endMonth);
            }
        }, {
            classname: "cmbARRD",
            and: function() {
                return "";
            },
            getSelected: function(setday) {
                return setday.getDate();
            },
            getValueset: function(objTab, setday) {
                var startYear = objTab.startDate.getFullYear();
                var startMonth = objTab.startDate.getMonth() + 1;
                var endYear = objTab.endDate.getFullYear();
                var endMonth = objTab.endDate.getMonth() + 1;
                var setYear = setday.getFullYear();
                var setMonth = setday.getMonth() + 1;
                var startDay = 1;
                var endDay = DYNns.checkDate.get(setday);

                if (setYear === startYear && setMonth === startMonth) startDay = this.getSelected(objTab.startDate);
                if (setYear === endYear && setMonth === endMonth) endDay = this.getSelected(objTab.endDate);
                return DYNns.getArray(startDay, endDay);
            }
        }]
    };

    //日時データから上限日数を返す
    DYNns.checkDate = {
        get: function(checkdate) {
            var year = checkdate.getFullYear();
            var objMonth = this.set[checkdate.getMonth()]; //何月ですか
            if (_.isUndefined(objMonth.leap)) return objMonth.nomal; //閏年に日数変わりますか
            if (year % 400 === 0) return objMonth.leap; //年が400で割り切れますか
            if (year % 100 === 0) return objMonth.nomal; //年が100で割り切れますか
            if (year % 4 === 0) return objMonth.leap; //年が4で割り切れますか
            return objMonth.nomal; //いつもの二月
        },
        set: [
            { nomal: 31 }, //1月
            { nomal: 28, leap: 29 }, //2月
            { nomal: 31 }, //3月
            { nomal: 30 }, //4月
            { nomal: 31 }, //5月
            { nomal: 30 }, //6月
            { nomal: 31 }, //7月
            { nomal: 31 }, //8月
            { nomal: 30 }, //9月
            { nomal: 31 }, //10月
            { nomal: 30 }, //11月
            { nomal: 31 } //12月
        ]
    };

    DYNns.getHoliday = function() {
        DYNns.holiday = [];
        var date = new Date();
        var endDate = new Date(date.getFullYear(), date.getMonth() + 13, 1); // 13か月後

        // フォーマット
        var startM = date.getMonth() + 1;
        if (startM < 10) startM = "0" + startM;

        var start = date.getFullYear() + "-" + startM + "-01"; // 今月から

        $.ajax({
            url: "https://asp.hotel-story.ne.jp/API/jp-holidays.js",
            type: "GET",
            dataType: "jsonp",
            scriptCharset: "utf-8",
            timeout: 5000,
            jsonpCallback: "callback",
            success: function(data) {
                var regEsc = /\//g,
                    regDate = /-/g;

                for (var key in data) {
                    if (start <= key.replace(regEsc, "-")) {
                        DYNns.holiday.push(key.replace(regDate, "/"));
                    }
                }
                DYNns.holiday.sort();
            },
            error: function(data) {},
            complete: function(data) {}
        });
    };

    //泊室数選択肢の生成
    DYNns.setupNightsRooms = function(selecter, objSelect) {
        var arrSelects = DYNns.getArray(1, objSelect.max);

        var compiled = _.map(arrSelects, function(select) {
            return _.template("<option value='<%-value%>'><%-value%></option>")({ value: select });
        });

        $(selecter).append(compiled).val(objSelect.selected);
    };

    //onだとかoffだとかをtrue/falseに切り替え＆よくわからんものはtrueに
    DYNns.setupBinary = function(textBinary) {
        if (!textBinary) return false;
        if (textBinary == "on") return true;
        if (textBinary == "off") return false;
        if (textBinary === true || textBinary === false) return textBinary;
        return true;
    };

    //tabを表示
    DYNns.setupTabs = function(objPanel) {
        var compiled = _.map(objPanel.tabs, function(tab) {
            tab.tabname = tab.tabname || tab.words.tabname;
            return _.template("<li class='style_topicPathTabsList'><a href='javascript:void(0);' class='Tab<%-thisTabNum%> style_topicPathTabsLink current' ><%=tabname%></a></li>")(tab);
        });

        $(objPanel.formid + " .topicPathTabs ul").append(compiled);
    };

    //group検索を表示
    DYNns.setupGroups = function(objTab) {
        var arrGroup;
        if (DYNns.getGroupsMode(objTab) === 2) {
            arrGroup = objTab.sts.selectArea;
        } else if (DYNns.getGroupsMode(objTab) === 1) {
            arrGroup = _.map(objTab.sts.hdata, function(hcod) {
                return { name: hcod.name, value: hcod.hcod1 + "," + hcod.hcod2 };
            });
        } else {
            return false;
        }
        var compiled = _.map(arrGroup, function(arrGroup) {
			if (arrGroup.value == "MIHQ0,001") return _.template("<option value='<%-value%>' disabled><%-name%></option>")(arrGroup);
            if (!_.isUndefined(arrGroup)) return _.template("<option value='<%-value%>'><%-name%></option>")(arrGroup);
        });
        $(objTab.formid + " .selectGroup").append(compiled).val(arrGroup[0].value);
    };

    //groupのモードを表示
    DYNns.getGroupsMode = function(objTab) {
        if (!_.isUndefined(objTab.sts.selectArea) && _.size(objTab.sts.selectArea) > 0 && objTab.sts.nowdisp.area) return 2;
        if (_.size(objTab.sts.hdata) > 1) return 1;
        return 0;
    };

    //各項目を生成
    DYNns.setupBrocks = {
        set: function(objTab, file, classname, sts) {
            sts = sts || "truebox";
            this.compiled[file] = this.compiled[file] || _.template(DYNns.render.get(file));
            if ($(objTab.formid + " ." + classname).css("display") !== "none") this.displaylist[classname] = $(objTab.formid + " ." + classname).css("display");
            if (objTab.sts.olddisp[sts] !== objTab.sts.nowdisp[sts]) {
                $(objTab.formid + " ." + classname).html("");
                $(objTab.formid + " ." + classname).css("display", "none");
            }
            if (objTab.sts.nowdisp[sts]) {
                $(objTab.formid + " ." + classname).html(this.compiled[file](objTab.words));
                $(objTab.formid + " ." + classname).css("display", this.displaylist[classname]);
            }
        },
        compiled: {},
        displaylist: {}
    };

    //人数項目を表示
    DYNns.setupPersons = function(objTab) {
        var minPsn;
        var persons = _.forEach(objTab.sts.persons, function(person, i) {
            person.name = person.name || objTab.words.personsNameList[i];
            minPsn = 0;
            if (i === 0) minPsn = 1;
            person.personsNumber = objTab.words.personsNumber;
            person.values = DYNns.getArray(minPsn, person.maxPsn);
            person.classname = "cmbPerson" + i;
            person.startPsn = person.startPsn || minPsn;
        });
        var countmap = 0;
        var compiled = _.map(persons, function(person) {
            if (countmap++ > 0 && objTab.sts.submit.plan === 2) return false;
            return _.template("<%-name%><select class='<%-classname%> style_inputArea'>" +
                "<% _.forEach(values,function(value){ %>" +
                "<option value='<%-value%>' <%if(startPsn===value){%>selected<%}%> ><%-value%></option>" +
                "<% })%></select><%=personsNumber%>")(person);
        });

        $(objTab.formid + " .dynPersons").append(compiled);
    };

    //よさん項目を表示
    DYNns.setupBudget = {
        get: function(selecter, objBudget, objTab, min0max1num) {
            var selected;
            min0max1num = min0max1num || 0;
            if (min0max1num === 0) objBudget.start = objBudget.start || objBudget.min;
            if (min0max1num === 1) objBudget.start = objBudget.start || objBudget.max;
            var arrPrices = _.map(_.filter(this.set[min0max1num], function(plice) {
                    return (objBudget.min <= plice && plice <= objBudget.max);
                }),
                function(budget) {
                    if (_.isUndefined(selected) || Math.abs(budget - objBudget.start) < Math.abs(selected - objBudget.start)) selected = budget;
                    return {
                        value: budget,
                        display: DYNns.getPrice(budget, objTab)
                    };
                });
            var compiled = _.map(arrPrices, function(arrPrice) {
                if (arrPrice) return _.template("<option value='<%-value%>'><%-display%></option>")(arrPrice);
            });
            $(selecter).append(compiled).val(selected);
        },
        set: [
            [0, 5000, 6000, 7000, 8000, 9000, 10000, 15000, 20000, 25000, 30000, 35000, 40000, 45000, 50000],
            [8000, 10000, 11000, 12000, 13000, 14000, 15000, 20000, 25000, 30000, 35000, 40000, 50000, 60000, 70000, 80000, 90000, 100000, 110000, 120000, 130000, 140000, 150000, 9999999]
        ]
    };

    DYNns.getPrice = function(price, objTab) {
        switch (price) {
            case 0:
                return objTab.words.priceLowestNothing;
            case 9999999:
                return objTab.words.priceMaximumNothing;
            default:
                return price.toString();
        }
    };

    //プランカテゴリ系統の選択肢項目を表示
    DYNns.setupCategory = {
        set: function(objTab) {
            var that = this;
            _.forEach(objTab.sts.category, function(categoryarray, categoryname) {
                if (that.get[categoryname].display(objTab)) {
                    var compiled = _.map(categoryarray, function(category) {
                        if (!_.isUndefined(category)) return _.template("<option value='<%-value%>'><%-name%></option>")(category);
                    });
                    $(objTab.formid + " ." + that.get[categoryname].classname).append(compiled).val(categoryarray[0].value);
                }
            });
        },
        get: {
            booking: {
                classname: "CategoryBooking",
                display: function(objTab) {
                    return objTab.sts.nowdisp.categorybooking;
                }
            },
            room: {
                classname: "CategoryRoom",
                display: function(objTab) {
                    return objTab.sts.nowdisp.categoryroom;
                }
            },
            roomType: {
                classname: "CategoryRoomType",
                display: function(objTab) {
                    return objTab.sts.nowdisp.categoryroomtype;
                }
            }
        }
    };

    //PC・スマートフォン判別
    DYNns.getAdressMode = function(objTab, width) {
        width = width || $(window).width();
        if (objTab.sts.submit.address === 1 || objTab.sts.submit.address === 0) return objTab.sts.submit.address;

        //if (width <= objTab.sts.submit.width && DYNns.checkKtai()) return 1;
        
        return 0;
    };

    //キャリア判定
    DYNns.checkKtai = function() {
        var userAgent = navigator.userAgent;
        switch (true) {
            case userAgent.indexOf("DoCoMo/") >= 0:
                switch (true) {
                    case userAgent.indexOf("501i") >= 0:
                    case userAgent.indexOf("502i") >= 0:
                    case userAgent.indexOf("821i") >= 0:
                    case userAgent.indexOf("209i") >= 0:
                    case userAgent.indexOf("651ps") >= 0:
                    case userAgent.indexOf("691i") >= 0:
                    case userAgent.indexOf("671i") >= 0:
                    case userAgent.indexOf("F210i") >= 0:
                    case userAgent.indexOf("N210i") >= 0:
                    case userAgent.indexOf("P210i") >= 0:
                    case userAgent.indexOf("KO210i") >= 0:
                        return false;
                    default:
                        return true;
                }
            case userAgent.indexOf("J-PHONE/") >= 0:
                switch (true) {
                    case userAgent.indexOf("/J-P03") >= 0:
                    case userAgent.indexOf("/J-P04") >= 0:
                    case userAgent.indexOf("/J-P02") >= 0:
                    case userAgent.indexOf("/J-SH03") >= 0:
                    case userAgent.indexOf("/J-SA02") >= 0:
                    case userAgent.indexOf("/J-DN02") >= 0:
                    case userAgent.indexOf("/J-SH02") >= 0:
                    case userAgent.indexOf("J-PHONE/1.") >= 0:
                    case userAgent.indexOf("J-PHONE/2.") >= 0:
                    case userAgent.indexOf("J-PHONE/3.") >= 0:
                        return false;
                    default:
                        return true;
                }
            case userAgent.indexOf("Android") >= 0:
            case userAgent.indexOf("Vodafone/") >= 0:
            case userAgent.indexOf("SoftBank/") >= 0:
            case userAgent.indexOf("iPhone") >= 0:
            case userAgent.indexOf("iPad") >= 0:
            case userAgent.indexOf("WILLCOM") >= 0:
            case userAgent.indexOf("mobilephone/") >= 0:
            case userAgent.indexOf("UP.Browser") >= 0:
                return true;
        }
        return false;
    };


    //表示・非表示自動設定
    DYNns.autoSetupDisplay = {
        set: function(objTab) {
            var that = this;
            objTab.sts.nowdisp = $.extend({}, objTab.sts.display);
            _.forEach(that.get, function(value, name) {
                if (value.conditions(objTab)) {
                    _.forEach(value.bool, function(bool, key) {
                        objTab.sts.nowdisp[key] = bool;
                    });
                }
            });
        },
        get: {
            //デフォルト
            Default: {
                conditions: function(objTab) {
                    return true;
                },
                bool: { truebox: true }
            },
            //年表示
            year: {
                conditions: function(objTab) {
                    return _.isUndefined(objTab.sts.nowdisp.year);
                },
                bool: { year: true }
            },
            //タブ表示自動true
            tabon: {
                conditions: function(objTab) {
                    if (!_.isUndefined(objTab.sts.nowdisp.tabs)) return false;
                    if (_.size(objTab.objPanel.tabs) > 1) return true;
                    if (_.size(DYNns.panelset) > 1) return true;
                    return false;
                },
                bool: { tabs: true }
            },
            //タブ表示デフォルト
            taboff: {
                conditions: function(objTab) {
                    return _.isUndefined(objTab.sts.nowdisp.tabs);
                },
                bool: { tabs: false }
            },
            //航空券付プラン無し
            NoDP: {
                conditions: function(objTab) {
                    if (_.isUndefined(objTab.sts.WBFURL)) return true;
                    if (objTab.sts.WBFURL == "") return true;
                    return false;
                },
                bool: { WBFplan: false }
            },
            //エリア検索無し
            NoArea: {
                conditions: function(objTab) {
                    return DYNns.getGroupsMode(objTab) !== 2;
                },
                bool: { area: false }
            },
            //予算設定無し
            NoBudgets: {
                conditions: function(objTab) {
                    if (_.isUndefined(objTab.sts.budgets)) return true;
                    if (_.isUndefined(objTab.sts.budgets.min)) return true;
                    if (_.isUndefined(objTab.sts.budgets.max)) return true;
                    return false;
                },
                bool: { budgets: false }
            },
            //プランカテゴリ選択無し
            NoCategorybooking: {
                conditions: function(objTab) {
                    if (_.isUndefined(objTab.sts.category)) return true;
                    if (_.isUndefined(objTab.sts.category.booking)) return true;
                    if (_.size(objTab.sts.category.booking) <= 0) return true;
                    return false;
                },
                bool: { categorybooking: false }
            },
            //部屋カテゴリ選択無し
            NoCategoryroom: {
                conditions: function(objTab) {
                    if (_.isUndefined(objTab.sts.category)) return true;
                    if (_.isUndefined(objTab.sts.category.room)) return true;
                    if (_.size(objTab.sts.category.room) <= 0) return true;
                    return false;
                },
                bool: { categoryroom: false }
            },
            //部屋タイプ選択無し
            NoCategoryroomtype: {
                conditions: function(objTab) {
                    if (_.isUndefined(objTab.sts.category)) return true;
                    if (_.isUndefined(objTab.sts.category.roomType)) return true;
                    if (_.size(objTab.sts.category.roomType) <= 0) return true;
                    return false;
                },
                bool: { categoryroomtype: false }
            },
            //泊数選択無し
            NoNights: {
                conditions: function(objTab) {
                    return _.isUndefined(objTab.sts.bookingDate.nights);
                },
                bool: { nights: false }
            },
            //室数選択無し
            NoRooms: {
                conditions: function(objTab) {
                    return _.isUndefined(objTab.sts.bookingDate.rooms);
                },
                bool: { rooms: false }
            },
            //レストラン版
            restaurant: {
                conditions: function(objTab) {
                    return objTab.sts.submit.plan === 2;
                },
                bool: {
                    WBFplan: false,
                    nights: false,
                    budgets: false,
                    dispunitRoom: false,
                    categoryroom: false,
                    categoryroomtype: false
                }
            },
            //携帯版
            ktai: {
                conditions: function(objTab) {
                    return DYNns.getAdressMode(objTab) === 1;
                },
                bool: {
                    WBFplan: false,
                    chkymd: false,
                    chkpsn: false,
                    budgets: false,
                    categorybooking: false,
                    categoryroom: false,
                    categoryroomtype: false,
                    dispunitPlan: false,
                    dispunitRoom: false,
                    dispunitCalendar: false
                }
            },
            //携帯宿泊版
            ktaiLodging: {
                conditions: function(objTab) {
                    if (DYNns.getAdressMode(objTab) !== 1) return false;
                    if (objTab.sts.submit.plan === 2) return false;
                    return true;
                },
                bool: {
                    area: false,
                    year: false
                }
            },
            //航空券付プランあり
            DP: {
                conditions: function(objTab) {
                    return objTab.sts.nowdisp.WBFplan;
                },
                bool: {
                    chkymd: false, //日程未定
                    chkpsn: false, //人数未定
                    dispunitRoom: false, //検索モード:お部屋タイプ
                    dispunitCalendar: false //検索モード:空室カレンダー
                }
            },
            //グループ検索有
            Group: {
                conditions: function(objTab) {
                    return DYNns.getGroupsMode(objTab) > 0;
                },
                bool: { group: true }
            },
            //グループ検索無し
            NoGroup: {
                conditions: function(objTab) {
                    return DYNns.getGroupsMode(objTab) === 0;
                },
                bool: { group: false }
            }
        }
    };

    //宿泊日に日付をセット
    DYNns.pullDate = function(objPanel, setDate) {
        setDate = setDate || DYNns.copyDate(objPanel.sts.date);
        setDate = DYNns.normalizationDate(objPanel.tabs[objPanel.nowTab], setDate);
        if (!objPanel.tabs[objPanel.nowTab].sts.bookingDate.usecalendar) DYNns.setupSelectDate.get(objPanel.tabs[objPanel.nowTab], setDate);
        $(objPanel.formid + " .cmbARRY").val(setDate.getFullYear());
        
		var Month_double = setDate.getMonth() + 1;
		if (Month_double < 10) Month_double = "0" + (setDate.getMonth() + 1);
		else Month_double = setDate.getMonth() + 1;
		$(objPanel.formid + " .cmbARRM").val(Month_double);
		var Month_day = setDate.getDate();
		if (Month_day < 10) Month_day = "0" + setDate.getDate();
		else Month_day = setDate.getDate();
		$(objPanel.formid + " .cmbARRD").val(Month_day);
    };

    //日付未定をセット
    DYNns.pullChkymd = function(objPanel, setChkymd) {
        setChkymd = setChkymd || objPanel.sts.chkymd;
        if ($(objPanel.formid + " .chkymd").length > 0) $(objPanel.formid + " .chkymd").prop("checked", setChkymd);
    };

    //人数未定をセット
    DYNns.pullChkpsn = function(objPanel, setChkpsn) {
        setChkpsn = setChkpsn || objPanel.sts.chkpsn;
        if ($(objPanel.formid + " .chkpsn").length > 0) $(objPanel.formid + " .chkpsn").prop("checked", setChkpsn);
    };

    //検索モードをセット
    DYNns.pullDispunit = function(objPanel, setdispunit) {
        setdispunit = setdispunit || objPanel.sts.dispunit;
        if ($(objPanel.formid + " ." + setdispunit).length <= 0) {
            DYNns.setupTabDispunit(objPanel);
            DYNns.pushTabDispunit(objPanel);
        } else {
            $(objPanel.formid + " .dynDispunit [name=dispUnit]").prop("checked", false);
            $(objPanel.formid + " ." + setdispunit).prop("checked", true);
        }
    };

    //検索モードのチェック状態初期化
    DYNns.setupTabDispunit = function(objPanel) {
        var DefaultCheck = objPanel.tabs[objPanel.nowTab].sts.defaultDispunit;
        var jQobjDispPlan = $(objPanel.formid + " .dispPlan");
        var jQobjDispRoom = $(objPanel.formid + " .dispRoom");
        var jQobjDispCalender = $(objPanel.formid + " .dispCald");
        if (DefaultCheck !== 0 && DefaultCheck !== 1 && DefaultCheck !== 2) {
            if (jQobjDispCalender.length > 0) DefaultCheck = 2;
            if (jQobjDispRoom.length > 0) DefaultCheck = 1;
            if (jQobjDispPlan.length > 0) DefaultCheck = 0;
        }
        if (DefaultCheck === 2) jQobjDispCalender.prop("checked", true);
        if (DefaultCheck === 1) jQobjDispRoom.prop("checked", true);
        if (DefaultCheck === 0) jQobjDispPlan.prop("checked", true);
    };

    //現在表示している日時を保存
    DYNns.pushTabDate = function(objPanel) {
        objPanel.sts.date = new Date(
            $(objPanel.formid + " .cmbARRY").val() + "/" +
            $(objPanel.formid + " .cmbARRM").val() + "/" +
            $(objPanel.formid + " .cmbARRD").val());
        objPanel.sts.date = DYNns.normalizationDate(objPanel.tabs[objPanel.nowTab], objPanel.sts.date);
    };

    //日付未定を保存
    DYNns.pushTabChkymd = function(objPanel) {
        if ($(objPanel.formid + " .chkymd").length > 0) objPanel.sts.chkymd = $(objPanel.formid + " .chkymd").prop("checked");
    };

    //人数未定を保存
    DYNns.pushTabChkpsn = function(objPanel) {
        if ($(objPanel.formid + " .chkpsn").length > 0) objPanel.sts.chkpsn = $(objPanel.formid + " .chkpsn").prop("checked");
    };

    //検索モードとして選択された要素のidを保存
    DYNns.pushTabDispunit = function(objPanel) {
        objPanel.sts.dispunit = $(objPanel.formid + " .dynDispunit [name=dispUnit]:checked").attr("class");
    };

    //エラー時の表示
    DYNns.ErrorTextDisplay = function(ErrText, key) {
        console.error(ErrText);
        key = key || null;
        if (!_.isNull(key) && $("#dynSearch" + key).length > 0) {
            $("#dynSearch" + key + ":first").before("<div>" + ErrText + "</div>");
        } else if ($("[id^=dynSearch]").length > 0) {
            $("[id^=dynSearch]:first").before("<div>" + ErrText + "</div>");
        } else if ($("html").length > 0) {
            $("html:first").before("<div>" + ErrText + "</div>");
        } else {
            alert(ErrText);
        }
    };

    DYNns.getCurrencyUnitPre = function(currencyCode) {
        switch (currencyCode) {
            case "01":
                return "￥";
            case "02":
                return "$";
            case "03":
                return "";
            case "04":
                return "";
            case "05":
                return "";
            case "06":
                return "NT$ ";
            case "07":
                return "Rs ";
            case "08":
                return "";
            case "MA":
                return "";
            default:
                return "";
        }
    };

    DYNns.GetCurrencyUnit = function(currencyCode) {
        switch (currencyCode) {
            case "01":
                return "";
            case "02":
                return "";
            case "03":
                return " 元";
            case "04":
                return " 元";
            case "05":
                return " KRW";
            case "06":
                return "";
            case "07":
                return "";
            case "08":
                return " Baht";
            case "MA":
                return " 枚";
            default:
                return "";
        }
    };

    DYNns.dollarFormat = function(price) {
        var s = "" + price;
        var p = s.indexOf(".");

        if (p === -1) {
            return price + ".00";
        } else if (s.length - p === 2) {
            return price + "0";
        } else {
            return price;
        }
    };
    DYNns.validForm = function() {
        return true;
    };

    //startからendまでの連番の配列作る
    DYNns.getArray = function arr(start, end, array) {
        array = array || [];
        if (array.length === Math.abs(end - start) + 1) return array;
        var sign = 1;
        if (end - start !== 0) sign = (end - start) / Math.abs(end - start);
        array.push(start + array.length * sign);
        return arr(start, end, array);
    };

    //出発空港・到着空港一覧取得
    DYNns.getAirPortJsonp = {
        get: function(objTab) {
            var that = this;
            if (objTab.sts.nowdisp.WBFplan) { that.ajax(objTab); }
        },
        ajax: function(objTab) {
            var that = this;
            var url = objTab.sts.WBFURL;
            if (!that.list[url]) {
                $.ajax({
                    async: false,
                    method: "GET",
                    scriptCharset: "utf-8",
                    url: url,
                    dataType: "jsonp",
                    jsonpCallback: "SetAirportInformation",

                    success: function(jsonp) {
                        console.log(objTab, jsonp);
                        that.list[url] = jsonp;
                        that.set(objTab);
                    },
                    error: function() {
                        that.ajax(objTab);
                    }
                });
            } else {
                that.set(objTab);
            }
        },
        set: function(objTab) {
            var that = this;
            var url = objTab.sts.WBFURL;
            _.forEach(that.list[url].airport[0].dep, function(dep, depcount) {
                $(objTab.formid + " .DepartureAirPort").append("<option value='" + dep.code + "'>" + dep.name + "</option>");
            });
            _.forEach(that.list[url].airport[0].arr, function(arr, arrcount) {
                $(objTab.formid + " .ArrivalAirPort").append("<option value='" + arr.code + "'>" + arr.name + "</option>");
            });
        },
        list: {}
    };

}(window.DYNns = window.DYNns || {}, jQuery, _));