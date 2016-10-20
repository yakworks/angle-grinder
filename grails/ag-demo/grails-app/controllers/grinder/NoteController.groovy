package agdemo

import grails.converters.JSON

class NoteController extends BaseDomainController {

    def domainClass = Note
    def selectFields = ["*"]

    def get() {
        def note = domainClass.get(params.id)
        if (note) {
            render ExportUtil.buildMapFromPaths(note, selectFields) as JSON
        } else {
            notFound params.id
        }
    }

}
