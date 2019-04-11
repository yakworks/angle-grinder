package agdemo

import grails.test.mixin.TestFor
import spock.lang.Specification

@TestFor(Note)
class NoteTest extends Specification{

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
