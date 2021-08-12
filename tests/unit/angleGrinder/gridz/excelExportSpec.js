import compileTemplate from '../../helpers/compileTemplate'
import 'angle-grinder/src/ng/gridz'
import agGridz from 'angle-grinder/src/ng/gridz'

describe("excelExportSpec", function() {

  describe("xls export", function() {

    beforeEach(angular.mock.module(agGridz, ($provide) => $provide.decorator("xlsData", function($delegate) {
      sinon.spy($delegate);
      return $delegate;
    }))
    );

    describe("service: xlsTemplate", () => it("generates valid xml with the worksheet", inject(function($window, xlsTemplate) {
      const data = xlsTemplate({table: "the table"});
      expect(data).to.be.a("string");
      const xml = $window.atob(data);
      return expect(xml).to.be.a("string");
    })
    ));

    return describe("service: xlsData", function() {

      before(function() {
        this.gridId = "usersGrid";
        return this.selectedRows = ["4", "5", "6"];});

      //beforeEach(angular.mock.module("tests/unit/fixtures/usersGrid.html"));

      beforeEach(angular.mock.module("ng", ($provide) => $provide.decorator("$document", function($delegate, $templateCache) {
        const stub = sinon.stub($delegate, "find");

          // stub the grid html
          const fixture = `\
<div class="ui-jqgrid ui-widget ui-widget-content ui-corner-all" id="gbox_usersGrid" dir="ltr" style="width: 867px;">
    <div id="lui_usersGrid" class="ui-widget-overlay jqgrid-overlay"></div>
    <div id="load_usersGrid" class="loading ui-state-default ui-state-active" style="display: none;">Loading...</div>
    <div class="ui-jqgrid-view" id="gview_usersGrid" style="width: 867px;">
        <div class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix" style="display: none;"><a
                href="javascript:void(0)" role="link" class="ui-jqgrid-titlebar-close HeaderButton" style="right: 0px;"><span
                class="ui-icon ui-icon-circle-triangle-n"></span></a><span class="ui-jqgrid-title"></span></div>
        <div style="width: 867px;" class="ui-state-default ui-jqgrid-hdiv">
            <div class="ui-jqgrid-hbox">
                <table cellspacing="0" cellpadding="0" border="0" aria-labelledby="gbox_usersGrid" role="grid"
                       style="width:1035px" class="ui-jqgrid-htable">
                    <thead>
                    <tr role="rowheader" class="ui-jqgrid-labels">
                        <th class="ui-state-default ui-th-column ui-th-ltr" role="columnheader" id="usersGrid_cb"
                            style="width: 20px;">
                            <div id="jqgh_usersGrid_cb"><input type="checkbox" class="cbox" id="cb_usersGrid"
                                                               role="checkbox"><span style="display:none" class="s-ico"><span
                                    class="ui-grid-ico-sort ui-icon-asc ui-state-disabled ui-icon ui-icon-triangle-1-n ui-sort-ltr"
                                    sort="asc"></span><span
                                    class="ui-grid-ico-sort ui-icon-desc ui-state-disabled ui-icon ui-icon-triangle-1-s ui-sort-ltr"
                                    sort="desc"></span></span></div>
                        </th>
                        <th class="ui-state-default ui-th-column ui-th-ltr" role="columnheader"
                            id="usersGrid_-row_action_col" style="width: 20px;">
                            <div id="jqgh_usersGrid_-row_action_col" class="ui-jqgrid-sortable"><span
                                    style="display:none" class="s-ico"><span
                                    class="ui-grid-ico-sort ui-icon-asc ui-state-disabled ui-icon ui-icon-triangle-1-n ui-sort-ltr"
                                    sort="asc"></span><span
                                    class="ui-grid-ico-sort ui-icon-desc ui-state-disabled ui-icon ui-icon-triangle-1-s ui-sort-ltr"
                                    sort="desc"></span></span></div>
                        </th>
                        <th class="ui-state-default ui-th-column ui-th-ltr" role="columnheader" id="usersGrid_id"
                            style="width: 50px;"><span class="ui-jqgrid-resize ui-jqgrid-resize-ltr"
                                                       style="cursor: col-resize;">&nbsp;</span>

                            <div id="jqgh_usersGrid_id" class="ui-jqgrid-sortable">id<span style="" class="s-ico"><span
                                    class="ui-grid-ico-sort ui-icon-asc ui-icon ui-icon-triangle-1-n ui-sort-ltr"
                                    sort="asc"></span><span
                                    class="ui-grid-ico-sort ui-icon-desc ui-state-disabled ui-icon ui-icon-triangle-1-s ui-sort-ltr"
                                    sort="desc"></span></span></div>
                        </th>
                        <th class="ui-state-default ui-th-column ui-th-ltr" role="columnheader" id="usersGrid_login"
                            style="width: 150px;"><span class="ui-jqgrid-resize ui-jqgrid-resize-ltr"
                                                        style="cursor: col-resize;">&nbsp;</span>

                            <div id="jqgh_usersGrid_login" class="ui-jqgrid-sortable">Login<span style="display:none"
                                                                                                 class="s-ico"><span
                                    class="ui-grid-ico-sort ui-icon-asc ui-state-disabled ui-icon ui-icon-triangle-1-n ui-sort-ltr"
                                    sort="asc"></span><span
                                    class="ui-grid-ico-sort ui-icon-desc ui-state-disabled ui-icon ui-icon-triangle-1-s ui-sort-ltr"
                                    sort="desc"></span></span></div>
                        </th>
                        <th class="ui-state-default ui-th-column ui-th-ltr" role="columnheader"
                            id="usersGrid_info.email" style="width: 150px;"><span
                                class="ui-jqgrid-resize ui-jqgrid-resize-ltr" style="cursor: col-resize;">&nbsp;</span>

                            <div id="jqgh_usersGrid_info.email" class="ui-jqgrid-sortable">Email<span
                                    style="display:none" class="s-ico"><span
                                    class="ui-grid-ico-sort ui-icon-asc ui-state-disabled ui-icon ui-icon-triangle-1-n ui-sort-ltr"
                                    sort="asc"></span><span
                                    class="ui-grid-ico-sort ui-icon-desc ui-state-disabled ui-icon ui-icon-triangle-1-s ui-sort-ltr"
                                    sort="desc"></span></span></div>
                        </th>
                        <th class="ui-state-default ui-th-column ui-th-ltr" role="columnheader" id="usersGrid_name"
                            style="width: 150px;"><span class="ui-jqgrid-resize ui-jqgrid-resize-ltr"
                                                        style="cursor: col-resize;">&nbsp;</span>

                            <div id="jqgh_usersGrid_name" class="ui-jqgrid-sortable">Name<span style="display:none"
                                                                                               class="s-ico"><span
                                    class="ui-grid-ico-sort ui-icon-asc ui-state-disabled ui-icon ui-icon-triangle-1-n ui-sort-ltr"
                                    sort="asc"></span><span
                                    class="ui-grid-ico-sort ui-icon-desc ui-state-disabled ui-icon ui-icon-triangle-1-s ui-sort-ltr"
                                    sort="desc"></span></span></div>
                        </th>
                        <th class="ui-state-default ui-th-column ui-th-ltr" role="columnheader" id="usersGrid_birthday"
                            style="width: 150px;"><span class="ui-jqgrid-resize ui-jqgrid-resize-ltr"
                                                        style="cursor: col-resize;">&nbsp;</span>

                            <div id="jqgh_usersGrid_birthday" class="ui-jqgrid-sortable">Birthday<span
                                    style="display:none" class="s-ico"><span
                                    class="ui-grid-ico-sort ui-icon-asc ui-state-disabled ui-icon ui-icon-triangle-1-n ui-sort-ltr"
                                    sort="asc"></span><span
                                    class="ui-grid-ico-sort ui-icon-desc ui-state-disabled ui-icon ui-icon-triangle-1-s ui-sort-ltr"
                                    sort="desc"></span></span></div>
                        </th>
                        <th class="ui-state-default ui-th-column ui-th-ltr" role="columnheader"
                            id="usersGrid_creditInfo.allowance" style="width: 150px;"><span
                                class="ui-jqgrid-resize ui-jqgrid-resize-ltr" style="cursor: col-resize;">&nbsp;</span>

                            <div id="jqgh_usersGrid_creditInfo.allowance" class="ui-jqgrid-sortable">Allowance<span
                                    style="display:none" class="s-ico"><span
                                    class="ui-grid-ico-sort ui-icon-asc ui-state-disabled ui-icon ui-icon-triangle-1-n ui-sort-ltr"
                                    sort="asc"></span><span
                                    class="ui-grid-ico-sort ui-icon-desc ui-state-disabled ui-icon ui-icon-triangle-1-s ui-sort-ltr"
                                    sort="desc"></span></span></div>
                        </th>
                        <th class="ui-state-default ui-th-column ui-th-ltr" role="columnheader"
                            id="usersGrid_creditInfo.paid" style="width: 150px;"><span
                                class="ui-jqgrid-resize ui-jqgrid-resize-ltr" style="cursor: col-resize;">&nbsp;</span>

                            <div id="jqgh_usersGrid_creditInfo.paid" class="ui-jqgrid-sortable">Paid<span
                                    style="display:none" class="s-ico"><span
                                    class="ui-grid-ico-sort ui-icon-asc ui-state-disabled ui-icon ui-icon-triangle-1-n ui-sort-ltr"
                                    sort="asc"></span><span
                                    class="ui-grid-ico-sort ui-icon-desc ui-state-disabled ui-icon ui-icon-triangle-1-s ui-sort-ltr"
                                    sort="desc"></span></span></div>
                        </th>
                    </tr>
                    </thead>
                </table>
            </div>
        </div>
        <div class="ui-jqgrid-bdiv" style="height: 100%; width: 867px;">
            <div style="position:relative;">
                <div></div>
                <table cellspacing="0" cellpadding="0" border="0" class="gridz ui-jqgrid-btable" id="usersGrid"
                       tabindex="0" role="grid" aria-multiselectable="true" aria-labelledby="gbox_usersGrid"
                       style="width: 1035px;">
                    <tbody>
                    <tr style="height:auto" role="row" class="jqgfirstrow">
                        <td style="height:0px;width:20px;" role="gridcell"></td>
                        <td style="height:0px;width:20px;" role="gridcell"></td>
                        <td style="height:0px;width:50px;" role="gridcell"></td>
                        <td style="height:0px;width:150px;" role="gridcell"></td>
                        <td style="height:0px;width:150px;" role="gridcell"></td>
                        <td style="height:0px;width:150px;" role="gridcell"></td>
                        <td style="height:0px;width:150px;" role="gridcell"></td>
                        <td style="height:0px;width:150px;" role="gridcell"></td>
                        <td style="height:0px;width:150px;" role="gridcell"></td>
                    </tr>
                    <tr class="ui-widget-content jqgrow ui-row-ltr" tabindex="-1" id="1" role="row">
                        <td aria-describedby="usersGrid_cb" style="text-align:center;width: 20px;" role="gridcell">
                            <input type="checkbox" name="jqg_usersGrid_1" class="cbox" id="jqg_usersGrid_1"
                                   role="checkbox"></td>
                        <td aria-describedby="usersGrid_-row_action_col" title="" style="" role="gridcell"><a
                                data-container="#gbox_usersGrid" href="#" data-toggle="popover" class="jqg-row-action"
                                data-original-title="" title=""><i class="icon-cog"></i></a></td>
                        <td aria-describedby="usersGrid_id" title="1" style="" role="gridcell"><a
                                href="#/examples/users/1">1</a></td>
                        <td aria-describedby="usersGrid_login" title="login-1" style="" role="gridcell"><a
                                href="#/examples/users/1">login-1</a></td>
                        <td aria-describedby="usersGrid_info.email" title="login-1@Bradtke.biz" style=""
                            role="gridcell">login-1@Bradtke.biz
                        </td>
                        <td aria-describedby="usersGrid_name" title="Moroni" style="" role="gridcell"><a
                                href="#/examples/users/1">Moroni</a></td>
                        <td aria-describedby="usersGrid_birthday" title="Jul 17, 1973" style="" role="gridcell">Jul 17,
                            1973
                        </td>
                        <td aria-describedby="usersGrid_creditInfo.allowance" title="7747" style="" role="gridcell">
                            7747
                        </td>
                        <td aria-describedby="usersGrid_creditInfo.paid" title="true" style="" role="gridcell">true</td>
                    </tr>
                    <tr class="ui-widget-content jqgrow ui-row-ltr ui-priority-secondary" tabindex="-1" id="2"
                        role="row">
                        <td aria-describedby="usersGrid_cb" style="text-align:center;" role="gridcell"><input
                                type="checkbox" name="jqg_usersGrid_2" class="cbox" id="jqg_usersGrid_2"
                                role="checkbox"></td>
                        <td aria-describedby="usersGrid_-row_action_col" title="" style="" role="gridcell"><a
                                data-container="#gbox_usersGrid" href="#" data-toggle="popover" class="jqg-row-action"
                                data-original-title="" title=""><i class="icon-cog"></i></a></td>
                        <td aria-describedby="usersGrid_id" title="2" style="" role="gridcell"><a
                                href="#/examples/users/2">2</a></td>
                        <td aria-describedby="usersGrid_login" title="login-2" style="" role="gridcell"><a
                                href="#/examples/users/2">login-2</a></td>
                        <td aria-describedby="usersGrid_info.email" title="login-2@Grant.org" style="" role="gridcell">
                            login-2@Grant.org
                        </td>
                        <td aria-describedby="usersGrid_name" title="Teancum" style="" role="gridcell"><a
                                href="#/examples/users/2">Teancum</a></td>
                        <td aria-describedby="usersGrid_birthday" title="Nov 2, 1995" style="" role="gridcell">Nov 2,
                            1995
                        </td>
                        <td aria-describedby="usersGrid_creditInfo.allowance" title="50" style="" role="gridcell">50
                        </td>
                        <td aria-describedby="usersGrid_creditInfo.paid" title="true" style="" role="gridcell">true</td>
                    </tr>
                    <tr class="ui-widget-content jqgrow ui-row-ltr" tabindex="-1" id="3" role="row">
                        <td aria-describedby="usersGrid_cb" style="text-align:center;" role="gridcell"><input
                                type="checkbox" name="jqg_usersGrid_3" class="cbox" id="jqg_usersGrid_3"
                                role="checkbox"></td>
                        <td aria-describedby="usersGrid_-row_action_col" title="" style="" role="gridcell"><a
                                data-container="#gbox_usersGrid" href="#" data-toggle="popover" class="jqg-row-action"
                                data-original-title="" title=""><i class="icon-cog"></i></a></td>
                        <td aria-describedby="usersGrid_id" title="3" style="" role="gridcell"><a
                                href="#/examples/users/3">3</a></td>
                        <td aria-describedby="usersGrid_login" title="login-3" style="" role="gridcell"><a
                                href="#/examples/users/3">login-3</a></td>
                        <td aria-describedby="usersGrid_info.email" title="login-3@Ozella.co.uk" style=""
                            role="gridcell">login-3@Ozella.co.uk
                        </td>
                        <td aria-describedby="usersGrid_name" title="Nephi" style="" role="gridcell"><a
                                href="#/examples/users/3">Nephi</a></td>
                        <td aria-describedby="usersGrid_birthday" title="Jun 25, 1972" style="" role="gridcell">Jun 25,
                            1972
                        </td>
                        <td aria-describedby="usersGrid_creditInfo.allowance" title="100" style="" role="gridcell">100
                        </td>
                        <td aria-describedby="usersGrid_creditInfo.paid" title="false" style="" role="gridcell">false
                        </td>
                    </tr>
                    <tr class="ui-widget-content jqgrow ui-row-ltr ui-priority-secondary" tabindex="-1" id="4"
                        role="row">
                        <td aria-describedby="usersGrid_cb" style="text-align:center;" role="gridcell"><input
                                type="checkbox" name="jqg_usersGrid_4" class="cbox" id="jqg_usersGrid_4"
                                role="checkbox"></td>
                        <td aria-describedby="usersGrid_-row_action_col" title="" style="" role="gridcell"><a
                                data-container="#gbox_usersGrid" href="#" data-toggle="popover" class="jqg-row-action"
                                data-original-title="" title=""><i class="icon-cog"></i></a></td>
                        <td aria-describedby="usersGrid_id" title="4" style="" role="gridcell"><a
                                href="#/examples/users/4">4</a></td>
                        <td aria-describedby="usersGrid_login" title="login-4" style="" role="gridcell"><a
                                href="#/examples/users/4">login-4</a></td>
                        <td aria-describedby="usersGrid_info.email" title="login-4@Mayer.name" style="" role="gridcell">
                            login-4@Mayer.name
                        </td>
                        <td aria-describedby="usersGrid_name" title="Ether" style="" role="gridcell"><a
                                href="#/examples/users/4">Ether</a></td>
                        <td aria-describedby="usersGrid_birthday" title="Oct 30, 2010" style="" role="gridcell">Oct 30,
                            2010
                        </td>
                        <td aria-describedby="usersGrid_creditInfo.allowance" title="42" style="" role="gridcell">42
                        </td>
                        <td aria-describedby="usersGrid_creditInfo.paid" title="true" style="" role="gridcell">true</td>
                    </tr>
                    <tr class="ui-widget-content jqgrow ui-row-ltr" tabindex="-1" id="5" role="row">
                        <td aria-describedby="usersGrid_cb" style="text-align:center;" role="gridcell"><input
                                type="checkbox" name="jqg_usersGrid_5" class="cbox" id="jqg_usersGrid_5"
                                role="checkbox"></td>
                        <td aria-describedby="usersGrid_-row_action_col" title="" style="" role="gridcell"><a
                                data-container="#gbox_usersGrid" href="#" data-toggle="popover" class="jqg-row-action"
                                data-original-title="" title=""><i class="icon-cog"></i></a></td>
                        <td aria-describedby="usersGrid_id" title="5" style="" role="gridcell"><a
                                href="#/examples/users/5">5</a></td>
                        <td aria-describedby="usersGrid_login" title="login-5" style="" role="gridcell"><a
                                href="#/examples/users/5">login-5</a></td>
                        <td aria-describedby="usersGrid_info.email" title="login-5@Chadrick.biz" style=""
                            role="gridcell">login-5@Chadrick.biz
                        </td>
                        <td aria-describedby="usersGrid_name" title="Lesch.Eliseo" style="" role="gridcell"><a
                                href="#/examples/users/5">Lesch.Eliseo</a></td>
                        <td aria-describedby="usersGrid_birthday" title="Jul 2, 1984" style="" role="gridcell">Jul 2,
                            1984
                        </td>
                        <td aria-describedby="usersGrid_creditInfo.allowance" title="5718" style="" role="gridcell">
                            5718
                        </td>
                        <td aria-describedby="usersGrid_creditInfo.paid" title="false" style="" role="gridcell">false
                        </td>
                    </tr>
                    <tr class="ui-widget-content jqgrow ui-row-ltr ui-priority-secondary" tabindex="-1" id="6"
                        role="row">
                        <td aria-describedby="usersGrid_cb" style="text-align:center;" role="gridcell"><input
                                type="checkbox" name="jqg_usersGrid_6" class="cbox" id="jqg_usersGrid_6"
                                role="checkbox"></td>
                        <td aria-describedby="usersGrid_-row_action_col" title="" style="" role="gridcell"><a
                                data-container="#gbox_usersGrid" href="#" data-toggle="popover" class="jqg-row-action"
                                data-original-title="" title=""><i class="icon-cog"></i></a></td>
                        <td aria-describedby="usersGrid_id" title="6" style="" role="gridcell"><a
                                href="#/examples/users/6">6</a></td>
                        <td aria-describedby="usersGrid_login" title="login-6" style="" role="gridcell"><a
                                href="#/examples/users/6">login-6</a></td>
                        <td aria-describedby="usersGrid_info.email" title="login-6@Lavonne.io" style="" role="gridcell">
                            login-6@Lavonne.io
                        </td>
                        <td aria-describedby="usersGrid_name" title="Gabe.Lowe" style="" role="gridcell"><a
                                href="#/examples/users/6">Gabe.Lowe</a></td>
                        <td aria-describedby="usersGrid_birthday" title="Sep 17, 1979" style="" role="gridcell">Sep 17,
                            1979
                        </td>
                        <td aria-describedby="usersGrid_creditInfo.allowance" title="8641" style="" role="gridcell">
                            8641
                        </td>
                        <td aria-describedby="usersGrid_creditInfo.paid" title="true" style="" role="gridcell">true</td>
                    </tr>
                    <tr class="ui-widget-content jqgrow ui-row-ltr" tabindex="-1" id="7" role="row">
                        <td aria-describedby="usersGrid_cb" style="text-align:center;" role="gridcell"><input
                                type="checkbox" name="jqg_usersGrid_7" class="cbox" id="jqg_usersGrid_7"
                                role="checkbox"></td>
                        <td aria-describedby="usersGrid_-row_action_col" title="" style="" role="gridcell"><a
                                data-container="#gbox_usersGrid" href="#" data-toggle="popover" class="jqg-row-action"
                                data-original-title="" title=""><i class="icon-cog"></i></a></td>
                        <td aria-describedby="usersGrid_id" title="7" style="" role="gridcell"><a
                                href="#/examples/users/7">7</a></td>
                        <td aria-describedby="usersGrid_login" title="login-7" style="" role="gridcell"><a
                                href="#/examples/users/7">login-7</a></td>
                        <td aria-describedby="usersGrid_info.email" title="login-7@Kathryne.me" style=""
                            role="gridcell">login-7@Kathryne.me
                        </td>
                        <td aria-describedby="usersGrid_name" title="Carissa.Monahan" style="" role="gridcell"><a
                                href="#/examples/users/7">Carissa.Monahan</a></td>
                        <td aria-describedby="usersGrid_birthday" title="Jan 24, 2005" style="" role="gridcell">Jan 24,
                            2005
                        </td>
                        <td aria-describedby="usersGrid_creditInfo.allowance" title="9209" style="" role="gridcell">
                            9209
                        </td>
                        <td aria-describedby="usersGrid_creditInfo.paid" title="true" style="" role="gridcell">true</td>
                    </tr>
                    <tr class="ui-widget-content jqgrow ui-row-ltr ui-priority-secondary" tabindex="-1" id="8"
                        role="row">
                        <td aria-describedby="usersGrid_cb" style="text-align:center;" role="gridcell"><input
                                type="checkbox" name="jqg_usersGrid_8" class="cbox" id="jqg_usersGrid_8"
                                role="checkbox"></td>
                        <td aria-describedby="usersGrid_-row_action_col" title="" style="" role="gridcell"><a
                                data-container="#gbox_usersGrid" href="#" data-toggle="popover" class="jqg-row-action"
                                data-original-title="" title=""><i class="icon-cog"></i></a></td>
                        <td aria-describedby="usersGrid_id" title="8" style="" role="gridcell"><a
                                href="#/examples/users/8">8</a></td>
                        <td aria-describedby="usersGrid_login" title="login-8" style="" role="gridcell"><a
                                href="#/examples/users/8">login-8</a></td>
                        <td aria-describedby="usersGrid_info.email" title="login-8@Jan.info" style="" role="gridcell">
                            login-8@Jan.info
                        </td>
                        <td aria-describedby="usersGrid_name" title="Bertram_Hermann" style="" role="gridcell"><a
                                href="#/examples/users/8">Bertram_Hermann</a></td>
                        <td aria-describedby="usersGrid_birthday" title="Mar 31, 2001" style="" role="gridcell">Mar 31,
                            2001
                        </td>
                        <td aria-describedby="usersGrid_creditInfo.allowance" title="5915" style="" role="gridcell">
                            5915
                        </td>
                        <td aria-describedby="usersGrid_creditInfo.paid" title="false" style="" role="gridcell">false
                        </td>
                    </tr>
                    <tr class="ui-widget-content jqgrow ui-row-ltr" tabindex="-1" id="9" role="row">
                        <td aria-describedby="usersGrid_cb" style="text-align:center;" role="gridcell"><input
                                type="checkbox" name="jqg_usersGrid_9" class="cbox" id="jqg_usersGrid_9"
                                role="checkbox"></td>
                        <td aria-describedby="usersGrid_-row_action_col" title="" style="" role="gridcell"><a
                                data-container="#gbox_usersGrid" href="#" data-toggle="popover" class="jqg-row-action"
                                data-original-title="" title=""><i class="icon-cog"></i></a></td>
                        <td aria-describedby="usersGrid_id" title="9" style="" role="gridcell"><a
                                href="#/examples/users/9">9</a></td>
                        <td aria-describedby="usersGrid_login" title="login-9" style="" role="gridcell"><a
                                href="#/examples/users/9">login-9</a></td>
                        <td aria-describedby="usersGrid_info.email" title="login-9@Delilah.tv" style="" role="gridcell">
                            login-9@Delilah.tv
                        </td>
                        <td aria-describedby="usersGrid_name" title="Johathan.Barton" style="" role="gridcell"><a
                                href="#/examples/users/9">Johathan.Barton</a></td>
                        <td aria-describedby="usersGrid_birthday" title="Feb 17, 1982" style="" role="gridcell">Feb 17,
                            1982
                        </td>
                        <td aria-describedby="usersGrid_creditInfo.allowance" title="8206" style="" role="gridcell">
                            8206
                        </td>
                        <td aria-describedby="usersGrid_creditInfo.paid" title="false" style="" role="gridcell">false
                        </td>
                    </tr>
                    <tr class="ui-widget-content jqgrow ui-row-ltr ui-priority-secondary" tabindex="-1" id="10"
                        role="row">
                        <td aria-describedby="usersGrid_cb" style="text-align:center;" role="gridcell"><input
                                type="checkbox" name="jqg_usersGrid_10" class="cbox" id="jqg_usersGrid_10"
                                role="checkbox"></td>
                        <td aria-describedby="usersGrid_-row_action_col" title="" style="" role="gridcell"><a
                                data-container="#gbox_usersGrid" href="#" data-toggle="popover" class="jqg-row-action"
                                data-original-title="" title=""><i class="icon-cog"></i></a></td>
                        <td aria-describedby="usersGrid_id" title="10" style="" role="gridcell"><a
                                href="#/examples/users/10">10</a></td>
                        <td aria-describedby="usersGrid_login" title="login-10" style="" role="gridcell"><a
                                href="#/examples/users/10">login-10</a></td>
                        <td aria-describedby="usersGrid_info.email" title="login-10@Justina.biz" style=""
                            role="gridcell">login-10@Justina.biz
                        </td>
                        <td aria-describedby="usersGrid_name" title="Mya.Conn" style="" role="gridcell"><a
                                href="#/examples/users/10">Mya.Conn</a></td>
                        <td aria-describedby="usersGrid_birthday" title="Mar 14, 1986" style="" role="gridcell">Mar 14,
                            1986
                        </td>
                        <td aria-describedby="usersGrid_creditInfo.allowance" title="2578" style="" role="gridcell">
                            2578
                        </td>
                        <td aria-describedby="usersGrid_creditInfo.paid" title="false" style="" role="gridcell">false
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <div id="rs_musersGrid" class="ui-jqgrid-resize-mark">&nbsp;</div>
    <div class="gridz-pager ui-state-default ui-jqgrid-pager ui-corner-bottom" id="usersGrid-pager"
         style="width: 867px;" dir="ltr">
        <div role="group" class="ui-pager-control" id="pg_usersGrid-pager">
            <table cellspacing="0" cellpadding="0" border="0" role="row"
                   style="width:100%;table-layout:fixed;height:100%;" class="ui-pg-table">
                <tbody>
                <tr>
                    <td align="left" id="usersGrid-pager_left"></td>
                    <td align="center" style="white-space: pre; width: 299px;" id="usersGrid-pager_center">
                        <table cellspacing="0" cellpadding="0" border="0" class="ui-pg-table"
                               style="table-layout:auto;">
                            <tbody>
                            <tr>
                                <td class="ui-pg-button ui-corner-all ui-state-disabled" id="first_usersGrid-pager">
                                    <span class="ui-icon ui-icon-seek-first"></span></td>
                                <td class="ui-pg-button ui-corner-all ui-state-disabled" id="prev_usersGrid-pager"><span
                                        class="ui-icon ui-icon-seek-prev"></span></td>
                                <td style="width:4px;" class="ui-pg-button ui-state-disabled"><span
                                        class="ui-separator"></span></td>
                                <td dir="ltr">Page <input type="text" role="textbox" value="0" maxlength="7" size="2"
                                                          class="ui-pg-input"> of <span
                                        id="sp_1_usersGrid-pager">6</span></td>
                                <td style="width:4px;" class="ui-pg-button ui-state-disabled"><span
                                        class="ui-separator"></span></td>
                                <td class="ui-pg-button ui-corner-all" id="next_usersGrid-pager"><span
                                        class="ui-icon ui-icon-seek-next"></span></td>
                                <td class="ui-pg-button ui-corner-all" id="last_usersGrid-pager"><span
                                        class="ui-icon ui-icon-seek-end"></span></td>
                                <td dir="ltr"><select role="listbox" class="ui-pg-selbox">
                                    <option selected="selected" value="10" role="option">10</option>
                                    <option value="20" role="option">20</option>
                                    <option value="50" role="option">50</option>
                                    <option value="100" role="option">100</option>
                                </select></td>
                            </tr>
                            </tbody>
                        </table>
                    </td>
                    <td align="right" id="usersGrid-pager_right"></td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>



\
`;
        stub.withArgs("div#gbox_usersGrid").returns(angular.element(fixture));

        return $delegate;
      }))
      );

      const decodeXls = function(data) {
        let el = null;
        inject(function($window) {
          const decoded = $window.atob(data.match(/^data:application\/vnd\.ms-excel;base64,(.*)/)[1]);
          return el = angular.element($(decoded)[3]);
        });
        return el;
      };

      it("generates valid xls file heading", inject(function(xlsData) {
        const el = decodeXls(xlsData(this.gridId, this.selectedRows));

        expect(el.find("thead th:nth-child(1)").text()).to.contain("id");
        expect(el.find("thead th:nth-child(2)").text()).to.contain("Login");
        expect(el.find("thead th:nth-child(3)").text()).to.contain("Email");
        expect(el.find("thead th:nth-child(4)").text()).to.contain("Name");
        expect(el.find("thead th:nth-child(5)").text()).to.contain("Birthday");
        expect(el.find("thead th:nth-child(6)").text()).to.contain("Allowance");
        return expect(el.find("thead th:nth-child(7)").text()).to.contain("Paid");
      })
      );

      it("generates valid xls file contend", inject(function(xlsData) {
        const el = decodeXls(xlsData(this.gridId, this.selectedRows));

        const rowEl = el.find("tbody tr:first");
        expect(rowEl.find("td:nth-child(1)").text()).to.contain("4");
        expect(rowEl.find("td:nth-child(2)").text()).to.contain("login-4");
        expect(rowEl.find("td:nth-child(3)").text()).to.contain("login-4@Mayer.name");
        expect(rowEl.find("td:nth-child(4)").text()).to.contain("Ether");
        expect(rowEl.find("td:nth-child(5)").text()).to.contain("Oct 30");
        expect(rowEl.find("td:nth-child(5)").text()).to.contain("2010");
        expect(rowEl.find("td:nth-child(6)").text()).to.contain("42");
        return expect(rowEl.find("td:nth-child(7)").text()).to.contain("true");
      })
      );

      it("generates valid data uri", inject(function(xlsData) {
        const data = xlsData(this.gridId, this.selectedRows);
        return expect(data).to.match(/^\bdata:application\/vnd\.ms-excel;base64\b/);
      })
      );

      context("when some rows are selected", function() {
        before(function() { return this.selectedRows = ["5", "2", "4"]; });

        return it("exports only selected rows", inject(function(xlsData) {
          const el = decodeXls(xlsData(this.gridId, this.selectedRows));
          expect(el.find("tbody tr")).to.have.length(3);

          const rowEl = el.find("tbody tr:first");
          return expect(rowEl.find("td:nth-child(1)").text()).to.contain("2");
        })
        );
      });

      return context("when none is selected", function() {
        before(function() { return this.selectedRows = []; });

        return it("exports all rows", inject(function(xlsData) {
          const el = decodeXls(xlsData(this.gridId, this.selectedRows));
          expect(el.find("tbody tr")).to.have.length(10);

          const rowEl = el.find("tbody tr:first");
          return expect(rowEl.find("td:nth-child(1)").text()).to.contain("1");
        })
        );
      });
    });
  });

  return describe("directive: agGridXlsExport", function() {

// mock `$window.location.href` in order to avoid
// "Some of your tests did a full page reload!"
// mock `$window.navigator.userAgent` to avoid error
// "'undefined' is not an object (evaluating '$window.navigator.userAgent')"
    beforeEach(angular.mock.module(agGridz, function($provide) {
      $provide.value("$window", {
        location: {},
        navigator: {userAgent: 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/34.0.1847.116 Safari/537.36'}
      });

      /*$provide.decorator("NotificationDialogServ", function($delegate) {
        sinon.spy($delegate, "open");
        return $delegate;
      });*/

    })
    );

    beforeEach(angular.mock.module(agGridz));

    let selectedRowIds = null;
    let element = null;

    beforeEach(inject(function($injector, $rootScope) {
      let $scope = $rootScope.$new();

      // stub the grid instance
      $scope.$grid = {
        getXlsDataUri() { return "foo"; },
        getSelectedRowIds() { return selectedRowIds; }
      };

      return ({element, $scope} = compileTemplate(`\
  <a href="" ag-grid-xls-export>
  <i class="fa-download"></i> Export to XLS
</a>\
`, $injector, $scope));
    })
    );

    it("has $grid on scope");

    /*return describe("on click", () => describe("when no rows are selected", function() {
      before(() => selectedRowIds = []);

      return it("displays the notification", inject(function(NotificationDialogServ) {
// When
        element.click();

        // Then
        expect(NotificationDialogServ.open).to.be.called;
        return expect(NotificationDialogServ.open).to.be.calledWith("Please select at least one row.");
      })
      );
    }));*/
  });
});

/* describe "when at least one row is selected", ->
   before -> selectedRowIds = [1]

   it "does the magic", inject ($window) ->
     * When
     element.click()

     * Then
     expect(document.getElementsByTagName("a")[0].href).to.eq "foo"

   it "does not display notification", inject (NotificationDialogServ) ->
     * When
     element.click()

     * Then
     expect(NotificationDialogServ.open).to.not.be.called
*/
