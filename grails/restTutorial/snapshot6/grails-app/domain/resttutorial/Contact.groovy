package resttutorial

import grails.rest.Resource
import grails.plugin.dao.RestDaoController

import java.time.LocalDate
import java.time.LocalDateTime


class Contact {
  static hasOne = [address: Address]
  Salutations salutation
  String firstName
  String lastName
  String email

  LocalDate dateOfBirth
  TimeZone timeZone
  LocalDateTime activateOnDate

  Date dateCreated
  Date lastUpdated
  Boolean inactive

  static constraints = {
    firstName nullable: false
    dateOfBirth nullable: true
    inactive bindable:false
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
