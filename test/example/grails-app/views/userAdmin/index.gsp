<html>
<head>
    <meta name="layout" content="agAdmin"/>
    <g:set var="entityName" value="${ag.label(code: "user")}"/>
    <title>${entityName} Admin</title>

    <r:require modules="vendor,bootstrap,gridz"/>
    <r:require modules="admin"/>

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

<body>

<h3 class="page-header"><g:message code="default.list.label" args="[entityName]"/></h3>

<div ng-controller="UsersListCtrl"
     ng-init="editTemplateUrl = '${createLink(action: 'editPartial')}' ">

    <g:hasErrors bean="${error}">
        <div class="errors"><g:renderErrors bean="${error}" as="list"/></div>
    </g:hasErrors>

    <div id="spinner" style="display:none;width:10px;position: absolute;"></div>

    <div ng-controller="SearchFormCtrl" collapse="!showSearchForm"
         ng-include="'${createLink(action: 'searchPartial')}'"></div>

    <div class="navbar navbar-grid">
        <div class="navbar-inner with-selected-pointer with-grid-options">
            <ul class="nav">
                <li>
                    <a href="#editModal" ng-click="createDialog()">
                        <i class="icon-user"></i><g:message code="default.new.label" args="[entityName]"/>
                    </a>
                </li>
            </ul>
            <ul class="nav pull-right">
                <li><a title="search screen" ng-click="showSearchForm = !showSearchForm"><i class="icon-search"></i></a>
                </li>
            </ul>

            <form action="" class="navbar-search pull-right" ng-submit="quickSearch(search)">
                <input type="text" value="" placeholder="quick search" class="search-query span2" style="width: 150px;"
                       ng-model="search.quickSearch"/>
            </form>
        </div>
    </div>

    <div ag-grid="gridOptions"></div>
</div>

</body>
</html>
