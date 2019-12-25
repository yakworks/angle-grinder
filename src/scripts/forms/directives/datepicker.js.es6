/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const forms = angular.module("angleGrinder.forms");

forms.provider("agDate", function() {
  let viewFormat = "MM/DD/YYYY";

  let date = "YYYY-MM-DDTHH:mmZ";
  let localDateTime = "YYYY-MM-DDTHH:mm";
  let localDate = "YYYY-MM-DD";

  return {
    setViewFormat(format){
      return viewFormat = format;
    },

    setLocalDateFormat(format){
      return localDate = format;
    },

    setLocalDateTimeFormat(format){
      return localDateTime = format;
    },

    setDateFormat(format){
      return date = format;
    },

    $get:[
      () => ({
        getViewFormat() {
          return viewFormat;
        },

        getIsoFormat(name){
          switch (name) {
            case "date": return date;
            case "localDateTime": return localDateTime;
            default: return localDate;
          }
        },

        isValid(value, format) {
          return moment(value, format, true).isValid();
        }
      })
    ]
  };
});

// uses http://eonasdan.github.io/bootstrap-datetimepicker/
forms.directive("agDatepicker", [
  '$timeout', "agDate", ($timeout, agDate) => ({
  require : 'ngModel',
  restrict: "AE",

  scope: {
    datepickerOptions: '@'
  },

  link($scope, $element, $attrs, ngModelCtrl) {
    const defaultOptions = {
      format: agDate.getViewFormat(),
      isoFormat: agDate.getIsoFormat($attrs.dateType)
    };

    const options = angular.extend(defaultOptions, $scope.$eval($attrs.datepickerOptions));
    const {
      isoFormat
    } = options;
    delete options.isoFormat;

    // Decorate datepicker with button and some usefull stuff if directive is element, not attribute
    if (!$attrs.agDatepicker?) {
      $element.addClass("input-group").addClass("date").addClass("ag-datepicker");
      const input = `<input name='${$attrs.id || ""}' class='form-control' placeholder='${$attrs.placeholder || ""}' ${_.isNil($attrs.disabled) ? "disabled" : undefined}>
<span class="input-group-addon"><i class="fa fa-calendar"></i></span>`;
      $element.append(input);
    }

    $element.on('dp.change',function(event) {
      if (ngModelCtrl) {
        return $timeout(function() {
          if (_.isNil(event.date) && (event.date._d !== undefined)) {
            ngModelCtrl.$setViewValue(moment(event.date._d).format(isoFormat));
            return ngModelCtrl.$setValidity('dateFormat', agDate.isValid(ngModelCtrl.$modelValue, isoFormat));
          } else {
            return ngModelCtrl.$setViewValue("");
          }});
      }
    }).datetimepicker(options);

    const setPickerValue = function() {
      let date = null;
      if (ngModelCtrl && ngModelCtrl.$viewValue) {
        date = moment(ngModelCtrl.$viewValue, isoFormat);
      }
      const datepicker = $element.data('DateTimePicker');
      if (datepicker) { return datepicker.date(date); }
    };

    if (ngModelCtrl) {
      ngModelCtrl.$render = () => setPickerValue();
    }
    return setPickerValue();
  }
})
]);

forms.directive("agDate", [
  "agDate", agDate => ({
  restrict: 'AE',
  require: '?ngModel',

  link(scope, element, attrs, ngModelCtrl) {
    const modelFormat = agDate.getIsoFormat(attrs.dateType);
    const dateFormat = attrs.dateFormat || agDate.getViewFormat();

    ngModelCtrl.$parsers.shift();
    ngModelCtrl.$parsers.push(function(viewValue) {
      const isValid = agDate.isValid(viewValue, dateFormat);
      ngModelCtrl.$setValidity('dateFormat', isValid);
      if (isValid) {
        return moment(viewValue, dateFormat).format(modelFormat);
      } else {
        return "";
      }
    });

    return ngModelCtrl.$formatters.push(function(modelValue) {
      const isValid = agDate.isValid(modelValue, modelFormat);
      ngModelCtrl.$setValidity('dateFormat', isValid);
      return moment(modelValue, modelFormat).format(dateFormat);
    });
  }
})
  ]);

