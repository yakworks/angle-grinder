import angular from 'angular'
import formsModule from '../formsModule'
import _ from 'lodash'

var forms = angular.module(formsModule)

forms.value('getRealPanelHeight', function(el) {
  const bodyEl = el.find('.panel-body:visible')
  const oldHeight = $(bodyEl).height()

  bodyEl.css('min-height', 'auto')
  const height = $(el).height()
  // Do not equalize if element collapsed
  if (angular.element(bodyEl).attr('collapsed')) {
    bodyEl.css('min-height', 0)
  } else {
    if (!bodyEl?.[0]?.attributes?.['min-height']) { bodyEl.css('min-height', oldHeight) }
  }

  // Remove padding between grid header and body
  if (el.find('[ag-grid]').length > 0) {
    el.find('.panel-heading').css('padding-bottom', '0px')
    bodyEl.css('padding-top', '0px')
  }

  return height
})

forms.directive('agPanelsRow', [
  'getRealPanelHeight', function(getHeight) {
    return {
      restrict: 'C',
      controller() {
        this.panels = []

        this.registerPanel = function(el) {
          return this.panels.push($(el))
        }

        this.maxHeight = function() {
          const highest = _.max(this.panels, el => getHeight(el))
          return getHeight(highest)
        }

        // returns true when all panels are equalized
        this.allEqual = function() {
          const heights = _.map(this.panels, el => getHeight(el))
          // _.chain(this.panels).map(el => getHeight(el)).value()
          return _.every(heights, height => height === heights[0])
        }

        this.equalize = function() {
          if (this.allEqual()) { return }

          const maxHeight = this.maxHeight()

          return angular.forEach(this.panels, function(el) {
            const bodyEl = el.find('.panel-body')

            // default padding
            let paddings = parseInt(bodyEl.css('padding-top')) + parseInt(bodyEl.css('padding-bottom'))

            // add heading and footer
            paddings += el.find('.panel-heading').outerHeight()
            paddings += el.find('.panel-footer').outerHeight()

            return bodyEl.css('min-height', maxHeight - paddings)
          })
        }

        return this
      }
    }
  }
])

forms.directive('agPanel', [
  'getRealPanelHeight', getHeight => ({
    restrict: 'C',
    require: '^agPanelsRow',

    link(scope, element, attrs, ctrl) {
    // add the current panel to the stack
      ctrl.registerPanel(element)

      const elementHeight = () => getHeight(element)
      return scope.$watch(elementHeight, () => ctrl.equalize())
    }
  })
])

//
// To mark element(s) in panel that needs to be displayed when panel collapsing
// just add 'stay-on-collapse' attribute. Example:
//
// <form>
//   <div stay-on-collapse>...</div> <!-- this 'div' will be displayed when panel collapsed top -->
//   <div>...</div>
// </form>
//
forms.directive('agPanelStates', [
  '$compile', $compile => ({
    restrict: 'E',
    transclude: true,

    controller: [
      '$scope', function($scope) {
        let removeElements
        $scope.changeState = function(event) {
          const stateButton = getAgPanel(event).find('[name="agPanelStates"]').find('[name="stateButton"]')
          if ($scope.state === 'collapsed') {
            $scope.state = 'normal'
            stateButton.find('i').prop('class', 'fa fa-minus')
          } else {
            $scope.state = 'collapsed'
            stateButton.find('i').prop('class', 'fa fa-plus')
          }
          const element = getAgPanel(event)
          if (isGrid(element)) { collapseGrid(element) } else { collapseForm(element) }
          return true
        }

        $scope.fullscreenState = function(event) {
          const panelModal = '<panel-modal></panel-modal>'
          angular.element(getAgPanel(event)).wrap(panelModal)
          $compile(panelModal)($scope)
          return true
        }

        // Gets the closest ag-panel
        var getAgPanel = event => angular.element(event.target).closest('.ag-panel')

        // Finds out if element is a grid
        var isGrid = element => angular.element(element).find('table.gridz').length > 0

        // Method for collapsing a grid
        var collapseGrid = function(element) {
          let row
          const gridEl = angular.element(element).find('table.gridz')

          if ($scope.state === 'collapsed') {
            const tBody = angular.element(gridEl).find('tbody')
            if (angular.element(tBody).find('.ui-state-highlight').length > 0) {
              for (row of Array.from(angular.element(gridEl).find('tbody').children())) {
                if (!angular.element(row).hasClass('ui-state-highlight') && !angular.element(row).hasClass('jqgfirstrow')) {
                  angular.element(row).addClass('ng-hide')
                }
              }
            } else {
              $scope.gridRowNum = gridEl.jqGrid('getGridParam', 'rowNum')
              gridEl.jqGrid('setGridParam', { rowNum: 1 }).trigger('reloadGrid', [{ page: 1 }])
            }
            angular.element(element).find('.gridz-pager').addClass('ng-hide')
          }

          if ($scope.state === 'normal') {
            if ($scope.gridRowNum) {
              gridEl.jqGrid('setGridParam', { rowNum: $scope.gridRowNum }).trigger('reloadGrid', [{ page: 1 }])
            } else {
              for (row of Array.from(angular.element(gridEl).find('tbody').children())) {
                if (angular.element(row).hasClass('ng-hide')) {
                  angular.element(row).removeClass('ng-hide')
                }
                if (angular.element(row).hasClass('ui-state-highlight')) {
                  angular.element(row).addClass('ui-state-highlight')
                }
              }
            }
            angular.element(element).find('.gridz-pager').removeClass('ng-hide')
          }
        }

        // Method for collapsing form
        var collapseForm = function(element) {
          const panelBody = angular.element(element).find('.panel-body')
          if ($scope.state === 'collapsed') {
            const clone = angular.element(panelBody).clone()
            angular.element(panelBody).addClass('ng-hide')
            angular.element(panelBody).after(clone)
            removeElements(clone)
            if (angular.element(clone).children().length === 0) { angular.element(clone).remove() }
            angular.element(clone).attr('collapsed', 'true')
          }
          if ($scope.state === 'normal') {
            for (const el of Array.from(panelBody)) {
              if (angular.element(el).hasClass('ng-hide')) {
                angular.element(el).removeClass('ng-hide')
              } else { angular.element(el).remove() }
            }
          }
        }

        // Goes through the DOM element and hides all nodes without 'stay-on-collapse' attribute
        // Saves origin element structure
        return removeElements = function(panelBody) {
          const children = angular.element(panelBody).children()
          let hasElementToStay = false
          for (const child of Array.from(children)) {
            if (angular.element(child).is('[stay-on-collapse]')) {
              hasElementToStay = true
            } else if (angular.element(child).children().length > 0) {
              if (!removeElements(child)) { angular.element(child).remove() } else { hasElementToStay = true }
            } else {
              angular.element(child).remove()
            }
          }
          return hasElementToStay
        }
      }

    ],

    link(scope, element, attrs, ctrl, transcludeFn) {
      const buttonList = angular.element($compile('\
<ul name="agPanelStates" class="nav navbar-nav panel-states pull-right"></ul>\
')(scope))

      // add user buttons
      transcludeFn(scope, cloneContent => angular.forEach(cloneContent, function(element) {
        const li = angular.element('<li></li>')
        if (element instanceof HTMLElement) {
          return buttonList.append(li.append(angular.element($compile(element)(scope))))
        }
      }))

      const defaultButtons = angular.element($compile(`\
<li>
<a name="stateButton" class="list" ng-click="changeState($event)" uib-tooltip="Hide/Show">
   <i class="fa fa-minus"></i>
</a>
</li>
<li>
<a name="expandButton" class="list" ng-click="fullscreenState($event)" uib-tooltip="Expand">
  <i class="fa fa-expand"></i>
</a>
</li>
<li>
<a name="compressButton" class="list ng-hide" ng-click="close()" uib-tooltip="Compress">
  <i class="fa fa-compress"></i>
</a>
</li>\
`)(scope))
      return element.prepend(buttonList.append(defaultButtons))
    }
  })

])

