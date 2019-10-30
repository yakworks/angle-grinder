package agdemo

import grails.testing.gorm.DomainUnitTest
import spock.lang.Specification

class NoteTest extends Specification implements DomainUnitTest<Note>{

    void test_validate() {
      when:
        def invalidNote = new Note()
      then:
        !invalidNote.validate()

         3 == invalidNote.errors.allErrors.size()
         "nullable" == invalidNote.errors["name"].getCode()
         "nullable" == invalidNote.errors["content"].getCode()
         "nullable" == invalidNote.errors["org"].getCode()
    }

}
