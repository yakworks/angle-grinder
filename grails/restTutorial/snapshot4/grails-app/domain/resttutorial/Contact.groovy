package resttutorial

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
