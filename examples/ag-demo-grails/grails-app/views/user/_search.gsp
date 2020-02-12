<%@ page import="agdemo.Org" %>
<div class="well" ng-controller="user.SearchForm">
    <form ag-search-form="usersGrid" class="form-horizontal-fixed form-multi-column no-margin"
          style="padding-bottom: 30px">

        <div class="columns">
            <div class="column is-one-third">
                <div class="form-group">
                    <label class="control-label">${ag.label(code: "org")}</label>

                    <div class="controls">
                        <g:select id="orgSelect" name="orgSelect"
                                  from="${agdemo.Org.list()}" optionKey="id" optionValue="name"
                                  multiple="true" ng-model="filters.orgIds" ui-select2="{closeOnSelect: false}"
                                  class="form-control"/>
                    </div>

                </div>



            <div class="form-group">
                <label class="control-label col-sm-4">${ag.label(code: "name")}</label>

                <div class="controls">
                    <input class="form-control" type="text" ng-model="filters.contact.name">
                </div>
            </div>

            <div class="form-group">
                <label class="control-label col-sm-4">${ag.label(code: "login")}</label>

                <div class="controls">
                    <input class="form-control" type="text" ng-model="filters.login">
                </div>
            </div>


            <div class="form-group">
                <label class="control-label col-sm-4">${ag.label(code: "contact.email")}</label>

                <div class="controls">
                    <input class="form-control" type="text" ng-model="filters.contact.email">
                </div>
            </div>

            <div class="form-group">
                <label class="control-label col-sm-4">${ag.label(code: "contact.type")}</label>

                <div class="controls">
                    <input type="text" ui-select2="contactTypeSelectOptions" class="full-width"
                           name="contactType" ng-model="filters.contact.type"/>
                </div>
            </div>
            </div>
            <div class="column is-one-third">
                <div class="form-group">
                    <label class="control-label">Active Date</label>

                    <div class="controls range-date-pickers">
                        <ag-datepicker ng-model="filters.activeDate.from"
                                       ag-trim-time="filters.activeDate.from"
                                       placeholder="from"></ag-datepicker>

                        <ag-datepicker ng-model="filters.activeDate.to"
                                       ag-trim-time="filters.activeDate.to"
                                       placeholder="to"></ag-datepicker>
                    </div>
                </div>
            </div>
        </div>


        <div class="pull-right">
            <ag-search-button></ag-search-button>
            <ag-reset-search-button></ag-reset-search-button>
        </div>
    </form>
</div>
