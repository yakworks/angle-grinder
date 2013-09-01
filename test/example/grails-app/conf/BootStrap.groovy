import grinder.ContactType

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
        for (i in 0..10) createOrg()

        // create users along with organizations
        def firstOrg = createOrg(name: "9ci", num: "111-111-111")
        def secondOrg = createOrg(name: "Apple", num: "222-222-222")
        def thirdOrg = createOrg(name: "Microsoft", num: "333-333-333")

        def sampleOrganizations = [firstOrg, secondOrg, thirdOrg]

        userDao.insert(
                login: "admin",
                password: "secretStuff",
                repassword: "secretStuff",

                contact: [
                        firstName: fakerService.firstName(),
                        lastName: fakerService.lastName(),
                        email: fakerService.email(),
                        org: [id: firstOrg.id],
                        type: ContactType.ADMIN
                ]
        )

        def randomContactType = { ->
            def n = generator.nextInt(2)
            [ContactType.ADMIN, ContactType.CUSTOMER][n]
        }

        for (i in 0..50) {
            def n = generator.nextInt(sampleOrganizations.size())
            def randomOrg = sampleOrganizations[n]

            def props = [
                    login: "login-$i",
                    password: "secretStuff",
                    repassword: "secretStuff",
                    inactive: generator.nextDouble() > 0.5,

                    contact: [
                            firstName: fakerService.firstName(),
                            lastName: fakerService.lastName(),
                            email: fakerService.email(),
                            org: [id: randomOrg.id],
                            type: randomContactType()
                    ]
            ]

            userDao.insert(props)
        }
    }

    def destroy = {}
}
