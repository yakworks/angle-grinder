# Data Provider Pattern for jasmine specs
# see http://blog.jphpsf.com/2012/08/30/drying-up-your-javascript-jasmine-tests
window.using = (name, values, fn) ->
  for value in values
    if Object.prototype.toString.call(value) isnt '[object Array]'
      value = [value]

    fn.apply(this, value)
    jasmine.currentEnv_.currentSpec.description += ' (with "' + name + '" using ' + value.join(', ') + ')'
