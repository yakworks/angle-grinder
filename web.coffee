express = require("express")
path = require("path")

Data = require("./web/data")
data = new Data()

app = express()

app.use express.logger()
app.use express.bodyParser()
app.use express.static(path.join(__dirname, "dist"))

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

app.post "/api/users", (req, res) ->
  row = data.create(req.body)
  res.send row

app.get "/api/users/:id", (req, res) ->
  row = data.findById(req.params.id)
  res.send row

app.put "/api/users/:id", (req, res) ->
  row = data.update(req.params.id, req.body)
  res.send row

app.delete "/api/users/:id", (req, res) ->
  row = data.delete(req.params.id)
  res.send row

port = 8000
app.listen port, ->
  console.log "listening on port", port
