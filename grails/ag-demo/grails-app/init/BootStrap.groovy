import agdemo.Org
import grails.converters.JSON
import agdemo.ContactType


class BootStrap {

    def userDao
    def orgDao
    def noteDao
    //def orgShowCaseDao

    def fakerService

    def init = { servletContext ->
        def Random generator = new Random()

        def randomDate = { ->
            def randBetween = { start, end ->
                start + (int)Math.round(Math.random() * (end - start))
            }

            GregorianCalendar gc = new GregorianCalendar()

            int year = randBetween(1983, 2013)
            gc.set(gc.YEAR, year)

            int dayOfYear = randBetween(1, gc.getActualMaximum(gc.DAY_OF_YEAR))
            gc.set(gc.DAY_OF_YEAR, dayOfYear)

            gc.getTime()
        }

        def createOrgShowCase = { attributes = [] ->
            attributes = [
                    name: fakerService.companyName(),
                    exampleDate: randomDate(),
                    exampleDateTime: randomDate(),
                    exampleLocalDate: randomDate()
            ] + attributes

            //orgShowCaseDao.insert(attributes).entity
        }

        def createOrg = { attributes = [] ->
            // get sample timeZones
            def sampleTimeZones = ["UTC-6", "UTC-2", "UTC", "UTC+2"]
            def timeZone = sampleTimeZones[generator.nextInt(sampleTimeZones.size())]

            attributes = [
                name: fakerService.companyName(),
                num: fakerService.numerify("##-##-##"),

                phone: fakerService.numerify("##-###-###-###"),
                state: fakerService.usState(),
                city: fakerService.city(),
                zip: fakerService.zipCode(),
                street: fakerService.streetAddress(),
                timeZone: timeZone/*,
                orgShowCaseId: createOrgShowCase().id*/

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

        sampleOrganizations.each { org ->
            for (i in 0..50) {
                // create 50 sample notes
                noteDao.insert(
                        org: org,
                        name: fakerService.name(),
                        content: fakerService.paragraph(3)
                )
            }
        }


        userDao.insert(
                login: "admin",
                password: "secretStuff",
                repassword: "secretStuff",
                inactive: false,
                activeDate: randomDate(),
				birthDate: randomDate(),
				postDate: randomDate(),
				reminderDate: randomDate(),

                contact: [
                        firstName: fakerService.name(),
                        lastName: fakerService.name(),
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
                    activeDate: randomDate(),
					birthDate: randomDate(),
					postDate: randomDate(),
					reminderDate: randomDate(),

                    contact: [
                            firstName: fakerService.name(),
                            lastName: fakerService.name(),
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
