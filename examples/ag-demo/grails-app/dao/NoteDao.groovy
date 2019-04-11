package agdemo

import grails.plugin.dao.DaoMessage
import grails.plugin.dao.DaoUtil
import grails.plugin.dao.DomainException
import grails.plugin.dao.GormDaoSupport

class NoteDao extends GormDaoSupport  {
    Class domainClass = Note

    Map insert(params) {
        def note = new Note()
        note.properties["name", "content"] = params

        def org = Org.get(params.org.id)
        note.org = org

        try {
            save(note)
            DaoUtil.flush()
        } catch (DomainException e) {
            e.meta = [user: note]
            throw e
        }

        return [ok: true, entity: note, message: DaoMessage.created(note)]
    }

    Map update(params) {
        def note = Note.get(params.id.toLong())

        note.properties = params
        save(note)
        DaoUtil.flush()

        return [ok: true, entity: note, message: DaoMessage.updated(note)]
    }

}
