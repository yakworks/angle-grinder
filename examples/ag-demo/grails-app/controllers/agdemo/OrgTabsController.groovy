package agdemo

class OrgTabsController extends OrgController {

    def index() {
       return [hideSidebar: true]
    }

/*
    def listTemplate(){
      render(view: "/tabbedOrg/list.html")
    }
*/

}
