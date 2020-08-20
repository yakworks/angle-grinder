package demo

import gorm.tools.traits.IdEnum
import groovy.transform.CompileStatic

@CompileStatic
enum TranState implements IdEnum<TranState,Integer> {
    Open(0),
    Closed(1),
    Draft(2)

    final Integer id

    TranState(Integer id) { this.id = id }
}
