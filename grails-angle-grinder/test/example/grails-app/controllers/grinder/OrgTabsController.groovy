package grinder

class OrgTabsController extends OrgController {

    def index() {
       return [hideSidebar: true]
    }

}
