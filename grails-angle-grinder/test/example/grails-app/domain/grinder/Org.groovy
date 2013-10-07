package grinder

import org.apache.commons.lang.builder.EqualsBuilder
import org.apache.commons.lang.builder.HashCodeBuilder

class Org implements Serializable {

    String num
    String name

    String phone
    String street
    String city
    String state
    String zip
    String timeZone

    static mapping = {
        cache true
    }

    static constraints = {
        name blank: false, nullable: false, unique: true, maxSize: 50
        num blank: false, nullable: false, maxSize: 50
        phone nullable: true
        street nullable: true
        city nullable: true
        state nullable: true
        zip nullable: true
        timeZone nullable: true
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
