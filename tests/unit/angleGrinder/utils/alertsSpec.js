describe("module: angleGrinder.alerts", function() {
  beforeEach(angular.mock.module("angleGrinder.alerts"));

  return describe("service", () =>
    it("is defined", inject(function(alerts) {
      expect(alerts).to.not.be.undefined;

      describe("#info", () =>
        it("pushesh the given message", inject(function(alerts) {
          sinon.spy(alerts, "wrapMessage");
          sinon.spy(toastr, "info");
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
          return expect(toastr.info).to.have.been.calledWith("This is a second test message!", "Info");
        })
        )
      );

      describe("#Error", () =>
        it("pushesh the given message", inject(function(alerts) {
          sinon.spy(toastr, "error");
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
          return expect(toastr.error).to.have.been.calledWith("This is a second test message!", "Error");
        })
        )
      );

      describe("#Success", () =>
        it("pushesh the given message", inject(function(alerts) {
          sinon.spy(toastr, "success");
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
          return expect(toastr.success).to.have.been.calledWith("This is a second test message!", "Success");
        })
        )
      );

      return describe("setTimeout", function() {
        it("set timeout for error message", inject(function(alerts) {
// When
          alerts.setErrorTimeout(0);
          expect(alerts.alertsOptions.error.timeOut).to.eq(0);
          expect(alerts.alertsOptions.defaultOptions.timeOut).to.eq(3000);
          alerts.error("bla");
          return expect(toastr.options.timeOut).to.eq(0);
        })
        );

        it("set timeout for info message", inject(function(alerts) {
          alerts.info("bla");
          expect(toastr.options.timeOut).to.eq(3000);
          alerts.setTimeout(123, 'info');
          expect(alerts.alertsOptions.info.timeOut).to.eq(123);
          expect(alerts.alertsOptions.defaultOptions.timeOut).to.eq(3000);
          alerts.info("bla");
          return expect(toastr.options.timeOut).to.eq(123);
        })
        );

        return it("set timeout for success message", inject(function(alerts) {
          alerts.success("bla");
          expect(toastr.options.timeOut).to.eq(3000);
          alerts.setTimeout(123, 'success');
          expect(alerts.alertsOptions.success.timeOut).to.eq(123);
          expect(alerts.alertsOptions.defaultOptions.timeOut).to.eq(3000);
          alerts.success("bla");
          return expect(toastr.options.timeOut).to.eq(123);
        })
        );
      });
    })
    )
  );
});
