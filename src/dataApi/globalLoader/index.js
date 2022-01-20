import { KyFactory } from "@yakit/core/stores/ky";

// Global object for loader could be replaced with other lib that doesnt rely on angular lib
const globalLoader = {
    getLoaderService() {
        const elem = angular.element(document.querySelector('[ng-controller]'));
        const injector = elem.injector();
        const myService = injector.get('cfpLoadingBar');
        return myService
    },

    start(){
        const cfpLoadingBar = this.getLoaderService()
        cfpLoadingBar.start()
        cfpLoadingBar.inc();
    },

    complete(){
        const cfpLoadingBar = this.getLoaderService()
        cfpLoadingBar.set(0.8)
        cfpLoadingBar.complete()
    }
}

KyFactory.subscribe('before', () => globalLoader.start())
KyFactory.subscribe('after', () => globalLoader.complete())

export default globalLoader
