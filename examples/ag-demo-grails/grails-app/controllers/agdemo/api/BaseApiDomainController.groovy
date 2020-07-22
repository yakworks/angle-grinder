package agdemo.api

import agdemo.Org
import gorm.restapi.controller.RestApiRepoController
import gorm.tools.Pager
import gorm.tools.beans.BeanPathTools
import gorm.tools.repository.GormRepo
import grails.converters.JSON
import grails.plugin.gormtools.ErrorMessageService
import grails.util.GrailsNameUtils
import grails.validation.ValidationException
import org.grails.plugins.appsetupconfig.AppSetupService

import javax.annotation.PostConstruct

abstract class BaseApiDomainController<D> extends RestApiRepoController<D> {
    static namespace = 'api'

    BaseApiDomainController(Class<D> entityClass) {
        super(entityClass)
    }
    BaseApiDomainController(Class<D> entityClass, boolean readOnly) {
        super(entityClass, readOnly)
    }

    List<String> getPickShowFields() { return ['*'] }
    List<String> getPicSearchableFields() { return [] }
    static allowedMethods = [save: "POST", update: ["PUT", "POST"], delete: ["POST", "DELETE"], massUpdate: "POST"]
    Map defaultGridOptions = [colModel: [[name: 'id']]]
    ErrorMessageService errorMessageService
    AppSetupService appSetupService
    GormRepo getRepo() {
        domainClass.repo as GormRepo
    }

    @PostConstruct
    void init() {
    }
    def getDomainClass() {
        this.entityClass
    }
    String getDomainInstanceName() {
        def suffix = grailsApplication.config?.grails?.scaffolding?.templates?.domainSuffix
        if (!suffix) {
            suffix = ''
        }
        def propName = GrailsNameUtils.getPropertyNameRepresentation(domainClass)
        "${propName}${suffix}"
    }

    def index() {
        redirect(action: "list", params: params)
    }

    /**
     * returns the list of domain obects for the scaffolded contro
     */
    def listCriteria() {
        def crit = domainClass.createCriteria()
        def pager = new Pager(params)
        def datalist = crit.list(max: pager.max, offset: pager.offset) {
            if (params.sort)
                order(params.sort, params.order)
        }
        return datalist
    }

    def list() {
            listJson()
    }

    def listJson() {
        def pageData = pagedList(listCriteria())
        render pageData.jsonData as JSON
    }

    def pagedList(dlist) {
        def pageData = new Pager(params)
        def fieldList
        if (hasProperty('selectFields')) {
            fieldList = selectFields
        }
        pageData.setupData(dlist, fieldList)
        return pageData
    }

    def listModel() {
        return []
    }

    //the old standard way to list into an html page
    def listhtml(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        def pageData = pagedList(listCriteria())
        def propName = GrailsNameUtils.getPropertyNameRepresentation(domainClass)
        return [("${propName}List".toString()): pageData.data, ("${propName}ListTotal".toString()): pageData.recordCount]
    }

    def renderSuccess(String actionMeth, result) {
        log.debug("renderSuccess ${request.format}")
        if (request.format == 'json' || response.format == 'json') {
            render successModel(entity.id) as JSON
            return
        } else {
            redirect(action: actionMeth, id: entity.id)
            return
        }
    }

    def renderError(String actionMeth, ex) {
        if (request.format == 'json' || response.format == 'json') {
            response.status = 400 //XXX change this a generic 400 and test
            render errorModel(ex.entity, ex.meta) as JSON
            return
        } else {
            render(view: actionMeth, model: [(domainInstanceName): ex.entity])
            return
        }
    }

    def save() {
        if (request.format == 'json' || response.format == 'json') {
            saveOrUpdateJson()
            return
        }
        try {
            def result = saveDomain(params)
            flash.message = result.message
            renderSuccess('show', result)
            return
        } catch (ValidationException e) {
            log.debug("save with error ${request.format}")
            flash.message = e.messageMap
            renderError('create', e)
            return
        }
    }

