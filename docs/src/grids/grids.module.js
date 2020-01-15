import angular from 'angular'
import exDataGenMod from '../modules/dataGenerator'

const gmod = angular.module("exampleApp.grids", [
  exDataGenMod
])

export default "exampleApp.grids"

gmod.config([ "agDateFilterProvider", provider => // set default date format
  provider.setDefaultFormat("MM/DD/YY H:mm a")
])

gmod.config([ "agCurrencyFilterProvider", function(provider) {
    // set default currency format
    provider.setDefaultFormat("<%= amount %> <%= symbol %>");
    return provider.setDefaultSymbol("GBP");
  }
])
