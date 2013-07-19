import grinder.*

class BootStrap {

    def userDao
    def fakerService

    def init = { servletContext ->
        def Random generator = new Random()

        def firstOrg = new Org(id: 1, name: "First Org", num: "num 1")
        firstOrg.save(flush: true)

        def secondOrg = new Org(id: 2, name: "Second Org", num: "num 2")
        secondOrg.save(flush: true)

        def thirdOrg = new Org(id: 3, name: "Third Org", num: "num 3")
        thirdOrg.save(flush: true)

        for (i in 0..100) {

            def props = [
                    login: "login-$i",
                    password: "secretStuff",
                    repassword: "secretStuff",
                    inactive: generator.nextDouble() > 0.5,
                    orgId: firstOrg.id,
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
