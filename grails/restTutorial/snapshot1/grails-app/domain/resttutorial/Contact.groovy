package resttutorial

import grails.rest.Resource

@Resource(uri = '/contacts', formats = ["json"])
class Contact {
  String firstName
  String lastName
  String email
  Boolean inactive

  static constraints = {
    firstName nullable: false
    inactive bindable:false
  }
}
