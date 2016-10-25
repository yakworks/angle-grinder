package agdemo

import grails.test.*
import org.junit.*

@TestFor(Note)
class NoteTest {

    @Test
    void test_validate() {
        def invalidNote = new Note()
        assertFalse invalidNote.validate()

        assertEquals 3, invalidNote.errors.allErrors.size()
        assertEquals "nullable", invalidNote.errors["name"].getCode()
        assertEquals "nullable", invalidNote.errors["content"].getCode()
        assertEquals "nullable", invalidNote.errors["org"].getCode()
    }

}
