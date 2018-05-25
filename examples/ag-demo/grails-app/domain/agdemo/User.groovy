package agdemo

import org.apache.commons.lang.builder.EqualsBuilder
import org.apache.commons.lang.builder.HashCodeBuilder

/**
 * User for user account.
 */
class User implements Serializable {

    static transients = ['pass']

    /** Username */
    String login

    /** MD5 Password */
    String passwd
    Boolean mustChangePassword = false
    Boolean inactive = false
    Date passwordChangedDate

    def setEnabled(val) { inactive = !val }

    def getEnabled() { return !inactive }

    Date activeDate
    Contact contact


    /** temporary plain password to create a MD5 password */
    String pass = '[secret]'


    static mapping = {
        cache true
        table 'Users'
        id generator: 'foreign', params: [property: 'contact']
        passwd column: 'password'
        contact column: 'contactId'
    }

    static constraints = {
        login blank: false, nullable: false, unique: true, maxSize: 50
        passwd blank: false, nullable: false, maxSize: 50, bindable: false
        contact nullable: false
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
