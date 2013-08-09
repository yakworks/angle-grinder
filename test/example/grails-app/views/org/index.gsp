<html>
<head>
    <meta name="layout" content="agAdmin"/>
    <g:set var="entityName" value="${ag.label(code: "org")}"/>
    <title>${entityName} Admin</title>

    <r:require modules="admin"/>
</head>

<body>

<!-- TODO hide the left navigation panel -->
<div ng-app="admin.org">
    <!-- TODO serve this templates from the grails app -->
    <script type="text/ng-template" id="templates/org/list.html">
        <h3 class="page-header">Org list</h3>
        <div ag-grid="gridOptions"></div>
    </script>

    <script type="text/ng-template" id="templates/org/show.html">
        <h3 class="page-header">Org show</h3>

        <dl class="dl-horizontal">
            <dt>ID</dt>
            <dd>{{org.id}}</dd>

            <dt>Email</dt>
            <dd>{{org.name}}</dd>

            <dt>Num</dt>
            <dd>{{org.num}}</dd>
        </dl>
    </script>

    <!-- TODO add alerts -->
    <ng-view></ng-view>
</div>

</body>
</html>
