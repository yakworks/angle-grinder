import grinder.Org

class BootStrap {

    def userDao
    def orgDao
    def fakerService

    def init = { servletContext ->
        def Random generator = new Random()

        def createOrg = { attributes = [] ->
            attributes = [
                name: fakerService.companyName(),
                num: fakerService.numerify("##-##-##"),

                phone: fakerService.numerify("##-###-###-###"),
                state: fakerService.usState(),
                city: fakerService.city(),
                zip: fakerService.zipCode(),
                street: fakerService.streetAddress()
            ] + attributes

            orgDao.insert(attributes).entity
        }

        // create some organizations
        for (i in 0..20) createOrg()

        // create users along with organizations
        def firstOrg = createOrg(name: "GitHub", num: "111-111-111")
        def secondOrg = createOrg(name: "9ci", num: "222-222-222")
        def thirdOrg = createOrg(name: "Microsoft", num: "333-333-333")

        def sampleOrganizations = [firstOrg, secondOrg, thirdOrg]

        for (i in 0..100) {
            def n = generator.nextInt(sampleOrganizations.size())
            def randomOrg = sampleOrganizations[n]

            def props = [
                    login: "login-$i",
                    password: "secretStuff",
                    repassword: "secretStuff",
                    inactive: generator.nextDouble() > 0.5,
                    orgId: randomOrg.id,
                    contact: [
                            firstName: fakerService.firstName(),
                            lastName: fakerService.lastName(),
                            email: fakerService.email()
                    ]
            ]

            userDao.insert(props)
        }
    }

    def destroy = {}
}
