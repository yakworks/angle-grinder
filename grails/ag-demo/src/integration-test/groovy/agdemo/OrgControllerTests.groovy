package agdemo

import com.coderberry.faker.FakerService
import agdemo.Org
import agdemo.OrgController

class OrgControllerTests extends GroovyTestCase {

    def fakerService
    def controller

    void setUp() {
        fakerService = new FakerService()
        controller = new OrgController()
    }

    void testAddressDate() {
        def org = Org.first()
        controller.request.contentType = "application/json"
        controller.request.method = "POST"
        controller.request.JSON = [
                id: org.id,
                class: Org.class.getName(),
                name: fakerService.companyName(),
                num: fakerService.numerify("##-##-##"),
                phone: fakerService.numerify("##-###-###-###"),
                state: fakerService.usState(),
                city: fakerService.city(),
                zip: fakerService.zipCode(),
                street: fakerService.streetAddress(),
                timeZone: "UTC-6",
                addressDate: "2008-02-18T23:00:00.000Z"
        ]

        controller.update()
        org.refresh()

        assert org
        assert org.addressDate

        Calendar calendar = Calendar.getInstance()
        calendar.setTime(org.addressDate)
        calendar.setTimeZone(TimeZone.getTimeZone('UTC'))

        assertEquals 2008, calendar.get(Calendar.YEAR)
        assertEquals 1, calendar.get(Calendar.MONTH)
        assertEquals 18, calendar.get(Calendar.DAY_OF_MONTH)
    }
}
