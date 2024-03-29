# check for build/shipkit and clone if not there, this should come first
SHIPKIT_DIR = build/shipkit
$(shell [ ! -e $(SHIPKIT_DIR) ] && git clone -b v1.0.40 https://github.com/yakworks/shipkit.git $(SHIPKIT_DIR) >/dev/null 2>&1)
# Shipkit.make first, which does all the lifting to create makefile.env for the BUILD_VARS
include $(SHIPKIT_DIR)/Shipkit.make
include $(SHIPKIT_DIR)/makefiles/vault.make
include $(SHIPKIT_MAKEFILES)/docker.make
include $(SHIPKIT_MAKEFILES)/git-tools.make
include $(SHIPKIT_MAKEFILES)/ship-version.make
include $(SHIPKIT_MAKEFILES)/circle.make

# -- Variables ---
export BOT_EMAIL ?= 9cibot@9ci.com
karma.sh = npx karma
lint.sh = npx eslint
jest.sh = npx jest

# --- standard base build ----

node_modules:
	yarn install

## runs the yarn install
install: node_modules

## Run the lint and tests, will install if not done already
check: install lint test

## runs both karma and jasmine tests
test: jest test.karma test.jasmine

## runs karma tests
test.karma:
	$(karma.sh) start tests/karma.conf.js --single-run --no-auto-watch --no-sandbox $$*

## runs jasmine tests
test.jasmine:
	$(karma.sh) start tests/karma-jasmine.conf.js --single-run --no-auto-watch --no-sandbox $$*

## runs jasmine tests
jest:
	$(jest.sh)

## runs eslint
lint:
	$(lint.sh) src/

## runs eslint with --fix
lint.fix:
	$(lint.sh) src/ --fix

## runs eslint
demo.lint:
	$(lint.sh) examples/demo/

## runs eslint with --fix
demo.lint.fix:
	$(lint.sh) examples/demo/ --fix

## removes build and test dirs
clean:
	rm -rf dist && rm -rf build

## starts the demo app
start.demo:
	npx webpack-dev-server --mode=development --content-base ./examples/demo

start.svelte:
	npx webpack-dev-server --content-base ./examples/svelte

clean.dist:
	rm -rf dist/

## builds the demo app
build.demo: clean.dist
	npx webpack --mode=production --content-base ./examples/demo

build.ag: clean.dist
	npx webpack --mode=production --content-base .

build.analyze: export BUNDLE_ANALYZE=true
build.analyze: clean.dist build.ag

run.build:
	cd dist && python -m SimpleHTTPServer 8090 & npx webpack-dev-server --content-base ./examples/demo
# --------- ship, version, deploy ------------


# --- Dev and testing and misc, here below is for testing and debugging ----

install-githooks:
	git config core.hooksPath .githooks

start.sandbox:
	npx webpack-dev-server --mode=development --content-base ./examples/sandbox


