import agCommon from '~/scripts/common'

describe("newLinesFilterSpec", function() {

  beforeEach(angular.mock.module(agCommon));

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
