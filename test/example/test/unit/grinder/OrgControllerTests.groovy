package grinder

import grails.test.mixin.domain.DomainClassUnitTestMixin
import grails.test.*
import org.junit.*

@TestFor(OrgController)
@TestMixin(DomainClassUnitTestMixin)
class OrgControllerTests {

    @Test
    void testListAll() {
        // Given
        mockDomain(Org, [
            [id: 1, name: "GitHub", num: "111", city: "Seattle"],
            [id: 2, name: "9ci", num: "222", city: "Chicago"],
            [id: 3, name: "Microsoft", num: "333"]
        ])

        // When
        controller.listAll()

        // Then it renders valid json response
        assert response.text

        def json = response.json
        assertEquals 3, json.size()

        def first = json.get(0)
        assertEquals 1, first.id
        assertEquals "GitHub", first.name
        assertEquals "111", first.num

        def second = json.get(1)
        assertEquals 2, second.id
        assertEquals "9ci", second.name
        assertEquals "222", second.num

        def third = json.get(2)
        assertEquals 3, third.id
        assertEquals "Microsoft", third.name
        assertEquals "333", third.num
    }

}
