<!doctype html>
<html>
<head>
	<meta name="layout" content="main"/>
	<title>Welcome to Tutorial</title>
	<asset:stylesheet href="application.css"/>
	<asset:javascript src="application.js"/>

</head>

<body ng-app="contactApp" data-resource-name="contact"
	  data-resource-path="/contact">
<nav class="navbar navbar-default navbar-static-top">
	<div class="container-fluid">
		<div class="navbar-header">
			<button type="button" class="collapsed navbar-toggle"
					data-toggle="collapse"
					data-target="#drop"
					aria-expanded="false">
			</button> <a href="#" class="navbar-brand">Rest Tutorial</a></div>

		<div class="collapse navbar-collapse" id="drop"><ul class="nav navbar-nav">
			<li class="active"><a href="#">Contacts</a></li>
			<li><a href="#">Link 1</a></li>
			<li><a href="#">Link 2</a>
			</li>
		</ul></div></div>
</nav>

<div class="container">
	<ng-view></ng-view>
</div>
</body>
</html>
