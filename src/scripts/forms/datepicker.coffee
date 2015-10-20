forms = angular.module("angleGrinder.forms")

forms.provider "agDate", ->
  viewFormat = "MM/DD/YYYY"

  date = "YYYY-MM-DDTHH:mmZ"
  localDateTime = "YYYY-MM-DDTHH:mm"
  localDate = "YYYY-MM-DD"

  setViewFormat: (format)->
    viewFormat = format

  setLocalDateFormat: (format)->
    localDate = format

  setLocalDateTimeFormat: (format)->
    localDateTime = format

  setDateFormat: (format)->
    date = format

  $get:[
    ()->
      getViewFormat: ->
        viewFormat

      getIsoFormat: (name)->
        switch name
          when "date" then date
          when "localDateTime" then localDateTime
          else localDate

      isValid: (value, format) ->
        moment(value, format, true).isValid()
  ]

# uses http://eonasdan.github.io/bootstrap-datetimepicker/
forms.directive "agDatepicker", [
  '$timeout', "agDate", ($timeout, agDate)->
    require : 'ngModel'
    restrict: "AE"
    scope:
      datepickerOptions: '@'

    link: ($scope, $element, $attrs, ngModelCtrl) ->
      defaultOptions =
        format: agDate.getViewFormat()
        isoFormat: agDate.getIsoFormat($attrs.dateType)

      options = angular.extend(defaultOptions, $scope.$eval($attrs.datepickerOptions))
      isoFormat = options.isoFormat
      delete options.isoFormat

      # Decorate datepicker with button and some usefull stuff if directive is element, not attribute
      if !$attrs.agDatepicker?
        $element.addClass("input-group").addClass("date").addClass("ag-datepicker")
        input = """<input class='form-control' placeholder='#{$attrs.placeholder || ""}'>
                    <span class="input-group-addon"><i class="fa fa-calendar"></i></span>"""
        $element.append(input)

      $element.on('dp.change',(event) ->
        if ngModelCtrl
          $timeout ->
            ngModelCtrl.$setViewValue(moment(event.date).format(isoFormat))
            ngModelCtrl.$setValidity('dateFormat', agDate.isValid(ngModelCtrl.$modelValue, isoFormat))
      ).datetimepicker(options)

      setPickerValue = ->
        date = null
        if ngModelCtrl and ngModelCtrl.$viewValue
          date = moment(ngModelCtrl.$viewValue, isoFormat)
        datepicker = $element.data('DateTimePicker')
        datepicker.date(date) if datepicker

      if ngModelCtrl
        ngModelCtrl.$render = ->
          setPickerValue()
      setPickerValue()
]

forms.directive "agDate", [
  "agDate", (agDate) ->
    restrict: 'AE'
    require: '?ngModel'

    link: (scope, element, attrs, ngModelCtrl) ->
      modelFormat = agDate.getIsoFormat(attrs.dateType)
      dateFormat = attrs.dateFormat || agDate.getViewFormat()

      ngModelCtrl.$parsers.shift()
      ngModelCtrl.$parsers.push (viewValue) ->
        isValid = agDate.isValid(viewValue, dateFormat)
        ngModelCtrl.$setValidity('dateFormat', isValid)
        if isValid
          moment(viewValue).format(modelFormat)
        else
          ""

      ngModelCtrl.$formatters.push (modelValue) ->
        isValid = agDate.isValid(modelValue, modelFormat)
        ngModelCtrl.$setValidity('dateFormat', isValid)
        moment(modelValue).format(dateFormat)
  ]

