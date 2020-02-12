import angular from 'angular'
import gridzModule from '../gridzModule'

var app = angular.module(gridzModule)

// Uses to show edit panel for grid row. Supports dbl click on grid cell.
app.directive('gridCrud', ['$controller', '$timeout', ($controller, $timeout) => ({
  restrict: 'A',
  replace: true,
  scope: true,
  template: '<div  ng-show="showForm"><ng-include ng-if="!isModal" src="template | withContext"></ng-include></div>',

  link(scope, element, attrs) {
    const gridEl = angular.element(document.querySelectorAll(`[ag-grid-name=${attrs.gridName}]`)).find('table.gridz')
    const clicks = function() {
      gridEl.jqGrid('setGridParam', { ondblClickRow: scope.dblClick })
      if ((attrs.keyboardnav === true) || (attrs.keyboardnav === 'true')) {
        const colNames = gridEl.jqGrid('getGridParam', 'colNames')
        return gridEl.bind('keydown', function(event) {
          if (scope.lastSelectedRow) {
            if (event.which !== 13) {
              scope.unHighlightCell(scope.lastSelectedRow, scope.lastSelectedCell)
            }
            const ids = gridEl.jqGrid('getDataIDs')
            const firstId = ids[0]
            const lastId = ids[ids.length - 1]
            switch (event.which) {
              case 13: // enter
                scope.dblClick(scope.lastSelectedRow, null, scope.lastSelectedCell, event)
                break
              case 40: // down
                if (scope.lastSelectedRow !== lastId) {
                  scope.lastSelectedRow = ids[ids.indexOf(scope.lastSelectedRow) + 1]
                }
                break
              case 38: // up
                if (scope.lastSelectedRow !== firstId) {
                  scope.lastSelectedRow = ids[ids.indexOf(scope.lastSelectedRow) - 1]
                }
                break
              case 39: // right
                if (scope.lastSelectedCell !== colNames.length) { scope.lastSelectedCell++ }
                break
              case 37: // left
                if (scope.lastSelectedCell !== 0) { scope.lastSelectedCell-- }
                break
            }
          }
          return scope.highlightCell(scope.lastSelectedRow, scope.lastSelectedCell)
        })
      }
    }
    attrs.$observe('gridCrud', clicks)
    scope.isModal = (attrs.isModal === true) || (attrs.isModal === 'true')

    const ctrlLocals = {
      $scope: scope,
      $element: element,
      $attrs: attrs
    }

    const controllerName = attrs.controller ? attrs.controller : 'GridCrudCtrl'
    $controller(controllerName, ctrlLocals)

    return scope.$watch(
      () => scope.showForm || false,
      function(newVal) {
        if (newVal) {
          return $timeout(() => scope.setFocus(element))
        }
      })
  }
})
])

