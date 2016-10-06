package grinder

import grails.converters.JSON

class OrgController extends RestDaoController {
  OrgController() {
    super(Org)
  }

  def selectFields = ["*"]

  protected def listCriteria() {
    def pager = new Pager(params)
    def crit = domainClass.createCriteria()

    def filters = params.filters ? JSON.parse(params.filters) : null
    def qslike = (filters?.quickSearch) ? (filters?.quickSearch + "%") : null

    def datalist = crit.list(max: pager.max, offset: pager.offset) {
      if (qslike) {
        or {
          ilike 'name', qslike
          ilike 'num', qslike
        }
      }

      if (filters?.name)
        ilike 'name', filters.name + "%"

      if (filters?.num)
        ilike 'num', filters.num + "%"

      if (params.sort)
        order(params.sort, params.order)
    }

    return datalist
  }

  def pickList() {
    def pager = new Pager(params)
    def crit = domainClass.createCriteria()
    def qslike = (params.q) ? (params.q + "%") : null
    def datalist = crit.list(max: pager.max, offset: pager.offset) {
      if (qslike && qslike != '*%') {
        or {
          ilike 'name', qslike
          ilike 'num', qslike
        }
      }

      if (params.sort)
        order(params.sort, params.order)
    }

    def pagedList = pagedList(datalist)
    render pagedList.jsonData as JSON
  }

  // retrieves all orgs
  def listAll() {
    def orgs = Org.findAll()
    render orgs as JSON
  }

  def listUsers() {
    def pager = new Pager(params)
    def crit = User.createCriteria()

    def filters = params.filters ? JSON.parse(params.filters) : null
    def qslike = (filters?.quickSearch) ? (filters?.quickSearch + "%") : null

    def datalist = crit.list(max: pager.max, offset: pager.offset) {
      createAlias("contact", "contact")

      eq "contact.org.id", params.id.toLong()

      if (qslike) {
        or {
          ilike "login", qslike
          ilike "contact.lastName", qslike
          ilike "contact.firstName", qslike
          ilike "contact.email", qslike
        }
      }

      def fcontact = filters?.contact

      if (fcontact?.name) {
        or {
          ilike 'contact.lastName', fcontact.name
          ilike 'contact.firstName', fcontact.name
        }
      }

      if (fcontact?.email)
        ilike 'contact.email', fcontact.email

      if (filters?.login)
        ilike 'login', filters.login

      if (params.sort)
        order(params.sort, params.order)
    }

    def pagedList = pager.setupData(datalist, ["*", "contact.*"])
    render pagedList.jsonData as JSON
  }

  def listNotes() {
    def pager = new Pager(params)
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
  }

  def massUpdate() {
    def ids = request.JSON.ids
    def params = request.JSON.data

    def data = []

    def orgs = domainClass.getAll(ids)
    orgs.each { org ->
      org.timeZone = params.timeZone
      org.save()

      data.push ExportUtil.buildMapFromPaths(org, selectFields)
    }

    response.status = 200
    def results = [data: data, errors: []]
    render results as JSON
  }

  def create() {
   render(view: "/org/form.html")
  }
}
