<form ag-search-form="contactGrid" class="form-horizontal form-multi-column no-margin ag-search-form">

	<div class="col-md-4">
		<div class="control-group">
			<label class="control-label">Name</label>

			<div class="controls">
				<input class="input-block-level" type="text" ng-model="filters.firstName" name="filtersFirstName">
			</div>
		</div>
	</div>

	<div class="col-md-4">
		<div class="control-group">
			<label class="control-label">Email</label>

			<div class="controls">
				<input class="input-block-level" type="text" ng-model="filters.email" name="filtersEmail">
			</div>
		</div>
	</div>

	<div class="pull-right">
		<ag-search-button></ag-search-button>
		<ag-reset-search-button></ag-reset-search-button>
	</div>
</form>

