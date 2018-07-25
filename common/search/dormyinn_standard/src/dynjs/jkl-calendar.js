//  ========================================================
//  jkl-calendar.js ---- ポップアップカレンダー表示クラス
//  Copyright 2005-2006 Kawasaki Yusuke <u-suke [at] kawa.net>
//  2005/04/06 - 最初のバージョン
//  2005/04/10 - 外部スタイルシートを使用しない、JKL.Opacity はオプション
//  2006/10/22 - typo修正、spliter/min_date/max_dateプロパティ、×ボタン追加
//  2006/10/23 - prototype.js併用時は、Event.observe()でイベント登録
//  2006/10/24 - max_date 範囲バグ修正
//  2006/10/25 - フォームに初期値があれば、カレンダーの初期値に採用する
//  2006/11/15 - MOM Update 週の初めの曜日を変更できるように修正
//  2006/11/23 - MOM Update 今日日付の文字色を指定できるように修正、あと枠線も描画してみる
//               邪魔な<select>への応急処置を書いてみた
//  2006/11/27 - MOM Update 邪魔な<select>への応急処置を修正、描画領域の高さを取得する
//  2006/11/30 - MOM Update 選択可能な曜日をプロパティに追加、今日日付と選択不可能な日付の背景色をスタイルに追加
//               カレンダーのz-indexをプロパティに追加
//  2006/12/04 - ksuzu Update 選択可能日がない月には移動できないように変更
//               カレンダーの表示月をクリックすると現在の月に移動できるよう変更
//               閉じるボタンにてカレンダーを閉じたとき、カレンダーの初期表示を戻すよう変更
//  2006/12/30 - MOM IFRAMEのSRC属性にdummy.htmlを挿入
//  2007/02/04 - MOM setDateYMDのバグを修正
//               TDタグのスタイルに背景色を指定するよう修正
//  2013/10/18 - DYN 祝日を文字色を変更するように修正
//
//  ========================================================

// 親クラス

if (typeof (DYNns.JKL) == 'undefined') DYNns.JKL = function() { };

// JKL.Calendar コンストラクタの定義

DYNns.JKL.Calendar = function(eid, fid, valname, suffix) {
    // 2013.10.18 DYN 祝日 関数設定
    this.initHoliday();

    this.eid = eid + suffix;
    this.formid = fid + suffix;
    this.suffix = suffix;
    this.__dispelem = null;  // カレンダー表示欄エレメント
    this.__textelem = null;  // テキスト入力欄エレメント
    this.__opaciobj = null;  // JKL.Opacity オブジェクト
    this.style = new DYNns.JKL.Calendar.Style();
    return this;
};

// バージョン番号

DYNns.JKL.Calendar.VERSION = "0.13";

// デフォルトのプロパティ

DYNns.JKL.Calendar.prototype.spliter = "/";
DYNns.JKL.Calendar.prototype.date = null;
DYNns.JKL.Calendar.prototype.min_date = null;
DYNns.JKL.Calendar.prototype.max_date = null;
DYNns.JKL.Calendar.prototype.wordsset = {
    spliter: "/",
    toBeforeMonth: "前の月へ", toThisMonth: "現在の月へ", toNextMonth: "次の月へ",
    banBeforeMonth: "前の月は選択できません", banNextMonth: "次の月は選択できません",
    close: "閉じる",
    yearBefore: "", yearAfter: "年",
    monthBefore: "", monthAfter: "月",
    sunday: "日", monday: "月", tuesday: "火", wednesday: "水", thursday: "木", friday: "金", saturday: "土"
};

// 2006.11.15 MOM 表示開始曜日をプロパティに追加(デフォルトは日曜日=0)
DYNns.JKL.Calendar.prototype.start_day = 0;

// 2006.11.23 MOM カレンダー内の日付を枠線で区切るかどうかのプロパティ(デフォルトはtrue)
DYNns.JKL.Calendar.prototype.draw_border = true;

