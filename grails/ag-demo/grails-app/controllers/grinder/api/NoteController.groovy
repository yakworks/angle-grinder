package grinder.api

import grails.converters.JSON
import grinder.Note
import grinder.Pager

class NoteController extends RestDaoController {
    NoteController(){
      super(Note)
    }
   /* def domainClass = Note*/
    def selectFields = ["*", "org.*"]

  def listCriteria(params) {
    def crit = domainClass.createCriteria()
    def pager = new Pager(params)
    def datalist = crit.list(max: pager.max, offset: pager.offset) {
      if (params.orgId)
        eq "org.id", params.orgId as Long
      if (params.sort)
        order(params.sort, params.order)
    }
    return datalist

    /*def pager = new Pager(params)
    def crit = Note.createCriteria()

    def filters = params.filters ? JSON.parse(params.filters) : null
    def qslike = (filters?.quickSearch) ? (filters?.quickSearch + "%") : null

    def datalist = crit.list(max: pager.max, offset: pager.offset) {
      eq "org.id", params.id.toLong()

      if (qslike) {
        or {
          ilike "name", qslike
          ilike "content", qslike
        }
      }

      if (params.sort)
        order(params.sort, params.order)
    }

    def pagedList = pagedList(datalist)
    render pagedList.jsonData as JSON
  }*/
  }
}
