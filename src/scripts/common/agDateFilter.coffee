app = angular.module "angleGrinder.common"

app.provider "agDateFilter", ->
  # see https://docs.angularjs.org/api/ng/filter/date
  defaultFormat = "MMM DD, YYYY"

  # Set the default date format
  # which will be used across the whole application.
  setDefaultFormat: (format) ->
    defaultFormat = format

  $get: [
    "$filter", "isFalsy",
    ($filter, isFalsy) ->

      (date, useTimeZone = false, format = defaultFormat) ->
        return "" if isFalsy(date)

        parseDate = (d) ->
          [d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds(), d.getMilliseconds()]

        # Property `useTimeZone` can be both boolean and string, so it needs to be checked
        isApplyTimeZone = ->
          useTimeZone || (typeof useTimeZone is 'string' && useTimeZone is not 'false')

        # Regex for detecting if string was created from Date object (`Tue Jun 23 2015 00:00:00 GMT+0300 (EEST)`)
        GMTRegex = /GMT/
        # Regex for detecting if string has format with time zone (`2015-05-22T00:00:00+03:00`)
        TZOffsetRegex = /\d(\+|\-)\d{2}:?\d{2}/
        # Variable uses for passing it to `moment()` function
        formattedDate = date

        if isApplyTimeZone()
          # Detect if date string has the specific format
          if typeof date is "string" and (date.search GMTRegex) isnt -1
            # Moment.js doesn't support date format like `Tue Jun 23 2015 00:00:00 GMT+0300 (EEST)`
            # which generates from Data.toString(). That's why it should be converted to Date object.
            formattedDate = new Date date
          moment(formattedDate).format format
        else
          # Return current value if it has suitable format
          if moment(formattedDate, format, true).isValid() then return formattedDate
          if date instanceof Date
            formattedDate = parseDate date
          else if (date.search GMTRegex) isnt -1
            formattedDate = parseDate new Date date
          else if (date.search TZOffsetRegex) isnt -1
            # Search for the index TZ string begins
            zoneIndex = date.search TZOffsetRegex
            # Replace timezone substring with `Z` char to avoid time shifting while `moment.utc()` execution
            formattedDate = "#{date.slice 0, zoneIndex + 1}Z"
          # Case for unexpected date string format
          else
            # Moment.js creates `_a` property and set data to it omitting time zone value,
            # so it can be used when moment.utc() invokes
            m = moment formattedDate
            formattedDate = m._a
          moment.utc(formattedDate).format format
  ]
