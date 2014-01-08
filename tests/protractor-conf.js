exports.config = {
  // Run with selenium standalone server
  seleniumServerJar: null, // use default location
  seleniumPort: 4444,

  // chromeDriver: "./selenium/chromedriver"
  // chromeOnly: true

  // capabilities to be passed to the webdriver instance
  capabilities: {
    browserName: "firefox"
  },

  specs: ["../build/tests/integration/*Scenario.js"],

  baseUrl: "http://localhost:9000",

  // options to be passed to Jasmine-node
  jasmineNodeOpts: {
    // default time to wait in ms before a test fails
    defaultTimeoutInterval: 10000,

    includeStackTrace: true,
    isVerbose: false
  }
};
