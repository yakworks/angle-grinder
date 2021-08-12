import module from 'angle-grinder/src/ng/controls/xeditable'

xdescribe("module: angleGrinder.forms", () => describe("directive: editableDatepicker", function() {

  beforeEach(angular.mock.module(module));

  let $scope = null;
  let element = null;

  beforeEach(inject(function($rootScope, $compile) {
    $scope = $rootScope.$new();
    $scope.user = {birth: "1990-01-01"};

    element = angular.element(`\
<form editable-form name="testForm">
<span editable-datepicker="user.birth">{{user.birth | date}}</span>
</form>\
`
    );
    $compile(element)($scope);
    return $scope.$digest();
  })
  );

  describe("when the form is visible", function() {

    beforeEach(function() {
      $scope.testForm.$show();
      return $scope.$digest();
    });

    let editableScope = null;
    beforeEach(() => editableScope = element.find("[editable-datepicker]").scope());

    let calendarButtonEl = null;
    beforeEach(() => calendarButtonEl = element.find("i.fa-calendar"));

    return it("has a button for open the picker", () => expect(calendarButtonEl.length).to.eq(1));
  });


  beforeEach(inject(function($rootScope, $compile) {
    $scope = $rootScope.$new();
    $scope.user = {birth: "1990-01-01"};

    element = angular.element(`\
<form editable-form name="testForm">
<span editable-datepicker="user.birth" e-readonly="true">{{user.birth | date}}</span>
</form>\
`
    );
    $compile(element)($scope);
    return $scope.$digest();
  })
  );

  return describe("when the form is visible", function() {

    beforeEach(function() {
      $scope.testForm.$show();
      return $scope.$digest();
    });

    let editableScope = null;
    beforeEach(() => editableScope = element.find("[editable-datepicker]").scope());

    let calendarButtonEl = null;
    beforeEach(() => calendarButtonEl = element.find("i.fa-calendar"));

    return it("has a button for open the picker", () => expect(calendarButtonEl.length).to.eq(1));
  });
}));



