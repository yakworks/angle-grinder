/* eslint-disable */
import prune from '../prune';

describe('prune', () => {
  test('null', () => {
    expect(prune(null)).toBe(null)
  });

  test('objects arrays', () => {
    let fooObj = {
      a:'',
      b:[],
      c:{},
      ar:['x'],
      num1: 1,
      num0: 0,
      bool: false,
      emptyObj:{nope:'', x:{}, b:[]},
      nested:{
        filled:'foo',
        x:{},
        y:{a:'x', b:''}
      }
    }

    let pruned = prune(fooObj)

    expect( pruned ).toEqual({
      ar:['x'],
      num1:1,
      num0:0,
      bool: false,
      nested:{
        filled:'foo',
        y:{a:'x'}
      }
    })
  });

});
