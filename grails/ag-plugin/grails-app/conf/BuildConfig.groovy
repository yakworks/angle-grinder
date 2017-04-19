grails.useGrails3FolderLayout = true

grails.project.class.dir = "target/classes"
grails.project.test.class.dir = "target/test-classes"
grails.project.test.reports.dir = "target/test-reports"
grails.project.work.dir = '.grails'

grails.project.dependency.resolver = 'maven'
grails.project.dependency.resolution = {
  // inherit Grails' default dependencies
  inherits("global") {
    // uncomment to disable ehcache
    // excludes 'ehcache'
  }

  log "warn" // log level of Ivy resolver, either 'error', 'warn', 'info', 'debug' or 'verbose'

  legacyResolve true
  // whether to do a secondary resolve on plugin installation, not advised and here for backwards compatibility

  repositories {
    grailsPlugins()
    grailsHome()
    mavenLocal()
    grailsCentral()
    mavenCentral()

    //mavenRepo(id: '9ci-artifactory', url: 'http://repo.9ci.com/artifactory/repo')

    // uncomment the below to enable remote dependency resolution
    // from public Maven repositories
    //mavenCentral()
    //mavenRepo "http://snapshots.repository.codehaus.org"
    //mavenRepo "http://repository.codehaus.org"
    //mavenRepo "http://download.java.net/maven/2/"
    //mavenRepo "http://repository.jboss.com/maven2/"
  }

  dependencies { }

  plugins {
    compile (":hibernate4:4.3.10") { export = false }
    compile (":view-tools:0.5-grails2") { export = false }
    build(":release:3.1.2", ":rest-client-builder:2.1.1") { export = false }
  }
}
