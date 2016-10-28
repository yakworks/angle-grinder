package grinder


import javax.annotation.PostConstruct
import grails.util.GrailsNameUtils

//XXX - It doesnt seem to be used any more
class GrinderLabelService {

	static transactional = false

	def grailsApplication
	def messageSource

	//setup in init
	def gTagLib

	@PostConstruct
	def init(){

    	gTagLib = grailsApplication.mainContext.getBean('org.grails.plugins.web.taglib.ApplicationTagLib');
	}

    def columnSetup(List colModel, Class baseClass = null) {
		colModel.each{col->
			//handle id
    		if(col.name == 'id'){
    			extendMap(col,[key:true,hidden:true])
    		}
    		//do label
    		if(!col.containsKey('label')){
    			col.label = resolveLabel(col.name)
    		}
    	}
    	//colModel as JSON
    	return colModel
    }

    protected Map extendMap(Map orig, Map other){
		other.each{ k,v->
			if(!orig.containsKey(k)){
				orig[k] = v
			}
		}
	}

    /**
     * a propPath of arTran.customer.name will look for the followingkeys with the following order
     * [arTran.customer.name.label , customer.name.label , name.label , default.name.label]
     *
     * if passed in value starts with default then it just adds label to the end passes to
     */
    String resolveLabel(String propPath){
    	//skip the labelKey build if it starts with default
    	if(propPath.startsWith('default.')){
    		def lbl = propPath.endsWith('.label') ? propPath : "${propPath}.label"
    		return resolveMessage([lbl], GrailsNameUtils.getNaturalName(propPath))
    	}else{
    		def lblList = getLabelKeys(propPath)
			return resolveMessage(lblList, GrailsNameUtils.getNaturalName(propPath))
    	}
    }

    /**
     * a propPath of arTran.customer.name will look for the followingkeys with the following order
     * [arTran.customer.name.label , customer.name.label , name.label, default.name.label]
     *
     * if passed in value starts with default then it just adds label to the end passes to
     */
    List<String> getLabelKeys(String propPath) {
		def lblList = [
			"${propPath}.label"
		]
		def subPath = propPath
		int i = propPath.indexOf(".")

		if(i == -1)
			lblList.add("default.${subPath}.label")

        while (i > -1) {
            subPath = subPath.substring(i + 1, subPath.length())
            i = subPath.indexOf(".")
            lblList.add("${subPath}.label")
            if(i == -1){ //last one so prepend default
            	lblList.add("default.${subPath}.label")
            }
        }
        return lblList
	}

    String resolveMessage(List<String> keysInPreferenceOrder, String defaultMessage) {
    	def msg = keysInPreferenceOrder.findResult { key ->
    		//println "finding $key msg ${gTagLib.message(code:key) }"
    		gTagLib.message(code: key, default: null) ?: null
    	}
    	//println "using $msg for $keysInPreferenceOrder"
    	msg ?: defaultMessage
    }

}
