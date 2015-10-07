app = angular.module "angleGrinder.common"

app.constant "contextPath", $("body").data("contextPath")

# Generate a template url for the given resource and path
app.constant "resourceTemplateServ", (resource, path) ->
  parts = []

  parts.push $("body").data("contextPath")
  parts.push resource.replace(/^\//, "")
  parts.push path

  parts.join "/"
