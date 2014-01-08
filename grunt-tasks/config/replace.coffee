# https://github.com/yoniholmes/grunt-text-replace
module.exports = (grunt) ->

  select2Images:
    src: ["<%= appConfig.dev %>/components/select2/css/select2.css"]
    overwrite: true
    replacements: [{
      from: "url('select2",
      to: "url('../img/select2"
    }]
