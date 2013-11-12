_ = require("underscore")

# Base class for all page objects
# `protractor`, `browser` are global variables
class PageObject

  # The protractor namespace which wraps the webdriver namespace.
  # This contains static variables and classes, such as `protractor.Key`
  # which enumerates the codes for special keybord signals.
  protractor: protractor

  # A collection of element locator strategies.
  # * By.binding
  # * By.select
  # * By.selectedOption
  # * By.input
  # * By.repeater
  # * By.className
  # * By.class name
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

  constructor: (@element = @browser) ->

  # Locates the first element containing `label` text
  byLabel: (label, tag = "a") ->
    @By.xpath ".//#{tag}[contains(text(), '#{label}')]"

  # Define element on the page
  @has: (name, getter) ->
    Object.defineProperty @::, name, get: getter

  # Delegate these methods to the `element`
  findElement: (locator)  -> @element.findElement(locator)
  findElements: (locator) -> @element.findElements(locator)
  isDisplayed:            -> @element.isDisplayed()
  getAttribute: (name)    -> @element.getAttribute(name)

  hasClass: (expected) ->
    d = protractor.promise.defer()

    @element.getAttribute("class").then (cls) ->
      d.fulfill _.contains(cls.split(" "), expected)

    d.promise

module.exports = PageObject
