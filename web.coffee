express = require("express")
path = require("path")

Data = require("./web/data")
data = new Data()

app = express()

app.use express.logger()
app.use express.bodyParser()
app.use express.static(path.join(__dirname, "dist"))

app.get "/api/users.json", (req, res) ->
  page = parseInt(req.query["page"]) || 1
  pageSize = parseInt(req.query["max"]) || 20
  sort = req.query["sort"] || "id"
  order = req.query["order"] || "asc"

  pagedData = data.getPaged(page, pageSize, sort, order)
  res.send pagedData

app.get "/api/users/:id.json", (req, res) ->
  row = data.findById(req.params.id)
  res.send row

app.put "/api/users/:id.json", (req, res) ->
  updatedRow = data.update(req.params.id, req.body)
  res.send updatedRow

port = 8000
app.listen port, ->
  console.log "listening on port " + port
