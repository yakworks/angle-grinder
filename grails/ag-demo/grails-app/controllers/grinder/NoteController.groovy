package grinder

import grails.converters.JSON

class NoteController extends BaseDomainController {

    def domainClass = Note
    def selectFields = ["*"]

}
