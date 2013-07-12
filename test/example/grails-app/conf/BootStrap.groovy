class BootStrap {

   def userDao
   def fakerService

    def init = { servletContext ->
     def Random generator = new Random()

     for (i in 0..100) {
      def props = [
        login: "login-$i",
        password: "secretStuff",
        repassword: "secretStuff",
        inactive: generator.nextDouble() > 0.5,

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
