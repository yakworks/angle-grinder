_ = require("underscore")

class Data
  constructor: (data = null) ->
    if data? then @data = data else @data = @loadData()

  # Loads sample data into memory
  loadData: ->
    data = require("./large_load")
    for row, index in data
      row.id = @nextId()
      row.login = "login-#{index}"

    data

  # Returns the total number of loaded rows
  count: -> @data.length

  # Returns number of pages
  total: (pageSize) -> Math.ceil(@count() / pageSize)

  all: -> this

  # Perfoms quick search for the collection
  quickSearch: (filter) ->
    data = _.filter @data, (row) ->
      row.name.match ///#{filter}///i

    # Construct a new data object with filtered rows
    new Data(data)

  search: (filters) ->
    allowance = if filters.allowance isnt "" then parseInt(filters.allowance) else null
    data = _.filter @data, (row) ->
      nameMatch = if filters.name? then row.name.match ///#{filters.name.trim()}///i else true
      allowanceMath = if allowance? then row.allowance == allowance else true

      nameMatch and allowanceMath

    # Construct a new data object with filtered rows
    new Data(data)

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
    # TODO validate login uniqueness
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
