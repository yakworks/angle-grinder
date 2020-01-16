package agdemo

import org.apache.commons.lang.builder.EqualsBuilder
import org.apache.commons.lang.builder.HashCodeBuilder

class Note implements Serializable {

    String name
    String content

    Org  org

    static mapping = {
        org column: "orgId"
    }

    static constraints = {
        name blank: false, nullable: false, maxSize: 128
        content maxSize: 16384
        org nullable: false
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