// Directive for opening modal window
forms.directive('panelModal', [
  '$compile', '$uibModal', '$document', ($compile, $modal, $document) => ({
    restrict: 'E',

    template: `\
<div class="modal modal-fullscreen">
  <div class="modal-body"></div>
</div>\
`,

    controller: [
      '$scope', function($scope) {
        $scope.open = () => $scope.showModal = true

        $scope.close = () => $scope.showModal = false

        // Close modal window (if it is open) when back button clicked
        $scope.$on('$locationChangeStart', function(event) {
          if ($scope.showModal) {
            event.preventDefault()
            return $scope.close()
          }
        })

        // Trigger for grid resizing
        $scope.shrinkGridIfExists = function(element) {
          const gridWidth = element.width()
          const gridEl = angular.element(element).find('table.gridz')
          if (angular.element(gridEl).length > 0) { return gridEl.jqGrid('setGridWidth', gridWidth, true) }
        }

        return $scope.setGridMaxHeight = function(element) {
          const uiJqgridBdiv = angular.element(element).find('.ui-jqgrid-bdiv')
          if (!$scope.maxHeight) {
            $scope.maxHeight = angular.element(uiJqgridBdiv).css('max-height')
            return angular.element(uiJqgridBdiv).css('max-height', '80vh')
          } else {
            angular.element(uiJqgridBdiv).css('max-height', $scope.maxHeight)
            return $scope.maxHeight = undefined
          }
        }
      }

    ],

    link(scope, element) {
      scope.open()

      return scope.$watch(
        () => scope.showModal,
        function(newVal) {
          const modalEl = angular.element($document).find('panel-modal')
          const agPanelStates = angular.element(modalEl).find('[name="agPanelStates"]')
          const elementScope = element.scope()
          const state = agPanelStates.find('[name="stateButton"]')
          const expand = agPanelStates.find('[name="expandButton"]')
          const compress = agPanelStates.find('[name="compressButton"]')

          if (elementScope) {
            let modalBody
            if (newVal) {
              state.addClass('ng-hide')
              expand.addClass('ng-hide')
              compress.removeClass('ng-hide')
              element.insertBefore(modalEl)
              element.find('.modal-body').append(angular.element(modalEl).children())
              modalBody = element.find('.modal-body').children()
              angular.element(modalEl).remove()
              scope.shrinkGridIfExists(modalBody)
              return scope.setGridMaxHeight(modalBody)
            } else {
              state.removeClass('ng-hide')
              expand.removeClass('ng-hide')
              compress.addClass('ng-hide')
              modalBody = angular.element(modalEl).find('.modal-body').children()
              angular.element(modalBody).insertBefore(modalEl)
              angular.element(modalEl).remove()
              scope.shrinkGridIfExists(modalBody)
              return scope.setGridMaxHeight(modalBody)
            }
          }
        })
    }
  })

])
