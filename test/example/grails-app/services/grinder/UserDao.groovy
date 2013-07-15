package grinder

import grails.plugin.dao.GormDaoSupport
import grails.plugin.dao.DomainException
import grails.plugin.dao.DaoUtil
import grails.plugin.dao.DaoMessage
import org.codehaus.groovy.grails.web.binding.DefaultASTDatabindingHelper

class UserDao extends GormDaoSupport{
	Class domainClass = User
	def currentUserService
    def dcsUserService
	/*
	 *	Centralized method for setting up and saving a User
	 */
	def saveUserAndRole(User user,String role) {
	    //SecRoleUser.create(user,SecRole.findByName(role))
		//user.addToRoles(SecRole.findByName(role))
		log.debug("Saving user ${user.login} with role ${role}")
		save(user)
/*		try{
			return save(user)
		}catch(DomainException e){
			def ge = new DomainException(DaoMessage.notSaved(user), user?.contact, e.errors)
			ge.meta = [user:user]
			throw ge
		}*/
	}
	
	def delete(entity){
		//SecRoleUser.removeAll( user)
		super.delete(entity)
	}
	
	Map update( params){
		println("update with $params")
		def user = User.get(params.id.toLong())
        //force init of the contact so we don't get "no session" when we try to access it
		def contact = user?.contact
		DaoUtil.checkFound(user,params,User.name)
		DaoUtil.checkVersion(user,params.version)
		persistWithParams(user,params)
		return [ ok:true, entity: user,message:DaoMessage.updated(user)]
	}
	
    /**
	* inserts and calls save for a new domain entity based with the data from params
	*
	* @param  params  the parameter map or json
	* @throws DomainException if a validation error happens
	*/
	Map insert( params) {
		def user = new User()
		//if(!params.orgId) params.orgId = 1 //this is the main client, 
		user.contact = new Contact()
		user.contact.org = Org.get(params.orgId)
		params.remove 'orgId'
		persistWithParams(user,params)
		return [ ok:true, entity: user,message:DaoMessage.created(user)]
	}

	Map insertTest( params) {
		def user = new User()
		//if(!params.orgId) params.orgId = 1 //this is the main client, 
		//user.contact = new Contact()
		//user.contact.org = Org.get(params.orgId)
		//params.remove 'orgId'
		user.properties = params
		//user.contact.properties['firstName','lastName','email','tagForReminders'] = params['contact']
        try{
		    checkPasswordChange(user,params)
		    //user.contact.persist()
        	save(user)
    	    DaoUtil.flush()
        }catch(DomainException e){
        	e.meta = [user:user]
        	throw e
        }
		return [ ok:true, entity: user,message:DaoMessage.created(user)]
	}
	
	void persistWithParams(user,params){
		//println ("persistWithParams : $params")
		// user.domainClass.constrainedProperties.each{
		// 	println it
		// }
		//def whiteList = User."${DefaultASTDatabindingHelper.DEFAULT_DATABINDING_WHITELIST}"
		//println whiteList 
		user.properties = params
		user.contact.properties['firstName','lastName','email','tagForReminders'] = params['contact']
        try{
		    checkPasswordChange(user,params)
		    user.contact.persist()
        	save(user)
        	// if(params.userRole?.toLong()){
    	    //     SecRoleUser.removeAll(user)
    	    //     SecRoleUser.create(user,SecRole.get(params.userRole.toLong()))
    	    // }
    	    DaoUtil.flush()
        }catch(DomainException e){
        	e.meta = [user:user]
        	throw e
        }
	}
	
	/**
	 * checks params to see if password exists, that is matches repassword and encodes it if so
	 * finally setting it to the passwd field on User.
	 */
	def checkPasswordChange(user,params){
	    if(params.password?.trim()){
	        if (params.password != params.repassword) {
    			def msg = DaoMessage.setup("password.mismatch",[0],"The passwords you entered do not match")
    			throw new DomainException(msg, user)
    		}else{
    		    user.passwd = params.password
    		}
	    }
	}
	
	
}
