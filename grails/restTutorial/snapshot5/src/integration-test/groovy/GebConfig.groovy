import io.github.bonigarcia.wdm.ChromeDriverManager
import io.github.bonigarcia.wdm.InternetExplorerDriverManager
import io.github.bonigarcia.wdm.PhantomJsDriverManager

import org.openqa.selenium.chrome.ChromeDriver
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.remote.DesiredCapabilities;

import org.openqa.selenium.firefox.FirefoxDriver
import org.openqa.selenium.ie.InternetExplorerDriver
import org.openqa.selenium.phantomjs.PhantomJSDriver
import org.openqa.selenium.htmlunit.HtmlUnitDriver

/**
 * to run these add -Dgeb.env=xxx.
 * And hange build.gradle to pass systemProperties through
 *  integrationTest {
 *    systemProperties System.properties
 *  }
 * example: "grails -Dgeb.env=chrome test-app -integration" or "gradlew -Dgeb.env=chrome integrationTest"
 *
 * see https://github.com/bonigarcia/webdrivermanager for details on the DriverManager stuff
 */


// http://www.gebish.org/manual/current/configuration.html#waiting_for_base_navigator
baseNavigatorWaiting = true
atCheckWaiting = true

//keeps the browser open after test if FALSE
quitCachedDriverOnShutdown = true

//When extending GebReportingSpec it will snap shot the html and a sreenshot. This is where they go
//reportsDir = "build/reports"
// if true then only failed tests generate the screenshot output in above
//reportOnTestFailureOnly = true

//****HtmlUnitDriver as the default driver *****//
driver = { new HtmlUnitDriver(true) }

environments {

  htmlunit { driver = { new HtmlUnitDriver(true) } }

  // run as "grails -Dgeb.env=chrome test-app -integration"
  // See: https://sites.google.com/a/chromium.org/chromedriver/
  chrome {
    // Download and configure ChromeDriver using https://github.com/bonigarcia/webdrivermanager
    ChromeDriverManager.getInstance().setup()
    // from http://www.testingexcellence.com/how-to-resize-browser-window-in-webdriver/
    // ChromeOptions options = new ChromeOptions()
    // options.addArguments("window-size=1280,800")
    // DesiredCapabilities cap = DesiredCapabilities.chrome()
    // cap.setCapability(ChromeOptions.CAPABILITY, options)

    driver = { new ChromeDriver() }
  }

  // run as "grails -Dgeb.env=ie test-app -integration"
  // See: https://github.com/SeleniumHQ/selenium/wiki/InternetExplorerDriver
  ie {
    // Download and configure InternetExplorerDriver using https://github.com/bonigarcia/webdrivermanager
    InternetExplorerDriverManager.getInstance().setup()

    driver = { new InternetExplorerDriver() }
  }

  phantom {
    PhantomJsDriverManager.getInstance().setup()
    waiting {
      timeout = 2
    }
    driver = { new PhantomJSDriver() }
  }

  //firefox {
  // See: https://github.com/SeleniumHQ/selenium/wiki/FirefoxDriver
  //firefox is fucked and selenium aint fixin it
  //https://github.com/SeleniumHQ/selenium/issues/1385
  //driver = { new FirefoxDriver() }
  //}

}
