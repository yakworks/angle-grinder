# check for build/shipkit and clone if not there, this should come first
SHIPKIT_DIR = build/shipkit
$(shell [ ! -e $(SHIPKIT_DIR) ] && git clone -b v1.0.22 https://github.com/yakworks/shipkit.git $(SHIPKIT_DIR) >/dev/null 2>&1)
# Shipkit.make first, which does all the lifting to create makefile.env for the BUILD_VARS
include $(SHIPKIT_DIR)/Shipkit.make
include $(SHIPKIT_MAKEFILES)/docker.make
include $(SHIPKIT_MAKEFILES)/secrets.make
include $(SHIPKIT_MAKEFILES)/git-tools.make
include $(SHIPKIT_MAKEFILES)/ship-version.make
include $(SHIPKIT_MAKEFILES)/circle.make

karma.sh = npx karma
lint.sh = npx eslint

# --- standard base build ----

node_modules:
	yarn install

## runs the yarn install
install: node_modules

## Run the lint and tests, will install if not done already
check: install lint test

## runs both karma and jasmine tests
test: test.karma test.jasmine

## runs karma tests
test.karma:
	$(karma.sh) start tests/karma.conf.js --single-run --no-auto-watch --no-sandbox $$*

## runs jasmine tests
test.jasmine:
	$(karma.sh) start tests/karma-jasmine.conf.js --single-run --no-auto-watch --no-sandbox $$*

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

# --------- ship, version, deploy ------------

# replace the version in package.json with new dev one
# should be run in its own make and after ship.version is run so new version is in version.properties
ship.pkg-json-version:
	sed -i.bak -e 's|"version":.*|"version": "$(VERSION)",|g' package.json && rm -- "package.json.bak"

.PHONY: ship.release

ifdef RELEASABLE_BRANCH

 ship.release:
	# this should happen last and in its own make as it will increment the version number which is used in scripts above
    # TODO it seems a bit backwards though and the scripts above should be modified
	make ship.version
	make ship.pkg-json-version
	$(log.done)

else

 ship.release:
	$(log.done) " - not on a RELEASABLE_BRANCH, nothing to do"

endif # end RELEASABLE_BRANCH

# --- Dev and testing and misc, here below is for testing and debugging ----

install-githooks:
	git config core.hooksPath .githooks


