gridz = angular.module "angleGrinder.gridz"

# Generic method for generating links inside jqGrid
gridz.service "gridLinkServ", [
  "pathWithContext", "flatten", (pathWithContext, flatten) ->

    (path, name, idField, rowData = {}) ->
      return "" if !name

      href = pathWithContext(path)

      # append id to the path (if given)
      if idField?
        id = flatten(rowData)[idField]
        return "" unless id?

        href += "#/#{id}"

      """
      <a href="#{href}">#{name}</a>
      """
]
