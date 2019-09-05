package agdemo

import grails.test.mixin.integration.Integration
import grails.transaction.Rollback
import spock.lang.Specification

@Integration
@Rollback
class NoteDaoTest extends Specification {
    def noteDao



    void test_insert() {
        def org = Org.findByName("9ci")
        Map demo = Note.build().properties
        def props = [
                name: demo.name,
                content: demo.content,
                org: org
        ]

        def note = noteDao.insert(props).entity
        assert note
    }
}
