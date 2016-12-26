package resttutorial

class Address {
    static belongsTo = [contact: Contact]
    String street
    String city
    String state
    String postalCode
    String country

    static constraints = {
        street nullable: false
    }
}
