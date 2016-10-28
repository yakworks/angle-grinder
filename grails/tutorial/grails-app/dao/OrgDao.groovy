import grails.plugin.dao.GormDaoSupport
import tutorial.Location
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

	Map remove(params){
		Location location = Location.findByOrg(Org.get(params.id as Long))
		if (location){
			location.delete()
		}
		super.remove(params)
	}
}
