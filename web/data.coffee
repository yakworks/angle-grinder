_ = require("underscore")

class Data
  constructor: ->
    @data = @loadData()

  loadData: ->
    data = require("./large_load")
    id = 0
    row.id = ++id for row in data

    data

  length: -> @data.length

  total: (pageSize) -> Math.ceil(@length() / pageSize)

  getPaged: (page, pageSize, sort, order) ->
    sortedData = _(@data).sortBy (row) -> row[sort]
    sortedData = sortedData.reverse() if order is "desc"
    pagedData = sortedData.slice((page - 1) * pageSize, page * pageSize)

    page: page, total: @total(pageSize), records: @length(), rows: pagedData

  findById: (id) ->
    id = parseInt(id)
    _.find @data, (row) ->
      row.id is id

  update: (id, data) ->
    row = @findById(id)
    for key, value of data
      row[key] = value
    row

module.exports = Data
