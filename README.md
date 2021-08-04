# Angle Grinder 4.x

## About
__angle-grinder__ can be opinionated at times. It is a collection of libraries with mods and wrappers around them to facilite building an application faster with anglularJS and Bootstrap 2.
Here are the key things we try to do here:

- a simple generic framework to do CRUD from a grid using a dialog
- utilities for integrating with a Grails app
- wrapper around JQGrid for angularJs as well as mods to look an feel for bootstrap
- various improvements and tweaks on form components for drop downs & selects
- less modifications for look and feel on Bootstrap

Website Documentation and Examples: http://9ci.github.io/angle-grinder

## Dev Quick Start

### Prerequisites

1. Docker
2. node(version >= v10.13.0) and (yarn)[https://classic.yarnpkg.com/en/docs/install/#mac-stable]  for dev on your system

### Running Tests

- `make install`
- `make check` to lint and run tests
- `yarn test` to run karma and jasmine tess

see `make help`

### Running the demos

- `yarn start-demo` should be availiable on localhost:3000

- `yarn start-docs` runs the docs app

### Running ag-demo

- `yarn start-ag-demo` should be available on localhost:3000 to sanity check, most part of functions wont work

- `yarn build-ag-demo` transpiles  and bundles js code and copies into the ag-demo-grails/src/main/resources/public , do not put assets to web-app folder, because it wont be included into jar file

- `yarn watch-ag-demo` will watch the files in ag-demo-ui and build into grails if any change is made

- `./gradlew bootRun` to run grails demo app, needs 


for the sample node app and docs
`script/run-frontend-server`
then open http://localhost:9000

## File upload demo

Run `node_modules/blueimp-file-upload-node/server.js`
and navigate to `http://localhost:9000/#/examples/fileUpload`


### migration notes

- form-multi-column no-margin classes can go away, they don't seem to do anything
- form-multi-column no-margin classes can go away, they don't seem to do anything
- IsFalsy and DeepPick, DeepDiff got moved to just imports
- ui.bootstrap after 0.14 $modalInstance -> $uibModalInstance
