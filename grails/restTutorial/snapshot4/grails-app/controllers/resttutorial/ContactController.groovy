package resttutorial

class ContactController {

    def index() {}

    def list() {
        render template: "list"
    }
    def form() {
        render template: "form"
    }
}