// 2006.11.30 MOM 各曜日の選択可否をプロパティに追加(デフォルトは全てtrue)
// 配列の添え字で曜日を指定(0～6 = 日曜～土曜)、選択可否をboolean値で代入する、という使い方
DYNns.JKL.Calendar.prototype.selectable_days = new Array(true, true, true, true, true, true, true);

// 2006.11.30 MOM カレンダーのz-indexをプロパティに追加
DYNns.JKL.Calendar.prototype.zindex = 10;

// 2013.10.18 DYN 祝日プロパティ追加
DYNns.JKL.Calendar.prototype.holiday = null;

// JKL.Calendar.Style
DYNns.JKL.Calendar.Style = function() {
    return this;
};

// デフォルトのスタイル

// デフォルトのスタイル

DYNns.JKL.Calendar.Style.prototype.frame_width = "220px";      // フレーム横幅
DYNns.JKL.Calendar.Style.prototype.frame_color = "#CCCCCC";    // フレーム枠の色
DYNns.JKL.Calendar.Style.prototype.font_size = "12px";       // 文字サイズ
DYNns.JKL.Calendar.Style.prototype.day_bgcolor = "";    // カレンダーの背景色
DYNns.JKL.Calendar.Style.prototype.month_color = "#333333";    // ○年○月部分の背景色
DYNns.JKL.Calendar.Style.prototype.month_hover_color = "#333333";    // 月のマウスオーバー時の≪≫文字色
DYNns.JKL.Calendar.Style.prototype.month_hover_bgcolor = "#ed430f";    // 月のマウスオーバー時の≪≫背景色
DYNns.JKL.Calendar.Style.prototype.weekday_color = "#312e25";    // 月曜～金曜日セルの文字色
DYNns.JKL.Calendar.Style.prototype.saturday_color = "#312e25";    // 土曜日セルの文字色
DYNns.JKL.Calendar.Style.prototype.sunday_color = "#312e25";    // 日曜日セルの文字色
DYNns.JKL.Calendar.Style.prototype.others_color = "red";    // 他の月の日セルの文字色
DYNns.JKL.Calendar.Style.prototype.day_hover_bgcolor = "";    // 日付のマウスオーバー時の日セルの背景
DYNns.JKL.Calendar.Style.prototype.cursor = "pointer";    // 日付のマウスオーバー時のカーソル形状

// 2006.11.23 MOM 今日日付の文字色をプロパティに追加
DYNns.JKL.Calendar.Style.prototype.today_color = "#666666";    // 今日日付セルの文字色

// 2006.11.23 MOM 枠線もつけてみる
DYNns.JKL.Calendar.Style.prototype.today_border_color = "red";    // 今日日付セルの枠線の色
DYNns.JKL.Calendar.Style.prototype.others_border_color = "blue";    // 他の日セルの枠線の色

// 2006.11.30 MOM 今日日付の背景色を忘れてたので追加してみる
DYNns.JKL.Calendar.Style.prototype.today_bgcolor = "#FFFFFF";    // 今日日付セルの背景色

// 2006.11.30 MOM 選択不可能な日付の背景色を追加
DYNns.JKL.Calendar.Style.prototype.unselectable_day_bgcolor = "red";    // 選択不可能な日付の背景色

// 2013.10.18 DYN 祝日セルの文字色を追加
DYNns.JKL.Calendar.Style.prototype.holiday_color = "#f03086";

//  メソッド

DYNns.JKL.Calendar.Style.prototype.set = function(key, val) { this[key] = val; }
DYNns.JKL.Calendar.Style.prototype.get = function(key) { return this[key]; }
DYNns.JKL.Calendar.prototype.setStyle = function(key, val) { this.style.set(key, val); };
DYNns.JKL.Calendar.prototype.getStyle = function(key) { return this.style.get(key); };

// 日付を初期化する

DYNns.JKL.Calendar.prototype.initDate = function(dd) {
    if (!dd) dd = DYNns.getTabDate(DYNns.panelset[this.suffix]);
    var year = dd.getFullYear();
    var mon = dd.getMonth();
    var date = dd.getDate();
    this.date = new Date(year, mon, date);
    this.getFormValue();
    return this.date;
}

