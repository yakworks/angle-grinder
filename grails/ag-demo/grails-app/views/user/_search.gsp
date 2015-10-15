<div class="well" ng-controller="user.SearchForm">
    <form ag-search-form="usersGrid" class="form-horizontal form-multi-column no-margin" style="padding-bottom: 30px">

        <div class="row">
            <div class="form-group col-md-6">
                <label class="control-label col-sm-4">${ag.label(code: "org")}</label>

                <div class="col-sm-8 test">
                    <div class="input-group">
                        <ag-select2 style="width: 100%"
                                    select-ajax-url="/org/pickList"
                                    select-ajax-quiet-millis="250"
                                    select-minimum-input-length="3"
                                    select-options="{width: '180px', multiple: true}"
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

        <div class="row">
            <div class="form-group col-md-6">
                <label class="control-label col-sm-4">${ag.label(code: "name")}</label>

                <div class="col-sm-8">
                    <input class="form-control" type="text" ng-model="filters.contact.name">
                </div>
            </div>

            <div class="form-group col-md-6">
                <label class="control-label col-sm-4">${ag.label(code: "login")}</label>

                <div class="col-sm-8">
                    <input class="form-control" type="text" ng-model="filters.login">
                </div>
            </div>
        </div>

        <div class="row">
            <div class="form-group col-md-6">
                <label class="control-label col-sm-4">${ag.label(code: "contact.email")}</label>

                <div class="col-sm-8">
                    <input class="form-control" type="text" ng-model="filters.contact.email">
                </div>
            </div>

            <div class="form-group col-md-6">
                <label class="control-label col-sm-4">${ag.label(code: "contact.type")}</label>

                <div class="col-sm-8 full-width">
                    <input type="text" ui-select2="contactTypeSelectOptions" class="full-width"
                           name="contactType" ng-model="filters.contact.type"/>
                </div>
            </div>
        </div>
        <div class="pull-right">
            <ag-search-button></ag-search-button>
            <ag-reset-search-button></ag-reset-search-button>
        </div>
    </form>
</div>
