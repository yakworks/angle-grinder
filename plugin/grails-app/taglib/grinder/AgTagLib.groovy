
/* Copyright 2004-2005 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *		  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT c;pWARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package grinder

/**
*	Provides convienence tags for	 form controls
*
* @author Joshua Burnett
*/

class AgTagLib {

	static namespace = "ag"

	def grinderLabelService

	def label = { attrs ->
		//def ftag = grailsApplication.mainContext.getBean("grails.plugin.formfields.FormFieldsTagLib")
		//def bean = ftag.resolveBean(attrs.remove('bean'))
		def code = attrs.remove('code')
		if (!code) throwTagError("Tag [label] is missing required attribute [code]")
		def lbl = grinderLabelService.resolveLabel(code)
		out << lbl
	}

	// String resolveLabelText(propertyAccessor, attrs) {
	// 	def labelText
	// 	def label = attrs.remove('label')
	// 	//println "propertyAccessor : $propertyAccessor.labelKeys"
	// 	if (label) {
	// 		labelText = message(code: label, default: label)
	// 	}
	// 	if (!labelText && propertyAccessor.labelKeys) {
	// 		//println propertyAccessor.labelKeys
	// 		labelText = ftag.resolveMessage(propertyAccessor.labelKeys, propertyAccessor.defaultLabel)
	// 	}
	// 	if (!labelText) {
	// 		//println "propertyAccessor.defaultLabel : $propertyAccessor.defaultLabel"
	// 		labelText = propertyAccessor.defaultLabel
	// 	}
	// 	labelText
	// }

	// def currencySelect = {attrs, body ->
	// 	if (!attrs['from']) {
	// 		attrs['from'] = [
	// 					'USD':'USD - United States Dollar',
	// 					'AUD':'AUD - Australia Dollar',
	// 					'CAD':'CAD - Canadian Dollar',
	// 					'CHF':'CHF - Swiss Franc',
	// 					'CNY':'CNY - China Renminbi',
	// 					'EUR':'EUR - Euro',
	// 					'GBP':'GBP - United Kingdom Pound',
	// 					'HKD':'HKD - Hong Kong Dollar',
	// 					'INR':'INR - India Rupees',
	// 					'JPY':'JPY - Japan Yen',
	// 					'NOK':'NOK - Norwegian Krone',
	// 					'NZD':'NZD - New Zealand Dollar',
	// 					'SEK':'SEK - Sweedish Krona',
	// 					'SGD':'SGD - Singapore Dollar',
	// 					'ZAR':'ZAR - South African Rand',
	// 					'XCD':'XCD - East Caribbean Dollar'
	// 					]

	// 	}
	// 	//optionKey="id" optionValue="name"
	// 	attrs['optionKey']= (attrs['optionKey']?:'key')
	// 	attrs['optionValue']= (attrs['optionValue']?:'value')
	// 	try {
	// 		attrs['value'] = (attrs['value'] ?: Currency.getInstance(RCU.getLocale(request)))
	// 		//attrs.value = currency.currencyCode
	// 	}
	// 	catch (IllegalArgumentException iae) {
	// 		attrs.value = null
	// 	}
	// 	// invoke generic select
	// 	out << select(attrs)
	// }

	// def timeZoneSelect = {attrs ->
	// 	def thelist = TimeZone.getAvailableIDs().findAll{
	// 			it.matches("^(Africa|America|Asia|Atlantic|Australia|Europe|Indian|Pacific)/.*")
	// 	}
	// 	attrs['from'] = thelist;
	// 	attrs['value'] = (attrs['value'] ? attrs['value'] : TimeZone.getDefault())
	// 	def date = new Date()

	// 	// set the option value as a closure that formats the TimeZone for display
	// 	attrs['optionValue'] = { TimeZone tz = TimeZone.getTimeZone(it);
	// 		def shortName = tz.getDisplayName(tz.inDaylightTime(date), TimeZone.SHORT);
	// 		def longName = tz.getDisplayName(tz.inDaylightTime(date), TimeZone.LONG);

	// 		def offset = tz.rawOffset;
	// 		def offsetSign = offset<0?'-':'+'
	// 		Integer hour = Math.abs(offset / (60 * 60 * 1000))%24;
	// 		Integer min = Math.abs(offset / (60 * 1000)) % 60;
	// 		def c = Calendar.getInstance()
	// 		c.set( Calendar.HOUR, hour ) //set the AM_PM and HOUR fields...
	// 		c.set( Calendar.MINUTE, min )
	// 		return "(UTC$offsetSign${String.format('%tR', c)}) $tz.ID ${shortName} - ${longName} "