    def saveOrUpdateJson() {
        def responseJson = [:]
        try {
            def p = BeanPathTools.flattenMap(request, request.JSON)
            def entity = p.id ? repo.update(p) : saveDomain(p)
            render BeanPathTools.buildMapFromPaths(entity, selectFields) as JSON
        } catch (Exception e) {
            log.error("saveJson with error: $e.message", e)
            Map errResponse = errorMessageService.buildErrorResponse(e)
            response.status = errResponse.code
            render errResponse as JSON
        }
    }

    def saveDomain(p) {
        log.debug("saveDomain(${p})")
        return repo.create(p)
    }


    def pickList(){
        Pager pager = new Pager(params)
        Map criterias = [:]
        String qslike = (params.q) ? ((params.q as String) + "%") : null
        List picks = getRepo().query([criteria: criterias, max: pager.max])

        Pager pagedList = pager.setupData(picks, pickShowFields)
        render pagedList.jsonData as JSON
    }

    Map getExternalConfig() {
        ConfigObject controllerConfig = grailsApplication.setupConfig.screens."$controllerName"
        return controllerConfig
    }

    Map getGridOptions() {
        def options = externalConfig.list.gridz
        if (!options) {
            return defaultGridOptions
        }
        return appSetupService.getValue(options)
    }

    def gridOptions() {
        String gridOptsJson = gridOptions as JSON
        render(gridOptsJson)
    }

    def buildMsg(msgMap) {
        return g.message('code': msgMap.code, 'args': msgMap.args, 'default': msgMap.defaultMessage)
    }
    //this should be able to be done easier than this
    def errorBuilder(messageCode, args, defmsg, entity, meta) {
        def message = g.message('code': messageCode, 'args': args, 'default': defmsg)
        flash.message = null
        def errs = []

        if (entity) {
            errs = buildError(entity, errs)
        }
        if (meta) {
            meta.values()?.each { obj ->
                errs = buildError(obj, errs)
            }
        }
        // return ["response":[
        // 	"status": "fail",
        // 	"ok":false,
        // 	"error": true,
        // 	"message":message,
        // 	"id": entity ? "${entity.id}" : "",
        // 	'errors':errs
        // ]]
        //FIXME implement new way
        return [
                "code": 422,
                "status": "error",
                "message": message,
                "messageCode": messageCode,
                "id": entity ? "${entity.id}" : "",
                'errors': errs
        ]

    }

    def buildError(obj, errs) {
        eachError([bean: obj], {
            errs << [(it.field): [object: it.objectName, field: it.field, message: g.message(error: it).toString(),
                    'rejected-value': StringEscapeUtils.escapeXml(it.rejectedValue?.toString())]]
        })
        return errs
    }

    //uses the stuff in flash to create an error response with the errorBuilder
    def errorModel(entity, meta) {
        errorBuilder(flash.message?.code, flash.message?.args, flash.message?.defaultMessage, entity, meta)
    }

    def successModel(id) {
        def message = g.message('code': flash.message?.code, 'args': flash.message?.args, 'default': flash.message?.defaultMessage)
        flash.message = null
        return ["response": [
                "status": "ok",
                "ok": true,
                "error": false,
                "message": message,
                "id": id
        ]]
        //FIXME implement new way
        /*
        return	[
            "code":422
            "status": "ok",
            "message":message ,
            "messageCode":messageCode,
            "id":id
        ]
        */
    }

    //HTTP status codes
/*
The following table describes what various HTTP status codes mean in the context of the our Rest APIs.
Code 	Explanation
200 OK 	No error.
** FUTURE 201 CREATED 	Creation of the object was successful.
** FUTURE 304 FUTURE
400 BAD REQUEST 	Invalid request URI or header, or unsupported nonstandard parameter.
401 UNAUTHORIZED 	Authorization required.
*** 403 FORBIDDEN 		Unsupported standard parameter, or authentication or authorization failed.
404 NOT FOUND 		Standard - Resource (such as a feed or entry) not found.
409 CONFLICT 		Validation error or the version number doesn't match resource's latest version number.
422 UNPROCESSABLE ENTITY 		Validation error or the version number doesn't match resource's latest version number.

500 INTERNAL SERVER ERROR 	Internal error. This is the default code that is used for all unrecognized server errors.
*/
}
