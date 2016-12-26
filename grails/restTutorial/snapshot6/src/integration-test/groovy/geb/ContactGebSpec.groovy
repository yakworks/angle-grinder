package geb

import geb.spock.GebSpec
import grails.test.mixin.integration.Integration
import grails.transaction.Rollback
import resttutorial.Contact

@Integration
@Rollback
class ContactGebSpec extends GebSpec {

	void "Check contact page"() {
		when: "The contact page is visited"
		go '/contact'

		then: "The title is correct"
		title == "Welcome to Tutorial"
		then: "Contact list label"
		sleep(1000)
		$("h3").text() == 'Contact list'
	}

  void "Check grid sorting"() {
    when: "The home page is visited"
    go '/contact'
    def firstRow = $(".jqgrow.ui-row-ltr")[0]

    then: "First Row"
    firstRow.find("[aria-describedby='contactGrid_id']").text() == "1"
    firstRow.find("[aria-describedby='contactGrid_firstName']").text() == "Marie"
    firstRow.find("[aria-describedby='contactGrid_lastName']").text() == "Scott"

    when: "Change id ordering"
    $("#jqgh_contactGrid_id").click()
    sleep(1000)
    then:
    def lastRow = $(".jqgrow.ui-row-ltr")[0]
    lastRow.find("[aria-describedby='contactGrid_id']").text() == "100"
    lastRow.find("[aria-describedby='contactGrid_firstName']").text() == "Rebecca"
    lastRow.find("[aria-describedby='contactGrid_lastName']").text() == "Spencer"

  }

  void "Check grid filtering"() {
    when: "The home page is visited"
    go '/contact'
    def searchForm = $("form.ag-search-form")
    searchForm.filtersFirstName = "Jos"
    searchForm.find("[type='submit']").click()

    then: "Should be 1 row after filtering"
    $(".jqgrow.ui-row-ltr").size() == 1 // just one row in grid

    when: "Reset filtering"
    $("[ng-click='resetSearch(filters)']").click()
    then: "Should be 5 rows"
    $(".jqgrow.ui-row-ltr").size() == 5

  }

	void "Check edit contact"() {
		when: "The home page is visited"
		go '/contact'
		def lastRow = $(".jqgrow.ui-row-ltr")[-1]
		lastRow.find(".jqg-row-action").click()
		sleep(1000)
		$(".row_action_edit").click()

		then: "Dialog is opened"
        sleep(5000)
		$(".modal-dialog form") != null
		$(".modal-dialog form").firstName == "Susan"
		$(".modal-dialog form").lastName == "Duncan"
		$(".modal-dialog form").email == "sduncan4@diigo.com"
		$(".modal-dialog form").salutation == "Rev"
		when: "Changed values and save"
		$(".modal-dialog form").firstName = "Dr. Who"
		$(".modal-dialog [type='submit']").click()
		sleep(5000)
		then: "Contact list label"
		Contact contact = Contact.get(5)
		contact.firstName == "Dr. Who"
	}

	void "Check create new contact"() {
		when: "Click `Create Contact` button"
		go '/contact'
		$("[ng-click='createRecord()']").click()
		sleep(5000)

		then: "Dialog is opened"
		$(".modal-dialog form") != null
		when: "fill the form"
		$(".modal-dialog form").firstName = "Joe"
		$(".modal-dialog form").lastName = "Doe"
		$(".modal-dialog [type='submit']").click()
		sleep(5000)
		then: "Contact list label"
		Contact contact = Contact.last()
		contact.firstName == "Joe"
		contact.lastName == "Doe"
	}
}