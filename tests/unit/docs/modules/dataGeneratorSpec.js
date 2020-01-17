import docResMod from '#/docs/src/main'
import { randomGen } from '#/docs/src/modules/dataGenerator'

describe("module: exampleApp", function() {
  beforeEach(angular.mock.module(docResMod));

  describe("service: random", function() {
    describe("#range", function() {
      it("generates random number from the given range", function() {
        let number = randomGen.range(1, 2);
        expect(number >= 1).to.be.true;
        expect(number <= 2).to.be.true;

        return (() => {
          const result = [];
          for (let _ = 0; _ < 10; _++) {
            number = randomGen.range(10, 100);
            expect(number >= 10).to.be.true;
            result.push(expect(number <= 100).to.be.true);
          }
          return result;
        })();
      })
    });

    return describe("#date", function() {
      return it("generates a random date", function() {
        sinon.stub(randomGen, "range").returns(1372677018884);

        const minDate = new Date(2001, 1, 1);
        expect(randomGen.date(minDate)).to.be.a("date");
        expect(randomGen.range).to.have.been.called;
      })
    });
  });

  return describe("service: sampleData", function() {
    it("is defined", inject(function(sampleData) {
      expect(sampleData).to.not.be.undefined;
      return expect(sampleData.generate).to.not.be.undefined;
    })
    );

    return describe("#generate", function() {

      it("generates a valid numver of rows", inject(function(sampleData) {
        expect(sampleData.generate(10).length).to.equal(10);
        return expect(sampleData.generate().length).to.equal(50);
      })
      );

      return it("contains valid fields", inject(function(sampleData) {
        const firstRow = sampleData.generate(1)[0];

        expect(firstRow.id).to.not.be.undefined;
        expect(firstRow.id).to.equal(1);
        expect(firstRow.invoiceDate).to.not.be.undefined;
        expect(firstRow.name).to.not.be.undefined;
        expect(firstRow.note).to.not.be.undefined;
        expect(firstRow.tax).to.not.be.undefined;
        return expect(firstRow.total).to.not.be.undefined;
      })
      );
    });
  });
});
