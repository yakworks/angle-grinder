import angular from 'angular'
import gridzModule from '../gridzModule'

var gridz = angular.module(gridzModule)

gridz.directive('agGridToolbar', () => ({
  restrict: 'E',
  replace: true,
  transclude: true,
  scope: {
    grid: '='
  },
  template: `\
<div class="navbar navbar-default  navbar-toolbar navbar-grid">
        <div class="navbar-inner position-relative with-selected-pointer with-grid-options">
            <div class="collapse navbar-collapse no-padding" >
              <ul class="nav navbar-nav">
                <li class="menu-arrow"><i class="icon-selected-pointer"></i></li>
                <li>
                  <a ag-grid-xls-export="grid"></a>
                </li>
                <li>
                  <a ng-click="$parent.massUpdate()" uib-tooltip="Mass Update" >
                    <i class="fa fa-edit"></i></a>
                </li>
              </ul>
              <ul class="nav navbar-nav">
                <li class="divider-vertical"></li>
                <li>
                  <a ng-click="$parent.createRecord()" ag-new-button ></a>
                </li>
              </ul>
              <ng-transclude></ng-transclude>
              <ag-panel-states>
                <ag-manage-grid-columns grid="grid"></ag-manage-grid-columns>
                <ag-reload-grid for="grid"></ag-reload-grid>
                <ag-reset-sort-grid for="grid"></ag-reset-sort-grid>
              </ag-panel-states>
              <ul class="nav navbar-nav pull-right">
                <li>
                  <a title="search screen" ng-click="parent.showSearchForm = !parent.showSearchForm" href="">
                      <i class="fa fa-search"></i>
                  </a>
                </li>
              </ul>
              <ag-grid-quick-search for="grid" filters="filters"></ag-grid-quick-search>
            </div>
        </div>
      </div>\
`
}))
