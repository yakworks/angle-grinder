#/bin/bash

CURRENT_DIR=`pwd`
ANGLE_GRINDER_DIR="$CURRENT_DIR/../angle-grinder"

SKIP_DEPENDENCIES=0

# Read and parse commandline options
while :
do
  case $1 in
    --skip-dependiences | -d)
      SKIP_DEPENDENCIES=$((SKIP_DEPENDENCIES+1))
      shift
      ;;
    *) # no more options
      break
      ;;
   esac
done

# Cleanup the output directory
cd "$CURRENT_DIR/web-app/angle-grinder"
ls | grep -v .gitkeep | xargs rm -rf

# Update sources and install all required components
cd $ANGLE_GRINDER_DIR
git pull --rebase

if [ $SKIP_DEPENDENCIES -eq 0 ]; then
  npm install
  bower install
else
  echo "\n=== Skipping dependencies installation ===\n"
fi

# Build the app and copy the outputto the right place
grunt build
cp -R dist/* "$CURRENT_DIR/web-app/angle-grinder"
