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
            <div class="form-group col-md-6">
                <label class="control-label col-sm-4">Example Date from</label>

                <div class="col-sm-8">
                    <div ag-datepicker>
                        <input type="text"
                               ng-model="filters.exampleDate.from"/>
                    </div>
                </div>
            </div>

            <div class="form-group col-md-6">
                <label class="control-label col-sm-4">Example Date to</label>

                <div class="col-sm-8">
                    <div ag-datepicker>
                        <input type="text"
                               ng-model="filters.exampleDate.to"/>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="form-group col-md-6">
                <label class="control-label col-sm-4">Local Date from</label>
                <div class="col-sm-8">
                    <div ag-datepicker ag-trim-time="filters.exampleLocalDate.from">
                        <input type="text"
                               ng-model="filters.exampleLocalDate.from" />
                    </div>
                </div>
            </div>

            <div class="form-group col-md-6">
                <label class="control-label col-sm-4">Local Date to</label>
                <div class="col-sm-8">
                    <div ag-datepicker ag-trim-time="filters.exampleLocalDate.to">
                        <input type="text"
                               ng-model="filters.exampleLocalDate.to" />
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="form-group col-md-6">
                <label class="control-label col-sm-4">Date Time from</label>
                <div class="col-sm-8">
                    <div ag-datepicker>
                        <input type="text"
                               ng-model="filters.exampleDateTime.from" />
                    </div>
                </div>
            </div>

            <div class="form-group col-md-6">
                <label class="control-label col-sm-4">Date Time to</label>
                <div class="col-sm-8">
                    <div ag-datepicker>
                        <input type="text"
                               ng-model="filters.exampleDateTime.to" />
                    </div>
                </div>
            </div>
        </div>

        <div class="pull-right">
            <ag-search-button></ag-search-button>
            <ag-reset-search-button></ag-reset-search-button>
        </div>

    </form>
</div>
