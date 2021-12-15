// @ts-nocheck
/* eslint-disable */
import mix from '../mix-it-with'
import {expect as x} from '@jest/globals'

describe('mix with objects', () => {
  test('should merge objects or functions', () => {

    const master = { a:1 }

    const obj1 = { a:2, b:2 }
    const obj2 = { a:3, b:3 }

    const mixed = mix(master).with(obj1, obj2)

    x(mixed).toEqual(master)
    x(mixed).toEqual({a:1, b:2})

  })

})


