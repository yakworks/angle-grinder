_ = require("underscore")

class Data
  constructor: ->
    @data = @loadData()

  loadData: ->
    data = require("./large_load")
    row.id = @nextId() for row in data

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

  create: (data) ->
    data.id = @nextId()
    @data.push(data)
    data

  update: (id, data) ->
    row = @findById(id)
    for key, value of data
      row[key] = value
    row

  delete: (id) ->
    row = @findById(id)
    if row?
      @data = _.reject @data, (item) -> item.id is row.id
      return row

  nextId: ->
    @currentId or= 0
    ++@currentId

module.exports = Data
