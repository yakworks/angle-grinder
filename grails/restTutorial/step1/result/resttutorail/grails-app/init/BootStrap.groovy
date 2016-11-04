import groovy.json.JsonSlurper
import resttutorail.Org

class BootStrap {
  def grailsApplication
  def init = { servletContext ->
    def data = new JsonSlurper().parse(grailsApplication.getParentContext().getResource("classpath:data.json").getInputStream())
    data.each {
      new Org(it).save(flush: true)
    }
  }
  def destroy = {
  }
}
