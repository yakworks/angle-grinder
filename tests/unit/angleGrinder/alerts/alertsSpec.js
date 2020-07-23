import alertsMod from 'angle-grinder/src/ng/legacy/alerts'

describe("Alerts", function() {
  let alerts = null;

  beforeEach(angular.mock.module(alertsMod))

  beforeEach(inject(function (_alerts_) {
    alerts = _alerts_
  }))

  var sandbox = sinon.createSandbox()
  // beforeEach(function () {
  //   sandbox.spy($.fn, 'select2')
  //   sandbox.spy($.fn, 'val');
  // })
  // afterEach(function() {
  //   sandbox.restore()
  // })
  describe("info", () =>
    it("pushesh the given messages", () =>  {
      sandbox.spy(alerts, "wrapMessage");
      sandbox.spy(toastr, "info");
      // Given
      let testMessage = "This is a test message!";
      let otherTestMessage = "This is a second test message!";

      // When
      alerts.info(testMessage);
      expect(alerts.wrapMessage).to.have.been.called;
      expect(alerts.wrapMessage).to.have.been.calledWith("This is a test message!", "info");
      expect(toastr.info).to.have.been.called;
      expect(toastr.info).to.have.been.calledWith("This is a test message!", "Info");

      alerts.info(otherTestMessage);
      expect(alerts.wrapMessage).to.have.been.called;
      expect(alerts.wrapMessage).to.have.been.calledWith("This is a second test message!", "info");
      expect(toastr.info).to.have.been.calledWith("This is a second test message!", "Info");
      sandbox.restore()
    })
  )


  describe("Error", () =>
    it("pushesh the given messages", () =>   {
      sandbox.spy(alerts, "wrapMessage");
      sandbox.spy(toastr, "error");
      // Given
      let testMessage = "This is a test message!";
      let otherTestMessage = "This is a second test message!";

      // When
      alerts.error(testMessage);
      expect(alerts.wrapMessage).to.have.been.called;
      expect(alerts.wrapMessage).to.have.been.calledWith("This is a test message!", "error");
      expect(toastr.error).to.have.been.called;
      expect(toastr.error).to.have.been.calledWith("This is a test message!", "Error");

      alerts.error(otherTestMessage);
      expect(alerts.wrapMessage).to.have.been.called;
      expect(alerts.wrapMessage).to.have.been.calledWith("This is a second test message!", "error");
      expect(toastr.error).to.have.been.calledWith("This is a second test message!", "Error");
      sandbox.restore()
    })
  )


  describe("#Success", () =>
    it("pushesh the given message", () => {
      sandbox.spy(toastr, "success");
      sandbox.spy(alerts, "wrapMessage");
      // Given
      let testMessage = "This is a test message!";
      let otherTestMessage = "This is a second test message!";

      // When
      alerts.success(testMessage);
      expect(alerts.wrapMessage).to.have.been.called;
      expect(alerts.wrapMessage).to.have.been.calledWith("This is a test message!", "success");
      expect(toastr.success).to.have.been.called;
      expect(toastr.success).to.have.been.calledWith("This is a test message!", "Success");

      alerts.success(otherTestMessage);
      expect(alerts.wrapMessage).to.have.been.called;
      expect(alerts.wrapMessage).to.have.been.calledWith("This is a second test message!", "success");
      expect(toastr.success).to.have.been.calledWith("This is a second test message!", "Success");
      sandbox.restore()
    })
  )


  describe("setTimeout", function() {
    it("set timeout for error messages", () => {
// When
      alerts.setErrorTimeout(0);
      expect(alerts.alertsOptions.error.timeOut).to.eq(0);
      expect(alerts.alertsOptions.defaultOptions.timeOut).to.eq(3000);
      alerts.error("bla");
      expect(toastr.options.timeOut).to.eq(0);
    })


    it("set timeout for info messages", () => {
      alerts.info("bla");
      expect(toastr.options.timeOut).to.eq(3000);
      alerts.setTimeout(123, 'info');
      expect(alerts.alertsOptions.info.timeOut).to.eq(123);
      expect(alerts.alertsOptions.defaultOptions.timeOut).to.eq(3000);
      alerts.info("bla");
      expect(toastr.options.timeOut).to.eq(123);
    })

    it("set timeout for success messages", () => {
      alerts.success("bla");
      expect(toastr.options.timeOut).to.eq(3000);
      alerts.setTimeout(123, 'success');
      expect(alerts.alertsOptions.success.timeOut).to.eq(123);
      expect(alerts.alertsOptions.defaultOptions.timeOut).to.eq(3000);
      alerts.success("bla");
      expect(toastr.options.timeOut).to.eq(123);
    })
  })
})
