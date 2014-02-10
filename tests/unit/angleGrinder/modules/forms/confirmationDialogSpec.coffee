describe "module: angleGrinder.forms service: confirmationDialog", ->
  beforeEach module "angleGrinder.forms"

  it "displays the confirmation", inject ($dialog, confirmationDialog) ->
    # Given
    spy = sinon.spy($dialog, "dialog")

    # When
    confirmationDialog.open()

    # Then
    expect(spy.called).to.be.true
