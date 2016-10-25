package agdemo

import org.apache.commons.lang.builder.EqualsBuilder
import org.apache.commons.lang.builder.HashCodeBuilder

class Contact {
    String num
    String name

    Boolean tagForReminders = false
    Boolean inactive = false
    Boolean isPrimary = false

    String email // default
    String phone // default

    String firstName
    String middleName
    String lastName
    String nickName
    String salutation
    String jobTitle
    String department
    Date birthday
    String comments

    ContactType type

    Org  org

    def isUserEnabled() {
        return (user && user.enabled) ? true : false
    }

    def beforeInsert() {
        concatName()
    }

    def beforeValidate() {
        concatName()
    }

    def concatName() {
        def fullName = (firstName ?: "") + ' ' + (lastName ?: "")
        name = fullName.size() > 50 ? fullName[0..49] : fullName
    }

    static mapping = {
        cache true
        org column: "orgId"
        type defaultValue: ContactType.CUSTOMER
    }

    static constraints = {
        name blank: false, nullable: false, maxSize: 50
        num nullable: true, maxSize: 50

        inactive nullable: false
        isPrimary nullable: false

        firstName blank: false, nullable: false, maxSize: 50
        middleName nullable: true, maxSize: 50
        lastName nullable: true, maxSize: 50
        nickName nullable: true, maxSize: 50
        salutation nullable: true, maxSize: 50
        jobTitle nullable: true, maxSize: 50
        department nullable: true, maxSize: 50
        birthday nullable: true
        comments nullable: true

        email nullable: true, unique: true
        phone nullable: true

        tagForReminders nullable: false

        org nullable: false
        type blank: false
    }

    @Override
    boolean equals(final Object that) {
        if (this.is(that)) return true
        if ((that == null) || (that.getClass() != getClass())) return false
        if (this.id == null) {
            return new EqualsBuilder()
                    .appendSuper(super.equals(that))
                    .append(name, that.name)
                    .append(org, that.org)
                    .isEquals();
        }
        return this.id.equals(that.id)
    }

    @Override
    public int hashCode() throws IllegalStateException {
        if (id == null)
            return new HashCodeBuilder()
                    .append(name)
                    .append(org)
                    .toHashCode();

        return this.id.hashCode()
    }

    static listActive(Long orgId) {
        return Contact.createCriteria().list {
            eq("inactive", false)
        }
    }
}

enum ContactType {
    ADMIN("admin"), CUSTOMER("customer")

    final String name

    ContactType(String name) {
        this.name = name
    }

    static ContactType byName(String name) {
        values().find { it.name == name }
    }
}
