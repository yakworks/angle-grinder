express = require("express")
path = require("path")
data = require("./web/data").load()

app = express()

app.use express.logger()
app.use express.static(path.join(__dirname, "dist"))

app.get "/users.json", (req, res) ->
  page = parseInt(req.query["page"]) || 1
  pageSize = parseInt(req.query["pageSize"]) || 20

  pagedData = data.slice((page - 1) * pageSize, page * pageSize)
  res.send pagedData

port = process.env.PORT or 5000
app.listen port, ->
  console.log "listening on port " + port
