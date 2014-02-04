describe "module: angleGrinder.alerts", ->
  beforeEach module "angleGrinder.alerts"

  describe "controller", ->
    $scope = null
    alerts = null

    beforeEach inject ($rootScope, $controller, _alerts_) ->
      $scope = $rootScope.$new()
      alerts = _alerts_

      $controller "alerts",
        $scope: $scope
        alerts: alerts

    it "assigns flash messages", ->
      expect($scope.alertMessages).to.not.be.undefined
      expect($scope.alertMessages.length).to.equal 0

      alerts.info("Test message.")

      message = _.findWhere($scope.alertMessages, id: 1)
      expect(message).to.deep.equal id: 1, type: "info", text: "Test message."

    describe "#disposeAlert", ->
      it "disposes an alert at the given index", ->
        # Given
        alerts.info("Information..")
        alerts.error("Error..")
        spy = sinon.spy(alerts, "dispose")

        # When
        $scope.disposeAlert(2)

        # Then
        expect(spy.called).to.be.true
        expect(spy.calledWith(2)).to.be.true

        message = _.findWhere($scope.alertMessages, id: 1)
        expect(message).to.deep.equal id: 1, type: "info", text: "Information.."

        disposedMessage = _.findWhere($scope.alertMessages, id: 2)
        expect(disposedMessage).to.be.undefined

  describe "directive", ->
    $scope = null
    element = null

    beforeEach inject ($injector) ->
      {element, $scope} = compileTemplate "<ag-alerts></ag-alerts>", $injector

    it "renders alerts", ->
      $scope.$apply -> $scope.alertMessages = [
        type: "info", text: "Test message"
      ]
      expect(element.find(".alert-info").length).to.equal 1

  describe "service", ->
    it "is defined", inject (alerts) ->
      expect(alerts).to.not.be.undefined

    describe "#nextId", ->
      it "return the next id for the new flash message", inject (alerts) ->
        expect(alerts.nextId()).to.equal 1

        _(4).times -> alerts.nextId()
        expect(alerts.nextId()).to.equal 6

    describe "#push", ->
      spy = null
      beforeEach inject (alerts) ->
        spy = sinon.spy(alerts, "delayedDispose")

      it "returns an id for the new flash message", inject (alerts) ->

        expect(alerts.push("info", "Test..")).to.equal 1
        expect(spy.called).to.be.true
        expect(spy.calledWith(1)).to.be.true

        expect(alerts.push("error", "Test error..")).to.equal 2
        expect(spy.called).to.be.true
        expect(spy.calledWith(2)).to.be.true

      describe "#info", ->
        it "pushesh the given message", inject (alerts) ->
          # Given
          testMessage = "This is a test message!"
          otherTestMessage = "This is a second test message!"

          # When
          alerts.info(testMessage)
          expect(spy.called).to.be.true
          expect(spy.calledWith(1)).to.be.true

          alerts.info(otherTestMessage)
          expect(spy.called).to.be.true
          expect(spy.calledWith(2)).to.be.true

          # Then
          firstMessage = _.findWhere(alerts.messages, id: 1)
          expect(firstMessage).to.deep.equal id: 1, type: "info", text: testMessage

          secondMessage = _.findWhere(alerts.messages, id: 2)
          expect(secondMessage).to.deep.equal id: 2, type: "info", text: otherTestMessage

      describe "#error", ->
        it "pushesh the given message", inject (alerts) ->
          # Given
          testMessage = "This is a test message!"

          # When
          alerts.error(testMessage)
          expect(spy.called).to.be.true
          expect(spy.calledWith(1)).to.be.true

          # Then
          message = _.findWhere(alerts.messages, id: 1)
          expect(message).to.deep.equal id: 1, type: "error", text: testMessage

    describe "#dispose", ->
      it "removes a message with the given id", inject (alerts) ->
        # Given
        alerts.info("First message")
        alerts.info("Second message")
        alerts.info("Third message")
        alerts.error("Error message")

        # When
        alerts.dispose(2)

        # Then
        expect(_.findWhere(alerts.messages, id: 1)).not.to.be.undefined
        expect(_.findWhere(alerts.messages, id: 2)).to.be.undefined
        expect(_.findWhere(alerts.messages, id: 3)).to.not.be.undefined
        expect(_.findWhere(alerts.messages, id: 4)).to.not.be.undefined

    describe "#delayedDispose", ->
      it "removes a message after the given time", inject (alerts, $timeout) ->
        # Given
        alerts.info("First message")

        # When
        alerts.delayedDispose(1)

        message = _.findWhere(alerts.messages, id: 1)
        expect(message).to.deep.equal id: 1, type: "info", text: "First message"

        $timeout.flush()

        # Then
        expect(alerts.messages.length).to.equal 0
