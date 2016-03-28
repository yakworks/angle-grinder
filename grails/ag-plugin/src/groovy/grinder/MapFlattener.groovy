package grinder
import groovy.json.JsonSlurper
import org.apache.log4j.Logger

/**
 * MapFlattener taken from here https://github.com/dmillett/jConfigMap
 *
 *
 * @author dmillett
 *
 * Copyright 2011 David Millett
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 *  limitations under the License.
 */
class MapFlattener {

    private static final def Logger LOG = Logger.getLogger(MapFlattener.class)
    private final def KeyVersion _keyVersion = new KeyVersion()


    /**
     * Groovy transforms JSON to either a Map or List based on the root node.
     *
     * @param groovyJsonObject
     * @return A Map of String,String
     */
    def Map<String,String> flatten(Map groovyJsonObject) {

        def keyValues = new HashMap<String,String>()

        if ( groovyJsonObject == null )
        {
            return keyValues
        }

        if ( groovyJsonObject instanceof Map )
        {
            keyValues.putAll(transformGroovyJsonMap(groovyJsonObject, ""))
        }
        else if ( groovyJsonObject instanceof List )
        {
            keyValues.putAll(transformJsonArray(groovyJsonObject, ""))
        }
        else
        {
            // todo "foo": "bar"
        }

        return keyValues
    }

    /**
     * Iterates through each Map entry and transforms any sub-maps or sub-arrays
     * therein. Otherwise, it is just a string "key" and "value".
     *
     * @param jsonMap
     * @param currentName
     * @return
     */
    def Map<String,String> transformGroovyJsonMap(Map jsonMap, String currentName) {

        if ( jsonMap == null || jsonMap.isEmpty() )
        {
            return new HashMap<String,String>()
        }

        def keyValues = new HashMap<String,String>()

        jsonMap.each { entry ->

            def key = entry.key
            if ( currentName != null && !currentName.empty )
            {
                key = currentName + "." + key
            }
            //println("entry : ${entry.value.toString()}")
            if ( entry == null)
            {
                //entry.value = ""
                //println("Null Entry Or Entry Value")
            }

            //if it is an association id, then set value to 'null' to set the association to null
            else if((key && key.toString().endsWith(".id")) && (entry.value == null || entry.value.toString() == 'null' || entry.value.toString().trim() == "")) {
                _keyVersion.updateMapWithKeyValue(keyValues, key, "null")
            }

            else if (entry.value == null || entry.value?.toString() == 'null') {
                _keyVersion.updateMapWithKeyValue(keyValues, key, null)
            }

            else if ( entry.value instanceof List )
            {
                def jsonListKeyValues = transformJsonArray(entry.value, key)
                keyValues.putAll(jsonListKeyValues)
            }
            else if ( entry.value instanceof Map)
            {
                def jsonMapKeyValues = transformGroovyJsonMap(entry.value, key)
                keyValues.putAll(jsonMapKeyValues)
            }
            else
            {
                def value = String.valueOf(entry.value)

                if(value != null) {
                    value = value.trim() //trim strings - same as grails.databinding.trimStrings
                }
                //convert empty strings to null - same behavior as grails.databinding.convertEmptyStringsToNull
                if("".equals(value)) {
                    value = null
                }

                if (value != null && DateUtil.GMT_SECONDS.matcher(value).matches()) {
                    //FIXME dirty hack!!!
                    //XXX why did we use default format with trimmed time?
                    value = DateUtil.parseJsonDate(value).format("yyyy-MM-dd'T'hh:mm:ss'Z'")
                }
                _keyVersion.updateMapWithKeyValue(keyValues, key, value)
            }
        }

        return keyValues
    }

    /**
     * Flatten Groovy-JSON Array objects
     *
     * @param jsonArray
     * @param currentName
     * @return A map of String,String
     */
    def Map<String,String> transformJsonArray(List jsonArray, String currentName) {

        if ( jsonArray == null || jsonArray.empty )
        {
            return new HashMap<String, String>()
        }

        def keyValues = new HashMap<String,String>()
        keyValues.put(currentName, jsonArray)

        int index = 0

        jsonArray.each { jsonElement ->
            String arrayName = [currentName, index++].join('.')
            if ( jsonElement == null )
            {
                keyValues.put(arrayName, null)
            }
            else if ( jsonElement instanceof Map)
            {
                def jsonMapKeyValues = transformGroovyJsonMap(jsonElement, arrayName)
                _keyVersion.updateMapWithKeyValues(keyValues, jsonMapKeyValues)
            }
            else if ( jsonElement instanceof List )
            {
                def jsonArrayKeyValues = transformJsonArray(jsonElement, arrayName)
                _keyVersion.updateMapWithKeyValues(keyValues, jsonArrayKeyValues)
            }
            else
            {
                def value = String.valueOf(jsonElement)
                _keyVersion.updateMapWithKeyValue(keyValues, arrayName, value)
            }
        }

        return keyValues
    }


}

class KeyVersion {

    private def keyVersionCount = new HashMap<String,Integer>()

    def updateMapWithKeyValue(Map<String,String> originalMap, String key, String value) {

        // if ( key == null || value == null )
        // {
        //     return
        // }

        //def downcaseKey = key.toLowerCase()
        if ( keyVersionCount.containsKey(key) )
        {
            def indexedKey = buildIndexedKeyAndUpdateKeyCount(key)
            originalMap.put(indexedKey, value)
        }
        else
        {
            originalMap.put(key, value)
        }
    }


    def updateMapWithKeyValues(Map<String,String> originalMap, Map<String,String> additionalMap) {

        additionalMap.entrySet().each { entry ->

            def downcaseKey = entry.key
            if ( originalMap.containsKey(downcaseKey) )
            {
                def indexedKey = buildIndexedKeyAndUpdateKeyCount(downcaseKey)
                originalMap.put(indexedKey, entry.value)
            }
            else
            {
                originalMap.put(downcaseKey, entry.value)
            }
        }
    }

    def buildMapFromOriginal(original, additional) {

        def combinedMap = new HashMap()
        newMap.putAll(original)
        updateMapWithKeyValues(combinedMap, additional)

        return combinedMap
    }


    private def String buildIndexedKeyAndUpdateKeyCount(String key) {

        def downcaseKey = key
        def indexedKey = key

        if ( keyVersionCount.containsKey(key) )
        {
            def keyIndex = keyVersionCount.get(downcaseKey) + 1
            indexedKey = key + "." + keyIndex
            keyVersionCount.put(downcaseKey, keyIndex)
        }
        else
        {
            indexedKey = downcaseKey + "." + 1
            keyVersionCount.put(downcaseKey, 1)
        }

        return indexedKey
    }
}

