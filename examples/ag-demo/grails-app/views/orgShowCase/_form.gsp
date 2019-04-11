<%@ page import="agdemo.Org" %>
<g:set var="entityName" value="${ag.label(code: "orgShowCase")}"/>

<div class="modal-header">
    <button type="button" class="close" ng-click="closeDialog()" aria-hidden="true">&times;</button>

    <h3 ng-switch="orgShowCase.persisted()">
        <span ng-switch-when="true">Edit ${entityName}</span>
        <span ng-switch-when="false">Create New ${entityName}</span>
    </h3>
</div>

<form name="editForm" class="form-horizontal" novalidate
      ag-server-validation-errors
      ng-submit="save(orgShowCase)">
    <div class="modal-body" ng-controller="orgShowCase.FormCtrl" style="height:60%; overflow:auto;">

        <div ag-field-group for="exampleLocalDate" class="form-group row">
            <label class="control-label col-md-2">Local Date</label>

            <div class="col-md-10">
                <ag-datepicker ng-model="orgShowCase.exampleLocalDate"
                               name="exampleLocalDate">

                <ag-validation-errors for="exampleLocalDate"/>
            </div>
        </div>

        <div ag-field-group for="exampleDateTime" class="form-group row">
            <label class="control-label col-md-2">Date Time</label>

            <div class="col-md-10">
                <ag-datepicker ng-model="orgShowCase.exampleDateTime"
                               date-type="date"
                               name="exampleDateTime"/>

                <ag-validation-errors for="exampleDateTime"/>
            </div>
        </div>

        <div ag-field-group for="exampleDate" class="form-group row">
            <label class="control-label col-md-2">Date</label>

            <div class=" col-md-10">
                <ag-datepicker type="text"
                               ng-model="orgShowCase.exampleDate"
                               date-type="date"
                               name="exampleDate"/>

                <ag-validation-errors for="exampleDate"/>
            </div>
        </div>

        <div ag-field-group for="org" class="form-group row">
            <label class="control-label col-md-2">Org</label>

            <div class="col-md-10">
                <div placeholder="Select Orgs" ui-select2="orgSelectOptions" ng-model="filters.org" />
            </div>
        </div>


        <div class="modal-footer">
            <span ng-if="orgShowCase.persisted()">
                <ag-delete-button when-confirmed="delete(item)"></ag-delete-button>
            </span>

            <ag-cancel-button ng-click="closeDialog()"></ag-cancel-button>
            <ag-submit-button></ag-submit-button>
        </div>
</form>
