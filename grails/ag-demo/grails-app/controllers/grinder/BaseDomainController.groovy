package grinder

import grails.converters.JSON
import grails.plugin.dao.DaoMessage
import grails.plugin.dao.DaoUtil
import grails.plugin.dao.DomainException
import grails.validation.ValidationException
import org.apache.commons.lang.StringEscapeUtils
import org.codehaus.groovy.grails.commons.GrailsClassUtils

import javax.annotation.PostConstruct

abstract class BaseDomainController {
    def ajaxGrid = true

    static allowedMethods = [save: "POST", update: "POST", delete: "POST"]

    protected getDao() {
        domainClass.dao
    }

    @PostConstruct
    protected void init() {
    }

    protected String getDomainInstanceName() {
        def suffix = grailsApplication.config?.grails?.scaffolding?.templates?.domainSuffix
        if (!suffix) {
            suffix = ''
        }
        def propName = GrailsClassUtils.getPropertyNameRepresentation(domainClass)
        "${propName}${suffix}"
    }

    def index() {

    }



    protected def listModel() {
        return []
    }

    //the old standard way to list into an html page
    def listhtml(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        def pageData = pagedList(listCriteria())
        def propName = GrailsClassUtils.getPropertyNameRepresentation(domainClass)
        return [("${propName}List".toString()): pageData.data, ("${propName}ListTotal".toString()): pageData.recordCount]
    }

    def create() {
        def domainInstance = domainClass.newInstance()
        domainInstance.properties = params
        return [(domainInstanceName): domainInstance]
    }




    protected renderSuccess(String actionMeth, result) {
        log.debug("renderSuccess ${request.format}")
        if (request.format == 'json' || response.format == 'json') {
            render successModel(result.entity.id) as JSON
            return
        } else {
            redirect(action: actionMeth, id: result.entity.id)
            return
        }
    }

    protected renderError(String actionMeth, ex) {
        if (request.format == 'json' || response.format == 'json') {
            response.status = 400 //XXX change this a generic 400 and test
            render errorModel(ex.entity, ex.meta) as JSON
            return
        } else {
            render(view: actionMeth, model: [(domainInstanceName): ex.entity])
            return
        }
    }




    protected buildMsg(msgMap) {
        return g.message('code': msgMap.code, 'args': msgMap.args, 'default': msgMap.defaultMessage)
    }
    //this should be able to be done easier than this
    protected errorBuilder(messageCode, args, defmsg, entity, meta) {
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
