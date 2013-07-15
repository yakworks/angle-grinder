package grinder

import grails.converters.JSON
//import grails.plugin.gson.converters.GSON
import grails.util.GrailsUtil
import grails.validation.ValidationException
import nine.rally.Org
import nine.rally.PagingData
import nine.rally.Contact
import nine.rally.User
import nine.rally.utils.ExportUtil

import grails.plugin.dao.GormDaoSupport
import grails.plugin.dao.DomainException
import grails.plugin.dao.DaoUtil
import grails.plugin.dao.DaoMessage
import static javax.servlet.http.HttpServletResponse.*
//import flexjson.JSONSerializer

class OrgController extends BaseDomainController {

    def domainClass = Org
    def ajaxGrid = true

    //XXX ken test me
	def pickList(){
    	println "params:$params"
		def ldata = new PagingData(params)
		def crit = domainClass.createCriteria()
		def qslike = (params.q) ? (params.q + "%") : null
		def datalist= crit.list(max:ldata.max,offset:ldata.offset) {

			if(qslike && qslike!='*%'){
				or{
					like 'name', qslike
					like 'num' , qslike
				}
			}
			if (params.sort)
				order(params.sort, params.order)
		}

		def pagedList = pagedList(datalist)
		render pagedList.jsonData as JSON
	}

}