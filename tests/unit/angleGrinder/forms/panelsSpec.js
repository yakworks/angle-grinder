/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
describe("module: angleGrinder.forms", function() {

  beforeEach(angular.mock.module("angleGrinder.forms"));
  beforeEach(angular.mock.module("exampleApp"));

  let element = null;
  let ctrl = null;
  let scope = null;

  beforeEach(inject(function($injector) {
    ({ element } = compileTemplate(`\
<div class="ag-panels-row">
  <div class="panel ag-panel">
    <div class="panel-heading">heading</div>
    <div class="panel-body">
      <p>Row is hiding</p>
      <p>Row is hiding</p>
      <p stay-on-collapse><i><b>Row is staying when panel collapsed</b></i></p>
      <p>Row is hiding</p>
    </div>
    <div class="panel-footer">footer</div>
    <ag-panel-states>
      <div id="userAction" ng-click="userAction()"></div>
    </ag-panel-states>
  </div>

  <div class="panel ag-panel">
    <div class="panel-heading">other heading</div>
  </div>
</div>\
`, $injector));

    ctrl = element.controller("agPanelsRow");
    scope = element.scope();

    scope.userButtonClicked = false;
    scope.userAction = () => scope.userButtonClicked = true;

    element.$scope = scope;

    scope.userButtonClicked = false;
    scope.userAction = () => scope.userButtonClicked = true;

    return element.$scope = scope;
  })
  );

  describe("directive: agPanel", () => it("adds the current element to the panels stack", () => expect(ctrl.panels.length).to.eq(2)));

  return describe("directive: agPanelStates", function() {

    let agPanelStates = null;
    beforeEach(() => agPanelStates = element.find('[name="agPanelStates"]'));

    it("adds states elements to panel header", function() {
      expect(angular.element(agPanelStates).length).to.eq(1);
      return expect(angular.element(agPanelStates).children().length).to.eq(4);
    });

    it("collapses the panel", function() {
      const stateButton = angular.element(agPanelStates).find('[name="stateButton"]');
      // Collapse state click
      stateButton.click();
      // Find element(s) with .panel-body class
      let panelBody = angular.element(element).find(".panel-body");
      // Amount of these elements should be equal 2
      // (original element hides, the second one is a clone with one child)
      expect(angular.element(panelBody).length).to.eq(2);
      expect(angular.element(angular.element(panelBody)[0]).hasClass("ng-hide")).to.be.true;
      expect(angular.element(angular.element(panelBody)[1]).children().length).to.eq(1);

      // Normal state click
      stateButton.click();
      panelBody = angular.element(element).find(".panel-body");
      // Element should return to default value
      expect(angular.element(panelBody).length).to.eq(1);
      return expect(angular.element(panelBody).children().length).to.eq(4);
    });

    it("shows panel in fullscreen", function() {
      // Fullscreen state click
      expect(element.closest("panel-modal").length).to.eq(0);
      angular.element(agPanelStates).find('[name="expandButton"]').click();
      // Wrap element by panel-modal
      return expect(element.find("panel-modal").length).to.eq(1);
    });

    return it("check if the user's action is triggered", function() {
      angular.element(agPanelStates).find('[id="userAction"]').click();
      return expect(scope.userButtonClicked).to.be.true;
    });
  });
});
