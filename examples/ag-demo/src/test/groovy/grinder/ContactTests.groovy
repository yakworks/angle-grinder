package agdemo

import grails.test.mixin.TestFor
import spock.lang.Specification

@TestFor(Contact)
class ContactTests extends Specification{

    void testValidate() {
      when:
        def contact = new Contact()
        assert !contact.validate()
      then:
        4 == contact.errors.allErrors.size()
        "Property [{0}] of class [{1}] cannot be blank" == contact.errors["name"].defaultMessage
        "Property [{0}] of class [{1}] cannot be null" == contact.errors["type"].defaultMessage
        "Property [{0}] of class [{1}] cannot be null" == contact.errors["org"].defaultMessage
        "Property [{0}] of class [{1}] cannot be null" == contact.errors["firstName"].defaultMessage
    }

}
