package agdemo

import java.time.LocalDate


class OrgShowCase implements Serializable {

    String name
    Org org
    Date exampleLocalDate
    Date exampleDateTime
    Date exampleDate

    static mapping = {
        cache true
        table 'OrgShowCase'
    }

    static constraints = {
        org nullable: true
        name nullable: true
    }

}
