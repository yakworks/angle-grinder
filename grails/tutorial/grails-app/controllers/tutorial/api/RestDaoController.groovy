package tutorial.api

import grails.plugin.dao.DaoUtil
import grails.plugin.grinder.Pager
import grails.rest.RestfulController


import static org.springframework.http.HttpStatus.CREATED
import static org.springframework.http.HttpStatus.NO_CONTENT

abstract class RestDaoController<T> extends RestfulController<T> {
    static namespace = "api"
    //Responce formats, json - by default
    static responseFormats = ['json', 'xml']

    RestDaoController(Class<T> domainClass) {
        this(domainClass, false)
    }

    RestDaoController(Class<T> domainClass, boolean readOnly) {
        super(domainClass, readOnly)
    }

    Class getDomainClass() {
        resource
    }

    protected def getDao() {
        resource.dao
    }


    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond pagedList(listAllResources(params)).jsonData, model: [("${resourceName}Count".toString()): countResources()]
    }

    @Override
    protected List<T> listAllResources(Map params) {
        listCriteria(params)
    }

    @Override
    def save() {
        if (handleReadOnly()) {
            return
        }
        def p = BeanPathTools.flattenMap(request, request.JSON)
        def result = insertDomain(p)
        formatResponse(result.entity)
    }

    @Override
    def update() {
        if (handleReadOnly()) {
            return
        }
        def p = BeanPathTools.flattenMap(request, request.JSON)
        def result = updateDomain(p)
        formatResponse(result.entity)
    }

    /**
     * Deletes a resource for the given id
     * @param id The id
     */
    def delete() {
        if(handleReadOnly()) {
            return
        }

        def instance = queryForResource(params.id)
        if (instance == null) {
            transactionStatus.setRollbackOnly()
            notFound()
            return
        }

        deleteDomain(params)

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.deleted.message', args: [message(code: "${resourceClassName}.label".toString(), default: resourceClassName), instance.id])
                redirect action:"index", method:"GET"
            }
            '*'{ render status: NO_CONTENT } // NO CONTENT STATUS CODE
        }
    }

    protected def updateDomain(p, opts = null) {
        log.debug "updateDomain with ${p}"
        def res = dao.update(p)
        if (opts?.flush) DaoUtil.flush()
        return res
    }

    protected def formatResponse(def instance) {
        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.created.message', args: [message(code: "${resourceName}.label".toString(), default: resourceClassName), instance.id])
                redirect instance
            }
            '*' {
                response.addHeader(HttpHeaders.LOCATION,
                        g.createLink(
                                resource: this.controllerName, action: 'show', id: instance.id, absolute: true,
                                namespace: hasProperty('namespace') ? this.namespace : null))
                respond instance, [status: CREATED]
            }
        }
    }

    /**
     * Called from the saves and saveOrUpdateJson,
     * providing a place to override functionality
     */
    protected def insertDomain(p) {
        log.info("insertDomain(${p})")
        return dao.insert(p)
    }

    protected def deleteDomain(p){
        return dao.remove(p)
    }

    /**
     * returns the list of domain obects for the scaffolded contro
     */
    protected def listCriteria(params) {
        def crit = domainClass.createCriteria()
        def pager = new Pager(params)
        def datalist = crit.list(max: pager.max, offset: pager.offset) {
            if (params.sort)
                order(params.sort, params.order)
        }
        return datalist
    }

    protected def pagedList(dlist) {
        def pageData = new Pager(params)
        def fieldList
        if(hasProperty('listFields')){
            fieldList = listFields
        }
        else if(hasProperty('showFields')){
            fieldList = showFields
        }
        else if(hasProperty('selectFields')){
            fieldList = selectFields
        }
        pageData.setupData(dlist, fieldList)
        return pageData
    }

}
