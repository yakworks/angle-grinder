/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
describe("module: angleGrinder.common", function() {

  beforeEach(module("angleGrinder.common"));

  return describe("filter: newLines", function() {

    let newLines = null;

    beforeEach(inject($filter => newLines = $filter("newLines"))
    );

    context("when the input is a string", () => it("replaces all line breaks", function() {
      const html = newLines("foo\nbar\nbiz");
      return expect(html).to.eq("foo<br />bar<br />biz");
    }));

    return context("otherwise", () => it("returns the input", () => expect(newLines(123)).to.eq(123)));
  });
});
