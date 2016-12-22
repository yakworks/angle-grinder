package resttutorial

import grails.plugins.rest.client.RestBuilder
import grails.plugins.rest.client.RestResponse
import grails.test.mixin.integration.Integration
import org.grails.web.json.JSONElement
import spock.lang.Shared
import spock.lang.Specification

@Integration
class AddressControllerSpec extends Specification {

    def setup() {
    }

    def cleanup() {
    }

    @Shared
    RestBuilder rest = new RestBuilder()

    def getBaseUrl(){"http://localhost:${serverPort}/api"}

    void "check GET list request without params "() {
        when:
        RestResponse response = rest.get("${baseUrl}/address")

        then:
        response.status == 200
        response.json != null
        JSONElement json = response.json.rows
        //by default max value is 10 rows
        json.size() == 10
        json[0].city == "Humble"
        json[0].country == "US"
        json[0].postalCode == "77346"
        json[0].street == "42198 John Wall Drive"
    }

    void "check GET list request with max parameter"() {
        when: "list endpoint with max param"
        RestResponse response = rest.get("${baseUrl}/address?max=20")

        then:
        response.status == 200
        response.json != null
        JSONElement json = response.json.rows
        json.size() == 20
        json[0].city == "Humble"
        json[0].country == "US"
        json[0].postalCode == "77346"
        json[0].street == "42198 John Wall Drive"
    }

    void "check GET by id"() {
        when:
        RestResponse response = rest.get("${baseUrl}/address/1")

        then:
        response.status == 200
        response.json != null
        JSONElement json = response.json
        json.city == "Humble"
        json.country == "US"
        json.postalCode == "77346"
        json.street == "42198 John Wall Drive"

    }

    void "check POST request"() {
        when:
        RestResponse response = rest.post("${baseUrl}/address") {
            json([
                    street: "Test street",
                    "city": "Chicago",
                    "contact":["firstName": "bla"]
            ])
        }

        then:
        response.status == 201
        response.json != null
        JSONElement json = response.json
        json.street == "Test street"
        json.city == "Chicago"
    }


    void "check PUT request"() {
        when:
        RestResponse response = rest.put("${baseUrl}/address/101"){
            json([
                    street: "Test street2"
            ])
        }

        then:
        response.status == 200
        response.json != null
        JSONElement json = response.json
        json.id == 101
        json.street == "Test street2"
        json.city == "Chicago"
    }
}
