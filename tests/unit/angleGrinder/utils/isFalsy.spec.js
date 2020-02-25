import { isFalsy, isEmpty } from 'angle-grinder/src/utils/isFalsy'

describe('isFalsy', () => {
  describe('func: isFalsy', function() {
    it('returns true for `NaN`', () => expect(isFalsy(NaN)).to.be.true)

    it('returns true empty strings', () =>
      expect(isFalsy('')).to.be.true
    )

    it('returns true foo string', () =>
      expect(isFalsy('foo')).to.be.false
    )

    it('returns true for `null`', () => expect(isFalsy(null)).to.be.true)

    it('returns true for `undefined`', () => expect(isFalsy(undefined)).to.be.true)

    it('returns true for `false`', () => expect(isFalsy(false)).to.be.true)

    return it('returns false for other value', function() {
      expect(isFalsy(true)).to.be.false
      expect(isFalsy(0)).to.be.false
      expect(isFalsy(0.0)).to.be.false
      expect(isFalsy(123)).to.be.false
    })
  })

  describe('func: isEmpty', function() {
    describe('for empty strings', function() {
      [undefined, null, ''].map((str) =>
        it(`returns true for \`${str}\``, () => expect(isEmpty(str)).to.be.true)
      )
    })

    describe('for non empty strings', function() {
      [' ', '    ', 'test', ' foo bar '].map((str) =>
        it(`returns false for \`${str}\``, () => expect(isEmpty(str)).to.be.false)
      )
    })
  })
})
