<html>
<head>
    <meta name="layout" content="agAdmin"/>
    <g:set var="entityName" value="Org"/>
    <title>${entityName} Admin</title>
</head>

<body data-resource-name="org"
      data-resource-path="/org">

<div ng-app="admin.orgTabs" ng-init="grid = {}">
    <ag-alerts></ag-alerts>

    <ng-view></ng-view>
</div>

</body>
</html>
