grails{
    plugin{
        audittrail{
            createdBy.field  = "createdBy"
            createdBy.type   = "java.lang.Long" //fully qualified class name if not a java.lang.(String,Long,etc..)

            createdDate {
                field = "createdDate" //
                type  = "java.util.Date" //the class name type
            }
            //Will try a joda time on this one
            editedDate.field  = "editedDate"//date edited

            editedBy.field  = "updatedBy" //id who updated/edited
            editedBy.type   = "java.lang.Long" //fully qualified class name if not a java.lang.(String,Long,etc..)
            editedBy.constraints = "nullable:true, max:90000l,bindable:false"
            editedBy.mapping = "column: 'whoUpdated'"

        }
    }
}
grails.plugin.springsecurity.active = false

grails.resources.pattern = '/**'
grails.databinding.dateFormats = ["yyyy-MM-dd'T'HH:mm:ss'Z'", "yyyy-MM-dd'T'HH:mm:ss.S'Z'","yyyy-MM-dd'T'HH:mm:ss","yyyy-MM-dd"]
