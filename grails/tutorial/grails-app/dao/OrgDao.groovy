import grails.plugin.dao.GormDaoSupport
import tutorial.Org


class OrgDao extends GormDaoSupport{
	Class domainClass = Org

	Map insert(params){
		def madeNameDefault = "default Org"
		if(!params.name){
			params.name = madeNameDefault
		}
		if (params.name){
			params.name += " from Dao"
		}
		super.insert(params)
	}
}
