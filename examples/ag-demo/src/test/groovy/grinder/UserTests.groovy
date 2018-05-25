package agdemo

import grails.test.mixin.TestFor
import spock.lang.Specification

@TestFor(User)
class UserTests extends Specification{

    void setup() {
      def existingUser = new User(login: "test")
    }

    void testValidate() {
      when:
        def invalidUser = new User()
        assert !invalidUser.validate()
      then:
         4 == invalidUser.errors.allErrors.size()
         "nullable" == invalidUser.errors["login"].getCode()
         "nullable" == invalidUser.errors["passwd"].getCode()
         "nullable" == invalidUser.errors["contact"].getCode()
         "nullable" == invalidUser.errors["activeDate"].getCode()
      when:
        def contact = new Contact()
        def validUser = new User(login: "login", contact: contact)
        validUser.passwd = "password"
        validUser.activeDate = new Date()
      then:
        validUser.validate()
    }
}
