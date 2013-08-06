<div class="well well-large">
    <form ag-search-Form class="form-horizontal form-multi-column no-margin">

        <div class="row-fluid">
            <div class="control-group span6">
                <label class="control-label">${ag.label(code: "org")}</label>

                <div class="controls">
                    <div class="input-append">
                        <ag-select2 select-ajax-url="/org/pickList" ng-model="search.org">
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
        </div>

        <div class="form-actions no-margin">
            <ag-search-button></ag-search-button>
            <ag-reset-search-button></ag-reset-search-button>
        </div>
    </form>
</div>
