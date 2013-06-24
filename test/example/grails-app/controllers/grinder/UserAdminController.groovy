package grinder

import grails.converters.JSON
//import grails.plugin.gson.converters.GSON
import grails.util.GrailsUtil
import grails.validation.ValidationException

import grinder.Contact
import grinder.User
import grinder.ExportUtil

import grails.plugin.dao.GormDaoSupport
import grails.plugin.dao.DomainException
import grails.plugin.dao.DaoUtil
import grails.plugin.dao.DaoMessage
import static javax.servlet.http.HttpServletResponse.*
import grinder.Pager

//XXX ken test me
class UserAdminController extends BaseDomainController {
	static final int SC_UNPROCESSABLE_ENTITY = 422
    def domainClass = User
    def ajaxGrid = true
	//static scaffold = User

    //injected beans
    def grinderLabelService

    def index(){
		//[colModel:colModel()]
	}
    
    def selectFields = ["*","primaryRole","roles"]
    //def excludeFields = ["passwd","passwordChangedDate","mustChangePassword"]
    //def marshallFields = ["*","contact","contact.org"]
	def columnModel = [
      	[name:'id'] ,
      	[name:'contact.name', width:100, formatter:'editActionLink' ] ,
      	[name:'login', width:70 ] ,
      	[name:'contact.email', width:70, align:"right", formatter:'email' ] ,
      	[name:'inactive', width:30, align:"center", formatter:'okIcon' ]
    ]


    protected def listCriteria(){
    	//println "params:$params"
		def pager = new Pager(params)
		def crit = domainClass.createCriteria()
		def filters = params.filters ? JSON.parse(params.filters) : null
		println "filters:$filters"
		//crit.getInstance().createAlias("contact", "contact")
		def qslike = (filters?.quickSearch) ? (filters?.quickSearch + "%") : null
		def datalist= crit.list(max:pager.max,offset:pager.offset) {
			//createAlias("c", "contact")
			if(qslike){
				or{
					like 'login',qslike
					like 'contact.lastName',qslike
					like 'contact.firstName',qslike
					like 'contact.email',qslike
				}
			}
			//XXX ken refactor this part so it works with you helpers
			def fcontact = filters?.contact
			if(fcontact?.name){
				or{
					like 'contact.lastName', fcontact.name
					like 'contact.firstName', fcontact.name
				}
			}
			if(fcontact?.email)
				like 'contact.email', fcontact.email 
			
			if(filters?.login)
				like 'login', filters.login


			if (params.sort)
				order(params.sort, params.order)
		}
		return datalist
	}

	def editTemplate(){
		def user = User.get(params.id)
		render(plugin:"rally", template:"edit",model:[user:user])
	}

	def editPartial(){
		def user = new User()
		render(plugin:"rally", template:"editPartial",model:[user:user])
	}

	def searchPartial(){
		def user = new User()
		render(plugin:"rally", template:"searchPartial",model:[user:user])
	}
	
	def createTemplate(){
		def user = new User()
		render(plugin:"rally", template:"edit",model:[user:user])
	}

    def saveOrUpdate(){	
		try{
			def result = params.id ? dao.update(params) : dao.insert(params)
			//all was good render a success save message
			//return ExportUtil.buildMapFromPaths(obj,fieldList)
			render ExportUtil.buildMapFromPaths(result.entity,selectFields) as JSON
		}catch(DomainException e){
			response.status = 409
			def emsg = (e.hasProperty("messageMap")) ? g.message(code:e.messageMap?.code,args:e.messageMap?.args,default:e.messageMap?.defaultMessage):null
			render(plugin:"rally", template:"edit",model:[user:e.meta?.user?:e.entity,errorMsg:emsg])
		}
	}

	def get() {
        def inst = User.get(params.id)
        if (inst) {
			//cache false
            //sleep(1000)
            render ExportUtil.buildMapFromPaths(inst,selectFields) as JSON
        } else {
			notFound params.id
		}
    }


	// def saveJson(){	
	// 	println "response.format ${response.format}"
	// 	println "request.format ${request.format}"
	// 	def responseJson = [:]
	// 	try{
	// 		def result = dao.insert(request.JSON)
	// 		//all was good render a success save message
	// 		//return ExportUtil.buildMapFromPaths(obj,fieldList)
	// 		render ExportUtil.buildMapFromPaths(result.entity,selectFields) as JSON
	// 	}catch(DomainException e){
	// 		//response.status = 409
	// 		//def emsg = (e.hasProperty("messageMap")) ? g.message(code:e.messageMap?.code,args:e.messageMap?.args,default:e.messageMap?.defaultMessage):null
	// 		//render(plugin:"rally", template:"edit",model:[user:e.meta?.user?:e.entity,errorMsg:emsg])
	// 		response.status = SC_UNPROCESSABLE_ENTITY
 //            responseJson.errors = e.entity.errors.fieldErrors.collectEntries {
 //                [(it.field): message(error: it)]
 //            }
 //            //cache false
 //        	render responseJson as JSON
	// 	}
	// }

	def columnModel(){
    	grinderLabelService.columnSetup(columnModel)
    	render columnModel as JSON
	}

	def saveTest() {
		def json = request.JSON
		println "JSON " + json
		println "JSON Class " + json.getClass()
		def gson = request.GSON
		println "YYYYYYYY " + gson.class
		//assert gson.contact.firstName == "f"
        def instance = new User(request.GSON)
        assert instance.contact.firstName == "f"
        def responseJson = [:]
        if (instance.save(flush: true)) {
            response.status = SC_CREATED
            responseJson.id = instance.id
            responseJson.message = message(code: 'default.created.message', args: [message(code: 'album.label', default: 'Album'), instance.id])
        } else {
            response.status = SC_UNPROCESSABLE_ENTITY
            responseJson.errors = instance.errors.fieldErrors.collectEntries {
                [(it.field): message(error: it)]
            }
        }
		cache false
        render responseJson as JSON
    }

	/**
	 * @override 
	 */
	// def listJson(){
	// 	log.debug("in the withformat json")
	// 	def pageData = new PagingData(params)
	// 	def crit = User.createCriteria()
	// 	def datalist= crit.list(max:pageData.max,offset:pageData.offset) {
	// 		if (params.sort)
	// 			order(params.sort, params.order)
	// 	}
	// 	def mFields = ["*"]
	// 	pageData.setupData(datalist, mFields)
	// 	//render datalist as GSON
	// 	render pageData.jsonData as JSON
	// }


}