// 2013.10.18 DYN 祝日を取得する
DYNns.JKL.Calendar.prototype.initHoliday = function() {

    this.holiday = DYNns.holiday;
}


// 透明度設定のオブジェクトを返す

DYNns.JKL.Calendar.prototype.getOpacityObject = function() {
    if (this.__opaciobj) return this.__opaciobj;
    var cal = this.getCalendarElement();
    if (!DYNns.JKL.Opacity) return;
    this.__opaciobj = new DYNns.JKL.Opacity(cal);
    return this.__opaciobj;
};

// カレンダー表示欄のエレメントを返す

DYNns.JKL.Calendar.prototype.getCalendarElement = function() {
    if (this.__dispelem) return this.__dispelem;
    this.__dispelem = $("#" + this.eid)[0];
    return this.__dispelem;
};

// テキスト入力欄のエレメントを返す

DYNns.JKL.Calendar.prototype.getFormElement = function() {
    if (this.__textelem) return this.__textelem;
    var frmelms = $("#" + this.formid)[0];
    if (!frmelms) return;
    for (var i = 0; i < frmelms.elements.length; i++) {
        if (frmelms.elements[i].name == this.valname) {
            this.__textelem = frmelms.elements[i];
        }
    }
    return this.__textelem;
};

// オブジェクトに日付を記憶する（YYYY/MM/DD形式で指定する）

DYNns.JKL.Calendar.prototype.setDateYMD = function(ymd) {
    var splt = ymd.split(this.spliter);
    if (splt[0] - 0 > 0 &&
        splt[1] - 0 >= 1 && splt[1] - 0 <= 12 &&       // bug fix 2006/03/03 thanks to ucb
        splt[2] - 0 >= 1 && splt[2] - 0 <= 31) {
        if (!this.date) this.initDate();
        this.date.setDate(splt[2]);
        this.date.setMonth(splt[1] - 1);
        this.date.setFullYear(splt[0]);
    } else {
        ymd = "";
    }
    return ymd;
};

// オブジェクトから日付を取り出す（YYYY/MM/DD形式で返る）
// 引数に Date オブジェクトの指定があれば、
// オブジェクトは無視して、引数の日付を使用する（単なるfprint機能）

DYNns.JKL.Calendar.prototype.getDateYMD = function(dd) {
    if (!dd) {
        if (!this.date) this.initDate();
        dd = this.date;
    }
    
    
    
    
    // ??nh d?ng 2 ch? s? th?ng
    var mm = "" + (dd.getMonth() + 1);
    if (mm < 10) mm = "0" + mm;
    
    // ??nh d?ng 2 ch? s? ng?y
    var aa = "" + dd.getDate();
    if (aa < 10) aa= "0" + aa;
    
    
    
    
    if (mm.length == 1) mm = "" + "0" + mm;
    if (aa.length == 1) aa = "" + "0" + aa;
    return dd.getFullYear() + this.spliter + mm + this.spliter + aa;
};

// テキスト入力欄の値を返す（ついでにオブジェクトも更新する）

DYNns.JKL.Calendar.prototype.getFormValue = function() {
    var form1 = this.getFormElement();
    if (!form1) return "";
    var date1 = this.setDateYMD(form1.value);
    return date1;
};

// フォーム入力欄に指定した値を書き込む

DYNns.JKL.Calendar.prototype.setFormValue = function(ymd) {
    if (!ymd) ymd = this.getDateYMD();   // 無指定時はオブジェクトから？
    var form1 = this.getFormElement();
    if (form1) form1.value = ymd;
};

// 2011.02.09 DYN追加
// カレンダーから日付データを戻す
DYNns.JKL.Calendar.prototype.SetCalenderYmd = function(ymd) {
    var warrArray = new Array;
    var warrY;
    var warrM;
    var warrD;
    var cnt;

    warrArray = ymd.split('/');
    warrY = warrArray[0];
    warrM = warrArray[1];
    warrD = warrArray[2];

    $("#dynSearch" + this.suffix + " .cmbARRY").val(warrY);
    $("#dynSearch" + this.suffix + " .cmbARRM").val(warrM);
    $("#dynSearch" + this.suffix + " .cmbARRD").val(warrD);

};

