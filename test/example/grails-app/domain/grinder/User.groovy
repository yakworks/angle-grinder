package grinder

import org.apache.commons.lang.builder.EqualsBuilder
import org.apache.commons.lang.builder.HashCodeBuilder

/**
 * User for user account.
 */
//@gorm.AuditStamp
class User implements Serializable {

    static transients = ['pass']
    //static hasMany = [roles: SecRole]
    //static belongsTo = SecRole

    /** Username */
    String login

    /** MD5 Password */
    String passwd
    Boolean mustChangePassword = false
    Boolean inactive = false
    Date passwordChangedDate

    def setEnabled(val) { inactive = !val }

    def getEnabled() { return !inactive }

    Contact contact

    //Long clientId = 1
    /** temporary plain password to create a MD5 password */
    String pass = '[secret]'

    //TODO add lastlogin to this sucker


    static mapping = {
        cache true
        table 'Users'
        id generator: 'foreign', params: [property: 'contact']
        passwd column: 'password'
        //roles column: 'userId', joinTable: 'SecRoleUser'
        contact column: 'contactId'
    }

    static constraints = {
        login blank: false, nullable: false, unique: true, maxSize: 50
        contact nullable: false
        passwd blank: false, nullable: false, maxSize: 50, bindable: false
        passwordChangedDate nullable: true, bindable: false
        mustChangePassword bindable: false
    }


    @Override
    boolean equals(final Object that) {
        if ((that == null) || (that.getClass() != getClass())) return false
        if (super.equals(that)) return true
        if (this.id == null) return EqualsBuilder.reflectionEquals(this, that, ["id"])
        return this.id.equals(that.id)
    }

    @Override
    public int hashCode() throws IllegalStateException {
        if (id == null) return HashCodeBuilder.reflectionHashCode(this, ["id"])
        return this.id.hashCode()
    }
}
