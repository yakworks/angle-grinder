import _ from 'lodash'
/* @ngInject */
export default class ListCtrl {
  constructor(Resource, SinglePageCrudCtrlMixin, MassUpdateMixin, pathWithContext, ConfigCache, ApplyFormattersServ) {
    this.timeZones = ['Europe/Moscow', 'Asia/Shanghai', 'America/Sao_Paulo']

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
          _.extend(data, {
            url: pathWithContext('/api/org/list?format=json'),
            multiselect: true,
            shrinkToFit: true, // makes columns fit to width
            sortname: 'num',
            sortorder: 'asc',
            rowNum: 5,
            dropGrouping: true,
            //filterToolbar: true
            grouping:true,
            groupingView : {
              groupText: ['<span style="text-transform: uppercase; font-weight: bold"> {0}</span> <span style="font-weight: 800; color: gray">Count:{1}  Sum of IDs: <span class="trim-currency">{id}</span> '],
              groupColumnShow: [true],
              showSummaryOnHide: false
            },
            rowList: [5, 10, 20, 50, 100]
            }
          )
        ApplyFormattersServ(options.colModel, formatters)
        return  options
      }
      return ConfigCache.get(`/api/org/gridOptions`, func)
    }

    this.gridOptions = gridOptions()

    SinglePageCrudCtrlMixin(this, {
      Resource,
      resourcePath: '/org',
      gridName: 'orgGrid'
    }
    )

    MassUpdateMixin(this, {
      template: require('../massUpdate/massUpdateForm.html'),
      controller: 'org.MassUpdateFormCtrl',
      gridName: 'orgGrid'
    }
    )
  }
}
