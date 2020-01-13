import agCommon from '~/scripts/common'

describe("notificationDialogSpec", function() {
  beforeEach(angular.mock.module(agCommon))

  describe("controller: NotificationDialogCtrl", function() {
    let $scope = null;
    let ctrl = null;

    beforeEach(inject(function($rootScope, $controller) {
      $scope = $rootScope.$new();
      return ctrl = $controller("NotificationDialogCtrl", {
        $scope,
        options: { message: "This is a notification!", okLabel: "OK"
      }
      }
      );
    })
    );

    return it("has the message", () => expect($scope.options.message).to.eq("This is a notification!"));
  });

  return describe("service: NotificationDialogServ", function() {

    //beforeEach(angular.mock.module("angleGrinder.forms"));

    it("displays the notification", inject(function( NotificationDialogServ) {
      // When
      NotificationDialogServ.open("Test message for notification!");

      // Then
      const text = document.querySelector('.sweet-alert h2');
      expect(text.textContent).to.eq("Test message for notification!");
      const canselButton = document.querySelector('.sweet-alert button.cancel');
      expect(canselButton.style.display).to.eq("none");
      const okButton = document.querySelector('.sweet-alert button.confirm');
      return expect(okButton.textContent).to.eq("Ok");
    })
    );

    return it("displays the notification with custom ok button", inject(function( NotificationDialogServ) {
      // When
      NotificationDialogServ.open({message: "Test message for notification!", okLabel: "testOK"});

      // Then
      const text = document.querySelector('.sweet-alert h2');
      expect(text.textContent).to.eq("Test message for notification!");
      const canselButton = document.querySelector('.sweet-alert button.cancel');
      expect(canselButton.style.display).to.eq("none");
      const okButton = document.querySelector('.sweet-alert button.confirm');
      return expect(okButton.textContent).to.eq("testOK");
    })
    );
  });
});
