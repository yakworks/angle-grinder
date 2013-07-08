module.exports =
  load: ->
    data = require("./large_load")
    id = 0
    row.id = ++id for row in data

    data
