package tutorial

import grails.rest.*
@Resource(superClass = RestDaoController)
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



