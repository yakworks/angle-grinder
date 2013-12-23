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
    @findElement @By.css("form[name='form.edit']")

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

  submit: ->
    @submitButton.click()

module.exports = ModalFormView
