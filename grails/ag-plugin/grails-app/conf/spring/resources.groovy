import grails.util.Environment
import org.springframework.core.io.ResourceLoader
import grinder.*

beans = {
    viewResourceLocator(grails.plugin.viewtools.ViewResourceLocator) { bean ->
        //initial searchLocations
        searchPaths = [
                //external file path that may be used for production overrides
                "file:./view-templates",
                "file:./src/main/resources",
                "file:./src/main/resources/",
                "classpath:templates/", // consistent with spring-boot defaults
                "classpath:testAppViewToolsGrailsAppConf" //other classpath locations
        ]
        //resourceLoaders to use right after searchLocations above are scanned
        searchLoaders = [ref('tenantViewResourceLoader')]

        searchBinaryPlugins = false //whether to look in binary plugins, does not work in grails2

        // in dev mode there will be a groovyPageResourceLoader
        // with base dir set to the running project
        //if(Environment.isDevelopmentEnvironmentAvailable()) <- better for Grails 3
        //setup for development mode
        if(!application.warDeployed){ // <- grails2
            grailsViewPaths = ["/grails-app/views"]
            webInfPrefix = ""
        }

    }

    tenantViewResourceLoader(TenantViewResourceLoader){
    }

    simpleViewResolver(SimpleViewResolver) { bean ->
        viewResourceLocator = ref("viewResourceLocator")
    }

}
