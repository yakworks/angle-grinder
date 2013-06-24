class BootStrap {

	def userDao

    def init = { servletContext ->

   		for ( i in 0..100 ) {
   			def props = [
   				login:"login$i", password:'secretStuff', repassword:'secretStuff',
				contact:[firstName:'fname$it',lastName:'lname$it', email:"email@email.com"]
			]
			userDao.insert(props)
   		}
    }
    def destroy = {
    }
}
