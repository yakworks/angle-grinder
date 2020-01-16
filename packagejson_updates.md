deps upgrades, many needed for umd modules

- [x] get karma up to date, on a very old version

- [x] angular-xeditable@0.6.0 -> 0.10.2

- [ ] "Select2": "~3.5.1" -> 4.0.12?   
  need 4 for umd modules
  we are using ui-select2 that uses select2, 4th version has alot of breaking changes
  
- [ ] angular-drag-and-drop-lists 
  see https://github.com/marceljuenemann/angular-drag-and-drop-lists

- [ ] angular-sweetalert
  upgrade https://sweetalert.js.org/ updated for now with just sweetalert, but old version, new version has changed API

- [x] angular-scroll -> 1.0.2

- [x] angular-strap -> 2.3.8
  checked - we fully moved to angular-ui-bootstrap

- [x] angular-toastr -> 2.1.1
  not needed we create our own wrapper for toastr, so need just it

- [x] angular-ui-grid - remove
  we used it for POC but our wrapper for free-jqgrid appeared to be more powerfull

- [x] angular-ui-select2 -> dev has been dead for some time. move this into our src
  moved to components
  
- [x] blueimp-file-upload-node -> 10.7.0
  not needed

- [x] jquery-file-upload & jquery-file-upload-middleware - not needed

- [ ] blueimp-load-image -> ???
  we use jquery-file-upload-angular and it depends on it 

- [x] bootstrap -> 3.3.7

- [x] eonasdan-bootstrap-datetimepicker -> 4.17.47

- [x] "jquery": "2.1.1" -> latest 3.4.1
  jquery we use mostly for selectors so shouldnt break something
  
- [x] jquery-file-upload & jquery-file-upload-middleware - see blueimp above, why are we depending on this?

- [x] "jquery-ui": "1.12.1" -> REMOVE can we get rid of this? whats it needed for?

- [ ] "later": "*" -> it appears this is used only in rcm to parse the cron stuff. we should move dependency there

- [x] "select2-bootstrap-css": "~1.4.6" -> should move this into our src.


Notes for migration:
- lets get RCM master converted to js first.
- IsFalsy and DeepPick, DeepDiff got moved to just imports
- ui.bootstrap after 0.14 $modalInstance -> $uibModalInstance

