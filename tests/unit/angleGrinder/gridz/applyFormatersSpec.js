/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
describe("module: angleGrinder.gridz", function() {

  beforeEach(module("angleGrinder.gridz"));

  return describe("value: applyFormaters", () =>
    it("flattens an object", inject(function(ApplyFormattersServ) {
    const colModel=[{
      id: 1,
      name: "test",
      formatter: "testFormater"
    }
    , {
      id: 2,
      name: "test2",
      formatter: "test2Formater"
    }
    ];
    const formatters = {
      testFormater: (cellVal, options, rowData) => {
        return "First formated value";
      },
      test2Formater: (cellVal, options, rowData) => {
        return "Second formated value";
      }
    };

    ApplyFormattersServ(colModel, formatters);

    expect(colModel[0].formatter).to.be.a("function");
    expect(colModel[0].formatter()).to.eq("First formated value");
    expect(colModel[1].formatter).to.be.a("function");
    return expect(colModel[1].formatter()).to.eq("Second formated value");
  })
  ));
});
