package grinder

import grails.converters.JSON
import grails.plugin.dao.DomainException
import org.joda.time.DateTime
import org.joda.time.LocalDate

import java.text.SimpleDateFormat

class UserController extends BaseDomainController {
    static final int SC_UNPROCESSABLE_ENTITY = 422

    def domainClass = User

    def selectFields = ["*", "contact.*"]

    // TODO serve it as static asset
    def formTemplate() {
        render(template: "form")
    }

    // TODO serve it as static asset
    def searchPartial() {
        def user = new User()
        render(template: "search", model: [user: user])
    }


}
