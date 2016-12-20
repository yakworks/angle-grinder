<%@ page import="resttutorial.Contact" %>
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

		<div ag-field-group for="lastName">
			<label class="control-label">Last Name</label>

			<div class="row">
				<div class="col-md-4">
					<input type="text" name="lastName" ng-model="contact.lastName"  class="form-control"/>
					<ag-validation-errors for="lastName" />
				</div>
			</div>
		</div>

		<div ag-field-group for="email">
			<label class="control-label">Email</label>

			<div class="row">
				<div class="col-md-4">
					<input type="email" name="email" ng-model="contact.email" class="form-control"/>
					<ag-validation-errors for="email" />
				</div>
			</div>
		</div>
		<div ag-field-group for="dateOfBirth">
			<label class="control-label">Date Of Birth</label>

			<div class="row">
				<div class="col-md-4">
					<ag-datepicker ng-model="contact.dateOfBirth"></ag-datepicker>
					<ag-validation-errors for="dateOfBirth" />
				</div>
			</div>
		</div>

		<div ag-field-group for="salutation">
			<label class="control-label">Salutation</label>

			<div class="row">
				<div class="col-md-4">
					<g:select name="salutation" from="${resttutorial.Contact.Salutations.values()}" ng-model="contact.salutation" ui-select2="{closeOnSelect: true}" class="form-control"></g:select>

					<ag-validation-errors for="salutation" />
				</div>
			</div>
		</div>
	</div>

	<div class="modal-footer">
		<ag-cancel-button ng-click="closeDialog()"></ag-cancel-button>
		<ag-submit-button></ag-submit-button>
	</div>
</form>
