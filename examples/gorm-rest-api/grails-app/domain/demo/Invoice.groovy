package demo

class Invoice implements Serializable {
    String refnum
    Date tranDate
    Customer customer
    BigDecimal amount
    String comments
    TranState state
    Tag tag
    Boolean hasTax = false


    static qSearchFields = ["name", "num"]
    static constraints = {
        tranDate nullable: true
        customer nullable: true
        tranDate nullable: true
        state nullable: true
        comments nullable: true
        amount nullable: true
    }
}
