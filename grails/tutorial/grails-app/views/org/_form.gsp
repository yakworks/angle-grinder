<%@ page import="tutorial.Org" %>
<div class="subnav">
	<ul class="nav navbar-nav nav-pills">
		<li><a href="#/"><i class="fa fa-list"></i> Org List</a></li>
		<li><a ng-show="org.persisted()" href="#/{{org.id}}"><i class="fa fa-th"></i> Show org</a></li>
		<li><a ng-hide="org.persisted()" href="#/create"><i class="fa fa-plus"></i> New org</a></li>
	</ul>
</div>

<section class="anchor">
	<h3 class="page-header" ng-switch="org.persisted()">
		<span ng-switch-when="true">Edit org</span>
		<span ng-switch-when="false">Create org</span>
	</h3>

	<form name="editForm" class="form-horizontal"
		  novalidate="true"
		  ag-server-validation-errors
		  ng-submit="save(editForm, org)">

		<div ag-field-group for="name">

				<label class="control-label">Name</label>


					<input type="text" name="name" placeholder="Enter Name"
						   ng-model="org.name" autofocus required/>
					<ag-validation-errors for="name" required="This field is required"/>
				</div>
			</div>
		</div>


		<div ag-field-group for="orgType">

				<label class="control-label ">Org Type</label>


					<select ui-select2="{width: '160px'}" ng-model="org.orgType" name="orgType"
							data-placeholder="Choose Org Type">
						<option value=""></option>
						<g:each in="${tutorial.Org.OrgType.stringValues()}">
							<option value="${it}">${it}</option>
						</g:each>
					</select>

					<ag-validation-errors for="orgType"/>
				</div>
			</div>
		</div>

		<div ag-field-group for="registrationDate">

				<label class="control-label ">Registration Date</label>


				<ag-datepicker type="text" style="width: 160px"
							   ng-model="org.registrationDate"
							   name="registrationDate"/>
				<ag-validation-errors for="registrationDate"/>

		</div>

		<div class="form-group">
			<div class="col-xs-offset-4 col-xs-10">
				<ag-submit-button></ag-submit-button>
				<a href="#/" class="btn btn-default">Cancel</a>
			</div>
		</div>
	</form>
</section>
