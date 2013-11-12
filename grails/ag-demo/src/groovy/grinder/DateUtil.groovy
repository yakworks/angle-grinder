package grinder

import java.text.DateFormat
import java.text.SimpleDateFormat
import java.util.regex.Pattern

class DateUtil {

    static Pattern GMT_MILLIS = ~/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/
    static Pattern GMT_SECONDS = ~/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z/

    static Date parseJsonDate(String date) {
        if (date == null) {
            return null
        }
        date = date.trim()
        if (date.length() == 0) {
            return null
        }
        DateFormat dateFormat = new SimpleDateFormat('yyyy-MM-dd')
        if (GMT_MILLIS.matcher(date).matches()) {
            date = date.replaceFirst('Z$', '-0000')
            dateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSZ")
        } else if (GMT_SECONDS.matcher(date).matches()) {
            date = date.replaceFirst('Z$', '-0000')
            dateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ssZ")
        }
        return dateFormat.parse(date)
    }
}
