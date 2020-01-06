/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
describe("module: angleGrinder.common", () => describe("service: ConfirmationDialogServClass", function() {
  let $scope = null;

  beforeEach(inject($rootScope => $scope = $rootScope.$new())
  );

  it("displays the confirmation with custom text", inject(function(ConfirmationDialogServ) {
  // When
    ConfirmationDialogServ.open("Test message for notification!");

    // Then
    const text = document.querySelector('.sweet-alert h2');
    expect(text.textContent).to.eq("Test message for notification!");
    const cancel = document.querySelector('.sweet-alert button.cancel');
    expect(cancel.textContent).to.eq("Cancel");
    const okButton = document.querySelector('.sweet-alert button.confirm');
    return expect(okButton.textContent).to.eq("Ok");
  })
  );

  it("displays the confirmation with custom ok button", inject(function(ConfirmationDialogServ) {
  // When
    ConfirmationDialogServ.open({message: "Test message for notification!", okLabel: "testOK"});

    // Then
    const text = document.querySelector('.sweet-alert h2');
    expect(text.textContent).to.eq("Test message for notification!");
    const cancelButton = document.querySelector('.sweet-alert button.cancel');
    expect(cancelButton.textContent).to.eq("Cancel");
    const okButton = document.querySelector('.sweet-alert button.confirm');
    return expect(okButton.textContent).to.eq("testOK");
  })
  );


  return it("returns a promise which is resolved  when user click ok or cancel button", inject(function(ConfirmationDialogServ, $rootScope) {
    const {
      swal
    } = window;

    let callback = null;
    window.swal = (opts, cbl) => callback = cbl; //Override global swal function so we can get handle of callback and simulate ok/cancel button clicks

    //open confirmation dialog
    let handler = sinon.stub();
    let promise = ConfirmationDialogServ.open("Test message for notification!");
    promise.then(handler);

    expect(promise).to.be.an("object");
    expect(promise).to.respondTo("then");

    //when user click ok
    callback(true);
    $rootScope.$digest();

    //then promise is resolved with true
    expect(handler.called).to.be.true;
    expect(handler.calledWith(true)).to.be.true;


    //Test for cancel
    handler = sinon.stub();
    promise = ConfirmationDialogServ.open("Test message for notification!");
    promise.then(handler);

    //when user click ok
    callback(false);
    $rootScope.$digest();

    //then promise is resolved with false
    expect(handler.called).to.be.true;
    expect(handler.calledWith(false)).to.be.true;

    return window.swal = swal;
  })
  );
}));

