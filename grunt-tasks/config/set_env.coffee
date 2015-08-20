#https://github.com/onehealth/grunt-env

module.exports = (grunt) ->

# Sets time zone for PhantomJS to prevent test falling
  env:
    add:
      TZ: 'UTC'