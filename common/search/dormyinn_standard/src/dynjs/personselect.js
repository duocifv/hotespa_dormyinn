/********** 吹き出し 複数室選択時 **********/


$DijQ(function($) {




    // 室数変更のプルダウンを選択した場合
    if ($("[name='cmbSUMROOM']").val()) {


        // メイン画面に、hidden値を反映
        //$("[name='room']").find("option[value='" + $("[name='cmbSUMROOM']").val() + "']").prop("selected",true);

        if ($("[name='cmbSUMROOM']").val() == 1) {
            $("[name='cmbADULT']").find("option[value='" + $("[name='subfrm_Person']").val() + "']").prop("selected", true);

            if ($("[name='hidCOD1']").val().substring(0, 2) == "DR") {
                $("#cmbChildA_roomassignselect").html($("[name='subfrm_ChildA']").val()).show();
                $("#cmbChild_roomassignselect").html($("[name='subfrm_Child']").val() - $("[name='subfrm_ChildA']").val()).show();
            }
            else if ($("[name='hidCOD1']").val().substring(0, 3) == "JTC") {
                $("#cmbChildA_roomassignselect").html(parseInt($("[name='subfrm_ChildA']").val()) + parseInt($("[name='subfrm_ChildB']").val())).show();
                $("#cmbChild_roomassignselect").html(parseInt($("[name='subfrm_Child']").val()) - parseInt($("[name='subfrm_ChildA']").val()) - parseInt($("[name='subfrm_ChildB']").val())).show();

            } else {
                $("#cmbChild_roomassignselect").html($("[name='subfrm_Child']").val()).show();
            }

            $(".childareaa").show();
            $(".childarea").hide();

        } else {

            $("[name='cmbADULT']").hide();
            $(".childarea").hide();

            $("#cmbADULT_roomassignselect").html($("[name='subfrm_Person']").val()).show();

            if ($("[name='hidCOD1']").val().substring(0, 2) == "DR") {
                $("#cmbChildA_roomassignselect").html($("[name='subfrm_ChildA']").val()).show();
                $("#cmbChild_roomassignselect").html($("[name='subfrm_Child']").val() - $("[name='subfrm_ChildA']").val()).show();
            }
            else if ($("[name='hidCOD1']").val().substring(0, 3) == "JTC") {
                $("#cmbChildA_roomassignselect").html(parseInt($("[name='subfrm_ChildA']").val()) + parseInt($("[name='subfrm_ChildB']").val())).show();
                $("#cmbChild_roomassignselect").html(parseInt($("[name='subfrm_Child']").val()) - parseInt($("[name='subfrm_ChildA']").val()) - parseInt($("[name='subfrm_ChildB']").val())).show();

            } else {
                $("#cmbChild_roomassignselect").html($("[name='subfrm_Child']").val()).show();
            }

            $(".childareaa").show();

        }
        //$("#children").html($("[name='subfrm_Child']").val()).show();

        // 人数入力ウィンドウ＋1部屋目情報

        var nWBFplanmode = $("#nWBFplanmode").val();
        if (nWBFplanmode == null) {
            nWBFplanmode = 0;
        }

        var tbls = "";

        tbls += '<div class="roomassign_select_hd"></div>';
        tbls += '<div class="roomassign_select_bd">';
        tbls += '<div id="heya1" class="pb15">';
        if ($("[name='hidCOD1']").val().substring(0, 3) == "JTC") {
            tbls += '<span style="font-size:14px;"><strong>PP利用券をご使用になる予約の場合は、【（ゲスト）〇〇（利用券）】に利用人数を選択してください。</strong><br>（「<font color=red>トップシーズン</font>」はご利用いただけません。）</span>';
        }

        if (nWBFplanmode == 1) {
            tbls += '<div class="mb05"><strong><nobr>1部屋当たり</strong>の大人・こどもの人数を選んでください</nobr><img src="./cancel.png" alt="close" class="roomassign_select_close" style="position:absolute;top:0;right:13px;cursor:pointer;" /></div>';
        } else {
            tbls += '<div class="mb05"><strong><nobr>1部屋目</nobr></strong><img src="./cancel.png" alt="close" class="roomassign_select_close" style="position:absolute;top:0;right:13px;cursor:pointer;" /></div>';
        }

        tbls += '<div id="selectbtnLeft" ><span class="roomassign_select_close">決定</span></div>';

        tbls += '<div class="roomassign_select_table">';
        tbls += '<table cellspacing="1" cellpadding="1" border="1">';
        tbls += '<tr>';
        tbls += '<td class="bg_gray2">大人</td>';
        tbls += '<td class="bg_gray2 SelectChildA headChildA">小人A</td>';
        tbls += '<td class="bg_gray2 SelectChildB headChildB">小人B</td>';
        tbls += '<td class="bg_gray2 SelectChildC headChildC">小人C</td>';
        tbls += '<td class="bg_gray2 SelectChildD headChildD">小人D</td>';
        tbls += '<td class="bg_gray2 SelectChildE headChildE">小人E</td>';
        tbls += '<td class="bg_gray2 SelectChildF headChildF">小人F</td>';
        tbls += '<td class="bg_gray2 SelectChildG headChildG">小人G</td>';
        tbls += '<td class="bg_gray2 SelectChildH headChildH">小人H</td>';
        tbls += '<td class="bg_gray2 SelectChildI headChildI">小人I</td>';
        tbls += '<td class="bg_gray2 SelectChildJ headChildJ">小人J</td>';
        tbls += '</tr>';
        tbls += '<tr>';
        tbls += '<td><select name="fadult_1"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option></select>&nbsp;名様</td>';
        tbls += '<td class="SelectChildA">';
        tbls += '<div><select name="fCHILDA_1"><option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option></select>&nbsp;名様</div></td>';
        tbls += '</td>';
        tbls += '<td class="SelectChildB">';
        tbls += '<div><select name="fCHILDB_1"><option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option></select>&nbsp;名様</div></td>';
        tbls += '</td>';
        tbls += '<td class="SelectChildC">';
        tbls += '<div><select name="fCHILDC_1"><option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option></select>&nbsp;名様</div></td>';
        tbls += '</td>';
        tbls += '<td class="SelectChildD">';
        tbls += '<div><select name="fCHILDD_1"><option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option></select>&nbsp;名様</div></td>';
        tbls += '</td>';
        tbls += '<td class="SelectChildE">';
        tbls += '<div><select name="fCHILDE_1"><option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option></select>&nbsp;名様</div></td>';
        tbls += '</td>';
        tbls += '<td class="SelectChildF">';
        tbls += '<div><select name="fCHILDF_1"><option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option></select>&nbsp;名様</div></td>';
        tbls += '</td>';
        tbls += '<td class="SelectChildG">';
        tbls += '<div><select name="fCHILDG_1"><option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option></select>&nbsp;名様</div></td>';
        tbls += '</td>';
        tbls += '<td class="SelectChildH">';
        tbls += '<div><select name="fCHILDH_1"><option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option></select>&nbsp;名様</div></td>';
        tbls += '</td>';
        tbls += '<td class="SelectChildI">';
        tbls += '<div><select name="fCHILDI_1"><option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option></select>&nbsp;名様</div></td>';
        tbls += '</td>';
        tbls += '<td class="SelectChildJ">';
        tbls += '<div><select name="fCHILDJ_1"><option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option></select>&nbsp;名様</div></td>';
        tbls += '</td>';
        tbls += '</tr>';
        tbls += '</table>';
        tbls += '</div>';
        tbls += '</div>';
        tbls += '</div>';
        tbls += '<div class="roomassign_select_ft">&nbsp;</div>';

        $(".roomassign_select").html(tbls);

		/*
				$(".roomassign_select").html('<div class="roomassign_select_hd"></div>' + 
					'<div class="roomassign_select_bd">' + 
						'<div id="heya1" class="pb15">' + 
							'<div class="mb05"><strong><nobr>1部屋目</nobr></strong><img src="./cancel.png" alt="close" class="roomassign_select_close" style="position:absolute;top:0;right:13px;cursor:pointer;" /></div>' + 
		
							'<div id="selectbtnLeft" ><span class="roomassign_select_close">決定</span></div>' + 
		
		//					'<div id="selectbtnRight"><span><a href="javascript:void(0);">このままで検索する</a></span></div>' + 
		
		
							'<div class="roomassign_select_table">' + 
								'<table cellspacing="1" cellpadding="1" border="1">' + 
									'<tr>' + 
									'<td class="bg_gray2">大人</td>' + 
									'<td class="bg_gray2 SelectChildA headChildA">小人A</td>' + 
									'<td class="bg_gray2 SelectChildB headChildB">小人B</td>' + 
									'<td class="bg_gray2 SelectChildC headChildC">小人C</td>' + 
									'<td class="bg_gray2 SelectChildD headChildD">小人D</td>' + 
									'<td class="bg_gray2 SelectChildE headChildE">小人E</td>' + 
									'<td class="bg_gray2 SelectChildF headChildF">小人F</td>' + 
									'<td class="bg_gray2 SelectChildG headChildG">小人G</td>' + 
									'<td class="bg_gray2 SelectChildH headChildH">小人H</td>' + 
									'<td class="bg_gray2 SelectChildI headChildI">小人I</td>' + 
									'<td class="bg_gray2 SelectChildJ headChildJ">小人J</td>' + 
									'</tr>' + 
									'<tr>' + 
									'<td><select name="fadult_1"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option></select>&nbsp;名様</td>' + 
									'<td class="SelectChildA">' + 
										'<div><select name="fCHILDA_1"><option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option></select>&nbsp;名様</div></td>' + 
									'</td>' + 
									'<td class="SelectChildB">' + 
										'<div><select name="fCHILDB_1"><option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option></select>&nbsp;名様</div></td>' + 
									'</td>' + 
									'<td class="SelectChildC">' + 
										'<div><select name="fCHILDC_1"><option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option></select>&nbsp;名様</div></td>' + 
									'</td>' + 
									'<td class="SelectChildD">' + 
										'<div><select name="fCHILDD_1"><option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option></select>&nbsp;名様</div></td>' + 
									'</td>' + 
									'<td class="SelectChildE">' + 
										'<div><select name="fCHILDE_1"><option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option></select>&nbsp;名様</div></td>' + 
									'</td>' + 
									'<td class="SelectChildF">' + 
										'<div><select name="fCHILDF_1"><option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option></select>&nbsp;名様</div></td>' + 
									'</td>' + 
									'<td class="SelectChildG">' + 
										'<div><select name="fCHILDG_1"><option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option></select>&nbsp;名様</div></td>' + 
									'</td>' + 
									'<td class="SelectChildH">' + 
										'<div><select name="fCHILDH_1"><option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option></select>&nbsp;名様</div></td>' + 
									'</td>' + 
									'<td class="SelectChildI">' + 
										'<div><select name="fCHILDI_1"><option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option></select>&nbsp;名様</div></td>' + 
									'</td>' + 
									'<td class="SelectChildJ">' + 
										'<div><select name="fCHILDJ_1"><option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option></select>&nbsp;名様</div></td>' + 
									'</td>' + 
		
		
									'</tr>' + 
								'</table>' + 
							'</div>' + 
						'</div>' + 
					'</div>' +
		 
					'<div class="roomassign_select_ft">&nbsp;</div>');
		*/

        if ($("[name='cmbSUMROOM']").val() > 1) {

            // 人数入力ウィンドウに、2部屋以降のテーブル追加
            tbls = "";
            for (var i = 2; i <= $("[name='cmbSUMROOM']").val(); i++) {

                if (nWBFplanmode == 1 && i > 0) {
                    tbls += '<div id="heya' + i + '" class="pb15" style="display:none;">';
                } else {
                    tbls += '<div id="heya' + i + '" class="pb15">';
                }
                tbls += '<div class="mb05"><strong><nobr>' + i + '部屋目</nobr></strong></div>';
                tbls += '<div class="roomassign_select_table">';
                tbls += '<table cellspacing="1" cellpadding="1" border="1" width="100%" class="tac">';
                tbls += '<tr>';

                tbls += '<td class="bg_gray2">大人</td>';
                tbls += '<td class="bg_gray2 SelectChildA headChildA">小人A</td>';
                tbls += '<td class="bg_gray2 SelectChildB headChildB">小人B</td>';
                tbls += '<td class="bg_gray2 SelectChildC headChildC">小人C</td>';
                tbls += '<td class="bg_gray2 SelectChildD headChildD">小人D</td>';
                tbls += '<td class="bg_gray2 SelectChildE headChildE">小人E</td>';
                tbls += '<td class="bg_gray2 SelectChildF headChildF">小人F</td>';
                tbls += '<td class="bg_gray2 SelectChildG headChildG">小人G</td>';
                tbls += '<td class="bg_gray2 SelectChildH headChildH">小人H</td>';
                tbls += '<td class="bg_gray2 SelectChildI headChildI">小人I</td>';
                tbls += '<td class="bg_gray2 SelectChildJ headChildJ">小人J</td>';

                tbls += '</tr>';
                tbls += '<tr>';

                tbls += '<td><select name="fadult_' + i + '"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option></select>&nbsp;名様</td>';


                tbls += '<td class="SelectChildA">';
                tbls += '<div><select name="fCHILDA_' + i + '"><option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option></select>&nbsp;名様</div></td>';
                tbls += '</td>';
                tbls += '<td class="SelectChildB">';
                tbls += '<div><select name="fCHILDB_' + i + '"><option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option></select>&nbsp;名様</div></td>';
                tbls += '</td>';
                tbls += '<td class="SelectChildC">';
                tbls += '<div><select name="fCHILDC_' + i + '"><option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option></select>&nbsp;名様</div></td>';
                tbls += '</td>';
                tbls += '<td class="SelectChildD">';
                tbls += '<div><select name="fCHILDD_' + i + '"><option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option></select>&nbsp;名様</div></td>';
                tbls += '</td>';
                tbls += '<td class="SelectChildE">';
                tbls += '<div><select name="fCHILDE_' + i + '"><option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option></select>&nbsp;名様</div></td>';
                tbls += '</td>';
                tbls += '<td class="SelectChildF">';
                tbls += '<div><select name="fCHILDF_' + i + '"><option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option></select>&nbsp;名様</div></td>';
                tbls += '</td>';
                tbls += '<td class="SelectChildG">';
                tbls += '<div><select name="fCHILDG_' + i + '"><option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option></select>&nbsp;名様</div></td>';
                tbls += '</td>';
                tbls += '<td class="SelectChildH">';
                tbls += '<div><select name="fCHILDH_' + i + '"><option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option></select>&nbsp;名様</div></td>';
                tbls += '</td>';
                tbls += '<td class="SelectChildI">';
                tbls += '<div><select name="fCHILDI_' + i + '"><option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option></select>&nbsp;名様</div></td>';
                tbls += '</td>';
                tbls += '<td class="SelectChildJ">';
                tbls += '<div><select name="fCHILDJ_' + i + '"><option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option></select>&nbsp;名様</div></td>';
                tbls += '</td>';

                tbls += '</tr>';
                tbls += '</table>';
                tbls += '</div>';
                tbls += '</div>';

            }
            $(".roomassign_select_bd").append(tbls);

			/*
			// 人数入力ウィンドウにhidden値を反映（2部屋以降）
			for(var i = 2; i <= $("[name='cmbSUMROOM']").val(); i++){
				$("[name='adult"+i+"']").find("option[value='" + $("[name='subfrm_Person_"+i+"']").val() + "']").prop("selected",true);

				$("[name='shogakusei"+i+"']").find("option[value='" + $("[name='subfrm_ChildA_"+i+"']").val() + "']").prop("selected",true);
				$("[name='yoji1"+i+"']").find("option[value='" + $("[name='subfrm_ChildB_"+i+"']").val() + "']").prop("selected",true);
				$("[name='yoji2"+i+"']").find("option[value='" + $("[name='subfrm_ChildC_"+i+"']").val() + "']").prop("selected",true);
				$("[name='yoji3"+i+"']").find("option[value='" + $("[name='subfrm_ChildD_"+i+"']").val() + "']").prop("selected",true);
				$("[name='yoji4"+i+"']").find("option[value='" + $("[name='subfrm_ChildE_"+i+"']").val() + "']").prop("selected",true);
			}
			*/
        }

        ChildSelectDisable();

        //decodejpsn();

        hidden_change();
    }


    var ofs = $(".fukidashi_hyoujichi").offset();
    if ($(".roomassign_select_div").html() != null) {
        $(".roomassign_select_div").css("top", ofs.top - 10 + "px").css("left", ofs.left + "px");
    }

	/*
		if($(".roomassign_select_div2").html() != null){
			$(".roomassign_select_div2").css("top",ofs.top + "px").css("left",ofs.left + "px");
		}
	*/

    // 現在の表示部屋数
    var hyojizumiheyasu = parseInt($("[name='cmbSUMROOM']").val());


    // メイン画面の部屋数設定のセレクトボックスで2部屋以上が選択されたら、人数入力ウィンドウに部屋数分のテーブルを追加してスライドダウン
    $(".roomassign_heya").change(function() {

        decodejpsn();

        var nWBFplanmode = $("#nWBFplanmode").val();
        if (nWBFplanmode == null) {
            nWBFplanmode = 0;
        }

        var ofs = $(".fukidashi_hyoujichi").offset();
        if ($(".roomassign_select_div").html() != null) {
            $(".roomassign_select_div").css("top", ofs.top - 10 + "px").css("left", ofs.left + "px");
        }

        var heyasu = parseInt($(this).find("option:selected").val());

        // 室数 hidden値 変更
        $("[name='cmbSUMROOM']").val(heyasu);

        var tbls = "";

        if ($(this).find("option:selected").val() > 1 && hyojizumiheyasu <= heyasu) {

            // 室数を増やした場合
            hyojizumiheyasu++;
            var adult_all = parseInt($("[name='subfrm_Person']").val());

            for (var i = hyojizumiheyasu; i <= heyasu; i++) {

                if (nWBFplanmode == 1 && i > 0) {
                    tbls += '<div id="heya' + i + '" class="pb15" style="display:none;">';
                } else {
                    tbls += '<div id="heya' + i + '" class="pb15">';
                }
                if (nWBFplanmode != 1) {
                    tbls += '<div class="mb05"><strong><nobr>' + i + '部屋目</nobr></strong></div>';
                }
                tbls += '<div class="roomassign_select_table">';
                tbls += '<table cellspacing="1" cellpadding="1" border="1" width="100%" class="tac">';
                tbls += '<tr>';
                tbls += '<td class="bg_gray2">大人</td>';
                tbls += '<td class="bg_gray2 SelectChildA headChildA">小人A</td>';
                tbls += '<td class="bg_gray2 SelectChildB headChildB">小人B</td>';
                tbls += '<td class="bg_gray2 SelectChildC headChildC">小人C</td>';
                tbls += '<td class="bg_gray2 SelectChildD headChildD">小人D</td>';
                tbls += '<td class="bg_gray2 SelectChildE headChildE">小人E</td>';
                tbls += '<td class="bg_gray2 SelectChildF headChildF">小人F</td>';
                tbls += '<td class="bg_gray2 SelectChildG headChildG">小人G</td>';
                tbls += '<td class="bg_gray2 SelectChildH headChildH">小人H</td>';
                tbls += '<td class="bg_gray2 SelectChildI headChildI">小人I</td>';
                tbls += '<td class="bg_gray2 SelectChildJ headChildJ">小人J</td>';
                tbls += '</tr>';
                tbls += '<tr>';
                tbls += '<td><select name="fadult_' + i + '"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option></select>&nbsp;名様</td>';
                tbls += '<td class="SelectChildA">';
                tbls += '<div><select name="fCHILDA_' + i + '"><option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option></select>&nbsp;名様</div></td>';
                tbls += '</td>';
                tbls += '<td class="SelectChildB">';
                tbls += '<div><select name="fCHILDB_' + i + '"><option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option></select>&nbsp;名様</div></td>';
                tbls += '</td>';
                tbls += '<td class="SelectChildC">';
                tbls += '<div><select name="fCHILDC_' + i + '"><option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option></select>&nbsp;名様</div></td>';
                tbls += '</td>';
                tbls += '<td class="SelectChildD">';
                tbls += '<div><select name="fCHILDD_' + i + '"><option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option></select>&nbsp;名様</div></td>';
                tbls += '</td>';
                tbls += '<td class="SelectChildE">';
                tbls += '<div><select name="fCHILDE_' + i + '"><option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option></select>&nbsp;名様</div></td>';
                tbls += '</td>';
                tbls += '<td class="SelectChildF">';
                tbls += '<div><select name="fCHILDF_' + i + '"><option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option></select>&nbsp;名様</div></td>';
                tbls += '</td>';
                tbls += '<td class="SelectChildG">';
                tbls += '<div><select name="fCHILDG_' + i + '"><option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option></select>&nbsp;名様</div></td>';
                tbls += '</td>';
                tbls += '<td class="SelectChildH">';
                tbls += '<div><select name="fCHILDH_' + i + '"><option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option></select>&nbsp;名様</div></td>';
                tbls += '</td>';
                tbls += '<td class="SelectChildI">';
                tbls += '<div><select name="fCHILDI_' + i + '"><option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option></select>&nbsp;名様</div></td>';
                tbls += '</td>';
                tbls += '<td class="SelectChildJ">';
                tbls += '<div><select name="fCHILDJ_' + i + '"><option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option></select>&nbsp;名様</div></td>';
                tbls += '</td>';
                tbls += '</tr>';
                tbls += '</table>';
                tbls += '</div>';
                tbls += '</div>';

                // 大人hidden値変更
                adult_all += 1;
            }

            // 大人合計hidden変更
            $("[name='subfrm_Person']").val(adult_all);

        } else {

            // 室数が同じ、もしくは減った場合

            // hidden値 変更
            var adult_all = $("[name='subfrm_Person']").val();
            var kodomo_all = $("[name='subfrm_Child']").val();

            for (var i = hyojizumiheyasu; i > heyasu; i--) {

                // 室数設定が少なければ、テーブル削除
                $("#heya" + i).remove();
            }
        }


        $(".roomassign_select_bd").append(tbls);

        for (var i = hyojizumiheyasu; i <= heyasu; i++) {
            $("[name='fadult_" + i + "']").find("option[value='" + $("[name='defadult']").val() + "']").prop("selected", true);
        }

        hyojizumiheyasu = heyasu;

		/*
				if ( $.browser.msie && $.browser.version <= 6 ) {
					$(".roomassign_select_ie6").slideDown().height($(".roomassign_select").height() - 40);
				}
		*/

        $(".roomassign_select").slideDown();

        if ($.browser.msie && $.browser.version >= 8) {
            $(".roomassign_select_bk").height($(document).height());
            $(".roomassign_select_bk").show();
        }

        //メイン画面の表示変更
        if (hyojizumiheyasu == 1) {
            $("#cmbADULT_roomassignselect").hide();


            $(".childarea").hide();

            $("[name='cmbADULT']").find("option[value='" + $("[name='subfrm_Person']").val() + "']").prop("selected", true);

            if ($("[name='hidCOD1']").val().substring(0, 2) == "DR") {
                $("#cmbChildA_roomassignselect").html($("[name='subfrm_ChildA']").val()).show();
                $("#cmbChild_roomassignselect").html($("[name='subfrm_Child']").val() - $("[name='subfrm_ChildA']").val()).show();
            }
            else if ($("[name='hidCOD1']").val().substring(0, 3) == "JTC") {
                $("#cmbChildA_roomassignselect").html(parseInt($("[name='subfrm_ChildA']").val()) + parseInt($("[name='subfrm_ChildB']").val())).show();
                $("#cmbChild_roomassignselect").html(parseInt($("[name='subfrm_Child']").val()) - parseInt($("[name='subfrm_ChildA']").val()) - parseInt($("[name='subfrm_ChildB']").val())).show();
            } else {
                $("#cmbChild_roomassignselect").html($("[name='subfrm_Child']").val()).show();
            }


            $(".childareaa").show();
            $("[name='cmbADULT']").show();

            //小人のデータを表示

            //$(".childarea").show();

        } else {

            $("[name='cmbADULT']").hide();
            $(".childarea").hide();
            $("#cmbADULT_roomassignselect").html($("[name='subfrm_Person']").val()).show();


            if ($("[name='hidCOD1']").val().substring(0, 2) == "DR") {
                $("#cmbChildA_roomassignselect").html($("[name='subfrm_ChildA']").val()).show();
                $("#cmbChild_roomassignselect").html($("[name='subfrm_Child']").val() - $("[name='subfrm_ChildA']").val()).show();
            }
            else if ($("[name='hidCOD1']").val().substring(0, 3) == "JTC") {
                $("#cmbChildA_roomassignselect").html(parseInt($("[name='subfrm_ChildA']").val()) + parseInt($("[name='subfrm_ChildB']").val())).show();
                $("#cmbChild_roomassignselect").html(parseInt($("[name='subfrm_Child']").val()) - parseInt($("[name='subfrm_ChildA']").val()) - parseInt($("[name='subfrm_ChildB']").val())).show();

            } else {
                $("#cmbChild_roomassignselect").html($("[name='subfrm_Child']").val()).show();
            }

            $(".childareaa").show();


        }


        encodejpsn();
        //hidden_change();
        ChildSelectDisable();
        //decodejpsn();

    });


    // 部屋数が1部屋のみの場合、メイン画面の大人人数を変更したら、人数入力ウィンドウの大人人数も変更
    $("[name='cmbADULT']").change(function() {
        $("[name='fadult_1']").find("option[value='" + $("[name='cmbADULT'] option:selected").val() + "']").prop("selected", true);

        // hidden値の変更
		/*
				var adult1 = parseInt($("[name='cmbADULT']").val());
				var adult_all = parseInt($("[name='subfrm_Person']").val()) + parseInt($(this).val())-adult1;
				$("[name='subfrm_Person']").val(adult_all);
		*/
        encodejpsn();

    });


    // 室数設定ボックスの閉じるボタンをクリックした時に、設定した人数をメイン画面の表示に反映してからスライドアップする
    $(".roomassign_select_div .roomassign_select_close,.roomassign_select_bk").click(function() {

        if (checkAdult() == false) {
            return false
        }

        encodejpsn()

        //メイン画面の表示変更
        if (hyojizumiheyasu == 1) {

            $("#cmbADULT_roomassignselect").hide();
            $(".childarea").hide();
            $("[name='cmbADULT']").find("option[value='" + $("[name='subfrm_Person']").val() + "']").prop("selected", true);

            if ($("[name='hidCOD1']").val().substring(0, 2) == "DR") {
                $("#cmbChildA_roomassignselect").html($("[name='subfrm_ChildA']").val()).show();
                $("#cmbChild_roomassignselect").html($("[name='subfrm_Child']").val() - $("[name='subfrm_ChildA']").val()).show();

            }
            else if ($("[name='hidCOD1']").val().substring(0, 3) == "JTC") {
                $("#cmbChildA_roomassignselect").html(parseInt($("[name='subfrm_ChildA']").val()) + parseInt($("[name='subfrm_ChildB']").val())).show();
                $("#cmbChild_roomassignselect").html(parseInt($("[name='subfrm_Child']").val()) - parseInt($("[name='subfrm_ChildA']").val()) - parseInt($("[name='subfrm_ChildB']").val())).show();

            } else {
                $("#cmbChild_roomassignselect").html($("[name='subfrm_Child']").val()).show();
            }


            $(".childareaa").show();
            $("[name='cmbADULT']").show();


        } else {

            $("[name='cmbADULT']").hide();
            $(".childarea").hide();

            $("#cmbADULT_roomassignselect").html($("[name='subfrm_Person']").val()).show();

            if ($("[name='hidCOD1']").val().substring(0, 2) == "DR") {
                $("#cmbChildA_roomassignselect").html($("[name='subfrm_ChildA']").val()).show();
                $("#cmbChild_roomassignselect").html($("[name='subfrm_Child']").val() - $("[name='subfrm_ChildA']").val()).show();
            }
            else if ($("[name='hidCOD1']").val().substring(0, 3) == "JTC") {
                $("#cmbChildA_roomassignselect").html(parseInt($("[name='subfrm_ChildA']").val()) + parseInt($("[name='subfrm_ChildB']").val())).show();
                $("#cmbChild_roomassignselect").html(parseInt($("[name='subfrm_Child']").val()) - parseInt($("[name='subfrm_ChildA']").val()) - parseInt($("[name='subfrm_ChildB']").val())).show();

            } else {
                $("#cmbChild_roomassignselect").html($("[name='subfrm_Child']").val()).show();
            }


            $(".childareaa").show();


        }
        $("#children").html($("[name='subfrm_Child']").val());

        //		$(".roomassign_select_ie6").slideUp();
        $(".roomassign_select").slideUp();

        $(".roomassign_select_bk").hide();

    });


    // メイン画面の人数テキスト表示部分をクリックしたら室数設定ボックスをスライドダウン
    $(".roomassign_txt").click(function() {

        decodejpsn();

		/*
				if ( $.browser.msie && $.browser.version <= 6 ) {
					$('.roomassign_select_ie6').slideDown();
				}
		*/
        $(".roomassign_select").slideDown("400");


        if ($.browser.msie && $.browser.version >= 8) {
            $(".roomassign_select_bk").height($(document).height());
            $(".roomassign_select_bk").show();
        }

    });

} ($DijQ));



