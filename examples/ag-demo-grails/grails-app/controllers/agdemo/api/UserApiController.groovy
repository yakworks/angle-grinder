package agdemo.api

import gorm.restapi.controller.RestApiRepoController
import agdemo.User

class UserApiController extends RestApiRepoController<User> {

    UserApiController() {
        super(User, false)
    }
}
