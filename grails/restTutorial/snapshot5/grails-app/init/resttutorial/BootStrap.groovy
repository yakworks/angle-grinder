package resttutorial

import grails.converters.JSON
import groovy.json.JsonSlurper

class BootStrap {
  def grailsApplication
  def init = { servletContext ->
    def data = new JsonSlurper().parse(new File("../resources/Contacts.json"))
    data.each{
      Contact contact = new resttutorial.Contact(it)
      contact.save(failOnError:true, flush: true)
    }
  }
  def destroy = {
  }
}
