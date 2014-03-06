describe "module: angleGrinder.forms service: confirmationDialog", ->
  beforeEach module "angleGrinder.forms"

  it "displays the confirmation", inject ($dialog, confirmationDialog) ->
    # Given
    sinon.spy($dialog, "dialog")

    # When
    confirmationDialog.open()

    # Then
    expect($dialog.dialog).to.have.been.called
