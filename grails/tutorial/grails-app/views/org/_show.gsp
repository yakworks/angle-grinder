<div class="subnav">
	<ul class="nav nav-pills">
		<li><a class="list" href="#/"><i class="fa fa-list"></i> Org List</a></li>
		<li><a class="create" href="#/create"><i class="fa fa-plus"></i> New org</a></li>
	</ul>
</div>

<div class="content">
	<h3 class="page-header">Org show</h3>

	<dl class="dl-horizontal">
		<dt>Name</dt>
		<dd>{{org.name}}</dd>

		<dt>Registration Date</dt>
		<dd>{{org.registrationDate | agDate}}</dd>

		<dt>Org Type</dt>
		<dd>{{org.orgType}}</dd>
	</dl>

	<div class="form-group">
		<a ng-href="#/{{org.id}}/edit" class="btn btn-default"><i class="fa fa-pencil-square-o"></i> Edit</a>
		<ag-delete-button when-confirmed="delete(org)"></ag-delete-button>
	</div>
</div>
