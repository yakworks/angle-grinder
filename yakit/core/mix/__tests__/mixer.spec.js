// @ts-nocheck
/* eslint-disable */
import pipe from '../../pipe'
import mix, {mixConstructor} from '../mixer'
import {expect as x} from '@jest/globals'

// Set up some functional mixins
/**
 * pass in the obj to add the flyable function to
 */
const makeFlyable = obj => {
  let isFlying = false;
  // showing a few different ways to skin the cat
  const fly = () => {
    isFlying = true
    return obj
  }

  function land() {
    isFlying = false
    return obj
  }

  return Object.assign(obj, {
    fly, land,
    fooFly: false,
    isFlying: () => isFlying
  })
}

// const withBattery = ({ capacity }) => o => {
//   let percentCharged = 100
//   return {
//     ...o,
//     getCapacity: () => capacity
//   };
// };

/**
 * adds battery to the obj
 * keep the charge private and exposes with getters
 */
const withBattery = ({ battery , ...obj}) => {
  let percentCharged = 100
  //pull the capicity out or default to 1100
  let {capacity = 1100, ...restBattery} = battery || {}

  obj.battery = {
    ...restBattery,
    draw (percent) {
      const remaining = percentCharged - percent
      percentCharged = remaining > 0 ? remaining : 0
      return this
    },
    //example of couple options for getters
    get charge(){ return percentCharged},
    get capacity(){ return capacity }
  }
  return obj
};

// const Drone = ({ capacity = '9' } = {}) => mix(Drone).pipe(
//   withFlying,
//   withFixedBattery({ capacity })
// ).factory({})

const Drone = function(opts){
  opts = { name:"Base Drone Model" , ...opts}

  let main = (o) => ({
    ...o,
    fooFly: true, //test that it overrides fooFly in makeFlyable
    hasRemote: true
  })

  return mix(Drone).it(opts).with(
    makeFlyable,
    withBattery,
    main
  )
}

/**
 * adds rotors to a drone and 'overrides' the fly and land
 *
 * @param {Drone} drone
 * @returns the object with the features added
 */
const rotors = drone => {
  let rotating = false
  let {fly: superFly, land: superLand} = drone
  return Object.assign(drone, {
    fly(){
      superFly()
      rotating = true
      return this
    },
    //overrides land so make rotating
    land () {
      superLand()
      rotating = false
      return this
    },
    isRotating: () => rotating
  })
}

const Copiter = (opts) => {
  let name = "Copiter Model"

  return mix(Copiter).it({ name, ...opts }).with(
    Drone,
    rotors
  )
}

const copter = Copiter()

console.log(`
  can fly:  ${ copter.fly().isFlying() === true }
  can land: ${ copter.land().isFlying() === false }
  battery capacity: ${ copter.battery.capacity }
  battery status: ${ copter.battery.draw(50).charge }%
  battery drained: ${ copter.battery.draw(75).charge }% remaining
`)

// const copter = Copiter()

// const bigCopter = Copiter({capacity: '20000mAH'})


describe('mix drone', () => {
  test('Drone using simple pipe', () => {

    const DroneUsingPipe = () => pipe(
      makeFlyable,
      withBattery,
      mixConstructor(DroneUsingPipe)
    )({})

    const myDrone = DroneUsingPipe()

    // let ctor = myDrone.constructor
    // x(ctor).toEqual(DroneUsingPipe)
    // x(ctor.of).toEqual(DroneUsingPipe)
  })

  test('mixer drone', () => {

    let myDrone = Drone()

    x(myDrone.fooFly).toEqual(true)
    x(myDrone.name).toEqual('Base Drone Model')
    x(myDrone.battery.capacity).toEqual(1100)

    myDrone = Drone({name: 'mini drone', battery:{capacity: 20}})
    x(myDrone.name).toEqual('mini drone')
    x( myDrone.battery.capacity ).toBe(20)

    //cant set it
    expect(() => { myDrone.battery.capacity = '99'}).toThrow()

    //not flying yet
    x( myDrone.isFlying() ).toBe(false)
    myDrone.fly()
    //fly and check status
    x( myDrone.isFlying() ).toBe(true)
    //land and check status as method chaining is enabled
    x( myDrone.land().isFlying() ).toBe(false)

    x( myDrone.battery.draw(90).charge ).toBe(10)
    x( myDrone.battery.draw(10).charge ).toBe(0)

    // let ctor = myDrone.constructor
    // x(ctor).toEqual(Drone)
    // x(ctor.of).toEqual(Drone)

    myDrone = Drone()
    let { battery } = myDrone
    console.log(`
      can fly:  ${ myDrone.fly().isFlying() === true }
      can land: ${ myDrone.land().isFlying() === false }
      battery capacity: ${ battery.capacity }
      battery status: ${ battery.draw(50).charge }%
      battery drained: ${ battery.draw(75).charge }% remaining
    `)

  })

  test('check copter overrides', () => {

    let copter = Copiter()
    x(copter.name).toEqual('Copiter Model')

    copter = Copiter({name: 'Custom'})
    x(copter.name).toEqual('Custom')

    //not flying yet
    x( copter.isFlying() ).toBe(false)
    copter.fly()
    //fly and check status
    x( copter.isFlying() ).toBe(true)
    //rotors should be spinning too
    x( copter.isRotating() ).toBe(true)

    //land and check status as method chaining is enabled
    x( copter.land().isFlying() ).toBe(false)
    //rotors should not be spinning now
    x( copter.isRotating() ).toBe(false)

    //it should be a Copter
    // let ctor = copter.constructor
    // x(ctor).toEqual(Copiter)
    x(Copiter.of).toEqual(Copiter)

    console.log(`
    can fly:  ${ copter.fly().isFlying() === true }
    can land: ${ copter.land().isFlying() === false }
    battery capacity: ${ copter.battery.capacity }
    battery status: ${ copter.battery.draw(50).charge }%
    battery drained: ${ copter.battery.draw(75).charge }% remaining
  `)

  })

})


