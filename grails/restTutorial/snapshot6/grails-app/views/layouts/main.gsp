<!doctype html>
<html>
<head>
	<meta name="layout" content="main"/>
	<title><g:layoutTitle default="Welcome to Tutorial"/></title>
	<g:layoutHead/>
	<asset:stylesheet href="application.css"/>
	<asset:javascript src="application.js"/>

</head>

<body context-path="${request.contextPath}"
      data-resource-name="${pageProperty(name: 'body.data-resource-name')}"
      data-resource-path="${pageProperty(name: 'body.data-resource-path')}">
<div ng-app="tutorial" ng-controller="LoginCtrl">

	<nav class="navbar navbar-default navbar-static-top">
		<div class="container-fluid">
			<div class="navbar-header">
				<button type="button" class="collapsed navbar-toggle"
						data-toggle="collapse"
						data-target="#drop"
						aria-expanded="false">
				</button> <a href="#" class="navbar-brand">Rest Tutorial</a></div>

			<div class="collapse navbar-collapse" id="drop">
				<ul class="nav navbar-nav">
					<li class="active"><a href="#">Contacts</a></li>
					<li><a href="#">Link 1</a></li>
					<li><a href="#">Link 2</a>
					</li>
				</ul>
				<ul class="pull-right nav navbar-nav">
					<li ng-click="logout()">
						<a href="#">Logout</a>
					</li>
				</ul>
			</div>
		</div>
	</nav>

	<div id="page" class="container">
		<div ng-if="!authenticated">
			<table>
				<tbody>
				<tr>
					<td>
						Username:
					</td>
					<td>
						<input type="text" name="username" ng-model="user.username"/>
					</td>
				</tr>
				<tr>
					<td>
						Password:
					</td>
					<td>
						<input type="password" name="password" ng-model="user.password"/>
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

		<div ng-if="!!authenticated">
			<div>
				<g:layoutBody/>
			</div>
		</div>
	</div>
</div>

</body>
</html>
