<g:set var="entityName" value="${ag.label(code: "user")}"/>

<div class="modal-header">
    <button type="button" class="close" ng-click="closeEditDialog()" aria-hidden="true">&times;</button>

    <h3 ng-show="createNew">Create New ${entityName}</h3>
    <h3 ng-hide="createNew">Edit ${entityName}</h3>
</div>

<form name="editForm" class="form-horizontal no-margin" novalidate
      ag-server-validation-errors
      ng-submit="save(item)">
    <div class="modal-body" ng-controller="user.FormCtrl">

        <div ag-field-group for="contactFirstName,contactLastName">
            <label class="control-label">${ag.label(code: "contact.name")}</label>

            <div class="controls">
                <input type="text" placeholder="${ag.label(code: 'contact.firstName')}"
                       name="contactFirstName"
                       ng-model="item.contact.firstName" required autofocus>
                <ag-validation-errors for="contactFirstName" />
            </div>

            <div class="controls" style="margin-top:5px">
                <input type="text" placeholder="${ag.label(code: 'contact.lastName')}"
                       name="contactLastName"
                       ng-model="item.contact.lastName" />
                <ag-validation-errors for="contactLastName" />
            </div>
        </div>

        <div ag-field-group for="contactEmail,login">
            <label class="control-label">${ag.label(code: "contact.email")}</label>
            <div class="controls">
                <input type="email"
                       name="contactEmail" ng-model="item.contact.email" />
                <ag-validation-errors for="contactEmail" />
            </div>

            <label class="control-label">${ag.label(code: "user.login")}</label>
            <div class="controls">
                <input type="text"
                       name="login" ng-model="item.login" required />
                <ag-validation-errors for="login" />
            </div>
        </div>

        <div ag-field-group for="activeDate">
            <label class="control-label">${ag.label(code: "activeDate")}</label>
            <div class="controls">
                <input type="text"
                       name="activeDate" ng-model="item.activeDate"
                       ng-required="true" />
                <ag-validation-errors for="activeDate" />
            </div>
        </div>

        <div ag-field-group for="password,repassword">
            <label class="control-label">${ag.label(code: "user.password")}</label>

            <div class="controls">
                <input type="password" placeholder="${ag.label(code: 'user.password')}"
                       name="password"
                       ng-model="item.password"
                       ng-required="item.newRecord()" ng-minlength="6" />
                <ag-validation-errors for="password" />
            </div>

            <div class="controls" style="margin-top:5px">
                <input type="password" placeholder="${ag.label(code: 'user.repassword')}"
                       name="repassword"
                       ng-model="item.repassword"
                       ng-required="item.newRecord()" ng-minlength="6" match="item.password" />
                <ag-validation-errors for="repassword" />
            </div>
        </div>

        <div class="control-group">
            <label class="control-label">${ag.label(code: "contact.type")}</label>
            <div class="controls">
                <select ui-select2 name="contactType" ng-model="item.contact.type">
                    <option value="ADMIN">admin</option>
                    <option value="CUSTOMER">customer</option>
                </select>
                <ag-validation-errors for="contactType" />
            </div>
        </div>

        <div ag-field-group for="contactOrgId">
            <label class="control-label">${ag.label(code: "user.org")}</label>

            <div class="controls">
                <select name="contactOrgId" ui-select2
                        ng-model="item.contact.org.id"
                        ng-required="true">
                    <option value="">-- chose org --</option>
                    <option ng-repeat="org in orgs" value="{{org.id}}">{{org.name}}</option>
                </select>
                <ag-validation-errors for="contactOrgId" />
            </div>
        </div>

        <div class="control-group">
            <div class="controls">
                <label class="checkbox">
                    <g:checkBox name="contactTagForReminders" ng-model="item.contact.tagForReminders"/>
                    ${ag.label(code: 'contact.tagForReminders')}
                </label>
            </div>

            <div class="controls" ng-hide="item.newRecord()">
                <label class="checkbox">
                    <g:checkBox name="inactive" ng-model="item.inactive"/>
                    ${ag.label(code: 'user.inactive')}
                </label>
            </div>
        </div>
    </div>

    <div class="modal-footer">
        <span ng-hide="createNew">
            <ag-delete-button when-confirmed="delete(item)"></ag-delete-button>
        </span>

        <ag-cancel-button ng-click="closeEditDialog()"></ag-cancel-button>
        <ag-submit-button></ag-submit-button>
    </div>
</form>
