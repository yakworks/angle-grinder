<!DOCTYPE html>
<html lang="en">
<head >
    <asset:stylesheet href="application.css"/>
    <asset:javascript src="tutorial.js"/>
</head>

<body ng-app="tutorial" ng-controller="LoginCtrl" data-context-path="${request.contextPath}"
      data-resource-name="${pageProperty(name: 'body.data-resource-name')}"
      data-resource-path="${pageProperty(name: 'body.data-resource-path')}">

    <div ng-if="authenticated == true">
        <div class="navbar navbar-inverse navbar-fixed-top bottom-margin-20">
            <div class="container">
                <a class="navbar-brand" href="${request.contextPath}">REST Tutorial</a>

                <div class="navbar-collapse collapse">
                    <ul class="navbar-nav nav">
                        <li><a href="${createLink(controller: 'org')}">List Orgs</a></li>
                    </ul>

                    <ul class="navbar-nav nav pull-right">
                        <li><a href="#"><i class="fa fa-cogs"></i> Control Panel</a></li>
                        <li class="divider-vertical"></li>
                        <li class="dropdown">
                            <a  class="dropdown-toggle " data-toggle="dropdown">
                                <i class="fa fa-user"></i> Joshua Burnett <b class="caret"></b>
                            </a>
                            <ul class="dropdown-menu">
                                <li>
                                    <a href="#"><i class="fa fa-user"></i> Account Settings</a>
                                </li>

                                <li>
                                    <a href="#"><i class="fa fa-lock"></i> Change Password</a>
                                </li>
                                <li class="divider"></li>
                                <li ng-click="logout()">
                                    <a ><i class="fa fa-power-off"></i> Logout</a>
                                </li>
                            </ul>
                        </li>
                        <ag-spinner></ag-spinner>
                    </ul>
                </div>
            </div>
        </div>

        <div id="page" class="container">
            <g:layoutBody/>
        </div>
    </div>
    <div ng-if="authenticated == false">
        <table>
            <tbody>
            <tr>
                <td>
                    Username:
                </td>
                <td>
                    <input type="text" name="username" ng-model="user.username" />
                </td>
            </tr>
            <tr>
                <td>
                    Password:
                </td>
                <td>
                    <input type="password" name="password" ng-model="user.password" />
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    <button type="button" ng-click="login()">Login</button>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</div>


</body>
</html>
