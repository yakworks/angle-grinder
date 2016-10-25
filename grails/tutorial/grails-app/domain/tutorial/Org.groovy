package tutorial

import grails.rest.*

@Resource(uri='/orgs', formats=['xml', 'json'])
class Org {

	String name

	Date registrationDate

	static constraints = {
		name nullable: false
		registrationDate nullable: true
	}

	enum OrgType {
		Company('Company'), Business('Business'), Customer('Customer')
		final String name

		OrgType(String name) {
			this.name = name
		}

		static List stringValues() {
			return OrgType.values().toList().collect { it.name }
		}
	}
}



