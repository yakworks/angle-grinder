/*
* Copyright 2019 9ci - Licensed under the Apache License, Version 2.0 (the "License")
* You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
*/
package grinder

import groovy.transform.CompileStatic

/**
 * Used mainly by BeanPathTools
 *
 * A delegating bean delegates all its properties/method calls to the target bean unless the property/method is explicitely specified in delegating bean itself.
 * Delegating beans are specifically used to create the domains view for list screen where the screens needs domain columns
 * which are not part of the domain.
 *
 * Delegating bean helps keeping the domain clean by not stuffing every property/method in the domain class itself
 * Just to generate the list screen
 *
 * Example: customre list screen needs customer.calcs - calcs can be customer cals or branch calcs based on branch login
 * DelegatingBean can be used to keep customer clean of this stuff by defining getCals() in delegating bean or customer dao.
 */

@CompileStatic
class DelegatingBean {
    def target

    DelegatingBean(target) {
        this.target = target
    }

    def propertyMissing(String name) {
        return target[name]
    }

    def methodMissing(String name, args) {
        return target.invokeMethod(name, args)
    }
}
