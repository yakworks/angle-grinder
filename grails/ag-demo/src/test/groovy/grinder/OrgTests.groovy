package agdemo

import grails.test.*
import org.junit.*

@TestFor(Org)
class OrgTests {

    @Before
    void setUp() {
        def existingOrg = new Org(name: "github", num: "123-456")
        mockForConstraintsTests(Org, [existingOrg])
    }

    @Test
    void testValidate() {
        def org = new Org()
        assert !org.validate()

        assertEquals 3, org.errors.allErrors.size()
        assertEquals "nullable", org.errors["name"]
        assertEquals "nullable", org.errors["num"]
        assertEquals "nullable", org.errors["orgShowCaseId"]
    }

    @Test
    void testNameUniquenessValidation() {
        def org = new Org(name: "github", num: "234-567")

        assert !org.validate()
        assertEquals "unique", org.errors["name"]
        assert !org.errors["num"]
    }
}
