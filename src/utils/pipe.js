/**
 * Usage for composing function and factories. Pipes results from function to function
 * Creates a function that returns the result of invoking the given functions,
 * where each successive invocation is supplied the return value of the previous.
 *
 * Same as https://lodash.com/docs/#flow but in one line
 * see https://medium.com/javascript-scene/javascript-factory-functions-with-es6-4d224591a8b1
 * and https://www.freecodecamp.org/news/pipe-and-compose-in-javascript-5b04004ac937/
 *
 * instead of doing something like this uppercase(getName({ name: 'Foo' })) == 'FOO'
 * you could do the following
 * let getUpperCaseName = pipe(getName, uppercase) //creates new function that pipes
 * getUpperCaseName({ name: 'Foo' }) == 'FOO
 *
 *
 * @param  {...function} fns
 * @returns the new composed Function
 */
export const pipe = (...fns) => args => fns.reduce((accumFn, fn) => fn(accumFn), args);
// const pipe = (...fns) => x => fns.reduce((y, f) => f(y), x);

/**
 * same as pipe but starts from right and moves left
 */
export const pipeRight = (...fns) => args => fns.reduceRight((accumFn, fn) => fn(accumFn), args);

export default pipe
