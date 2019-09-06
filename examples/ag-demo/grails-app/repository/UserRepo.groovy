package agdemo

import gorm.tools.beans.IsoDateUtil
import gorm.tools.databinding.BindAction
import gorm.tools.repository.GormRepo
import gorm.tools.repository.RepoMessage
import gorm.tools.repository.errors.EntityValidationException

class UserRepo implements GormRepo<User> {


    void afterBind(User instance, Map params, BindAction action) {
        if(action == BindAction.Create) {
            if(instance.contact) {
                instance.contact.org == Org.get(params.contact.org.id)
                checkPasswordChange(instance, params)
            }
        }
    }

    /**
     * checks params to see if password exists, that is matches repassword and encodes it if so
     * finally setting it to the passwd field on User.
     */
    def checkPasswordChange(user, params) {
        if (params.password?.trim()) {
            if (params.password != params.repassword) {
                def msg = RepoMessage.setup("password.mismatch", [0], "The passwords you entered do not match")
                throw new EntityValidationException(msg, user)
            } else {
                user.passwd = params.password
            }
        }
    }

    def parseDate(String dateName, def params){
        if (params[dateName] && params[dateName] instanceof String) {
            params[dateName] = IsoDateUtil.parse(params[dateName])
        }
    }
}
