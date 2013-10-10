<html>
<head>
    <meta name="layout" content="agAdmin"/>
    <g:set var="entityName" value="${ag.label(code: "org")}"/>
    <title>${entityName} Admin</title>

    <r:require modules="admin"/>
</head>

<body data-resource-name="org"
      data-resource-path="/org">

<div ng-app="admin.orgTabs">
    <ag-alerts></ag-alerts>
    <ng-view></ng-view>
</div>

</body>
</html>
