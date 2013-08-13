import grinder.Org

class BootStrap {

    def userDao
    def orgDao
    def fakerService

    def init = { servletContext ->
        def Random generator = new Random()

        def firstOrg = orgDao.insert(name: "github", num: "111-111-111").entity
        def secondOrg = orgDao.insert(name: "9ci", num: "222-222-222").entity
        def thirdOrg = orgDao.insert(name: "Microsoft", num: "333-333-333").entity
        def sampleOrganizations = [firstOrg, secondOrg, thirdOrg]

        for (i in 0..50) {
            def org = new Org(name: fakerService.companyName(), num: fakerService.numerify("##-##-##"))
            org.save(flush: true)
        }

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

    def destroy = {
    }
}
