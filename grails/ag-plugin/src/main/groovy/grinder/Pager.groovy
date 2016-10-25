package grinder

import grails.gorm.PagedResultList
import org.apache.commons.logging.Log
import org.apache.commons.logging.LogFactory
import org.grails.datastore.mapping.query.Query
import org.hibernate.criterion.Projections
import org.hibernate.internal.CriteriaImpl

/**
 * a holder object for paged data
 */
class Pager {
    private Log log = LogFactory.getLog(getClass())
    //the page we are on
    Integer page = 1
    //max rows to show
    Integer max = 10
    //the max rows the user can set it to
    Integer allowedMax = 10000
    //the total record count. This is used to calculate the number of pages
    Integer recordCount = 0
    Integer offset
    List data
    def params


    public Pager() {}

    public Pager(params) {
        setParams(params)
    }

    static Integer max(p, defaultMax = 100) {
        def defmin = p.max ? p.max.toInteger() : 10
        p.max = Math.min(defmin, defaultMax)
        return p.max
    }

    static Integer page(p) {
        p.page = p.page ? p.page.toInteger() : 1
        return p.page
    }

    def setParams(params) {
        page = params.page = params.page ? params.page.toInteger() : 1
        max = params.max = Math.min(params.max ? params.max.toInteger() : 10, allowedMax)
        this.params = params
    }

    def getOffset() {
        if (!offset) {
            return (max * (page - 1))
        } else {
            return offset
        }
    }

    def getPageCount() {
        return Math.ceil(recordCount / max).intValue()
    }

    def eachPage(Closure c) {
        if(pageCount < 1) return
        log.debug "eachPage total pages : pageCount"

        (1..pageCount).each {Long pageNum ->
            page = pageNum
            offset = (max * (page - 1))
            try {
                log.debug "Executing eachPage closer with [max:$max, offset:$offset]"
                c.call(max, offset)
            }catch (Exception e) {
                log.error "Error encountered while calling closure in eachPage [max:$max, offset:$offset]}]", e
                throw e
            }
        }

    }

    Map getJsonData() {
        //page is the page we are on, total is the total number f pages based on max per page setting
        //records is the total # of records we have
        //rows are the data
        return [
                page: this.page,
                total: this.getPageCount(),
                records: this.recordCount,
                rows: data
        ]
    }

    def setupData(dlist, fieldList = null) {
        setData(dlist)
        if (dlist?.size() > 0) {
            if (dlist.hasProperty('totalCount')) {
                setRecordCount(dlist.totalCount)
            } else if (dlist instanceof PagedResultList) {
                setRecordCount(loadTotalFromDb(dlist))
            } else {
                log.warn("Cannot get totalCount for ${dlist.class}")
                setRecordCount(dlist.size())
            }
        }

        if (fieldList) {
            this.data = dlist.collect { obj ->
                return BeanPathTools.buildMapFromPaths(obj, fieldList)
            }
        }
        return this
    }

    int loadTotalFromDb(PagedResultList src) {
        int pageSize = src.size() //we _NEED_ this call, to make sure that data is already fetched,
        //before we changed original query

        if (pageSize == 0) { //actually this is just to double check that src.size() was actually called, result is not so important
            log.warn("Page size is zero, but we will try to load count(*) anyway")
        }

        //get original query and modify it to get count of records. sadly, we cannot clone it
        Query q = src.query
        def criteriaField = q.class.declaredFields.find { it.name == 'criteria' }
        criteriaField.setAccessible(true)
        CriteriaImpl realCriteria = criteriaField.get(q)
        realCriteria.setProjection(Projections.rowCount()) // count(*)

        //now we need to remove ORDER BY, because MS SQL cannot execute count(*) query with ORDER BY
        def currentOrder = realCriteria.class.declaredFields.find { it.name == 'orderEntries' }
        currentOrder.setAccessible(true)
        currentOrder.get(realCriteria).clear()

        //actual count
        return realCriteria.uniqueResult() as Integer ?: 0
    }

}
