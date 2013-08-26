exports.EditDialog = class
  constructor: (@casper) ->
    @selector = "div.modal"

  # Return true is the dialog is visible.
  isVisible: ->
    @casper.evaluate (selector) ->
      $("#{selector}:visible").length > 0
    , @selector

  # Returns a title of the dialog.
  getTitle: ->
    @casper.fetchText "#{@selector} div.modal-header h3:not([class*='ng-hide'])"

  # Fill the form with given values.
  fillFormWith: (data = {}) ->
    # fill dummy password fields
    data.password = "password"
    data.passwordConfirmation = "password"

    @casper.fill "#{@selector} form[name=editForm]", data

  # Click 'Save' button.
  clickSave: ->
    @casper.click "#{@selector} form[name=editForm] button[type=submit]"
