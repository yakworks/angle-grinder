package grinder
import org.apache.commons.lang.builder.EqualsBuilder
import org.apache.commons.lang.builder.HashCodeBuilder
import org.jadira.usertype.dateandtime.joda.PersistentDateTime
import org.jadira.usertype.dateandtime.joda.PersistentLocalDate
import org.joda.time.DateTime
import org.joda.time.LocalDate

class OrgShowCase implements Serializable {

    LocalDate exampleLocalDate
    DateTime exampleDateTime
    Date exampleDate

    static mapping = {
        cache true
        table 'OrgShowCase'
        exampleLocalDate type: PersistentLocalDate
        exampleDateTime type: PersistentDateTime
    }

}
