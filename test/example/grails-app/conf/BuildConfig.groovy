//grails.plugin.location.dao ="../grails-dao-plugin/dao-plugin"
//grails.plugin.location.freemarker ="../../grails/freemarker"
//grails.plugin.location.sparkle = "../sparkle"
grails.plugin.location.angleGrinder = "../.."
//grails.plugin.location.fields = "../grails-fields"

grails {
    tomcat { // settings for run-app and run-war
        classpath = "../9ci-app-conf"    // Put 9ci-config.groovy and such here
        jvmArgs = ["-Xms256m", "-Xmx1024m", "-XX:PermSize=256m", "-XX:MaxPermSize=512m"]
    }
    project {
        dependency.resolution = {
            inherits("global") {
                //excludes "yyy:0.1.5"
            }
            log "warn" // log level of Ivy resolver, either "error", "warn", "info", "debug" or "verbose"
            repositories {
                //inherits true
                grailsPlugins()
                grailsHome()
                grailsCentral()
                mavenLocal()
                mavenCentral()
                mavenRepo "http://repo.9ci.com/artifactory/repo"
            }

            dependencies {
                // specify dependencies here under either "build", "compile", "runtime", "test" or "provided" scopes eg.
                build "commons-io:commons-io:2.3"
            }
            //TODO later -- we need to look at upgrades for gorm-labs and mail
            // gorm-labs there is some reason why we didn"t upgrade, probably to do with making the applet work.
            // mail, we need to rewrite our mail to work with the new classes, they are not compatible.
            plugins {
                // grails standard
                runtime ":hibernate:$grailsVersion"
                build ":tomcat:$grailsVersion"
                runtime ":resources:1.2.RC2"

                // plugin dependencies
                compile ":dao:0.4.2"
                compile ":audit-trail:2.0.3"
                compile ":fields:1.3"
                compile ":plugin-config:0.1.8"
                compile ":faker:0.7"
                compile ":coffeescript-resources:0.3.8"
            }
        }
        work.dir = ".grails"
    }
}
