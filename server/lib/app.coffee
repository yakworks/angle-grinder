express = require("express")
path = require("path")

utils = require("./utils")

Orgs = require("./data_orgs")
orgs = new Orgs()

Data = require("./data")
data = new Data()

app = express()

app.use express.logger()
app.use express.bodyParser()
app.use express.static(path.join(__dirname, "dist"))

# sleep for 1,2,3 seconds
randomSleep = (values = [1, 2, 3]) ->
  utils.sleep utils.randomItemFrom values

# respond with random error
randomErrorFor = (res) ->
  res.send utils.randomItemFrom [400, 404, 500]

app.get "/api/users", (req, res) ->
  page = parseInt(req.query["page"]) || 1
  pageSize = parseInt(req.query["max"]) || 20
  sort = req.query["sort"] || "id"
  order = req.query["order"] || "asc"

  rows = data.all()

  if req.query["_search"] isnt "false"
    filters = JSON.parse(req.query["filters"])
    quickSearch = filters?.quickSearch
    if quickSearch? and quickSearch isnt ""
      rows = data.quickSearch(quickSearch)
    else
      rows = data.search(filters)

  res.send rows.getPaged(page, pageSize, sort, order)

app.get "/api/users/:id", (req, res) ->
  row = data.findById(req.params.id)
  if row?
    res.send row
  else
    res.send 404

# CREATE
app.post "/api/users", (req, res) ->
  randomSleep()

  try
    row = data.create(req.body)
    res.send row
  catch error
    res.send error, 422

# mass UPDATE
app.put "/api/users/massUpdate", (req, res) ->
  try
    for id in req.body.ids
      data.update(id, req.body.data)
  catch error
    console.log error

  res.send 200

# UPDATE
app.put "/api/users/:id", (req, res) ->
  randomSleep()

  try
    row = data.update(req.params.id, req.body)
    res.send row
  catch error
    res.send error, 422

# DELETE
app.delete "/api/users/:id", (req, res) ->
  randomSleep()

  if Math.random() > 0.5
    row = data.delete(req.params.id)
    res.send row
  else
    randomErrorFor(res)

app.get "/api/orgs.json", (req, res) ->
  res.send orgs.getAll()

module.exports = app
