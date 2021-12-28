import {expect as x} from '@jest/globals'

describe('sandbox', () => {
  test('testing simple spread defaults', () => {

    const setDefaults = ({ foo = 'bar', ...args}) => ({ ...args, foo })

    let defArgs = setDefaults({a:'x'})
    x( defArgs ).toEqual({a:'x', foo:'bar'})

    defArgs = setDefaults({a:'x', foo:'buzz'})
    x( defArgs ).toEqual({a:'x', foo:'buzz'})
  })

})


