package agdemo

import java.time.LocalDate


class OrgShowCase implements Serializable {

    String name
    Org org
    Date exampleLocalDate = new Date()
    Date exampleDateTime = new Date()
    Date exampleDate = new Date()

    static mapping = {
        cache true
        table 'OrgShowCase'
    }

    static constraints = {
        org nullable: true
        name nullable: true
    }

}
