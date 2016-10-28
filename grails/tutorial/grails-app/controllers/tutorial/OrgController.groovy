package tutorial

class OrgController {

    def index() { }

    def template() {
        render template: params.name
    }
}
