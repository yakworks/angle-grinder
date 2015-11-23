<div class="well" style="padding-bottom: 40px">
    <form ag-search-form="orgShowCaseGrid" class="form-horizontal form-multi-column no-margin">

        <div class="row">
            <div class="form-group col-md-6">
                <label class="control-label col-sm-4">${ag.label(code: "orgShowCase")}</label>

                <div class="col-sm-8">
                    <div class="input-group">
                        <input data-ng-model="filters.name">
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="form-group col-md-8">
                <label class="control-label col-sm-3">Example Date</label>

                <div class="controls range-date-pickers">
                    <ag-datepicker placeholder="from" type="text"
                                   ng-model="filters.exampleDate.from"></ag-datepicker>

                    <ag-datepicker placeholder="to" type="text"
                                   ng-model="filters.exampleDate.to"></ag-datepicker>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="form-group col-md-8">
                <label class="control-label col-sm-3">Local Date</label>

                <div class="controls range-date-pickers">
                    <ag-datepicker placeholder="from" type="text"
                                   ng-model="filters.exampleLocalDate.from"></ag-datepicker>

                    <ag-datepicker placeholder="to" type="text"
                                   ng-model="filters.exampleLocalDate.to"></ag-datepicker>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="form-group col-md-8">
                <label class="control-label col-sm-3">Date Time</label>

                <div class="controls range-date-pickers">
                    <ag-datepicker placeholder="from" type="text"
                                   ng-model="filters.exampleDateTime.from"></ag-datepicker>

                    <ag-datepicker placeholder="to" type="text"
                                   ng-model="filters.exampleDateTime.to"></ag-datepicker>
                </div>
            </div>
        </div>

        <div class="pull-right">
            <ag-search-button></ag-search-button>
            <ag-reset-search-button></ag-reset-search-button>
        </div>

    </form>
</div>
