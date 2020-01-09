/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */

 angular.module("exampleApp.grids").factory("usersGrid", [
  "$filter", function($filter) {

    const showActionLink = (cellVal, options, rowdata) => `\
<a href="#/examples/users/${rowdata.id}">${cellVal}</a>\
`;

    const colModel = () => [{
      name: "id",
      width: 50,
      formatter: showActionLink
    }
    , {
      name: "login",
      label: "Login",
      formatter: showActionLink
    }
    , {
      name: "info.email",
      label: "Email"
    }
    , {
      name: "name",
      label: "Name",
      formatter: showActionLink
    }
    , {
      name: "birthday",
      label: "Birthday",
      formatter: "date"
    }
    , {
      name: "creditInfo.allowance",
      label: "Allowance"
    }
    , {
      name: "creditInfo.paid",
      label: "Paid"
    }
    ];

    return function(options) {
      if (options == null) { options = {}; }
      const defaults = {
        path: "/api/users",
        colModel: colModel(),
        rowNum: 10,
        rowList: [10, 20, 50, 100, 1000],
        sortname: "id",
        multiselect: true
      };

      return _.extend(defaults, options);
    };
  }
]);