// 人数入力ウィンドウのselectを変更したら、hidden値変更
function hidden_change() {
    var $ = $DijQ;


    $(".roomassign_select select").change(function() {

        encodejpsn();

    });
}


function encodejpsn() {
    //JPSNのエンコード
    var $ = $DijQ;

    var nWBFplanmode = $("#nWBFplanmode").val();
    if (nWBFplanmode == null) {
        nWBFplanmode = 0;
    }

    var txtJpsn = "";
    var adult_all = 0;
    var child_all = 0;
    var childa_all = 0;
    var childb_all = 0;
    var childc_all = 0;
    var childd_all = 0;
    var childe_all = 0;
    var childf_all = 0;
    var childg_all = 0;
    var childh_all = 0;
    var childi_all = 0;
    var childj_all = 0;

    if (nWBFplanmode == 1) {
        var j = 1;

        for (var i = 1; i <= $("[name='cmbSUMROOM']").val(); i++) {

            if ($("[name='fadult_" + j + "']").val() != undefined) {
                txtJpsn += psn2char($("[name='fadult_" + j + "']").val());
                adult_all += parseInt($("[name='fadult_" + j + "']").val());
            }
            if ($("[name='fCHILDA_" + j + "']").val() != undefined) {
                txtJpsn += psn2char($("[name='fCHILDA_" + j + "']").val());
                childa_all += parseInt($("[name='fCHILDA_" + j + "']").val());
                child_all += parseInt($("[name='fCHILDA_" + j + "']").val());
            }
            if ($("[name='fCHILDB_" + j + "']").val() != undefined) {
                txtJpsn += psn2char($("[name='fCHILDB_" + j + "']").val());
                childb_all += parseInt($("[name='fCHILDB_" + j + "']").val());
                child_all += parseInt($("[name='fCHILDB_" + j + "']").val());
            }
            if ($("[name='fCHILDC_" + j + "']").val() != undefined) {
                txtJpsn += psn2char($("[name='fCHILDC_" + j + "']").val());
                childc_all += parseInt($("[name='fCHILDC_" + j + "']").val());
                child_all += parseInt($("[name='fCHILDC_" + j + "']").val());
            }
            if ($("[name='fCHILDD_" + j + "']").val() != undefined) {
                txtJpsn += psn2char($("[name='fCHILDD_" + j + "']").val());
                childd_all += parseInt($("[name='fCHILDD_" + j + "']").val());
                child_all += parseInt($("[name='fCHILDD_" + j + "']").val());
            }
            if ($("[name='fCHILDE_" + j + "']").val() != undefined) {
                txtJpsn += psn2char($("[name='fCHILDE_" + j + "']").val());
                childe_all += parseInt($("[name='fCHILDE_" + j + "']").val());
                child_all += parseInt($("[name='fCHILDE_" + j + "']").val());
            }
            if ($("[name='fCHILDF_" + j + "']").val() != undefined) {
                txtJpsn += psn2char($("[name='fCHILDF_" + j + "']").val());
                childf_all += parseInt($("[name='fCHILDF_" + j + "']").val());
                child_all += parseInt($("[name='fCHILDF_" + j + "']").val());
            }
            if ($("[name='fCHILDG_" + j + "']").val() != undefined) {
                txtJpsn += psn2char($("[name='fCHILDG_" + j + "']").val());
                childg_all += parseInt($("[name='fCHILDG_" + j + "']").val());
                child_all += parseInt($("[name='fCHILDG_" + j + "']").val());
            }
            if ($("[name='fCHILDH_" + j + "']").val() != undefined) {
                txtJpsn += psn2char($("[name='fCHILDH_" + j + "']").val());
                childh_all += parseInt($("[name='fCHILDH_" + j + "']").val());
                child_all += parseInt($("[name='fCHILDH_" + j + "']").val());
            }
            if ($("[name='fCHILDI_" + j + "']").val() != undefined) {
                txtJpsn += psn2char($("[name='fCHILDI_" + j + "']").val());
                childi_all += parseInt($("[name='fCHILDI_" + j + "']").val());
                child_all += parseInt($("[name='fCHILDI_" + j + "']").val());
            }
            if ($("[name='fCHILDJ_" + j + "']").val() != undefined) {
                txtJpsn += psn2char($("[name='fCHILDJ_" + j + "']").val());
                childj_all += parseInt($("[name='fCHILDJ_" + j + "']").val());
                child_all += parseInt($("[name='fCHILDJ_" + j + "']").val());
            }
            txtJpsn += ",";

        }

    } else {


        for (var i = 1; i <= $("[name='cmbSUMROOM']").val(); i++) {

            if ($("[name='fadult_" + i + "']").val() != undefined) {
                txtJpsn += psn2char($("[name='fadult_" + i + "']").val());
                adult_all += parseInt($("[name='fadult_" + i + "']").val());
            }
            if ($("[name='fCHILDA_" + i + "']").val() != undefined) {
                txtJpsn += psn2char($("[name='fCHILDA_" + i + "']").val());
                childa_all += parseInt($("[name='fCHILDA_" + i + "']").val());
                child_all += parseInt($("[name='fCHILDA_" + i + "']").val());
            }
            if ($("[name='fCHILDB_" + i + "']").val() != undefined) {
                txtJpsn += psn2char($("[name='fCHILDB_" + i + "']").val());
                childb_all += parseInt($("[name='fCHILDB_" + i + "']").val());
                child_all += parseInt($("[name='fCHILDB_" + i + "']").val());
            }
            if ($("[name='fCHILDC_" + i + "']").val() != undefined) {
                txtJpsn += psn2char($("[name='fCHILDC_" + i + "']").val());
                childc_all += parseInt($("[name='fCHILDC_" + i + "']").val());
                child_all += parseInt($("[name='fCHILDC_" + i + "']").val());
            }
            if ($("[name='fCHILDD_" + i + "']").val() != undefined) {
                txtJpsn += psn2char($("[name='fCHILDD_" + i + "']").val());
                childd_all += parseInt($("[name='fCHILDD_" + i + "']").val());
                child_all += parseInt($("[name='fCHILDD_" + i + "']").val());
            }
            if ($("[name='fCHILDE_" + i + "']").val() != undefined) {
                txtJpsn += psn2char($("[name='fCHILDE_" + i + "']").val());
                childe_all += parseInt($("[name='fCHILDE_" + i + "']").val());
                child_all += parseInt($("[name='fCHILDE_" + i + "']").val());
            }
            if ($("[name='fCHILDF_" + i + "']").val() != undefined) {
                txtJpsn += psn2char($("[name='fCHILDF_" + i + "']").val());
                childf_all += parseInt($("[name='fCHILDF_" + i + "']").val());
                child_all += parseInt($("[name='fCHILDF_" + i + "']").val());
            }
            if ($("[name='fCHILDG_" + i + "']").val() != undefined) {
                txtJpsn += psn2char($("[name='fCHILDG_" + i + "']").val());
                childg_all += parseInt($("[name='fCHILDG_" + i + "']").val());
                child_all += parseInt($("[name='fCHILDG_" + i + "']").val());
            }
            if ($("[name='fCHILDH_" + i + "']").val() != undefined) {
                txtJpsn += psn2char($("[name='fCHILDH_" + i + "']").val());
                childh_all += parseInt($("[name='fCHILDH_" + i + "']").val());
                child_all += parseInt($("[name='fCHILDH_" + i + "']").val());
            }
            if ($("[name='fCHILDI_" + i + "']").val() != undefined) {
                txtJpsn += psn2char($("[name='fCHILDI_" + i + "']").val());
                childi_all += parseInt($("[name='fCHILDI_" + i + "']").val());
                child_all += parseInt($("[name='fCHILDI_" + i + "']").val());
            }
            if ($("[name='fCHILDJ_" + i + "']").val() != undefined) {
                txtJpsn += psn2char($("[name='fCHILDJ_" + i + "']").val());
                childj_all += parseInt($("[name='fCHILDJ_" + i + "']").val());
                child_all += parseInt($("[name='fCHILDJ_" + i + "']").val());
            }
            txtJpsn += ",";

        }
    }


    $("[name='hidJPSN']").val(txtJpsn);
    $("[name='subfrm_Person']").val(adult_all);
    $("[name='subfrm_Child']").val(child_all);
    $("[name='subfrm_ChildA']").val(childa_all);
    $("[name='subfrm_ChildB']").val(childb_all);

    $("[name='cmbADULT']").val(adult_all);
    $("[name='cmbCHILD']").slice(0, 1).val(childa_all);
    $("[name='cmbCHILD']").slice(1, 2).val(childb_all);
    $("[name='cmbCHILD']").slice(2, 3).val(childc_all);
    $("[name='cmbCHILD']").slice(3, 4).val(childd_all);
    $("[name='cmbCHILD']").slice(4, 5).val(childe_all);
    $("[name='cmbCHILD']").slice(5, 6).val(childf_all);
    $("[name='cmbCHILD']").slice(6, 7).val(childg_all);
    $("[name='cmbCHILD']").slice(7, 8).val(childh_all);
    $("[name='cmbCHILD']").slice(8, 9).val(childi_all);
    $("[name='cmbCHILD']").slice(9, 10).val(childj_all);

    $("#cmbADULT_roomassignselect").html($("[name='subfrm_Person']").val());



    if ($("[name='hidCOD1']").val().substring(0, 2) == "DR") {

        $("#cmbChildA_roomassignselect").html(childa_all);
        $("#cmbChild_roomassignselect").html(childb_all + childc_all + childd_all + childe_all + childf_all + childg_all + childh_all + childi_all + childj_all);

    } else if ($("[name='hidCOD1']").val().substring(0, 3) == "JTC") {

        $("#cmbChildA_roomassignselect").html(childa_all);
        $("#cmbChildB_roomassignselect").html(childb_all);
        $("#cmbChild_roomassignselect").html(childc_all + childd_all + childe_all + childf_all + childg_all + childh_all + childi_all + childj_all);

    } else {

        $("#cmbChild_roomassignselect").html($("[name='subfrm_Child']").val());

    }



}

