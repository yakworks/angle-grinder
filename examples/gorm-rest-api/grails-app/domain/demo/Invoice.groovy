package demo

import com.sun.org.apache.xpath.internal.operations.Bool

class Invoice implements Serializable {
    String refnum
    Date tranDate
    Customer customer
    BigDecimal amount
    String state
    String comments
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
