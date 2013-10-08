Casper = require("casper").Casper

class Scenario extends Casper
  constructor: (@baseUrl = "http://localhost:9001") ->
    super(viewportSize: { width: 1600, height: 600 })

    # catches remote `console.log` calls
    @on "remote.message", (message) ->
      console.log "remote", message

  scenario: (desc, fn) =>
    desc = "Scenario: #{desc}"
    @echo "\n#{desc}", "RED_BAR"

    @start @baseUrl

    fn.call this

    @run -> @test.renderResults(true)

  feature: (desc, fn = null) =>
    this.then ->
      @echo "\n#{desc}", "GREEN_BAR"

      if fn?
        fn.call this
      else
        @echo "pending"

exports.create = (baseUrl) ->
  casper = new Scenario(baseUrl)
  casper.scenario
