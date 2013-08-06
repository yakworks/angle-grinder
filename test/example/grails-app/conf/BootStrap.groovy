import grinder.Org

class BootStrap {

    def userDao
    def fakerService

    def init = { servletContext ->
        def Random generator = new Random()

        def firstOrg = new Org(id: 1, name: "github", num: "111-111-111")
        firstOrg.save(flush: true)

        def secondOrg = new Org(id: 2, name: "9ci", num: "222-222-222")
        secondOrg.save(flush: true)

        def thirdOrg = new Org(id: 3, name: "Microsoft", num: "333-333-333")
        thirdOrg.save(flush: true)

        for (i in 0..50) {
            def org = new Org(name: fakerService.companyName(), num: fakerService.numerify("##-##-##"))
            org.save(flush: true)
        }

        def orgs = [firstOrg, secondOrg, thirdOrg]

        for (i in 0..100) {
            def n = generator.nextInt(orgs.size())
            def randomOrg = orgs[n]

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
