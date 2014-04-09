app = angular.module "angleGrinder.common"

# Convert line braks to html
app.filter "newLines", ->
  (text) ->
    return text unless angular.isString(text)
    text.replace(/\n/g, "<br />")
