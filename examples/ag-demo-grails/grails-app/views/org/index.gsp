<html>
<head>
    <meta name="layout" content="agAdmin"/>
    <g:set var="entityName" value="Org"/>
    <title>${entityName} Admin</title>

</head>

<body data-resource-name="org"
      data-resource-path="/org">

<div ng-app="admin.org">
    <ag-alerts></ag-alerts>
    <ui-view></ui-view>
</div>

</body>
</html>
