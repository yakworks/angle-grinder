exports.config =
  # Run with selenium standalone server
  # seleniumServerJar: null # use default location
  # seleniumPort: 4444

  # capabilities to be passed to the webdriver instance
  # capabilities:
  #  browserName: "firefox"

  chromeDriver: "../node_modules/protractor/selenium/chromedriver"
  chromeOnly: true

  specs: ["integration/*Scenario.coffee"]

  baseUrl: "http://localhost:9000"
