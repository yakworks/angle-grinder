# Angle Grinder

[![Build status](https://secure.travis-ci.org/9ci/angle-grinder.png)](http://travis-ci.org/9ci/angle-grinder)

## Bootstrap

Install nodejs v0.10.12 from the sources:

```
sudo apt-get install build-essential openssl libssl-dev pkg-config

wget http://nodejs.org/dist/v0.10.12/node-v0.10.12.tar.gz
tar -xzf node-v0.10.12.tar.gz

cd node-v0.10.12
./configure
make
sudo make install
```

## Install tools

```
npm install -g grunt-cli
npm install -g bower
```

## Install PhantomJS ad CasperJS for the integration testing

Download and install PhantomJS

```
wget https://phantomjs.googlecode.com/files/phantomjs-1.9.1-linux-x86_64.tar.bz2
tar xvjf phantomjs-1.9.1-linux-x86_64.tar.bz2
cd tar xvjf phantomjs-1.9.1-linux-x86_64
ln -sf `pwd`/bin/phantomjs /usr/local/bin/phantomjs
```

Checkout and install CasperJS

```
git clone git://github.com/n1k0/casperjs.git
cd casperjs
git checkout tags/1.0.2
ln -sf `pwd`/bin/casperjs /usr/local/bin/casperjs
```

Detailed instructions http://casperjs.org/installation.html

### Run the app

```
./script/bootstrap.sh
foreman start
```

open http://localhost:9000

## Directory structure

* ./app - contains CoffeeScript sources, styles, images, fonts and other assets
  * ./app/scripts - CoffeeScript sources
  * ./app/styles - stylesheets
  * ./app/views - html views used by AngularJS
* ./test - contains tests for the application
  * ./tests/casperjs - CasperJS integration specs
  * ./tests/unit - unit tests for AngularJS components

Third-party libraries

* ./bower_components - components dowloaded by `bower install` command
* ./custom_components - you could put custom components here
* ./node_modules - command dowloaded by `npm install` command

Generated stuff

* ./dev - compiled development release
* ./dist - created by `grunt build` command, contains the production minified release of the app

## Running tests

By default all tests are executes in PhantomJS browser

`grunt test`

Run test against specific browsers

`grunt test --browsers=Chrome,Firefox,Opera,PhantomJS`

Run karma with `autoWatch` option:

```
# inside the first terminal
grunt server

# inside the second terminal
grunt test:watch --browsers=Chrome,Opera
```

or

```
# inside the first terminal
grunt build:dev watch

# inside the second terminal
grunt test:watch --browsers=Firefox,PhantomJS
```

Task `grunt watch` has to be executed since it's recompiling all CoffeeScripts.

### How to debug failing specs

Put `debugger` in the failing spec:

```coffee
describe "Failing spec", ->

  it "should run smoothly", ->
    debugger # this is like setting a breakpoint
    failMiserably()
```

Run karma in Chrome browser:

`grunt test:watch --browsers=Chrome`

* Go to the newly opened Chrome Browser
* Open Chrome's DevTools and refresh the page
* Now in the source tab you should see the execution stopped at the debugger

### Running e2e tests

`grunt test:e2e`
`grunt test:casperjs`

### Running tests headlessly

Start Xvfb and export DISPLAY variable:

```
./script/xvfb start
export DISPLAY=:99
```

Perform single run:

`grunt test --browsers=Firefox,Chrome,Opera,PhantomJS`

or

`grunt test:watch --browsers=Chrome`

## Build process

```
grunt build
(cd dist/ ; python -m SimpleHTTPServer 8000)
```

## Released files

```
dist
├── scripts
│   ├── angle-grinder.gridz.min.js
│   ├── bootstrap.min.js
│   ├── gridz.min.js
│   ├── scripts.min.js
│   └── vendor.min.js
└── styles
    ├── bootstrap.min.css
    ├── gridz.min.css
    └── style.min.css
```

`scripts/vendor.min.js` - jquery + AngularJS stuff

`styles/bootstrap.min.css` - twitter bootstrap styles
`scripts/bootstrap.min.js` - twitter bootstrap js + angular-bootstrap

`styles/gridz.min.css` - styles for gridz plugin
`scripts/gridz.min.js` - sources of gridz plugin

`scripts/angle-grinder.gridz.min.js` - AgularJS directive for gridz

And then navigate to `http://localhost:8000` to see the production release.
