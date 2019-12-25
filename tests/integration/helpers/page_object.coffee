_ = require("underscore")

# Base class for all page objects
# `protractor`, `browser` are global variables
class PageObject

  # The protractor namespace which wraps the webdriver namespace.
  # This contains static variables and classes, such as `protractor.Key`
  # which enumerates the codes for special keyboard signals.
  protractor: protractor

  # A collection of element locator strategies.
  # * By.binding
  # * By.select
  # * By.selectedOption
  # * By.input
  # * By.repeater
  # * By.className
  # * By.css
  # * By.id
  # * By.js
  # * By.linkText
  # * By.name
  # * By.partialLinkText
  # * By.tagName
  # * By.xpath
  By: protractor.By

  # The a wrapper around an instance of webdriver.
  # Used for navigation and page-wide information.
  # * browser.wait
  # * browser.sleep
  # * browser.getCurrentUrl
  # * browser.getTitle
  # * browser.isElementPresent
  # * browser.takeScreenshot
  # * browser.navigate
  # * browser.baseUrl
  # * browser.waitForAngular
  # * browser.findElement
  # * browser.findElements
  # * browser.get
  browser: browser

  getCurrentUrl: browser.getCurrentUrl
  getTitle: browser.getTitle

  constructor: (@el = element(By.css("[ng-app]"))) ->

  # Locates the first element containing `label` text
  byLabel: (label, tag = "a") ->
    @By.xpath ".//#{tag}[contains(text(), '#{label}')]"

  # Define element on the page
  @has: (name, getter) ->
    Object.defineProperty @::, name, get: getter

  # Delegate these methods to the `element`
  element: (locator)   -> @el.element(locator)
  all: (locator)       -> @el.all(locator)
  isDisplayed:         -> @el.isDisplayed()
  getAttribute: (name) -> @el.getAttribute(name)

  hasClass: (expected) ->
    d = protractor.promise.defer()

    @el.getAttribute("class").then (cls) ->
      d.fulfill _.includes(cls.split(" "), expected)

    d.promise

module.exports = PageObject
