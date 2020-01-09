deps upgrades, many needed for umd modules

- [x] get karma up to date, on a very old version

- [ ] angular-xeditable@0.6.0 -> 0.10.2

- [ ] "Select2": "~3.5.1" -> 4.0.12?
  need 4 for umd modules

- [ ] angular-drag-and-drop-lists 
  see https://github.com/marceljuenemann/angular-drag-and-drop-lists

- [ ] angular-sweetalert
  it does not appear that the angular is used and we use sweet alert directly, 
  upgrade https://sweetalert.js.org/

- [ ] angular-scroll -> 1.0.2

- [ ] angular-strap -> 2.3.8
  If all we use is the popover then lets just move code into this app. 
  angular-strap is also no longer maintained

- [ ] angular-toastr -> 2.1.1
  we may also want to move this one into our src
  !! why do we also include toastr if this is supposed to replace that?

- [ ] angular-ui-grid - remove
  I can't see anywhere where we are using this

- [ ] angular-ui-select2 -> dev has been dead for some time. move this into our src

- [ ] blueimp-file-upload-node -> 10.7.0
  why are we using this and the jquery-file-upload? are we?

- [ ] jquery-file-upload & jquery-file-upload-middleware - see above, why are we depending on this?

- [ ] blueimp-load-image -> ???
  Is this used?

- [ ] bootstrap -> 3.3.7

- [ ] eonasdan-bootstrap-datetimepicker -> 4.17.47

- [ ] "jquery": "2.1.1" -> latest 3?

- [ ] jquery-file-upload & jquery-file-upload-middleware - see blueimp above, why are we depending on this?

- [ ] "jquery-ui": "1.12.1" -> REMOVE can we get rid of this? whats it needed for?

- [ ] "later": "*" -> it appears this is used only in rcm to parse the cron stuff. we should move dependency there

- [ ] "select2-bootstrap-css": "~1.4.6" -> should move this into our src.
