package grinder

import org.apache.commons.logging.*

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
    Integer allowedMax = 100
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
        return (Math.round(Math.ceil(recordCount / max)))
    }

    def getJsonData() {
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
        try {
            if (dlist?.size() > 0)
                setRecordCount(dlist.totalCount)
        }// if the prop doesn't exist then just move on
        catch (MissingPropertyException e) {}

        if (fieldList) {
            this.data = dlist.collect { obj ->
                return BeanPathTools.buildMapFromPaths(obj, fieldList)
            }
        }
        return this
    }

}
