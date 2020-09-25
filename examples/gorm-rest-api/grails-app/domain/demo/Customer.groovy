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

    static List qSearchIncludes = ["name", "num"]
    static List picklistIncludes = ['id', 'num', 'name']

    static constraints = {
        name nullable: false
        street(validator: { val, thisdoc ->
            if(val == '911') return ['wrong']
            return true
        })
        city(validator: { val, thisdoc ->
            if(thisdoc.street && !val) return ['wrong']
            return true
        })
    }
}
