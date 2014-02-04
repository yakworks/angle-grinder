exports.config =
  # Run with selenium standalone server
  # seleniumServerJar: null # use default location
  # seleniumPort: 4444

  # chromeDriver: "./selenium/chromedriver"
  # chromeOnly: true

  # capabilities to be passed to the webdriver instance
  capabilities:
    browserName: "firefox"

  specs: ["integration/*Scenario.coffee"]

  baseUrl: "http://localhost:9000"

  # Use mocha (currently in beta)
  framework: "mocha"

  # Options to be passed to mocha
  # See the full list at http://visionmedia.github.io/mocha/
  mochaOpts:
    ui: "bdd"
    reporter: "list"
