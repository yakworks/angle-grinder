package grinder

import spock.lang.Specification

/**
 *@author Sudhir
 */
class PagerSpec {

    def "test eachPage"() {
        setup:
        Pager paginator = new Pager()
        paginator.max = 10
        paginator.recordCount = 95
        List pages = []

        when:
        paginator.eachPage {def max, def offset ->
            pages << [max:max, offset:offset]
        }

        then:
        10 == pages.size()
        10 == pages[0].max
        0 == pages[0].offset
        90 == pages[9].offset
        10 == pages[9].max
    }
}