function decodejpsn() {
    //jpsnからデコードします
    var $ = $DijQ;

    try {

        if ($("[name='hidJPSN']").slice("0").val() == "") { return; }
        if ($("[name='hidJPSN']").slice("0").val() == null) { return; }


        var jpsn = $("[name='hidJPSN']").slice("0").val().split(",");

        for (var i = 1; i <= $("[name='cmbSUMROOM']").val(); i++) {


            $("select[name='fadult_" + i + "']").val(char2psn(jpsn[i - 1].charAt(0)));
            $("select[name='fCHILDA_" + i + "']").val(char2psn(jpsn[i - 1].charAt(1)));
            $("select[name='fCHILDB_" + i + "']").val(char2psn(jpsn[i - 1].charAt(2)));
            $("select[name='fCHILDC_" + i + "']").val(char2psn(jpsn[i - 1].charAt(3)));
            $("select[name='fCHILDD_" + i + "']").val(char2psn(jpsn[i - 1].charAt(4)));
            $("select[name='fCHILDE_" + i + "']").val(char2psn(jpsn[i - 1].charAt(5)));
            $("select[name='fCHILDF_" + i + "']").val(char2psn(jpsn[i - 1].charAt(6)));
            $("select[name='fCHILDG_" + i + "']").val(char2psn(jpsn[i - 1].charAt(7)));
            $("select[name='fCHILDH_" + i + "']").val(char2psn(jpsn[i - 1].charAt(8)));
            $("select[name='fCHILDI_" + i + "']").val(char2psn(jpsn[i - 1].charAt(9)));
            $("select[name='fCHILDJ_" + i + "']").val(char2psn(jpsn[i - 1].charAt(10)));

        }

    } catch (e) {

    }


}


