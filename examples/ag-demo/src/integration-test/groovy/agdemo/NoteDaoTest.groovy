package agdemo

import grails.gorm.transactions.Rollback
import grails.testing.mixin.integration.Integration
import spock.lang.Ignore
import spock.lang.Specification

@Integration
@Rollback
@Ignore
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
