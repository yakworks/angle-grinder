<div class="well">
    <form ag-search-Form class="form-horizontal form-multi-column no-margin">

        <div class="row-fluid">
            <div class="control-group span6">
                <label class="control-label">${ag.label(code: "org")}</label>

                <div class="controls">
                    <div class="input-append">
                        <ag-select2 select-ajax-url="/org/pickList"
                                    select-ajax-quiet-millis="250"
                                    select-minimum-input-length="3"
                                    ng-model="search.org">
                            <table ag-select2-result class="table table-condensed org-select-result">
                                <tr>
                                    <td>{{item.num}}</td>
                                    <td>{{item.name}}</td>
                                </tr>
                            </table>
                        </ag-select2>
                    </div>
                </div>
            </div>
        </div>

        <div class="row-fluid">
            <div class="control-group span6">
                <label class="control-label">${ag.label(code: "name")}</label>

                <div class="controls">
                    <input class="input-block-level" type="text" ng-model="search.contact.name">
                </div>
            </div>

            <div class="control-group span6">
                <label class="control-label">${ag.label(code: "login")}</label>

                <div class="controls">
                    <input class="input-block-level" type="text" ng-model="search.login">
                </div>
            </div>
        </div>

        <div class="row-fluid">
            <div class="control-group span6">
                <label class="control-label">${ag.label(code: "contact.email")}</label>

                <div class="controls">
                    <input class="input-block-level" type="text" ng-model="search.contact.email">
                </div>
            </div>

            <div class="control-group span6">
                <label class="control-label">${ag.label(code: "contact.type")}</label>

                <div class="controls">
                    <select ui-select2 ng-model="search.contact.type">
                        <option value="">-- chose type --</option>
                        <option value="ADMIN">admin</option>
                        <option value="CUSTOMER">customer</option>
                    </select>
                </div>
            </div>
        </div>

        <div class="pull-right">
            <ag-search-button></ag-search-button>
            <ag-reset-search-button></ag-reset-search-button>
        </div>
    </form>
</div>
