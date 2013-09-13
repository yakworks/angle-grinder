<div class="well" ng-controller="user.SearchForm">
    <form ag-search-form="usersGrid" class="form-horizontal form-multi-column no-margin">

        <div class="row-fluid">
            <div class="control-group span6">
                <label class="control-label">${ag.label(code: "org")}</label>

                <div class="controls">
                    <div class="input-append">
                        <ag-select2 select-ajax-url="/org/pickList"
                                    select-ajax-quiet-millis="250"
                                    select-minimum-input-length="3"
                                    ng-model="filters.org">
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
                    <input class="input-block-level" type="text" ng-model="filters.contact.name">
                </div>
            </div>

            <div class="control-group span6">
                <label class="control-label">${ag.label(code: "login")}</label>

                <div class="controls">
                    <input class="input-block-level" type="text" ng-model="filters.login">
                </div>
            </div>
        </div>

        <div class="row-fluid">
            <div class="control-group span6">
                <label class="control-label">${ag.label(code: "contact.email")}</label>

                <div class="controls">
                    <input class="input-block-level" type="text" ng-model="filters.contact.email">
                </div>
            </div>

            <div class="control-group span6">
                <label class="control-label">${ag.label(code: "contact.type")}</label>

                <div class="controls">
                    <input type="text" ui-select2="contactTypeSelectOptions"
                           name="contactType" ng-model="filters.contact.type" />
                </div>
            </div>
        </div>

        <div class="row-fluid">
            <div class="control-group span6">
                <label class="control-label">Active Date from</label>
                <div class="controls">
                    <input type="text"
                           ui-date="{ changeYear: true, changeMonth: true, yearRange: '1900:-0' }"
                           ui-date-format
                           ng-model="filters.activeDate.from" />
                </div>
            </div>

            <div class="control-group span6">
                <label class="control-label">Active Date to</label>
                <div class="controls">
                    <input type="text"
                           ui-date="{ changeYear: true, changeMonth: true, yearRange: '1900:-0' }"
                           ui-date-format
                           ng-model="filters.activeDate.to" />
                </div>
            </div>
        </div>

        <div class="pull-right">
            <ag-search-button></ag-search-button>
            <ag-reset-search-button></ag-reset-search-button>
        </div>
    </form>
</div>
