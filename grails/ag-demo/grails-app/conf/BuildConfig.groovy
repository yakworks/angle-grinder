grails.plugin.location.angleGrinder = "../ag-plugin"

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
            plugins {
                // grails standard
                runtime ":hibernate:$grailsVersion"
                runtime ":resources:1.2.RC2"
                build ":tomcat:$grailsVersion"

                // plugin dependencies
                compile ":dao:0.4.2"
                compile ":audit-trail:2.0.3"
                compile ":fields:1.3"
                compile ":plugin-config:0.1.8"
                compile ":faker:0.7"
                test ":code-coverage:1.2.6"
            }
        }
        work.dir = ".grails"
    }
}
