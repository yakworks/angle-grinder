package grinder

import grails.core.GrailsApplication
import grails.plugins.Plugin

class AngleGrinderGrailsPlugin extends Plugin{

    def version = '2.0.0'
    def grailsVersion = '3.0.0 >= *'
    def dependsOn = [:]
    def pluginExcludes = []

    def title = 'Angle Grinder Plugin'
    def author = 'Joshua Burnett'
    def authorEmail = 'basejump1@gmail.com'
    def description = '''\
A plugin that enables ties grails and angular together
'''

    def documentation = ''
    def license = 'MIT'
    def organization = [name: '9ci', url: 'http://9ci.com/']
    def groupId = 'nine'
    def issueManagement = [system: 'GitHub', url: 'https://github.com/9ci/angle-grinder/issues']
    def scm = [url: 'https://github.com/9ci/angle-grinder']


    Closure doWithSpring(){{->
        grinderLabelService(GrinderLabelService){ bean ->
            bean.autowire = 'byName'
        }

    }}
}

