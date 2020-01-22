<html>
<head>
    <meta name="layout" content="agAdmin"/>
    <g:set var="entityName" value="${ag.label(code: "org")}"/>
    <title>${entityName} Admin</title>
    <g:javascript src="../jquery-libs.js" />
    <g:javascript src="../vendor-libs.js" />
    <g:javascript src="../main.js" />

</head>

<body data-resource-name="org"
      data-resource-path="/org">

<div ng-app="admin.org">
    <ag-alerts></ag-alerts>
    <ng-view></ng-view>
</div>

</body>
</html>
