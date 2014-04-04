_ = require("underscore")

path = require("path")
casual = require("casual")

class Data
  constructor: (data = null) ->
    @data = if data? then data else @load()

  # Loads sample data into memory
  load: ->
    data = []

    randomUser = (overrides = {}) =>
      id = @nextId()
      login = "login-#{id}"

      user =
        id: id, login: login
        name: casual.username
        info: email: "#{login}@#{casual.domain}"
        birthday: casual.date("YYYY-MM-DD")
        creditInfo:
          allowance: casual.integer(0, 10000)
          paid: casual.random >= 0.5

      _.extend(user, overrides)

    data.push randomUser(login: "login-1", name: "Moroni")
    data.push randomUser(login: "login-2", name: "Teancum", creditInfo: { allowance: 50, paid: true })
    data.push randomUser(login: "login-3", name: "Nephi", creditInfo: { allowance: 100, paid: false })
    data.push randomUser(login: "login-4", name: "Ether", creditInfo: { allowance: 42, paid: true }, birthday: new Date("10/30/2010"))

    _(2000).times -> data.push randomUser()

    data

  # Reload the test data
  reload: ->
    @data = @load()

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
        allowanceMatch = row.creditInfo.allowance == parseInt(filters.allowance)

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
    sortedData = _(@data).sortBy (row) ->
      callback = (obj, key) -> obj[key]
      sort.split(".").reduce(callback, row)

    # ..reverting if sort order is descending
    sortedData = sortedData.reverse() if order is "desc"

    # paginate the data
    pagedData = sortedData.slice((page - 1) * pageSize, page * pageSize)

    # build the response
    page: page, total: @total(pageSize), records: @count(),
    rows: pagedData

  # Finds a row by id
  findById: (id) ->
    id = parseInt(id)
    _.find @data, (row) ->
      row.id is id

  # Create a new row
  create: (row) ->
    @_validate(row)

    row.id = @nextId()

    # parse birthday
    row.birthday = new Date(row.birthday) if row.birthday?

    @data.push(row)

    row

  # Update a row with the given id
  update: (id, data) ->
    @_validate(data)

    row = @findById(id)

    # assign all fields
    for key, value of data
      row[key] = value

    # clear the credit info
    row.creditInfo = {} if row.creditInfo.allowance is ""

    # parse birthday
    row.birthday = new Date(row.birthday) if row.birthday?

    row

  massUpdate: (ids, params) ->
    data = []

    # generate dummy errors
    errors = 5: "foo", 6: "bar", 7: "baz"

    for id in ids
      try
        data.push @update(id, params)

      catch error
        errors[id] = "Something bad happened"

    data: data, errors: errors

  _validate: (data) ->
    invalidName = @_invalidName(data)
    invalidLogin = @_invalidLogin(data)
    invalidEmail = @_invalidEmail(data)

    if invalidName or invalidLogin or invalidEmail
      userErrors = {}
      userErrors.name = "Name should have at least 6 characters" if invalidName
      userErrors.login = "Property [login] of class [User] with value [#{data.login}] must be unique" if invalidLogin
      userErrors.info = email: "Property [email] of class [User] with value [#{data.info.email}] must be unique" if invalidEmail

      error =
        code: 422
        status: "error"
        message: "User update failed"
        errors: user: userErrors

      throw error

    return true

  _invalidName: (data) ->
    return false unless data.name?
    data.name.length < 6

  _invalidLogin: (data) ->
    newRecord = data.id?

    _.find @data, (row) ->
      (not newRecord or row.id isnt data.id) and row.login is data.login

  _invalidEmail: (data) ->
    newRecord = data.id?

    _.find @data, (row) ->
      (not newRecord or row.id isnt data.id) and row.info?.email is data.info?.email

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
