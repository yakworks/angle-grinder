package resttutorial

import grails.views.GrailsViewTemplate
import groovy.text.TemplateEngine
import org.grails.web.gsp.io.GrailsConventionGroovyPageLocator

import static org.springframework.http.HttpStatus.*
import grails.plugin.dao.DomainNotFoundException
import grails.plugin.dao.RestDaoController

class ContactController extends RestDaoController {
  static responseFormats = ['json']

  ContactController() {
    super(Contact)
  }

  def inactivate() {
    Contact contact
    try {
      contact = dao.inactivate(params.contactId as Long)
    } catch (DomainNotFoundException e){
      def errResponse = errorMessageService.buildErrorResponse(e)
      response.status = errResponse.code
      request.withFormat {
        '*' {
          respond model: [text: e.message], status: errResponse.code
        }
      }
    }

    respond contact
  }

}
