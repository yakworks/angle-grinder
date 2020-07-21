package agdemo.api

import gorm.tools.Pager
import grails.converters.JSON
import grails.core.GrailsApplication
import org.grails.plugins.appsetupconfig.AppSetupService

trait BaseDomainControllerTrait {
    static namespace = 'api'
    AppSetupService appSetupService
    GrailsApplication grailsApplication
    def getDomainClass() {
        this.entityClass
    }
    List<String> getPickShowFields() { return ['*'] }
    List<String> getPicSearchableFields() { return [] }
    Map defaultGridOptions = [colModel: [[name: 'id']]]

    def index() {
        listJson()
    }

    def listJson() {
        println()
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

    /**
     * returns the list of domain obects for the scaffolded contro
     */
    def listCriteria() {
        def crit = this.entityClass.createCriteria()
        def pager = new Pager(params)
        def datalist = crit.list(max: pager.max, offset: pager.offset) {
            if (params.sort)
                order(params.sort, params.order)
        }
        return datalist
    }
}
