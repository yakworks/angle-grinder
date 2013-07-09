_ = require("underscore")

class Data
  constructor: ->
    @data = @loadData()

  # Loads sample data into memory
  loadData: ->
    data = require("./large_load")
    row.id = @nextId() for row in data

    data

  # Returns the total number of loaded rows
  count: -> @data.length

  # Returns number of pages
  total: (pageSize) -> Math.ceil(@count() / pageSize)

  getPaged: (page, pageSize, sort, order) ->
    # sorting all rows by `sort` file
    sortedData = _(@data).sortBy (row) -> row[sort]
    # ..reverting if sort order is descending
    sortedData = sortedData.reverse() if order is "desc"
    # paginate the data
    pagedData = sortedData.slice((page - 1) * pageSize, page * pageSize)

    page: page, total: @total(pageSize), records: @count(),
    rows: pagedData

  # Finds a row by id
  findById: (id) ->
    id = parseInt(id)
    _.find @data, (row) ->
      row.id is id

  # Create a new row
  create: (data) ->
    data.id = @nextId()
    @data.push(data)
    data

  # Update a row with the given id
  update: (id, data) ->
    row = @findById(id)
    for key, value of data
      row[key] = value
    row

  # Delete a row with the given id
  delete: (id) ->
    row = @findById(id)
    if row?
      @data = _.reject @data, (item) -> item.id is row.id
      return row

  # Generates an id for the next row
  nextId: ->
    @currentId or= 0
    ++@currentId

module.exports = Data
