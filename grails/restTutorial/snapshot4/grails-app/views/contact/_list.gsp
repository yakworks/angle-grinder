<h3 class="page-header">Contact list</h3>

<div class="ag-panels-row">
	<div class="ag-panel">
		<div class="navbar navbar-toolbar navbar-grid navbar-default">
			<div class="navbar-inner with-selected-pointer with-grid-options">
				<ul class="nav navbar-nav">
					<li>
						<a ng-click="createRecord()">
							<i class="fa fa-plus"></i> Create Contact
						</a>
					</li>
				</ul>

			</div>
		</div>
		<div ag-grid="gridOptions" ag-grid-name="contactGrid"></div>
	</div>
</div>
