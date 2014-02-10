PageObject = require("./../../page_object")

class FormFieldView extends PageObject

  clear: -> @element.clear()
  sendKeys: (keys) -> @element.sendKeys(keys)

  hasError: -> @hasClass "ng-invalid"

  setValue: (value) ->
    @clear()
    @sendKeys(value)

  getValue: ->
    @getAttribute("value")

  @has "error", ->
    @findElement @By.xpath(".//..//span[contains(@class, 'help-inline')]")

class ModalFormView extends PageObject

  # dialog elements

  @has "header", ->
    @findElement @By.css(".modal-header h3")

  @has "form", ->
    @findElement @By.css("form[name='editForm']")

  # form elements

  @has "submitButton", ->
    @form.findElement @By.css("button[type=submit]")

  @has "deleteButton", ->
    @form.findElement @By.css("button.ag-delete-button")

  # custom methods

  # Find field by model name
  findField: (model) ->
    field = @form.findElement @By.model(model)
    new FormFieldView(field)

  setFieldValue: (model, value) ->
    field = @findField(model)
    field.setValue(value)

  getFieldValue: (model) ->
    field = @findField(model)
    field.getValue()

  # Submit the form
  submit: ->
    @submitButton.click()

  # Fill in the form with given values and submit the form
  fillInAndSubmit: (fields = {}) ->
    @setFieldValue(name, value) for name, value of fields
    @submit()

module.exports = ModalFormView
