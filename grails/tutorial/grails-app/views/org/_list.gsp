<h3 class="page-header top-margin-20">Org list</h3>

<div class="ag-panels-row">
	<div class="ag-panel">
		<div class="navbar navbar-toolbar navbar-grid navbar-default">
			<div class="navbar-inner with-selected-pointer with-grid-options">
				<ul class="nav navbar-nav">
					<li>
						<a href="#/create">
							<i class="fa fa-plus"></i> Create org
						</a>
					</li>
				</ul>
				<ag-panel-states>
					<ag-reload-grid for="orgGrid"></ag-reload-grid>
				</ag-panel-states>
				<ul class="nav navbar-nav pull-right">
					<li>
						<a title="search screen" ng-click="showSearchForm = !showSearchForm" href="">
							<i class="fa fa-search"></i>
						</a>
					</li>
				</ul>
				<ag-grid-quick-search for="orgGrid" filters="filters"></ag-grid-quick-search>
			</div>
		</div>
		<div ag-grid="gridOptions" ag-grid-name="orgGrid"></div>
	</div>

</div>
