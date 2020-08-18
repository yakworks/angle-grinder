package demo

import gorm.tools.rest.RestApi

// @RestApi(description = "Customer domain")
class Customer implements Serializable {
    String name
    String num
    String street
    String city
    String state
    String postalCode
    String country
    String timezone

    static qSearchFields = ["name", "num"]
    static constraints = {
        name nullable: false
    }
}
