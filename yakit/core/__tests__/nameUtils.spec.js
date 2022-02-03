/* eslint-disable */
import * as nu from '../nameUtils';

describe('nameUtils', () => {
  test('naturalName', () => {
    let names = {
      "firstName": "First Name",
      "aName":"A Name",
      "some-thing":"Some Thing",
      "some_thing":"Some Thing",
      // "URL":"URL",
      // "localURL":"Local URL",
      // "aURLlocal":"A URL local",
      "MyDomainClass":"My Domain Class"
    }

    Object.keys(names).forEach( key => {
      expect( nu.naturalName(key) ).toEqual(names[key])
    })
    expect( nu.naturalName("some_thing") ).toEqual("Some Thing")

  });

  test('replace', () => {
    let key = '{foo.bar}'
    expect( key.replace(/[{}]/g, '')).toEqual("foo.bar")
  });

});
