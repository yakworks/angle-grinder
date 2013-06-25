GridFormEdit = (opts) ->
  self = this
  o = opts
  $grid = $(o.grid)
  $formDiv = $(o.formDiv)
  editFormUrl = o.editFormUrl
  $spinDiv = (if o.spinnerDiv then o.spinnerDiv else $("#spinner"))
  Spinner = window.Spinner or ->

  spin =
    spinner: new Spinner()
    show: ->
      $spinDiv.show()
      spin.spinner.spin $spinDiv[0]

    hide: ->
      spin.spinner.stop()
      $spinDiv.slideUp "fast"


  # loads the formDiv with results of calling url
  @showForm = (url) ->

    #some hackiness so that the fixed nav bar on top does not obscure the an in-page anchor or jump
    #found here https://github.com/twitter/bootstrap/issues/1768
    #show spinner
    spin.show()

    #$formDiv.hide()
    $formDiv.load url, ->
      spin.hide()
      $formDiv.slideDown "fast"
      scrollBy 0, -50

      #set the focus for IE
      $("[autofocus]:not(:focus)").eq(0).focus()



  #calls showForm with the url of the edit screen
  @showEditForm = (rowId) ->
    urlLink = o.editFormUrl + "?id=" + rowId
    self.showForm urlLink

  @attachEditActionEvents = ->
    $grid.on "editAction", (e, rowId, gridObject) ->
      self.showEditForm rowId

    $grid.on "click", "a.editActionLink", (evt) ->
      id = $(this).parents("tr:first").attr("id")
      self.showEditForm id


  @attachSubmitEvent = ->
    $formDiv.on "submit", "form[data-async]", (evt) ->
      evt.preventDefault()
      $form = $(this)
      $target = $($form.attr("data-target"))
      $("button[type='submit']", $form).button "loading"
      $.ajax
        type: $form.attr("method")
        url: $form.attr("action")
        data: $form.serialize()
        success: (data, status) ->
          console.log data

          #$grid.jqGrid("setGridParam",{datatype:'local'})
          if $grid.jqGrid("getInd", data.id) is false
            $grid.jqGrid "addRowData", data.id, data, "first"
          else
            $grid.jqGrid "setRowData", data.id, data
          $target.html("").hide()
          ind = $grid[0].rows.namedItem(data.id)

          #$grid.jqGrid('setSelection', data.id, false)
          #flash the row so use knows its updated
          $(ind).css "background-color", "#DFF0D8"
          $(ind).delay(100).fadeOut("medium", ->
            $(ind).css "background-color", ""
          ).fadeIn "fast"

        error: (request, error) ->
          $target.html request.responseText



  @attachResetEvent = ->

    #reset button
    $formDiv.on "click", "form button[type='reset']", (evt) ->
      evt.preventDefault()
      form = $(this).closest("form")[0]
      $target = $($(form).attr("data-target"))
      form.reset()
      $target.slideUp "fast"


  @init = ->
    self.attachEditActionEvents()
    self.attachSubmitEvent()
    self.attachResetEvent()
    self

#****INITIALIZE******/
GridFormEdit.newInstance = (o) ->
  new GridFormEdit(o).init()

$.extend true, window,
  grinder:
    GridFormEdit: GridFormEdit