//  カレンダー表示欄を表示する

DYNns.JKL.Calendar.prototype.show = function() {
    this.getCalendarElement().style.display = "";
};

//  カレンダー表示欄を即座に隠す

DYNns.JKL.Calendar.prototype.hide = function() {
    this.getCalendarElement().style.display = "none";
};

//  カレンダー表示欄をフェードアウトする

DYNns.JKL.Calendar.prototype.fadeOut = function(s) {
    if (DYNns.JKL.Opacity) {
        this.getOpacityObject().fadeOut(s);
    } else {
        this.hide();
    }
};

// 月単位で移動する

DYNns.JKL.Calendar.prototype.moveMonth = function(mon) {
    // 前へ移動
    if (!this.date) this.initDate();
    for (; mon < 0; mon++) {
        this.date.setDate(1);   // 毎月1日の1日前は必ず前の月
        this.date.setTime(this.date.getTime() - (24 * 3600 * 1000));
    }
    // 後へ移動
    for (; mon > 0; mon--) {
        this.date.setDate(1);   // 毎月1日の32日後は必ず次の月
        this.date.setTime(this.date.getTime() + (24 * 3600 * 1000) * 32);
    }
    this.date.setDate(1);       // 当月の1日に戻す
    this.write();    // 描画する
};

// イベントを登録する

DYNns.JKL.Calendar.prototype.addEvent = function(elem, ev, func) {
    //  prototype.js があれば利用する(IEメモリリーク回避)
    if (window.Event && Event.observe) {
        Event.observe(elem, ev, func, false);
    } else {
        elem["on" + ev] = func;
    }
}

// カレンダーを描画する

