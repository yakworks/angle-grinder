<html>
<head>
    <meta name="layout" content="agAdmin"/>
    <g:set var="entityName" value="${ag.label(code: "org")}"/>
    <title>${entityName} Admin</title>

    <r:require modules="admin"/>
</head>

<body>

<h3 class="page-header"><g:message code="default.list.label" args="[entityName]"/></h3>

<div ng-controller="OrgsListCtrl">
    <ag-alerts></ag-alerts>

    <div ag-grid="gridOptions"></div>
</div>
</body>
</html>