export class GridCrudCtrl {
  constructor($scope, $element, $attrs, $parse, $log, resourceBuilder, $window, restrictResource, $uibModal, pathWithContext, $timeout) {
    let Resource = null
    let beforeSave = null
    let afterSave = null
    $scope.lastSelectedRow = null
    $scope.lastSelectedCell = null

    if ($attrs.beforeSave) { beforeSave = $scope[$attrs.beforeSave] }
    if ($attrs.afterSave) { afterSave = $scope[$attrs.afterSave] }

    const resourceName = $attrs.resource
    Resource = resourceBuilder(`/${resourceName}`, resourceName)
    const actionSuffix = resourceName.charAt(0).toUpperCase() + resourceName.substring(1)

    $scope.template = $attrs.template

    const grid = () => $parse($attrs.gridName)($scope)

    const allowedFields = $parse($attrs.allowedFields)($scope)

    const hideForm = function() {
      if ($scope.isModal) {
        $scope.modal.close()
      } else {
        $scope.showForm = false
      }
      return $scope.highlightCell($scope.lastSelectedRow, $scope.lastSelectedCell)
    }

    const showForm = function() {
      if ($scope.isModal) {
        const defaultModalOptions = {
          templateUrl: pathWithContext($scope.template),
          keyboard: false, // do not close the dialog with ESC key
          backdrop: 'static', // do not close on click outside of the dialog
          scope: $scope,
          windowClass: ''
        }
        let modalOptions = angular.fromJson($attrs.modalOptions)
        modalOptions = angular.extend(defaultModalOptions, modalOptions)
        modalOptions.windowClass = modalOptions.windowClass + ' grid-crud-modal '

        $scope.modal = $uibModal.open(
          modalOptions
        )
        return $scope.modal.rendered.then(() => $timeout(() => $scope.setFocus(angular.element(angular.element('.grid-crud-modal')[0]))
          ,
          500))
      } else {
        return $scope.showForm = true
      }
    }

    const editAction = function(id) {
      $scope.unHighlightCell($scope.lastSelectedRow, $scope.lastSelectedCell)
      $log.info(`[gridCrud] Edit ${resourceName} : ${id}`)
      $scope.lastSelectedRow = id
      return Resource.get({ id }, function(r) {
        $scope[resourceName] = restrictResource(r, allowedFields)
        return showForm()
      })
    }

    const createAction = function() {
      $log.info(`[gridCrud] Create ${resourceName}`)
      const record = new Resource()
      $scope[resourceName] = record
      return showForm()
    }

    $scope.save = record => {
      $log.info('[gridCrud] Saving record')
      if (beforeSave) {
        $log.info(`[gridCrud] Calling beforeSave: ${resourceName}`)
        beforeSave(record)
      }

      const promise = record.save().$promise
      promise.then(function(record) {
        $log.info('[gridCrud] record has been updated/created', record)
        grid().saveRow(record.id, record)
        hideForm()
        if (afterSave) {
          $log.info(`[gridCrud] Calling afterSave: ${resourceName}`)
          afterSave(record)
        }
        return $scope.highlightCell($scope.lastSelectedRow, $scope.lastSelectedCell)
      })

      return [promise, record]
    }

    $scope.highlightCell = function(rowid, colname) {
      const q = grid().getGridEl()
      // console.log(q)
      q.jqGrid('setCell', rowid, colname, '', { 'border-color': 'green', 'border-width': 'thin', 'border-style': 'double' })
      return null
    }

    $scope.unHighlightCell = function(rowid, colname) {
      const q = grid().getGridEl()
      // console.log(q)
      q.jqGrid('setCell', rowid, colname, '', { 'border-width': '0px' })
      return null
    }

    $scope.cancel = () => hideForm()

    $scope.dblClick = function(rowid, iRow, iCol, e) {
      const {
        colModel
      } = $scope[`${e?.currentTarget?.id}`].getGridEl().getGridParam()
      $scope.columnNameForFocus = colModel[iCol]?.['name']
      editAction(rowid)
      return $scope.lastSelectedCell = iCol
    }

    $scope.setFocus = function(element) {
      if ($scope.columnNameForFocus) { // check if variable exists
        const inputs = element.find('input')
        for (const input of Array.from(inputs)) {
          if (input.name.toUpperCase() === $scope.columnNameForFocus.toUpperCase()) {
            input.focus()
            input.select()
          }
        }

        element.find(`[id='s2id_${$scope.columnNameForFocus}']`).select2('open')
        return $scope.columnNameForFocus = null
      }
    }

    $parse(`edit${actionSuffix}`).assign($scope.$parent, editAction)
    $parse(`create${actionSuffix}`).assign($scope.$parent, createAction)
  }
}
GridCrudCtrl.$inject = ['$scope', '$element', '$attrs', '$parse', '$log', 'resourceBuilder', '$window',
  'restrictResource', '$uibModal', 'pathWithContext', '$timeout']

angular.module('angleGrinder.gridz').controller('GridCrudCtrl', GridCrudCtrl)
