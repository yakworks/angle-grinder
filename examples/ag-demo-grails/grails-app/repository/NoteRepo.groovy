package agdemo

import gorm.tools.databinding.BindAction
import gorm.tools.repository.GormRepo

class NoteRepo implements GormRepo<Note>  {

    void beforeBind(Note note, Map params, BindAction action) {
        if(action == BindAction.Create) {
            note.name = params.name
            note.content = params.content
            note.org = Org.get(params.org.id)
        }
    }

}
