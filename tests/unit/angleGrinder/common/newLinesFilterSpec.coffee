describe "module: angleGrinder.common", ->

  beforeEach module "angleGrinder.common"

  describe "filter: newLines", ->

    newLines = null

    beforeEach inject ($filter) ->
      newLines = $filter("newLines")

    context "when the input is a string", ->

      it "replaces all line breaks", ->
        html = newLines("foo\nbar\nbiz")
        expect(html).to.eq "foo<br />bar<br />biz"

    context "otherwise", ->

      it "returns the input", ->
        expect(newLines(123)).to.eq 123
