package resttutorial

import grails.rest.Resource
import grails.plugin.dao.RestDaoController


@Resource(uri = '/contacts', superClass=RestDaoController)
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
