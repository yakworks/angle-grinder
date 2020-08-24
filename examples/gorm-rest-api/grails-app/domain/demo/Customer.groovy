package demo

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
        street(validator: { val, thisdoc ->
            if(val == '911') return ['wrong']
            return true
        })
    }
}
