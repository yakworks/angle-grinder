/* eslint-disable */
import pipe from '../pipe'

describe('Sandbox', () => {
  test('findSomeDeep country united', () => {
    let getName = (person) => person.name
    let uppercase = (string) => string.toUpperCase()
    let get6Chars = (string) => string.substring(0, 6)

    let piped = pipe(getName, uppercase, get6Chars)

    expect( piped({ name: 'Buckethead' }) ).toEqual('BUCKET')

  })

})


