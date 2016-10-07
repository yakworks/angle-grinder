package grinder

import grails.rest.Resource
import grinder.api.RestDaoController
import org.apache.commons.lang.builder.EqualsBuilder
import org.apache.commons.lang.builder.HashCodeBuilder
import org.jadira.usertype.dateandtime.joda.PersistentDateTime
import org.jadira.usertype.dateandtime.joda.PersistentLocalDate
import org.joda.time.DateTime
import org.joda.time.LocalDate
@Resource(superClass = RestDaoController)
class OrgShowCase implements Serializable {

    String name
    Org org
    LocalDate exampleLocalDate
    DateTime exampleDateTime
    Date exampleDate

    static mapping = {
        cache true
        table 'OrgShowCase'
        exampleLocalDate type: PersistentLocalDate
        exampleDateTime type: PersistentDateTime
    }

    static constraints = {
        org nullable: true
        name nullable: true
    }

}
