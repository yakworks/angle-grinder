import angular from 'angular'
import _ from 'lodash'

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
