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

