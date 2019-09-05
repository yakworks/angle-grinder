package agdemo

import agdemo.NoteRepo
import grails.gorm.transactions.Rollback
import grails.testing.mixin.integration.Integration
import spock.lang.Specification

@Integration
@Rollback
class NoteDaoTest extends Specification {
    NoteRepo noteRepo

  void test_insert() {
        def org = Org.findByName("9ci")
        Map demo = Note.build().properties
        def props = [
                name: demo.name,
                content: demo.content,
                org: org
        ]

        def note = noteRepo.insert(props).entity
        assert note
    }
}
