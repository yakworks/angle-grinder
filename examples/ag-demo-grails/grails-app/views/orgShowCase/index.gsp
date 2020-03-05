<html>
<head>
    <meta name="layout" content="agAdmin"/>
    <g:set var="entityName" value="ShowCase"/>
    <title>${entityName} Admin</title>
    <style type="text/css">
    .select2-container {
        background-color: #fff
    }

    .form-horizontal.form-multi-column .control-label {
        width: 100px;
    }

    .form-horizontal.form-multi-column .controls {
        margin-left: 120px;
    }

    .form-horizontal.form-multi-column .form-actions {
        padding-left: 120px;
    }

    .input-prepend, .input-append {
        width: 100%;
    }

    .input-prepend .add-on {
        width: 10%;
    }

    .input-prepend .input-block-level {
        width: 90%;
    }

    </style>
</head>

<body data-resource-name="orgShowCase"
      data-resource-path="/orgShowCase">

<h3 class="page-header"><g:message code="default.list.label" args="[entityName]"/></h3>

<div ng-app="admin.org" ng-controller="orgShowCase.ListCtrl" class="ag-panels-row"
     ng-init="editTemplateUrl = '${createLink(action: 'editPartial')}' ">

    <ag-alerts></ag-alerts>

    <div class="ag-panel">
        <div ng-show="showSearchForm" class="search-form-panel">
            <div ng-include="'${createLink(action: 'searchPartial')}'"></div>
        </div>

        <div class="navbar navbar-grid navbar-toolbar navbar-default">
            <div class="navbar-inner with-selected-pointer with-grid-options">
                <ul class="nav navbar-nav col-sm-4">
                    <li>
                        <a href="" ng-click="createRecord()">
                            <i class="fa fa-user"></i><g:message code="default.new.label" args="[entityName]"/>
                        </a>
                    </li>
                </ul>
                <ag-panel-states>
                    <ag-reload-grid for="usersGrid"></ag-reload-grid>
                </ag-panel-states>
                <ul class="nav navbar-nav pull-right">
                    <li>
                        <a title="search screen" ng-click="showSearchForm = !showSearchForm" href="">
                            <i class="fa fa-search"></i>
                        </a>
                    </li>
                </ul>

                <ag-grid-quick-search for="usersGrid" filters="filters"></ag-grid-quick-search>
            </div>
        </div>

        <div ag-grid="gridOptions"
             ag-grid-name="orgShowCaseGrid"></div>
    </div>
</div>

</body>
</html>
