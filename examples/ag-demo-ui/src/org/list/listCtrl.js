/* @ngInject */
export default class ListCtrl {
  constructor($scope, Resource, SinglePageCrudCtrlMixin, MassUpdateMixin, pathWithContext, ConfigCache, ApplyFormattersServ) {
    $scope.timeZones = ['Europe/Moscow', 'Asia/Shanghai', 'America/Sao_Paulo']

    const formatters = {
      showActionLink: (cellVal, options, rowdata) => `\
<a href="#/${rowdata.id}">${cellVal}</a>\
`,

      showLink: function (cellVal, options, rowdata) {
        const content = `\
<a href="#/${rowdata.id}">${cellVal}</a>\
`
        return window.columnAligner('link', content)
      }

    }

   const gridOptions  =function () {
      const func = (data) => {
        const options =
          angular.extend(data, {
            url: pathWithContext('/api/org/list?format=json'),
            multiselect: true,
            shrinkToFit: true, // makes columns fit to width
            sortname: 'num',
            sortorder: 'asc',
            rowNum: 5,
            rowList: [5, 10, 20]
            }
          )
        ApplyFormattersServ(options.colModel, formatters)
        return  options
      }
      return ConfigCache.get(`/api/org/gridOptions`, func)
    }

    $scope.gridOptions = gridOptions()

    SinglePageCrudCtrlMixin($scope, {
      Resource,
      resourcePath: '/org',
      gridName: 'orgGrid'
    }
    )

    MassUpdateMixin($scope, {
      template: require('../../../public/templates/org/massUpdateForm.html'),
      controller: 'org.MassUpdateFormCtrl',
      gridName: 'orgGrid'
    }
    )
  }
}
