package tutorial

import grails.databinding.BindingFormat
import grails.rest.*
import tutorial.api.RestDaoController

@Resource(superClass = RestDaoController)
class Org {

	String name
	@BindingFormat('yyyy-MM-dd')
	Date registrationDate
	String orgType


	static constraints = {
		name nullable: false
		registrationDate nullable: true
		orgType nullable: true
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



