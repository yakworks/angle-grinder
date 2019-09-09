package agdemo

import java.time.LocalDate
import java.time.LocalDateTime

class OrgShowCase implements Serializable {

    String name
    Org org
    LocalDate exampleLocalDate = LocalDate.now()
    LocalDateTime exampleDateTime = LocalDateTime.now()
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
