/* @ngInject */
export default class ListCtrl {
  constructor($scope, Resource, SinglePageCrudCtrlMixin, MassUpdateMixin, pathWithContext) {
    $scope.timeZones = ['Europe/Moscow', 'Asia/Shanghai', 'America/Sao_Paulo']
    $scope.gridOptions = {
      url: pathWithContext("/api/org/list?format=json"),
      colModel: this.colModel(),
      multiselect: true,
      shrinkToFit: true, // makes columns fit to width
      sortname: "num",
      sortorder: "asc",

      rowNum: 5,
      rowList: [5, 10, 20]
    };

    SinglePageCrudCtrlMixin($scope, {
      Resource,
      resourcePath: "/org",
      gridName: "orgGrid"
    }
    );

    MassUpdateMixin($scope, {
      template: require("../../public/templates/org/massUpdateForm.html"),
      controller: "org.MassUpdateFormCtrl",
      gridName: "orgGrid"
    }
    );
  }

  colModel() {
    const showActionLink = (cellVal, options, rowdata) => `\
<a href="#/${rowdata.id}">${cellVal}</a>\
`;

    const showLink = function(cellVal, options, rowdata) {
      const content = `\
<a href="#/${rowdata.id}">${cellVal}</a>\
`;
      return window.columnAligner("link", content);
    };

    return [
      { name: "id", label: "ID", width: 30, fixed: true, formatter: showActionLink },
      { name: "name", label: "Name (right aligned)", width: 150, fixed: true, formatter: showLink },
      { name: "name", label: "Name", width: 100, fixed: true, formatter: showActionLink },
      { name: "num", label: "Num", width: 70 },
      { name: "addressDate", label: "Address date", width: 100 },
      { name: "timeZone", label: "Time Zone", width: 100 }
    ];
  }
}
