package resttutorail

import grails.rest.Resource

@Resource(uri = '/orgs', formats = ["json", "xml"])
class Org {
  String num
  String name
  String street
  String city
  String state
  String zipCode

  static constraints = {
    street nullable: true
    city nullable: true
    state nullable: true
    zipCode nullable: true
  }
}
