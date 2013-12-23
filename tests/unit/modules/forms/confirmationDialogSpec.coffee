describe "module: angleGrinder.forms service: confirmationDialog", ->
  beforeEach module("angleGrinder.forms")

  it "displays the confirmation", inject ($modal, confirmationDialog) ->
    # Given
    spy = sinon.spy($modal, "open")

    # When
    confirmationDialog.open()

    # Then
    expect(spy.called).to.be.true
