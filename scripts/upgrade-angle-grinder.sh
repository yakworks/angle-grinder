#/bin/bash

CURRENT_DIR=`pwd`
ANGLE_GRINDER_DIR="$CURRENT_DIR/../angle-grinder"

if [ ! -d "$ANGLE_GRINDER_DIR" ]; then
  echo "Cannot found `$ANGLE_GRINDER_DIR`";
  exit 1;
fi

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
OUTPUT_DIRECTORY="$CURRENT_DIR/assets/angle-grinder"
if [ ! -d "$OUTPUT_DIRECTORY" ]; then
  exit 1;
fi

cd "$OUTPUT_DIRECTORY"
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

# Build the app and copy the output to the right place
grunt build
cp -R dist/* "$OUTPUT_DIRECTORY"
