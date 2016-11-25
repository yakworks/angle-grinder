<div class="modal-header">
	<button type="button" class="close" ng-click="closeDialog()">&times;</button>
	<span ng-show="contact.persisted()" > Update</span>
	<span ng-hide="contact.persisted()" > Create</span>
</div>

<form name="editForm" class="form-horizontal no-margin" ag-submit="save(contact)">

	<div class="modal-body">

		<div ag-field-group for="firstName">
			<label class="control-label">First Name</label>

			<div class="row">
				<div class="col-md-4">
					<input type="text" name="firstName" ng-model="contact.firstName" ng-required="true" class="form-control"/>
					<ag-validation-errors for="firstName" />
				</div>
			</div>
		</div>
	</div>

	<div class="modal-footer">
		<ag-cancel-button ng-click="closeDialog()"></ag-cancel-button>
		<ag-submit-button></ag-submit-button>
	</div>
</form>
