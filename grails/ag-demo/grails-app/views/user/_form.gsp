<g:set var="entityName" value="${ag.label(code: "user")}"/>

<div class="modal-header">
    <button type="button" class="close" ng-click="closeDialog()" aria-hidden="true">&times;</button>

    <h3 ng-switch="user.persisted()">
        <span ng-switch-when="true">Edit ${entityName}</span>
        <span ng-switch-when="false">Create New ${entityName}</span>
    </h3>
</div>

<form name="editForm" class="form-horizontal no-margin" novalidate
      ag-server-validation-errors
      ng-submit="save(user)">
    <div class="modal-body" ng-controller="user.FormCtrl">

        <ng-form name="contact" ag-server-validation-errors>
            <div ag-field-group for="firstName,lastName,email">
                <label class="control-label">${ag.label(code: "contact.name")}</label>

                <div class="controls">
                    <input type="text" placeholder="${ag.label(code: 'contact.firstName')}"
                           name="firstName"
                           ng-model="user.contact.firstName" required autofocus>
                    <ag-validation-errors for="firstName"/>
                </div>

                <div class="controls" style="margin-top:5px">
                    <input type="text" placeholder="${ag.label(code: 'contact.lastName')}"
                           name="lastName"
                           ng-model="user.contact.lastName"/>
                    <ag-validation-errors for="lastName"/>
                </div>

                <label class="control-label">${ag.label(code: "contact.email")}</label>

                <div class="controls">
                    <input type="email"
                           name="email" ng-model="user.contact.email"/>
                    <ag-validation-errors for="email"/>
                </div>
            </div>

            <div class="control-group">
                <label class="control-label">${ag.label(code: "contact.type")}</label>

                <div class="controls">
                    <select ui-select2 name="type" ng-model="user.contact.type">
                        <option value="ADMIN">admin</option>
                        <option value="CUSTOMER">customer</option>
                    </select>
                    <ag-validation-errors for="type"/>
                </div>
            </div>

            <div ag-field-group for="orgId">
                <label class="control-label">${ag.label(code: "user.org")}</label>

                <div class="controls">
                    <select name="orgId" ui-select2
                            ng-model="user.contact.org.id"
                            ng-required="true">
                        <option value="">-- chose org --</option>
                        <option ng-repeat="org in orgs" value="{{org.id}}">{{org.name}}</option>
                    </select>
                    <ag-validation-errors for="orgId"/>
                </div>
            </div>

            <div class="control-group">
                <div class="controls">
                    <label class="checkbox">
                        <g:checkBox name="tagForReminders" ng-model="user.contact.tagForReminders"/>
                        ${ag.label(code: 'contact.tagForReminders')}
                    </label>
                </div>
            </div>
        </ng-form>

        <div ag-field-group for="login">
            <label class="control-label">${ag.label(code: "user.login")}</label>

            <div class="controls">
                <input type="text"
                       name="login" ng-model="user.login" required/>
                <ag-validation-errors for="login"/>
            </div>
        </div>

        <div ag-field-group for="activeDate">
            <label class="control-label">${ag.label(code: "activeDate")}</label>

            <div class="controls">
                <div ag-datepicker>
                    <input type="text"
                           ng-model="user.activeDate"
                           ng-required="true"
                           name="activeDate"/>
                </div>

                <ag-validation-errors for="activeDate"/>
            </div>
        </div>

        <div ag-field-group for="password,repassword">
            <label class="control-label">${ag.label(code: "user.password")}</label>

            <div class="controls">
                <input type="password" placeholder="${ag.label(code: 'user.password')}"
                       name="password"
                       ng-model="user.password"
                       ng-required="user.newRecord()" ng-minlength="6"/>
                <ag-validation-errors for="password"/>
            </div>

            <div class="controls" style="margin-top:5px">
                <input type="password" placeholder="${ag.label(code: 'user.repassword')}"
                       name="repassword"
                       ng-model="user.repassword"
                       ng-required="user.newRecord()" ng-minlength="6" match="user.password"/>
                <ag-validation-errors for="repassword"/>
            </div>
        </div>

        <div class="control-group">
            <div class="controls" ng-hide="user.newRecord()">
                <label class="checkbox">
                    <g:checkBox name="inactive" ng-model="user.inactive"/>
                    ${ag.label(code: 'user.inactive')}
                </label>
            </div>
        </div>

        <h3>Time Zone show Case</h3>
    <legend>Birth Date</legend>

            <div ag-field-group for="birthDate">
                <label class="control-label">Birth Date</label>

                <div class="controls">
                    <div ag-datepicker ag-trim-time="user.birthDate">
                        <input type="text"
                               ng-model="user.birthDate"
                               name="birthDate"/>
                    </div>

                    <ag-validation-errors for="birthDate"/>
                </div>
            </div>

            <div ag-field-group>
                <label class="control-label">Got from server:</label>

                <div class="controls">{{tzShowCase.birthDate}}</div>
            </div>

            <div ag-field-group>
                <label class="control-label">Will be send to server:</label>
                <div class="controls">{{user.birthDate}}</div>
            </div>

    <legend>Post Date</legend>

            <div ag-field-group for="postDate">
                <label class="control-label">Post Date</label>

                <div class="controls">
                    <div ag-datepicker>
                        <input type="text"
                               ng-model="user.postDate"
                               name="postDate"/>
                    </div>

                    <ag-validation-errors for="postDate"/>
                </div>
            </div>

            <div ag-field-group>
                <label class="control-label">Got from server:</label>

                <div class="controls">{{tzShowCase.postDate}}</div>
            </div>

            <div ag-field-group>
                <label class="control-label">Will be send to server:</label>

                <div class="controls">{{user.postDate}}</div>
            </div>

    <legend>Reminder Date</legend>
        <div ag-field-group for="reminderDate">
            <label class="control-label">Reminder Date</label>

            <div class="controls">
                <div ag-datepicker>
                    <input type="text"
                           ng-model="user.reminderDate"
                           name="reminderDate"/>
                </div>

                <ag-validation-errors for="reminderDate"/>
            </div>
        </div>

        <div ag-field-group>
            <label class="control-label">Got from server:</label>

            <div class="controls">{{tzShowCase.reminderDate}}</div>
        </div>

        <div ag-field-group>
            <label class="control-label">Will be send to server:</label>

            <div class="controls">{{user.reminderDate}}</div>
        </div>



    </div>


    <div class="modal-footer">
        <span ng-if="user.persisted()">
            <ag-delete-button when-confirmed="delete(item)"></ag-delete-button>
        </span>

        <ag-cancel-button ng-click="closeDialog()"></ag-cancel-button>
        <ag-submit-button></ag-submit-button>
    </div>
</form>
