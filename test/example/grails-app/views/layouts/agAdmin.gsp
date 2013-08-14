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

    <g:layoutHead/>
    <r:layoutResources/>

    <style>
    #page {
        padding-top: 40px;
    }
    </style>
    <script type="text/javascript">
        <r:script>
        var BASE_PATH = "${resource(plugin:' ')}";
        //some hackiness so that the fixed nav bar on top does not obscure the an in-page anchor or jump
        //found here https://github.com/twitter/bootstrap/issues/1768
        var shiftWindow = function () {
            scrollBy(0, -50)
        };
        window.addEventListener("hashchange", shiftWindow);
        function bload() {
            if (window.location.hash) shiftWindow();
        }

        function gurl(controller, action) {
            return BASE_PATH + "/" + controller + "/" + action;
        }
        </r:script>
    </script>
</head>

<body id="${pageProperty(name: 'body.id')}" onload="bload()"
      data-context-path="${request.contextPath}"
      data-entity-name="${pageProperty(name: 'body.data-entity-name')}"
      data-base-url="${createLink(action: 'index').replaceAll(/index$/, '')}">

<div class="navbar navbar-inverse navbar-fixed-top">
    <div class="navbar-inner">
        <div class="container">
            <button type="button" class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="brand" href="#">Example Admin</a>

            <div class="nav-collapse collapse">
                <ul class="nav">
                    <li><a href="#about">Placeholder</a></li>
                </ul>
                <ul class="nav pull-right">
                    <li><a href="#"><i class="icon-cogs"></i> Control Panel</a></li>
                    <li class="divider-vertical"></li>
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle " data-toggle="dropdown">
                            <i class="icon-user"></i> Joshua Burnett <b class="caret"></b>
                        </a>
                        <ul class="dropdown-menu">
                            <li>
                                <a href="#"><i class="icon-user"></i> Account Settings</a>
                            </li>

                            <li>
                                <a href="#"><i class="icon-lock"></i> Change Password</a>
                            </li>
                            <li class="divider"></li>
                            <li>
                                <a href="#"><i class="icon-off"></i> Logout</a>
                            </li>
                        </ul>
                    </li>
                    <ag-spinner></ag-spinner>
                </ul>
            </div>
        </div>
    </div>
</div>

<div id="page" class="container">
    <aside class="sidebar ">
        <ul class="nav nav-list nav-side">
            <li>
                <a data-toggle="collapse" href="#user-submenu" class="accordion-toggle">
                    Users<i class="icon-chevron-right"></i>
                </a>

                <div id="user-submenu" class="collapse accordion-body">
                    <ul class="nav nav-list submenu">
                        <li class=""><a href="${createLink(controller: 'user', action: 'index')}">List Users</a></li>
                        <li><a href="${createLink(controller: 'user', action: 'index')}">Add New User</a></li>
                    </ul>
                </div>
            </li>
            <li><a href="${createLink(controller: 'org', action: 'index')}"><i class="icon-chevron-right"></i> Organizations</a></li>
        </ul>
    </aside>

    <section class='content'>
        <g:layoutBody/>
    </section>

</div>

<r:layoutResources/>
</body>
</html>
