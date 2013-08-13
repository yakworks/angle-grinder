<html>
<head>
    <meta name="layout" content="agAdmin"/>
    <g:set var="entityName" value="${ag.label(code: "org")}"/>
    <title>${entityName} Admin</title>

    <r:require modules="admin"/>
</head>

<body data-entity-name="user">

<!-- TODO hide the left navigation panel -->
<div ng-app="admin.org">
    <!-- TODO add alerts -->
    <ng-view></ng-view>
</div>

</body>
</html>
