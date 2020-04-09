<html>
<head>
    <meta name="layout" content="agAdmin"/>
    <g:set var="entityName" value="User"/>
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

    .input-prepend .form-control {
        width: 90%;
    }

    </style>
</head>

<body data-resource-name="user"
      data-resource-path="/user">
<div ng-app="user">
    <ag-alerts></ag-alerts>
    <ui-view></ui-view>
</div>

</body>
</html>
