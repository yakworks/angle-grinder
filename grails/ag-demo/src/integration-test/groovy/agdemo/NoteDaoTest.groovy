package agdemo

import agdemo.Org
import agdemo.NoteDao

import org.junit.*
import com.coderberry.faker.*

class NoteDaoTest extends GroovyTestCase {
    def FakerService fakerService
    def noteDao

    @Before
    void setUp() {
        fakerService = new FakerService()
        noteDao = new NoteDao()
    }

    @Test
    void test_insert() {
        def org = Org.findByName("9ci")
        def props = [
                name: fakerService.name(),
                content: fakerService.paragraph(5),
                org: org
        ]

        def note = noteDao.insert(props).entity
        assert note
    }
}
