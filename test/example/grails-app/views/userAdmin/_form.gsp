<g:set var="entityName" value="${ag.label(code: "user")}"/>

<div class="modal-header">
    <button type="button" class="close" ng-click="closeEditDialog()" aria-hidden="true">&times;</button>

    <h3 ng-show="createNew">Create New ${entityName}</h3>
    <h3 ng-hide="createNew">Edit ${entityName}</h3>
</div>

<p>{{item|json}}</p>

<form name="editForm" class="form-horizontal no-margin" ng-submit="save(item)">
    <div class="modal-body">
        <!-- TODO obsolete flash messages -->
        <div class="alert alert-{{message.level}}" ng-show="message.text">
        <a class="close" href="#">&times;</a>{{message.text}}</div>

        <div class="control-group" ng-class="{error: errors.contact.firstName}">
            <label class="control-label">${ag.label(code: "contact.name")}</label>

            <div class="controls">
                <input type="text" placeholder="${ag.label(code: 'contact.firstName')}"
                       ng-model="item.contact.firstName" autofocus>
                <span class="help-inline" ng-show="errors.contact.firstName">{{errors.contact.firstName}}</span>
            </div>

            <div class="controls" style="margin-top:5px">
                <input type="text" placeholder="${ag.label(code: 'contact.lastName')}" ng-model="item.contact.lastName">
            </div>
        </div>

        <div class="control-group" ng-class="{error: errors.contact.email}">
            <label class="control-label">${ag.label(code: "contact.email")}</label>

            <div class="controls">
                <input type="text" name="contact.email" ng-model="item.contact.email">
                <span class="help-inline" ng-show="errors.contact.email">{{errors.contact.email}}</span>
            </div>
        </div>

        <div class="control-group" ng-class="{error: errors.user.login}">
            <label class="control-label">${ag.label(code: "user.login")}</label>

            <div class="controls">
                <input type="text" name="login" ng-model="item.login">
                <span class="help-inline" ng-show="errors.user.login">{{errors.user.login}}</span>
            </div>
        </div>

        <div class="control-group" ng-class="{error: errors.user.passwd}">
            <label class="control-label">${ag.label(code: "user.password")}</label>

            <div class="controls">
                <input type="password" placeholder="${ag.label(code: 'user.password')}" name="password"
                       ng-model="item.password">
                <span class="help-inline" ng-show="errors.user.passwd">{{errors.user.passwd}}</span>
            </div>

            <div class="controls" style="margin-top:5px">
                <input type="password" placeholder="${ag.label(code: 'user.repassword')}" name="repassword"
                       ng-model="item.repassword">
            </div>
        </div>

        <div class="control-group">
            <div class="controls">
                <label class="checkbox">
                    <g:checkBox name="contact.tagForReminders" ng-model="item.contact.tagForReminders"/>
                    ${ag.label(code: 'contact.tagForReminders')}
                </label>
            </div>

            <div class="controls" ng-hide="isCreateNew">
                <label class="checkbox">
                    <g:checkBox name="inactive" ng-model="item.inactive"/>
                    ${ag.label(code: 'user.inactive')}
                </label>
            </div>

        </div>
    </div>

    <div class="modal-footer">
        <button type="button" class="btn btn-danger pull-left" data-ng-click="delete(item)" ng-show="createForm">
            <i class="icon-trash"></i> ${ag.label(code: 'button.delete')}
        </button>
        <button type="button" class="btn" ng-click="closeEditDialog()">
            <i class="icon-remove"></i> ${ag.label(code: 'button.cancel')}
        </button>
        <button type="submit" ng-class="{disabled: saving}" class="btn btn-primary">
            <i class="icon-ok icon-white"></i>
            {{saving && '${ag.label(code: 'button.save')} ...' || '${ag.label(code: 'button.save')}'}}
        </button>
    </div>
</form>
