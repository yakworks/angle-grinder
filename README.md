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
2. node and yarn for dev on your system

### Running Tests

TODO will add in make commands

- `yarn` to install
- `yarn test` to run all tests

### Running Sample Docs

- `yarn start-docs` should be availiable on localhost:3000

- `yarn start-sandbox` runs the sandbox app

### Running ag-demo

- `yarn start-ag-demo` should be availiable on localhost:3000 to sanity check

- `yarn build-ag-demo` build into the ag-demo-grails/src/main/webapp

- `yarn watch-ag-demo` will watch the files in ag-demo-ui and build into grails

- `gradle .....???` TODO Alexey please update how to run grails app



**for the sample grails demo app**

```
cd grails/ag-demo/
grails run-app
```

for the sample node app and docs
`script/run-frontend-server`
then open http://localhost:9000

## File upload demo

Run `node_modules/blueimp-file-upload-node/server.js`
and navigate to `http://localhost:9000/#/examples/fileUpload`

