package demo

class Invoice implements Serializable {
    static hasMany = [tags: Tag]
    String refnum
    Date tranDate
    Customer customer
    BigDecimal amount
    String comments
    TranState state
    Boolean hasTax = false

    static mapping = {
        customer column: 'customerId'
        state enumType: 'identity'
    }

    static qSearchIncludes = ["name", "num"]
    static constraints = {
        comments size: 5..1000
    }
}
