/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
angular.module("exampleApp.grids").factory("usersDialogGrid", [
  "$log", function($log) {

    const colModel = () => [{
      name: "id",
      width: 50,
      formatter: "editActionLink"
    }
    , {
      name: "login",
      label: "Login",
      formatter: "editActionLink"
    }
    , {
      name: "info.email",
      label: "Email"
    }
    , {
      name: "name",
      label: "Name",
      formatter: "editActionLink"
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
        sortname: "id",

        // handler for jqGrid errors
        loadError() { return $log.error("loadError", arguments); }
      };

      return _.extend(defaults, options);
    };
  }
]);