	// 	}
	// 	out << select(attrs)
	// }

	// //FIXME use this short list for timezones
	// static def tzlist= [
	// 	'Pacific/Midway'        : '(GMT -11:00) Midway Island, Samoa',
	// 	"America/Adak"          : '(GMT -10:00) Hawaii',
	// 	"America/Anchorage"     : '(GMT -9:00) Alaska',
	// 	"America/Los_Angeles"   : '(GMT -8:00) Pacific Time',
	// 	"America/Denver"        : '(GMT -7:00) Mountain Time',
	// 	"America/Dawson_Creek"  : '(GMT -7:00) Arizona',
	// 	"America/Chicago"       : '(GMT -6:00) Central Time (US & Canada), Mexico City',
	// 	"America/New_York"      : '(GMT -5:00) Eastern Time (US & Canada), Bogota, Lima',
	// 	"America/Glace_Bay"     : '(GMT -4:00) Atlantic Time (Canada), Caracas, La Paz',
	// 	"America/St_Johns"      : '(GMT -3:30) Newfoundland',
	// 	"America/Argentina/Buenos_Aires" : '(GMT -3:00) Brazil, Buenos Aires, Georgetown',
	// 	"America/Noronha"       : '(GMT -2:00) Mid-Atlantic',
	// 	"Atlantic/Cape_Verde"   : '(GMT -1:00 hour) Azores, Cape Verde Islands',
	// 	"Europe/London"         : '(GMT) Western Europe Time, London, Lisbon, Casablanca',
	// 	"Europe/Brussels"       : '(GMT +1:00 hour) Brussels, Copenhagen, Madrid, Paris',
	// 	"Africa/Johannesburg"   : '(GMT +2:00) South Africa',
	// 	"Asia/Beirut"           : '(GMT +2:00) Kaliningrad, Beirut, Jerusalem',
	// 	"Europe/Moscow"         : '(GMT +3:00) Moscow, St. Petersburg, Baghdad, Riyadh ',
	// 	"Asia/Tehran"           : '(GMT +3:30) Tehran',
	// 	"Asia/Dubai"            : '(GMT +4:00) Abu Dhabi, Muscat, Baku, Tbilisi',
	// 	"Asia/Kabul"            : '(GMT +4:30) Kabul',
	// 	"Asia/Tashkent"         : '(GMT +5:00) Ekaterinburg, Islamabad, Karachi, Tashkent',
	// 	"Asia/Kolkata"          : '(GMT +5:30) Bombay, Mumbai, Madras, New Delhi',
	// 	"Asia/Katmandu"         : '(GMT +5:45) Kathmandu',
	// 	"Asia/Dhaka"            : '(GMT +6:00) Almaty, Dhaka, Colombo',
	// 	"Asia/Bangkok"          : '(GMT +7:00) Bangkok, Hanoi, Jakarta',
	// 	"Asia/Krasnoyarsk"      : '(GMT +7:00) Krasnoyarsk',
	// 	"Asia/Hong_Kong"        : '(GMT +8:00) Beijing, Singapore, Hong Kong',
	// 	"Australia/Perth"       : '(GMT +8:00) Perth',
	// 	"Asia/Tokyo"            : '(GMT +9:00) Osaka, Sapporo, Tokyo',
	// 	"Australia/Adelaide"    : '(GMT +9:30) Adelaide, Darwin',
	// 	"Australia/Brisbane"    : '(GMT +10:00) Eastern Australia, Guam, Vladivostok',
	// 	"Asia/Magadan"          : '(GMT +11:00) Magadan, Solomon Islands, New Caledonia',
	// 	"Pacific/Auckland"      : '(GMT +12:00) Auckland, Wellington, Fiji, Kamchatka',
	// ]


	// def static convertStringToDateTime(String strDt, String format){
	// 	DateFormat df = new SimpleDateFormat(format)
	// 	Date dtTmp = null
	// 	try {
	// 		dtTmp = df.parse(strDt);
	// 	} catch (Exception e) {
	// 		e.printStackTrace();
	// 	}
	// 	return dtTmp;
	// }

	// //just overrides the normal grails date but gets the default format in our way
	// def formatUserDate = { attrs ->
	// 	attrs.format = getDefaultDateFormat()
	// 	out << formatDate.call(attrs)
	// }

	// def getDefaultDateFormat(){
	// 	//TODO in the future we can pull this from the database base on the users setting
	// 	return "MM/dd/yyyy"
	// }
}

