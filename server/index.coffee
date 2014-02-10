#!/usr/bin/env coffee

app = require("./lib/app")

port = 8000
app.listen port, ->
  console.log "listening on port", port
