package demo

class Tag implements Serializable {
    String  name

    static constraints = {
        name nullable: false
    }
}
