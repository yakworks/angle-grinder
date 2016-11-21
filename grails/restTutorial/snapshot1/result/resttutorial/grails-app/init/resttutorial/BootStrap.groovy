package resttutorial

import groovy.json.JsonSlurper

class BootStrap {
  def grailsApplication
  def init = { servletContext ->
    def res = grailsApplication.mainContext.getResource("classpath:Contacts.json")
    def data = new JsonSlurper().parse(res.getInputStream())
    data.each{
      Contact contact = new resttutorial.Contact(it)
      contact.save(failOnError:true, flush: true)
    }
  }
  def destroy = {
  }
}