function checkAdult() {
    var $ = $DijQ;

    for (var i = 1; i <= $("[name='cmbSUMROOM']").val(); i++) {


        if ($("[name='hidCOD1']").val().substring(0, 2) == "DR") {

            if (parseInt($("[name='fadult_" + i + "']").val()) + parseInt($("[name='fCHILDA_" + i + "']").val()) == 0) {
                alert(i + "部屋目の大人の人数を入力してください。");
                return false;
            }

        } else if ($("[name='hidCOD1']").val().substring(0, 3) == "JTC") {

            if (parseInt($("[name='fadult_" + i + "']").val()) + parseInt($("[name='fCHILDA_" + i + "']").val()) + parseInt($("[name='fCHILDB_" + i + "']").val()) == 0) {
                alert(i + "部屋目の大人の人数を入力してください。");
                return false;
            }

        } else {

            if (parseInt($("[name='fadult_" + i + "']").val()) == 0) {
                alert(i + "部屋目の大人の人数を入力してください。");
                return false;
            }

        }

    }

    return true;

}


function psn2char(psn) {
    var $ = $DijQ;

    if (psn > 9) {
        return String.fromCharCode(parseInt(psn) + 55);
    } else {
        return psn;
    }

}


function char2psn(tchar) {
    var $ = $DijQ;

    if (tchar.charCodeAt(0) > 64) {

        return parseInt(tchar.charCodeAt(0)) - 55;
    } else {
        return tchar;
    }

}

