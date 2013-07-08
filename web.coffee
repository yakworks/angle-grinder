express = require("express")
path = require("path")

Data = require("./web/data")
data = new Data()

app = express()

app.use express.logger()
app.use express.static(path.join(__dirname, "dist"))

app.get "/api/users.json", (req, res) ->
  page = parseInt(req.query["page"]) || 1
  pageSize = parseInt(req.query["max"]) || 20
  sort = req.query["sort"] || "id"
  order = req.query["order"] || "asc"

  pagedData = data.getPaged(page, pageSize, sort, order)
  res.send pagedData

port = 8000
app.listen port, ->
  console.log "listening on port " + port
