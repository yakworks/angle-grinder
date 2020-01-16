package agdemo

import org.springframework.web.context.request.RequestContextHolder
import org.springframework.web.context.support.WebApplicationContextUtils

import agdemo.Org
import agdemo.OrgController
import grails.converters.JSON
import grails.testing.mixin.integration.Integration
import grails.transaction.Rollback
import grails.web.context.ServletContextHolder
import spock.lang.Ignore
import spock.lang.Shared
import spock.lang.Specification

@Ignore
@Integration
@Rollback
class OrgControllerTests extends Specification {

    @Shared OrgController controller

    void setup() {
        controller = new OrgController()
      def webRequest = RequestContextHolder.getRequestAttributes()
      if(!webRequest) {
        def servletContext  = ServletContextHolder.getServletContext()
        def applicationContext = WebApplicationContextUtils.getRequiredWebApplicationContext(servletContext)
        webRequest =  grails.util.GrailsWebMockUtil.bindMockWebRequest(applicationContext)
      }
    }

    void tesAddressDate() {
      when:
        Org org = Org.first()
        controller.request.method = "POST"
        controller.request.setContent(([
                id: 1L,
                class: Org.class.getName(),
                name: "stark corp",
                num: "11-22-33",
                phone: ("11-234-567-890"),
                state: "NY",
                city: "New York",
                zip: "1123334",
                street: "Backer st",
                timeZone: "UTC-6",
                addressDate: "2008-02-18T23:00:00.000Z"
        ] as JSON).toString() as byte[])
        controller.update()
        controller.params.id = 1L

        assert org
        assert org.addressDate

        Calendar calendar = Calendar.getInstance()
        calendar.setTime(org.addressDate)
        calendar.setTimeZone(TimeZone.getTimeZone('UTC'))
      then:
        2008 == calendar.get(Calendar.YEAR)
        1 == calendar.get(Calendar.MONTH)
        18 == calendar.get(Calendar.DAY_OF_MONTH)
    }
}
