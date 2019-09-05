package agdemo

import gorm.tools.repository.GormRepo
import gorm.tools.repository.RepoMessage
import gorm.tools.repository.RepoUtil
import gorm.tools.repository.errors.EntityValidationException

class NoteRepo implements GormRepo<Note> {

    Map insert(params) {
        def note = new Note()
        note.properties["name", "content"] = params

        def org = Org.get(params.org.id)
        note.org = org

        try {
            note.persist()
          RepoUtil.flush()
        } catch (EntityValidationException e) {
            e.meta = [user: note]
            throw e
        }

        return [ok: true, entity: note, message: RepoMessage.created(note)]
    }

    Map update(params) {
        def note = Note.get(params.id.toLong())

        note.properties = params
        note.persist()
        RepoUtil.flush()

        return [ok: true, entity: note, message: RepoMessage.updated(note)]
    }

}
