<div class="well well-large">
    <form ag-search-Form class="form-horizontal form-multi-column no-margin">

        <div class="row-fluid">
            <div class="control-group span6">
                <label class="control-label">${ag.label(code: "org")}</label>

                <div class="controls">
                    <div class="input-append">
                        <input id="orgSelect2" ui-select2="orgSelectConfig" multiple
                               ng-model="search.org" type="text" style="width:87%">
                        <button class="btn" type="button" data-select2-open="orgSelect2" style="width:13%">
                            <i class="icon-search"></i>
                        </button>
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
