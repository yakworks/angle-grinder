package geb

import geb.spock.GebReportingSpec
import geb.spock.GebSpec
import grails.plugins.rest.client.RestBuilder
import grails.plugins.rest.client.RestResponse
import grails.test.mixin.integration.Integration
import grails.transaction.Rollback
import resttutorial.Contact

/**
 * See http://www.gebish.org/manual/current/ for more instructions
 */
@Integration
@Rollback
class ContactGebSpec extends GebSpec {

    def setup() {
    }

    def cleanup() {
    }

    void "check GET request"() {
        given:
        RestBuilder rest = new RestBuilder()
        when: "list endpoint without params"
        RestResponse response = rest.get("http://localhost:${serverPort}/contacts")

        then:
        response.status == 200
        response.json != null
        //by default max value is 10 rows
        response.json.size() == 10
        response.json[0].firstName == "Marie"
        response.json[0].lastName == "Scott"
        response.json[0].email == "mscott0@ameblo.jp"

        when: "list endpoint with max param"
        response = rest.get("http://localhost:${serverPort}/contacts?max=20")

        then:
        response.status == 200
        response.json != null
        response.json.size() == 20
        response.json[0].firstName == "Marie"
        response.json[0].lastName == "Scott"
        response.json[0].email == "mscott0@ameblo.jp"

        when: "get endpoint with id"
        response = rest.get("http://localhost:${serverPort}/contacts/1")

        then:
        response.status == 200
        response.json != null
        response.json.firstName == "Marie"
        response.json.lastName == "Scott"
        response.json.email == "mscott0@ameblo.jp"

    }

    void "check POST request"() {
        given:
        RestBuilder rest = new RestBuilder()
        when:
        RestResponse response = rest.post("http://localhost:${serverPort}/contacts"){
            json([
                    firstName: "Test contact",
                    "email":"foo@bar.com"
            ])
        }

        then:
        response.status == 201
        response.json != null
        response.json.id == 101
        response.json.firstName == "Test contact"
        response.json.lastName == null
        response.json.email == "foo@bar.com"
    }

    void "check PUT request"() {
        given:
        RestBuilder rest = new RestBuilder()
        when:
        RestResponse response = rest.put("http://localhost:${serverPort}/contacts/101"){
            json([
                    firstName: "new Test contact",
                    "email":"newfoo@bar.com",
                    lastName: "Doe"
            ])
        }

        then:
        response.status == 200
        response.json != null
        response.json.id == 101
        response.json.firstName == "new Test contact"
        response.json.lastName == "Doe"
        response.json.email == "newfoo@bar.com"

        when: "first name is empty"
        response = rest.put("http://localhost:${serverPort}/contacts/101"){
            json([
                    firstName: "",
                    "email":"newfoo@bar.com",
                    lastName: "Doe"
            ])
        }

        then:
        response.status == 422
    }

    void "check DELETE request"() {
        given:
        RestBuilder rest = new RestBuilder()
        when:
        Contact contact = Contact.get(1)
        assert contact != null
        RestResponse response = rest.delete("http://localhost:${serverPort}/contacts/1")

        then:
        response.status == 204
        Contact.get(1) == null
    }
}
