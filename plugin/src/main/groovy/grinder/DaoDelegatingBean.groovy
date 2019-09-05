/*
* Copyright 2019 9ci - Licensed under the Apache License, Version 2.0 (the "License")
* You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
*/
package grinder

import groovy.transform.CompileStatic
import groovy.transform.TypeCheckingMode

import org.grails.datastore.gorm.GormEntity

//Delegates missing properties as method calls to the dao for the domain class
@CompileStatic
class DaoDelegatingBean extends DelegatingBean {
    def dao

    @CompileStatic(TypeCheckingMode.SKIP)
    DaoDelegatingBean(GormEntity target) {
        super(target)
        dao = target.getDao()
    }

    //first try if target bean has property, if not, check if dao has the method
    def propertyMissing(String name) {
        try {
            return super.propertyMissing(name)
        }catch (MissingPropertyException e) {
            String method
            if(name.startsWith("has") || name.startsWith("is")) {
              method = name
            }
            else method = "get" + name.capitalize()

            try {
                return dao.invokeMethod(method, target)
            }catch (MissingMethodException me) {
                //dao does not have that method either, so throw back original MissingPropertyException exception
                throw e
            }
        }
    }

    def methodMissing(String name, Map args) {
        try {
            return target.invokeMethod(name, args)
        }catch (MissingMethodException e) {
            try {
                dao.invokeMethod(name, args)
            }catch (MissingMethodException me) {
                //if dao does not have the method either, throw back original exception
                throw e
            }
        }
    }

}
