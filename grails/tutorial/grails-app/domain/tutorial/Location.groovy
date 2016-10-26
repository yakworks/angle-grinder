package tutorial

import grails.rest.*

class Location {
    String city
    String address
    static belongsTo = [org: Org]
    static constraints = {
        city nullable: true
    }

}
