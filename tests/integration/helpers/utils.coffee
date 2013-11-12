fs = require("fs")

module.exports =

  # Takes a screenshot for the entire visible page.
  takeScreenshot: (fileName = "screenshot-#{new Date()}") ->
    browser.takeScreenshot().then (screenshot) ->
      fs.writeFileSync("#{fileName}.png", screenshot, "base64")
