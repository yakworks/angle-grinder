package agdemo

import grails.core.GrailsDomainClass
import grails.util.GrailsClassUtils
import grails.util.Holders
import org.grails.core.artefact.DomainClassArtefactHandler


class ExportUtil {

    static def grailsApplication = Holders.grailsApplication

    private static Map excludes = [hasMany: true, belongsTo: true, searchable: true, __timeStamp: true,
            constraints: true, version: true, metaClass: true]

    private ExportUtil() {
        throw new AssertionError()
    }

    public static Object getNestedValue(Object domain, String field) {
        def subProps = field.split("\\.")

        int i = 0
        def lastProp
        for (prop in subProps) {
            if (i == 0) {
                lastProp = domain."$prop"
            } else {
                lastProp = lastProp."$prop"
            }
            i += 1
        }

        return lastProp
    }

    public static Object getFieldValue(Object domain, String field) {
        def bean = getNestedBean(domain, field)
        field = GrailsClassUtils.getShortName(field)
        return bean?."$field"
    }
    /**
     * returns the depest nested bean
     * */
    static getNestedBean(Object bean, String path) {
        int i = path.lastIndexOf(".");
        if (i > -1) {
            path = path.substring(0, i);
            path.split('\\.').each { bean = bean?."$it" }
        }
        return bean;
    }

    public static List getFields(Object domain) {
        List props = []

        domain?.class?.properties?.declaredFields.each { field ->
            if (!excludes.containsKey(field.name) && !field.name.contains("class\$") && !field.name.startsWith("__timeStamp")) {
                props.add(field.name)
            }
        }

        props.sort()

        return props
    }

    /*
    * Method for appending common qbxml header with all the request sent to quickbooks from greenbill
    */

    static def appendQbXmlHeader(writer) {
        writer.append('<?xml version="1.0" encoding="utf-8"?> \n')
        writer.append('<?qbxml version="6.0"?> \n')
        writer.append('<!DOCTYPE document SYSTEM "http://webapps.quickbooks.com/dtds/qbxml60.dtd">\n')
        //return writer.toString()
    }

    //XXX add test for this
    static Map buildMapFromPaths(obj, List propList) {
        //FIXME we should look into do something like LazyMetaPropertyMap in grails-core that wraps the object and delegates
        def rowMap = [:]
        propList.each { key ->
            propsToMap(obj, key, rowMap)
        }
        return rowMap

    }

    static Map propsToMap(Object obj, String propertyPath, Map currentMap) {
        final int nestedIndex = propertyPath.indexOf('.');
        GrailsDomainClass domainClass = (GrailsDomainClass) grailsApplication.getArtefact(DomainClassArtefactHandler.TYPE, obj.getClass().getName())
        //no idex then its just a property
        if (nestedIndex == -1) {
            if (propertyPath == '*') {
                def pprops = domainClass.persistentProperties
                def id = domainClass.getIdentifier().name //add the id prop
                currentMap[id] = obj?."$id"
                pprops.each {
                    currentMap[it.name] = obj?."$it.name"
                }
            } else {
                currentMap[propertyPath] = obj?."$propertyPath"
            }

            return
        }
        // We have at least one sub-key, so extract the first element
        // of the nested key as the prfix. In other words, if we have
        // 'nestedKey' == "a.b.c", the prefix is "a".
        String nestedPrefix = propertyPath.substring(0, nestedIndex);
        if (!currentMap.containsKey(nestedPrefix)) {
            currentMap[nestedPrefix] = [:]
        }
        if (!(currentMap[nestedPrefix] instanceof Map)) {
            currentMap[nestedPrefix] = [:]
        }

        def nestedObj = obj."$nestedPrefix"
        String remainderOfKey = propertyPath.substring(nestedIndex + 1, propertyPath.length());
        //recursive call
        propsToMap(nestedObj, remainderOfKey, currentMap[nestedPrefix])


    }

}
