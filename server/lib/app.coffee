express = require("express")
upload = require("jquery-file-upload-middleware")
path = require("path")
fs = require("fs")
mime = require("mime")

utils = require("./utils")

Orgs = require("./data_orgs")
orgs = new Orgs()

Data = require("./data")
data = new Data()

app = express()

# configure upload middleware
upload.configure
  uploadDir: path.join(__dirname, "/../../tmp/uploads")
  uploadUrl: "/api/uploads"
  imageVersions:
    thumbnail:
      width: 80
      height: 80

app.configure ->
  app.use express.logger()
  app.use "/api/upload", upload.fileHandler()
  app.use express.bodyParser()
  app.use express.static(path.join(__dirname, "dist"))

upload.on "error", (error) ->
  console.log error

app.use (err, req, res, next) ->
  console.error err.stack
  res.send 500, "Something broke!"

# sleep for 1,2,3 seconds
randomSleep = (values = [1, 2, 3]) ->
  utils.sleep utils.randomItemFrom values

# respond with random error
randomErrorFor = (res) ->
  res.send utils.randomItemFrom [400, 404, 500]

app.get "/api/upload/list", (req, res) ->
  upload.fileManager().getFiles (files) ->
    res.json(files)

app.get "/api/uploads/:name", (req, res) ->
  filePath = path.join(__dirname, "/../../tmp/uploads", req.params.name)
  stat = fs.statSync(filePath)

  res.writeHead 200,
    "Content-Type": mime.lookup(filePath)
    "Content-Length": stat.size

  readStream = fs.createReadStream(filePath)
  readStream.pipe(res)

app.get "/api/users", (req, res) ->
  page = parseInt(req.query["page"]) || 1
  pageSize = parseInt(req.query["max"]) || 20
  sort = req.query["sort"] || "id"
  order = req.query["order"] || "asc"

  rows = data.all()

  if req.query["_search"] and req.query["_search"] isnt "false"
    filters = JSON.parse(req.query["filters"])
    quickSearch = filters?.quickSearch
    if quickSearch? and quickSearch isnt ""
      rows = data.quickSearch(quickSearch)
    else
      rows = data.search(filters)

  # perform search for select2 component
  if req.query["q"] and req.query["q"] isnt ""
    rows = data.quickSearch(req.query["q"])

  res.send rows.getPaged(page, pageSize, sort, order)

app.get "/api/users/:id", (req, res) ->
  row = data.findById(req.params.id)
  if row?
    res.send row
  else
    res.send 404

# CREATE
app.post "/api/users", (req, res) ->
  try
    row = data.create(req.body)
    res.send row
  catch error
    res.send error, 422

# mass UPDATE
app.put "/api/users/massUpdate", (req, res) ->
  result = data.massUpdate(req.body.ids, req.body.data)
  res.send result

# UPDATE
app.put "/api/users/:id", (req, res) ->
  try
    row = data.update(req.params.id, req.body)
    res.send row
  catch error
    res.send error, 422

# DELETE
app.delete "/api/users/:id", (req, res) ->
  row = data.delete(req.params.id)
  res.send row

app.get "/api/orgs.json", (req, res) ->
  res.send orgs.getAll()

app.post "/api/_loadFixtures.json", (req, res) ->
  data.reload()
  res.send 200

module.exports = app
