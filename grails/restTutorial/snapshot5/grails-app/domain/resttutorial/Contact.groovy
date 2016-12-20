package resttutorial

import grails.rest.Resource
import grails.plugin.dao.RestDaoController

import java.time.LocalDate
import java.time.LocalDateTime


class Contact {
  Salutations salutation
  String firstName
  String lastName
  String email

  LocalDate dateOfBirth
  TimeZone timeZone
  LocalDateTime activateOnDate

  Date dateCreated
  Date lastUpdated

  static constraints = {
    firstName nullable: false
    dateOfBirth nullable: true
  }

  enum Salutations {
    Ninja,
    Mr,
    Mrs,
    Ms,
    Dr,
    Rev
  }
}
