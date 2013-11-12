package grinder

import org.junit.Test

import java.text.SimpleDateFormat

import static org.junit.Assert.assertEquals

class DateUtilTest {

    @Test
    void testParseJsonDate() {
        SimpleDateFormat tester = new SimpleDateFormat('yyyy-MM-dd HH:mm:ss z')
        tester.setTimeZone(TimeZone.getTimeZone('GMT'))
        Date date = DateUtil.parseJsonDate('2000-03-30T22:00:00.000Z')
        assertEquals('2000-03-30 22:00:00 GMT', tester.format(date))

        date = DateUtil.parseJsonDate('2013-11-01T17:00:00Z')
        assertEquals('2013-11-01 17:00:00 GMT', tester.format(date))

        date = DateUtil.parseJsonDate('2013-11-01T23:00:00Z')
        assertEquals('2013-11-01 23:00:00 GMT', tester.format(date))
    }

}
