package tutorial

import grails.rest.*

//TODO: add relations between org and location
@Resource(uri='/locations', formats=['json'])
class Location {
    String city
    String address
    static constraints = {
        city nullable: true
    }

}
