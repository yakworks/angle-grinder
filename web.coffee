express = require("express")
path = require("path")
data = require("./web/data").load()

app = express()

app.use express.logger()
app.use express.static(path.join(__dirname, "dist"))

app.get "/api/users.json", (req, res) ->
  page = parseInt(req.query["page"]) || 1
  pageSize = parseInt(req.query["max"]) || 20

  pagedData = data.slice((page - 1) * pageSize, page * pageSize)
  records = data.length
  res.send page: page, total: Math.ceil(records / pageSize), records: records, rows: pagedData

port = 8000
app.listen port, ->
  console.log "listening on port " + port
