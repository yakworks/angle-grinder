import tutorial.*

class BootStrap {

    def init = { servletContext ->
        def Random generator = new Random()
        def createOrgParams = { params = [] ->
            params = [
                    name: "Org_${generator.nextInt(20)}"
            ] + params
            params
        }

        def createLocationParams= { params = [] ->
            params = [
                    city: "City_${generator.nextInt(20)}",
                    address: "Street, ${generator.nextInt(200)}"
            ] + params
            params
        }

        5.times{
            Org org = new Org(createOrgParams()).save()
            Location loc = new Location(createLocationParams([org: org])).save(flush: true)

        }

    }
    def destroy = {
    }
}
