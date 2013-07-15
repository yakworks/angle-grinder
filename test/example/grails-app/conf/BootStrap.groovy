import grinder.*

class BootStrap {

   def userDao
   def fakerService

    def init = { servletContext ->
     def Random generator = new Random()

     for (i in 0..100) {
      def org = new Org(name:"org $i", num:"num $i")
      org.save(flush:true)
      def props = [
        login: "login-$i",
        password: "secretStuff",
        repassword: "secretStuff",
        inactive: generator.nextDouble() > 0.5,
        orgId:org.id,
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
