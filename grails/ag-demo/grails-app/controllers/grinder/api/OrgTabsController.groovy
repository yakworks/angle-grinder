package grinder.api

class OrgTabsController extends OrgController {

    def index() {
       return [hideSidebar: true]
    }

}
