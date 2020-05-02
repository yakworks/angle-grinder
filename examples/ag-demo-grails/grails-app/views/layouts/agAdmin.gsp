<!DOCTYPE html>
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title><g:layoutTitle default="Admin"/></title>

    <link rel="shortcut icon" href="${resource(dir: 'images', file: 'favicon.ico')}" type="image/x-icon">
    <link rel="apple-touch-icon" href="${resource(dir: 'images', file: 'apple-touch-icon.png')}">
    <link rel="apple-touch-icon" sizes="114x114" href="${resource(dir: 'images', file: 'apple-touch-icon-retina.png')}">
    <link href="https://cdn.materialdesignicons.com/5.0.45/css/materialdesignicons.min.css" rel="stylesheet">

    <g:layoutHead/>
    <link href="/vendor-libs.css" rel="stylesheet">
    <link href="/assets/main.css" rel="stylesheet">
    <script src="/jquery-libs.js" type="text/javascript"></script>
    <script src="/vendor-libs.js" type="text/javascript"></script>
    <script src="/main.js" type="text/javascript"></script>

</head>

<body data-context-path="${request.contextPath}"
      data-resource-name="${pageProperty(name: 'body.data-resource-name')}"
      data-resource-path="${pageProperty(name: 'body.data-resource-path')}"
      ng-app="${pageProperty(name: 'body.ng-app')}"
      ng-controller="AppCtrl as  \$appCtrl">
<div ui-view id="app" ng-class="{
      'app-sidebar-fixed' : $appCtrl.layout.isSidebarFixed,
      'app-sidenav-fixed' : $appCtrl.layout.isSidebarFixed,
      'app-sidebar-open': appState.sidenav.open,
      'app-sidebar-closed': !appState.sidenav.open,
      'app-sidenav-open': appState.sidenav.open,
      'app-sidenav-closed': !appState.sidenav.open
    }"></div>

<g:layoutBody/>
</body>
</html>
