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



grails {
    profile = 'web'
    codegen {
        defaultPackage = 'agdemo'
    }
}

info {
    app {
        name = '@info.app.name@'
        version = '@info.app.version@'
        grailsVersion = '@info.app.grailsVersion@'
    }
}

spring {
    groovy {
        template['check-template-location'] = false
    }
}

hibernate {
    naming_strategy = 'org.hibernate.cfg.DefaultNamingStrategy'
    cache {
        queries = false
    }
}

grails {
    mime {
        disable {
            accept {
                header {
                    userAgents = ['Gecko', 'WebKit', 'Presto', 'Trident']
                }
            }
        }

        types {
            all = '*/*'
            atom = 'application/atom+xml'
            css = 'text/css'
            csv = 'text/csv'
            form = 'application/x-www-form-urlencoded'
            html = ['text/html', 'application/xhtml+xml']
            js = 'text/javascript'
            json = ['application/json', 'text/json']
            multipartForm = 'multipart/form-data'
            rss = 'application/rss+xml'
            text = 'text/plain'
            hal = ['application/hal+json', 'application/hal+xml']
            xml = ['text/xml', 'application/xml']
        }
    }
    urlmapping {
        cache {
            maxsize = 1000
        }
    }
    controllers {
        defaultScope = 'singleton'
    }
    converters {
        encoding = 'UTF-8'
    }
    views {
        //default{ codec = 'html' }
        gsp {
            encoding = 'UTF-8'
            htmlcodec = 'xml'
            codecs {
                expression = 'html'
                scriptlets = 'html'
                taglib = 'none'
                staticparts = 'none'
            }
        }
    }
}
dataSource {
    pooled = true
    jmxExport = true
    driverClassName = 'org.h2.Driver'
    dbCreate = ''
    username = 'sa'
    password = ''
}
environments {
    development {
        dataSource {
            dbCreate = 'create-drop'
            url = 'jdbc:h2:mem:devDb;MVCC=TRUE;LOCK_TIMEOUT=10000;DB_CLOSE_ON_EXIT=FALSE'
        }
    }
    test {
        dataSource {
            dbCreate = 'update'
            url = 'jdbc:h2:mem:testDb;MVCC=TRUE;LOCK_TIMEOUT=10000;DB_CLOSE_ON_EXIT=FALSE'
        }
    }
}

app {
    resources {
        currentTenant = { return [id: 1, num: "test-tenant"] }
        setup.location = "setup" //directory under rootlocation where tenant specific config files can be put
        rootLocation = { args ->
            File file = new File("./rootLocation")
            if (!file.exists()) {
                println "Creating rootLocation ${file.canonicalPath}"
                file.mkdirs()
            }
            return file.canonicalPath
        }

    }
}

