app = angular.module("angleGrinder.examples", [
  "angleGrinder",
  "blueimp.fileupload"
])

app.config [
  "fileUploadProvider", (fileUploadProvider) ->
    console.log "fileUploadProvider defaults:", fileUploadProvider.defaults
]
