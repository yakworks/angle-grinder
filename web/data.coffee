_ = require("underscore")

class Data
  constructor: ->
    @data = @loadData()

  loadData: ->
    data = require("./large_load")
    id = 0
    row.id = ++id for row in data

    data

  length: ->
    @data.length

  getPaged: (page, pageSize, sort, order) ->
    sortedData = _(@data).sortBy (row) ->
      row[sort]
    sortedData = sortedData.reverse() if order is "desc"
    pagedData = sortedData.slice((page - 1) * pageSize, page * pageSize)

    records = @data.length
    total = Math.ceil(records / pageSize)
    page: page, total: total, records: records, rows: pagedData

module.exports = Data
