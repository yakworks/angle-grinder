package agdemo.api

import agdemo.Note
import gorm.tools.beans.BeanPathTools
import grails.converters.JSON

class NoteController extends BaseDomainController {

    def domainClass = Note
    def selectFields = ["*"]

    def get() {
        def note = domainClass.get(params.id)
        if (note) {
            render BeanPathTools.buildMapFromPaths(note, selectFields) as JSON
        } else {
            notFound params.id
        }
    }

}
