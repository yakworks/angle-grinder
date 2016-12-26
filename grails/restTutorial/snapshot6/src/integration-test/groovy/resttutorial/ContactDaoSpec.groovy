package resttutorial

import grails.test.mixin.integration.Integration
import spock.lang.Specification

@Integration
class ContactDaoSpec extends Specification {
    def contactDao
    def setup() {
    }

    def cleanup() {
    }


    void "check insert with name"() {
        when:
        Map result = contactDao.insert([name: "Joe Cool"])

        then:
        result.ok
        result.entity.firstName == "Joe"
        result.entity.lastName == "Cool"
    }

    void "check inactivate"() {
        when:
        def result = contactDao.inactivate(5)

        then:
        result.inactive == true
    }
}
