import agdemo.Contact
import agdemo.Org
import agdemo.OrgRepo
import agdemo.User
import grails.core.GrailsApplication
import groovy.json.JsonSlurper


class BootStrap {

    OrgRepo orgRepo
    GrailsApplication grailsApplication

    def init = { servletContext ->
        def contactFile = grailsApplication.mainContext.getResource("classpath:contact.json")
        def userFile = grailsApplication.mainContext.getResource("classpath:user.json")
        def orgFile = grailsApplication.mainContext.getResource("classpath:org.json")
        def orgs = new JsonSlurper().parse(orgFile.getInputStream())
        orgs.each {
            it.description = (it.description.size() >= 255) ? it.description[0..254] : it.description
            orgRepo.insert(it)
        }

        def contacts = new JsonSlurper().parse(contactFile.getInputStream())
        contacts.eachWithIndex { it, i ->
            Contact contact = new Contact(it)
            contact.org = Org.get(i + 1)
            contact.persist()
        }

        def users = new JsonSlurper().parse(userFile.getInputStream())
        users.eachWithIndex { it, i ->
            User user = new User(it)
            user.passwd = it.passwd
            user.contact = Contact.get(i + 1)
            user.persist()
        }
    }

    def destroy = {}
}
