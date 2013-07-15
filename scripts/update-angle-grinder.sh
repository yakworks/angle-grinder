#/bin/bash

CURRENT_DIR=`pwd`
ANGLE_GRINDER_DIR="$CURRENT_DIR/../angle-grinder"

# Cleanup the output directory
cd "$CURRENT_DIR/web-app/angle-grinder"
ls | grep -v .gitkeep | xargs rm -rf

# Update sources and install all required components
cd $ANGLE_GRINDER_DIR
git pull --rebase
npm install
bower install

# Build the app and copy the outputto the right place
grunt build
cp -R dist/* "$CURRENT_DIR/web-app/angle-grinder"
