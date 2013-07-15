<p>{{search|json}}</p>

<div class="well well-large">
    <form name="searchForm" class="form-horizontal form-multi-column no-margin" ng-submit="advancedSearch(search)">

        <div class='row-fluid'>
            <div class="control-group span6">
                <label class="control-label">${ag.label(code: "org")}</label>

                <div class="controls">
                    <div class="input-append">
                        <input id="orgSelect2" ui-select2="orgSelectConfig" multiple ng-model="search.org" type="text"
                               style="width:87%">
                        <button class="btn" type="button" data-select2-open="orgSelect2" style="width:13%">
                            <i class="icon-search"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class='row-fluid'>

            <div class="control-group span6">
                <label class="control-label">${ag.label(code: "name")}</label>

                <div class="controls">
                    <input class="input-block-level" type="text" ng-model="search.contact.name">
                </div>
            </div>


            <div class="control-group span6">
                <label class="control-label">${ag.label(code: "login")}</label>

                <div class="controls">
                    <input class="input-block-level" type="text" ng-model="search.login">
                </div>
            </div>

        </div>

        <div class='row-fluid'>
            <div class="control-group span6">
                <label class="control-label">${ag.label(code: "contact.email")}</label>

                <div class="controls">
                    <input class="input-block-level" type="text" ng-model="search.contact.email">
                </div>
            </div>
        </div><!--row-fluid-->

        <div class="form-actions no-margin">
            <button type="submit" ng-class="{disabled: searching}" class="btn btn-info">
                <i class="icon-search icon-white"></i>
                {{searching && '${ag.label(code: 'button.search')} ...' || '${ag.label(code: 'button.search')}'}}
            </button>
            <button type="button" class="btn" ng-click="resetSearch()">
                <i class="icon-remove"></i> ${ag.label(code: 'button.reset')}
            </button>
        </div>
    </form>
</div>

<script type="text/javascript">
    $('button[data-select2-open]').click(function () {
        $('#' + $(this).data('select2-open')).select2('open');
    });
</script>