DYNns.JKL.Calendar.prototype.write = function() {
    var date = DYNns.getTabDate(DYNns.panelset[this.suffix]);
    if (!this.date) this.initDate();
    date.setTime(this.date.getTime());

    var year = date.getFullYear();          // 指定年
    var mon = date.getMonth();             // 指定月
    var today = date.getDate();              // 指定日
    var form1 = this.getFormElement();

    // 2013.10.18 DYN 指定月の祝日を取り出す
    var holy = new Array();
    for (var i = 0; i < this.holiday.length; i++) {
        var ymd = this.holiday[i].split('/');
        if (ymd[0] == year && ymd[1] == mon + 1) {
            holy.push(ymd[2]);
        }
    }


    // 2011.6.17 DYN  深夜販売時間を設定（通常は0を設定）
    var midnight = 5;
    var checktime = new Date();
    var hours = (new Date(checktime.getHours())).getTime();

    // 選択可能な日付範囲
    var min;
    if (this.min_date) {

        // 2011.6.17 DYN 最初に深夜販売（midnight時）までかどうかをチェックする
        if (midnight > hours) {
            this.min_date.setDate(checktime.getDate() - 1);
            var tmp = new Date(this.min_date.getFullYear(), this.min_date.getMonth(), this.min_date.getDate());
        } else {
            var tmp = new Date(this.min_date.getFullYear(), this.min_date.getMonth(), this.min_date.getDate());
        }
        min = tmp.getTime();
    }
    var max;
    if (this.max_date) {
        var tmp = new Date(this.max_date.getFullYear(),
            this.max_date.getMonth(), this.max_date.getDate());
        max = tmp.getTime();
    }

    // 直前の月曜日まで戻す
    date.setDate(1);                        // 1日に戻す
    var wday = date.getDay();               // 曜日 日曜(0)～土曜(6)

    // 2006.11.15 MOM 表示開始曜日を可変にしたので、ロジックちょっといじりますよ
    if (wday != this.start_day) {
        date.setTime(date.getTime() - (24 * 3600 * 1000) * ((wday - this.start_day + 7) % 7));
    }


    // 最大で7日×6週間＝42日分のループ
    var list = new Array();
    for (var i = 0; i < 42; i++) {
        var tmp = new Date();
        tmp.setTime(date.getTime() + (24 * 3600 * 1000) * i);
        if (i && i % 7 == 0 && tmp.getMonth() != mon) break;
        list[list.length] = tmp;
    }

    // スタイルシートを生成する
    var month_table_style = 'width: 100%; ';
    month_table_style += 'background: ' + this.style.frame_color + '; ';
    month_table_style += 'border: 1px solid ' + this.style.frame_color + ';';

    var week_table_style = 'width: 100%; ';
    week_table_style += 'background: ' + this.style.day_bgcolor + '; ';
    week_table_style += 'border-left: 1px solid ' + this.style.frame_color + '; ';
    week_table_style += 'border-right: 1px solid ' + this.style.frame_color + '; ';

    var days_table_style = 'width: 100%; ';
    days_table_style += 'background: ' + this.style.day_bgcolor + '; ';
    days_table_style += 'border: 1px solid ' + this.style.frame_color + '; ';

    var month_td_style = "";
    // 2007.02.04 MOM TDタグも背景色のスタイルを明示的に指定する
    //month_td_style += 'background: ' + this.style.frame_color + '; ';
    month_td_style += 'font-size: ' + this.style.font_size + '; ';
    month_td_style += 'color: ' + this.style.month_color + '; ';
    month_td_style += 'padding: 4px 0px 2px 0px; ';
    month_td_style += 'text-align: center; ';
    month_td_style += 'font-weight: bold;';

    var week_td_style = "";
    // 2007.02.04 MOM TDタグも背景色のスタイルを明示的に指定する
    week_td_style += 'background: ' + this.style.day_bgcolor + '; ';
    week_td_style += 'font-size: ' + this.style.font_size + '; ';
    week_td_style += 'padding: 2px 0px 2px 0px; ';
    week_td_style += 'font-weight: bold;';
    week_td_style += 'text-align: center;';

    var days_td_style = "";
    // 2007.02.04 MOM TDタグも背景色のスタイルを明示的に指定する
    //days_td_style += 'background: ' + this.style.day_bgcolor + '; ';
    //days_td_style += 'font-size: ' + this.style.font_size + '; ';
    //days_td_style += 'padding: 1px; ';
    days_td_style += 'text-align: right; ';
    //days_td_style += 'font-weight: bold;';

    var days_unselectable = "font-weight: normal;";

    // HTMLソースを生成する
    var src1 = "";

    // 2006.11.23 MOM 邪魔な<select>への応急処置その１
    // テーブルをdivで囲んで上位レイヤに設定(z-indexの値を大きくしておく)
    // 2006.11.27 MOM 描画フィールドの高さを取得するため、idをセットしておく
    src1 += '<div id="' + this.eid + '_screen" style="position:relative;z-index:' + (this.zindex + 1) + ';" class="calendar_style">\n';

    src1 += '<table border="0" cellpadding="0" cellspacing="0" class="tbl_title" ><tr>';
    
    src1 += '<td id="__' + this.eid + '_btn_prev" title="<%=toBeforeMonth%>" class="btn_prev" ><span class="icon_next"></span></td>';
    src1 += '<td style="' + month_td_style + '">&nbsp;</td>';
    // 2006.12.04 ksuzu 表示月をクリックすると現在の月に移動
    src1 += '<td id="__' + this.eid + '_btn_today" class="btn_today">';
    // 2016.03.22 a-takao 年と月の表示ひっくり返せる機能を追加
    this.wordsset.months = this.wordsset.months || [];
    var yearTextSet = '<%=yearBefore%>' + (year) + '<%=yearAfter%>';
    var monthTextSet = '<%=monthBefore%>' + (this.wordsset.months[mon] || (mon + 1)) + '<%=monthAfter%>';
    src1 += (this.wordsset.monthDisplayReverse || false)
        ? monthTextSet + ' ' + yearTextSet + '</td>'
        : yearTextSet + ' ' + monthTextSet + '</td>';
    src1 += '<td id="__' + this.eid + '_btn_close" title="<%=close%>" class="btn_close" ><span class="cancel"></span></td>';
    src1 += '<td id="__' + this.eid + '_btn_next" title="<%=toNextMonth%>" class="btn_next" ><span class="icon_next"></span></td>';
    src1 += "</tr></table>\n";
    src1 += '<table border="0" cellpadding="0" cellspacing="0" class="tbl_text" ><tr>';

    // 2006.11.15 MOM 表示開始曜日start_dayから順に一週間分表示する
    for (var i = this.start_day; i < this.start_day + 7; i++) {
        var _wday = i % 7;
        if (_wday == 0) {
            src1 += '<td style="color: ' + this.style.sunday_color + '; ' + '"><%=sunday%></td>';
        } else if (_wday == 6) {
            src1 += '<td style="color: ' + this.style.saturday_color + '; ' + '"><%=saturday%></td>';
        } else {
            src1 += '<td style="color: ' + this.style.weekday_color + '; ' + '">';
            if (_wday == 1) src1 += '<%=monday%></td>';
            else if (_wday == 2) src1 += '<%=tuesday%></td>';
            else if (_wday == 3) src1 += '<%=wednesday%></td>';
            else if (_wday == 4) src1 += '<%=thursday%></td>';
            else if (_wday == 5) src1 += '<%=friday%></td>';
        }
    }


    src1 += "</tr></table>\n";
    src1 += '<table border="0"  style="' + '" class="tbl_cel">';

    var curutc;
    if (form1 && form1.value) {
        var splt = form1.value.split(this.spliter);
        if (splt[0] > 0 && splt[2] > 0) {
            var curdd = new Date(splt[0] - 0, splt[1] - 1, splt[2] - 0);
            curutc = curdd.getTime(); // フォーム上の当日
        }
    }

    //2006.11.23 MOM 今日日付を取得し、時分秒を切り捨てる
    var realdd = DYNns.getTabDate(DYNns.panelset[this.suffix]);
    var realutc = (new Date(realdd.getFullYear(), realdd.getMonth(), realdd.getDate())).getTime();

    for (var i = 0; i < list.length; i++) {
        var dd = list[i];
        var ww = dd.getDay();
        var mm = dd.getMonth();

        if (ww == this.start_day) {
            src1 += "<tr>"; // 表示開始曜日の前に行頭
        }

        var cc = days_td_style;
        var utc = dd.getTime();
        var normal = "";
        if (mon == mm) {

            //2006.11.23 MOM 最初に今日日付かどうかをチェックする
            //※当月でない場合にも色変えると選択できそうに見えて紛らわしいので、当月かつ今日日付の場合のみ色を変える
            if (utc == realutc) {
                cc += "color: " + this.style.today_color + ";";     // 今日日付
            } else

                //s131018 t-suhara 当月の祝日を追加
                if (dd.getDate() == holy[0]) {
                    cc += "color: " + this.style.holiday_color + ";";
                    holy = holy.slice(1);
                } else
                    //e131018 t-suhara
                    if (ww == 0) {
                        cc += "color: " + this.style.sunday_color + ";";    // 当月の日曜日
                    } else if (ww == 6) {
                        cc += "color: " + this.style.saturday_color + ";";  // 当月の土曜日
                    } else {
                        cc += "color: " + this.style.weekday_color + ";";   // 当月の平日
                    }

        } else {
            //cc += "color: " + this.style.others_color + ";";    
            var normal = "normal";
            // 前月末と翌月初の日付
        }
        var enable = "enable";
        //2006.11.23 MOM utcの変数宣言を↑に移動
        //      var utc = dd.getTime();

        // 2006.11.30 MOM 選択可能な曜日指定の条件追加
        //        if (( min && min > utc ) || ( max && max < utc )) {
        if ((min && min > utc) || (max && max < utc) || (!this.selectable_days[dd.getDay()])) {
            //cc += days_unselectable;
             enable = "hover";
        }
        if (utc == curutc) { // フォーム上の当日
            cc += "background: " + this.style.day_hover_bgcolor + ";";
           
        }
        // 2006.11.30 MOM 今日日付の背景色
        else if (mon == mm && utc == realutc) {
            //cc += "background: " + this.style.today_bgcolor + ";";
            enable = "active";
        }
        // 2006.11.30 MOM 選択不可能な日付の背景色
        else if ((min && min > utc) || (max && max < utc) || (!this.selectable_days[dd.getDay()])) {
            //cc += 'background: ' + this.style.unselectable_day_bgcolor + ';';
            enable = "unable";
        }

        //2006.11.23 MOM 枠線描画を追加
        if (this.draw_border) {
            if (mon == mm && utc == realutc) {
                //cc += "border:solid 1px " + this.style.today_border_color + ";";    // 当月かつ今日日付
            } else {
                //cc += "border:solid 1px " + this.style.others_border_color + ";";    // その他
            }
        }

        var ss = this.getDateYMD(dd);
        var tt = dd.getDate();

        src1 += '<td style="' + cc + '" class="' + enable + " " + normal + '" title=' + ss + ' id="__' + this.eid + '_td_' + ss + '" class="cell">' + tt + '</td>';
        

        if (ww == (this.start_day + 6) % 7) {
            src1 += "</tr>\n";                                  // 表示開始曜日の１つ手前で行末
        }
    }
    src1 += "</table>\n";

    src1 += '</div>\n';

    // カレンダーを書き換える
    var cal1 = this.getCalendarElement();
    if (!cal1) return;
    cal1.style.width = this.style.frame_width;
    cal1.style.position = "absolute";
    cal1.innerHTML = _.template(src1)(this.wordsset);


    // 2006.11.23 MOM 邪魔な<select>への応急処置その２
    // カレンダーと全く同じサイズのIFRAMEを生成し、座標を一致させて下位レイヤに描画する

    // IFRAME対応が可能なバージョンのみ処置を施す
    var ua = navigator.userAgent;
    if (ua.indexOf("MSIE 5.5") >= 0 || ua.indexOf("MSIE 6") >= 0) {

        // 2006.11.27 MOM 先にinnerHTMLにカレンダーの実体を渡しておいて、描画フィールドの高さを取得する
        // ※hide()が呼ばれた直後だと、offsetHeightが0になってしまうので、一時的にshowを呼ぶ
        this.show();
        var screenHeight = cal1.document.getElementById(this.eid + "_screen").offsetHeight;
        this.hide();

        src1 += '<div style="position:absolute;z-index:' + this.zindex + ';top:0px;left:0px;">';
        src1 += '<iframe /?scid="dummy.htm" frameborder=0 scrolling=no width=' + this.style.frame_width + ' height=' + screenHeight + '></iframe>';
        src1 += '</div>\n';

        //改めてinnerHTMLにセット
        cal1.innerHTML = _.template(src1)(this.wordsset);
    }



    // イベントを登録する
    var __this = this;
    var get_src = function(ev) {
        ev = ev || window.event;
        var src = ev.target || ev.srcElement;
        return src;
    };
    var month_onmouseover = function(ev) {
        var src = get_src(ev);
        //src.style.color = __this.style.month_hover_color;
        //src.style.background = __this.style.month_hover_bgcolor;
    };
    var month_onmouseout = function(ev) {
        var src = get_src(ev);
        //src.style.color = __this.style.month_color;
        //src.style.background = __this.style.frame_color;
    };
    var day_onmouseover = function(ev) {
        var src = get_src(ev);
        src.style.background = __this.style.day_hover_bgcolor;
    };
    var day_onmouseout = function(ev) {
        var src = get_src(ev);
        // 2006.11.30 MOM 当月かつ今日日付であれば、今日日付用の背景色を適用
        var today = new Date();
        if (today.getMonth() == __this.date.getMonth() && src.id == '__' + __this.eid + '_td_' + __this.getDateYMD(today)) {
            src.style.background = __this.style.today_bgcolor;
        } else {
            src.style.background = __this.style.day_bgcolor;
        }
    };
    var day_onclick = function(ev) {
        var src = get_src(ev);
        var srcday = src.id.substr(src.id.length - 10);
        //      __this.setFormValue( srcday );
        __this.SetCalenderYmd(srcday);
        __this.fadeOut(1.0);
    };

    //
    // 2006.12.04 ksuzu 選択できない月へのリンクは作成しない
    //
    // 前の月へボタン
    var tdprev = document.getElementById("__" + this.eid + "_btn_prev");
    //前の月の最終日
    var tmpDate = new Date(year, mon, 1);
    tmpDate.setTime(tmpDate.getTime() - (24 * 3600 * 1000));
    //選択可能な日がある？
    if (!min || this.min_date <= tmpDate) {
        tdprev.style.cursor = this.style.cursor;
        this.addEvent(tdprev, "mouseover", month_onmouseover);
        this.addEvent(tdprev, "mouseout", month_onmouseout);
        this.addEvent(tdprev, "click", function() { __this.moveMonth(-1); });
    }
    //選択不可能
    else {
        tdprev.title = this.wordsset.banBeforeMonth;
    }


    //
    // 2006.12.04 ksuzu 表示月をクリックすると現在の月に移動
    //
    var nMov = (realdd.getFullYear() - year) * 12 + (realdd.getMonth() - mon);
    if (nMov != 0) {
        // 現在の月へボタン
        var tdtoday = document.getElementById("__" + this.eid + "_btn_today");
        tdtoday.style.cursor = this.style.cursor;
        tdtoday.title = this.wordsset.toThisMonth;
        this.addEvent(tdtoday, "mouseover", month_onmouseover);
        this.addEvent(tdtoday, "mouseout", month_onmouseout);
        this.addEvent(tdtoday, "click", function() { __this.moveMonth(nMov); });
    }

    // 閉じるボタン
    var tdclose = document.getElementById("__" + this.eid + "_btn_close");
    tdclose.style.cursor = this.style.cursor;
    this.addEvent(tdclose, "mouseover", month_onmouseover);
    this.addEvent(tdclose, "mouseout", month_onmouseout);

    //
    // 2006.12.04 ksuzu カレンダーの初期表示を戻す
    //
    this.addEvent(tdclose, "click", function() { __this.getFormValue(); __this.hide(); });

    //
    // 2006.12.04 ksuzu 選択できない月へのリンクは作成しない
    //
    // 次の月へボタン
    var tdnext = document.getElementById("__" + this.eid + "_btn_next");
    //次の月の初日
    var tmpDate = new Date(year, mon, 1);
    tmpDate.setTime(tmpDate.getTime() + (24 * 3600 * 1000) * 32);
    tmpDate.setDate(1);
    //選択可能な日がある？
    if (!max || this.max_date >= tmpDate) {
        tdnext.style.cursor = this.style.cursor;
        this.addEvent(tdnext, "mouseover", month_onmouseover);
        this.addEvent(tdnext, "mouseout", month_onmouseout);
        this.addEvent(tdnext, "click", function() { __this.moveMonth(+1); });
    }
    //選択不可能
    else {
        tdnext.title = this.wordsset.banNextMonth;
    }


    // セルごとのイベントを登録する
    for (var i = 0; i < list.length; i++) {
        var dd = list[i];
        if (mon != dd.getMonth()) continue;       // 今月のセルにのみ設定する

        var utc = dd.getTime();
        if (min && min > utc) continue;           // 昔過ぎる
        if (max && max < utc) continue;           // 未来過ぎる
        //      if ( utc == curutc ) continue;              // フォーム上の当日
        // 2006.11.30 MOM 選択可能な曜日指定対応
        if (!this.selectable_days[dd.getDay()]) continue;

        var ss = this.getDateYMD(dd);
        var cc = document.getElementById("__" + this.eid + "_td_" + ss);
        if (!cc) continue;

        cc.style.cursor = this.style.cursor;
        this.addEvent(cc, "mouseover", day_onmouseover);
        this.addEvent(cc, "mouseout", day_onmouseout);
        this.addEvent(cc, "click", day_onclick);
    }

    // 表示する
    this.show();

};




