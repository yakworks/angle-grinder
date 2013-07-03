exports.EditDialog = class
  constructor: (@casper) ->
    @selector = "div.modal"

  getTitle: ->
    @casper.fetchText "#{@selector} div.modal-header h3:not([style*='display: none'])"

  fillFormWith: (data) ->
    @casper.fill "#{@selector} form[name=editForm]", data

  clickSave: ->
    @casper.click "#{@selector} form[name=editForm] button[type=submit]"
