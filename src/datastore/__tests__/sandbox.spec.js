/* eslint-disable */
import pipe from '../../utils/pipe'

const setDefaults = ({ foo = 'bar', ...args}) => ({ ...args, foo })

const mixConstructor = constructor => o => {
  constructor.of = constructor
  return {
    // create the delegate [[Prototype]]
    __proto__: {
      // add the constructor prop to the new [[Prototype]]
      constructor
    },
    // mix all o's props into the new object
    ...o
  }
}


// Set up some functional mixins
const mix = constructor => {
  //pipe makes a pipline combined function and we save it here
  let pipedFunction
  return {
    with(...funcs) {
      //combines the functions using a default empty object as starting point
      return this.pipe(...funcs, withConstructor(constructor))({})
    },
    pipe(...funcs) {
      //pipes the factory functions and returns the final function
      pipedFunction = pipe(...funcs, withConstructor(constructor))
      return this
    },
    merge(o) {
      return pipedFunction(o)
    }
  }
}

// Set up some functional mixins
const withFlying = o => {
  let isFlying = false;
  return {
    ...o,
    fly () {
      isFlying = true
      return this
    },
    land () {
      isFlying = false
      return this
    },
    isFlying: () => isFlying
  }
};

const withBattery = ({ capacity }) => o => {
  let percentCharged = 100
  return {
    ...o,
    draw (percent) {
      const remaining = percentCharged - percent
      percentCharged = remaining > 0 ? remaining : 0
      return this
    },
    getCharge: () => percentCharged,
    getCapacity: () => capacity
  };
};

const Drone = ({ capacity = '3000mAh' } = {}) => mix(Drone).with(
  withFlying,
  withBattery({ capacity })
)

const Copter = ({ capacity = '9000mAh' } = {}) => {
  let mixedFactory = mix(Copter).pipe(Drone).args({ capacity })
  mixedFactory({ capacity })
}

const myDrone = Drone({ capacity: '5500mAh' })

const copter = Copter()

console.log(`
  can fly:  ${ myDrone.fly().isFlying() === true }
  can land: ${ myDrone.land().isFlying() === false }
  battery capacity: ${ myDrone.getCapacity() }
  battery status: ${ myDrone.draw(50).getCharge() }%
  battery drained: ${ myDrone.draw(75).getCharge() }% remaining
`)

console.log(`copter:
  can fly:  ${ copter.fly().isFlying() === true }
  can land: ${ copter.land().isFlying() === false }
  battery capacity: ${ copter.getCapacity() }
  battery status: ${ copter.draw(50).getCharge() }%
  battery drained: ${ copter.draw(75).getCharge() }% remaining
`)

let ctor = myDrone.constructor
console.log(`
  constructor linked: ${ ctor === Drone }
  of is itself: ${ ctor.of === Drone }
  copter: ${ copter.constructor === Copter }
`)

describe('Sandbox', () => {
  test('findSomeDeep country united', () => {
    let defArgs = setDefaults({a:'x'})
    expect( defArgs ).toEqual({a:'x', foo:'bar'})

    defArgs = setDefaults({a:'x', foo:'buzz'})
    expect( defArgs ).toEqual({a:'x', foo:'buzz'})
  })

})


