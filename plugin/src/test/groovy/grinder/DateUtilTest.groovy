package grinder

import gorm.tools.beans.DateUtil
import org.junit.Test

import java.text.SimpleDateFormat

import static org.junit.Assert.assertEquals

class DateUtilTest {

    void testParseJsonDate() {
        setup:
        SimpleDateFormat tester = new SimpleDateFormat('yyyy-MM-dd HH:mm:ss z')
        tester.setTimeZone(TimeZone.getTimeZone('GMT'))
        when:
        Date date = DateUtil.parseJsonDate('2000-03-30T22:00:00.000Z')
        then:
        '2000-03-30 22:00:00 GMT' == tester.format(date)
        when:
        date = DateUtil.parseJsonDate('2013-11-01T17:00:00Z')
        then:
        '2013-11-01 17:00:00 GMT' == tester.format(date)
        when:
        date = DateUtil.parseJsonDate('2013-11-01T23:00:00Z')
        then:
        '2013-11-01 23:00:00 GMT' == tester.format(date)
    }

}
