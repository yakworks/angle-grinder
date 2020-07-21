
import '../src/vendor'
import 'angular'
import 'angular-mocks'

// shorter alternate method to try is this when using webpack
function importAll (r) {
  r.keys().forEach(r);
}
importAll(require.context('../src/', true, /\.test\.js$/))
//importAll(require.context('./unit/docs/', true, /\.js$/))

//longer esm method
// import * as utils1 from './unit/angleGrinder/utils/*.spec'
// import * as utils2 from './unit/angleGrinder/utils/*Spec'
// import * as alerts from './unit/angleGrinder/alerts/*Spec'
// import * as common from './unit/angleGrinder/common/*Spec'
// import * as forms from './unit/angleGrinder/forms/*Spec'
// import * as formsMixins from './unit/angleGrinder/forms/mixins/*Spec'
// import * as gridz from './unit/angleGrinder/gridz/*Spec'
// import * as pwc from './unit/angleGrinder/pathWithContext/*Spec'
// import * as rs from './unit/angleGrinder/resourceSupport/*Spec'
// import * as sel2 from './unit/angleGrinder/select2/*Spec'
