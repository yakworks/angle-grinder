package agdemo

import com.coderberry.faker.FakerService
import agdemo.Org
import agdemo.OrgDao

class OrgDaoTests extends GroovyTestCase {

    def fakerService
    def orgDao

    void setUp() {
        fakerService = new FakerService()
        orgDao = new OrgDao()
    }

    void testInsert() {
        def json = [
                id: Org.first().id,
                class: Org.class.getName(),
                name: fakerService.companyName(),
                num: fakerService.numerify("##-##-##"),
                phone: fakerService.numerify("##-###-###-###"),
                state: fakerService.usState(),
                city: fakerService.city(),
                zip: fakerService.zipCode(),
                street: fakerService.streetAddress(),
                timeZone: "UTC-6",
                orgShowCaseId: 1,
                addressDate: "2008-02-18T23:00:00.000Z"
        ]
        def org = orgDao.insert(json).entity
        org.refresh()

        assert org
        assert org.addressDate

        Calendar cal = Calendar.getInstance()
        cal.setTime(org.addressDate)
        cal.setTimeZone(TimeZone.getTimeZone('UTC'))

        assertEquals 2008, cal.get(Calendar.YEAR)
        assertEquals 1, cal.get(Calendar.MONTH)
        assertEquals 18, cal.get(Calendar.DAY_OF_MONTH)
    }

    void testUpdate() {
        def json = [
                id: Org.first().id,
                class: Org.class.getName(),
                name: fakerService.companyName(),
                num: fakerService.numerify("##-##-##"),
                phone: fakerService.numerify("##-###-###-###"),
                state: fakerService.usState(),
                city: fakerService.city(),
                zip: fakerService.zipCode(),
                street: fakerService.streetAddress(),
                timeZone: "UTC+3",
                addressDate: "2015-02-06T15:00:00.000Z"
        ]
        def org = orgDao.update(json).entity
        org.refresh()

        assert org
        assert org.addressDate

        Calendar cal = Calendar.getInstance()
        cal.setTime(org.addressDate)
        cal.setTimeZone(TimeZone.getTimeZone('UTC'))

        assertEquals 2015, cal.get(Calendar.YEAR)
        assertEquals 1, cal.get(Calendar.MONTH)
        assertEquals 6, cal.get(Calendar.DAY_OF_MONTH)
    }
}
