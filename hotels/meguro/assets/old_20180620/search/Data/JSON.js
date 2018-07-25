(function(DYNns, undefined) {
    "use strict";

    //設定
    DYNns.System = {
        errortext: "" //表示に失敗した場合に表示する文章
    };
    DYNns.panelset = {
        Test1: {
            initialization: {
                starttab: 0 //初めはどのタブにいるかの設定   左から0,1,2,…
            },
            tabs: ["tab1"]  //タブ表示順の設定 starttabの番号に対応  1要素の場合はタブ切り替え無し
        },
    };
    DYNns.tabset = {
        tab1: { //タブの名前 panelsetのtabs内の文字列と対応させる
            tabname: "宿泊検索",  //タブ切り替え機能が有効の場合の表示名
            sts: {
                hdata: [   //ホテル情報の設定    複数設定した場合グループ選択が有効になる    nameはグループ選択時のみ表示
                    { name: "○○○", hcod1: "MI570", hcod2: "001&bcid=C02" },
                ],
                windowOpenSubmit: true,    //検索ボタン押下時に新規ウィンドウを開く=true,開かない=false
                windowOpenCancel: true,    //確認・キャンセルボタン押下時に新規ウィンドウを開く=true,開かない=false
                //windowSts: { width: 1000, Height: 600, resizable: "yes", scrollbars: "yes", status: "yes" },    //新規にウィンドウを開く場合のwindow.open()関数の第3引数
                bookingDate: {  //日付選択の設定
                    defaultStayDate: 0,//日付の初期値(最低値)    今日からプラス何日か
                    usecalendar: true,	//カレンダーを使用する=true,使用しない=false
                    datelimit: 365,	//選択可能な日付の範囲   何日表示するか
                    nights: { max: 7, selected: 1 },//泊数の選択肢最大値=max,初期値=selected    displayがtrueの場合のみ有効
                    rooms: { max: 5, selected: 1 }//室数の選択肢最大値=max,初期値=selected  displayがtrueの場合のみ有効
                },
                persons: [	//人数選択の設定    DIの小人設定の数に合わせた数だけ設定する(非表示にする時はコメントアウト又は削除する)   選択肢の題名=name,選択肢の最大数=maxPsn
                    { name: " ", maxPsn: 4, startPsn: 1 },
                   // { name: "小人A", maxPsn: 3},
                   // { name: "小人B", maxPsn: 3},
                   // { name: "小人C", maxPsn: 3},
                   // { name: "小人D", maxPsn: 3},
                   // { name: "小人E", maxPsn: 3},
                   // { name: "小人F", maxPsn: 3},
                   // { name: "小人G", maxPsn: 3},
                   // { name: "小人H", maxPsn: 3},
                   // { name: "小人I", maxPsn: 3},
                   // { name: "小人J", maxPsn: 3},
                ],
                budgets: {	//予算の設定  初期値はstartに設定した値に最も近い選択可能な予算の値となる
                    min: { min: 0, max: 50000, start: 0 },   //予算の最小値の設定 min=選択肢の最小値,max=最大値,start=選択肢の初期値   0は下限無し
                    max: { min: 10000, max: 9999999, start: 9999999 }   //予算の最大値の設定 min=選択肢の最小値,max=最大値,start=選択肢の初期値   9999999は上限無し
                },
                category: {
                    booking: [
                        { name: "未選択", value: "" },
                        { name: "カテゴリー1", value: "10" },//valueにプランカテゴリーコードを入力
                        { name: "カテゴリー2", value: "110" }
                    ],
                    room: [
                        { name: "指定なし", value: "" },
                        { name: "カテゴリー1", value: "" },//valueに客室コードを入力
                        { name: "カテゴリー2", value: "" }
                    ],
                    roomType: [
                        { name: "未選択", value: "" },
                        { name: "カテゴリー1", value: "100" },//valueに客室カテゴリーコードを入力
                        { name: "カテゴリー2", value: "101" },
                    ]
                },
                submit: {   //検索機能の設定
                    address: 2,   //検索場所の設定    0=PC,1=スマートフォン,2=自動判定   自動判定は画面幅から判定
                    plan: 0,   //検索するプラン種別の設定    0=宿泊,1=多言語版,2=レストラン
                    width: 1320  //自動判定時に基準となる画面幅の設定
                },
                display: {  //各項目の表示非表示の設定  表示する=true,表示しない=false   対応するHTMLタグが存在しない場合は強制非表示  上の検索機能が対応していない場合は強制非表示
                    nights: true,  //泊数選択
                    rooms: true,  //室数選択
                    chkymd: true,   //日程未定
                    chkpsn: true,   //人数未定
                    budgets: true,   //金額設定
                    categorybooking: false,   //プランカテゴリー選択
                    categoryroom: false,   //客室タイプ選択
                    categoryroomtype: false,   //客室カテゴリー選択
                    dispunitPlan: true,   //検索モード:宿泊プラン
                    dispunitRoom: true,   //検索モード:お部屋タイプ
                    dispunitCalendar: true,   //検索モード:空室カレンダー
                }
            },
            words: "words1"
        },
    };
DYNns.wordset = {
        words1: { //テキストセット名  tab項目内のwordsで指定された名称と揃える
            //各項目の題名の設定
            tabname: "宿泊検索", //タブ切り替え機能が有効の場合の表示名  タブ毎に設定されたものが優先

            DepartureAirPortTitle: "出発空港", //出発空港
            ArrivalAirPortTitle: "到着空港", //到着空港

            bookingDateTitle: "", //日付選択
            bookingDatePunctuation: "", //年月日の区切り文字
            bookingDateNights: "", //泊選択の単位
            bookingDateRooms: "", //室選択の単位
            bookingDateUndecided: "日程未定", //日程未定

            personsUndecided: "人数未定", //人数未定
            personsNumber: "", //人数選択の単位

            priceBudget: "ご予算(1室もしくは1人あたり)", //予算選択
            priceBudgetEnd: "まで", //予算選択の末尾
            priceLowestNothing: "下限なし", //budgetsのminが0の場合の表記
            priceMaximumNothing: "上限なし", //budgetsのmaxが9999999の場合の表記

            CategoryBookingTitle: "予約タイプ（プランカテゴリー）", //プランカテゴリー選択
            CategoryRoomTitle: "客室タイプ", //客室タイプ選択
            CategoryRoomTypeTitle: "客室の種類（客室カテゴリー）", //客室カテゴリー選択

            dispunitPlan: "宿泊プランを表示", //検索モード:宿泊プラン
            dispunitRoom: "お部屋タイプを表示", //検索モード:お部屋タイプ
            dispunitCalendar: "空室カレンダーを表示", //検索モード:空室カレンダー

            submitSubmit: "宿泊検索", //検索ボタン
            submitCancel: "宿泊予約の確認" //確認・キャンセルボタン
        }
    };
} (window.DYNns = window.DYNns || {}));
