_ = require("underscore")

class Data
  constructor: (data = null) ->
    if data? then @data = data else @data = @loadData()

  # Loads sample data into memory
  loadData: ->
    data = require("./large_load")

    for row, index in data
      # generate row id and login
      row.id = @nextId()
      row.login = "login-#{index}"

      # parse date
      row.birthday = new Date(row.birthday)

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
    data = _.filter @data, (row) ->
      nameMatch = true
      if filters.name?
        nameMatch = row.name.match ///#{filters.name.trim()}///i

      allowanceMatch = true
      if filters.allowance? and filters.allowance isnt ""
        allowanceMatch = row.allowance == parseInt(filters.allowance)

      birthdayMatch = true
      if filters.birthday?
        fromMatch = true
        if filters.birthday.from?
          fromMatch = row.birthday >= new Date(filters.birthday.from)

        toMatch = true
        if filters.birthday.to?
          toMatch = row.birthday <= new Date(filters.birthday.to)

        birthdayMatch = fromMatch and toMatch

      nameMatch and allowanceMatch and birthdayMatch

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
  create: (row) ->
    if @_validateLoginUniqueness(row)
      row.id = @nextId()

      # parse birthday
      row.birthday = new Date(row.birthday) if row.birthday?

      @data.push(row)

      row
    else
      error =
        code: 422
        status: "error"
        message: "User save failed"
        errors: user: login: "Property [login] of class [User] with value [#{row.login}] must be unique"
      throw error

  # Update a row with the given id
  update: (id, data) ->
    if @_validateLoginUniqueness(data)
      row = @findById(id)

      # assign all fields
      for key, value of data
        row[key] = value

      # parse birthday
      row.birthday = new Date(row.birthday) if row.birthday?

      row
    else
      error =
        code: 422
        status: "error"
        message: "User update failed"
        errors: user: login: "Property [login] of class [User] with value [#{data.login}] must be unique"
      throw error

  _validateLoginUniqueness: (data) ->
    newRecord = data.id?

    not _.find @data, (row) ->
      (not newRecord or row.id isnt data.id) and row.login is data.login

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
