#!/bin/bash

function printOk {
  if onLinux; then
    echo -e "\e[1;32m$1\e[0m"
  else
    echo $1
  fi
}

function printError {
  if onLinux; then
    echo -e "\e[1;31m$1\e[0m"
  else
    echo $1
  fi
}

function onLinux {
  [ $OSTYPE = "linux-gnu" ]
}

function onOsx {
  unamestr=$(uname)
  [ $unamestr = "Darwin" ]
}

#
# Check for Ruby version
#
ruby_version="$(ruby -e 'print RUBY_VERSION')"
if [ "$ruby_version" != "1.9.3" ]; then
  printError "  x Your current Ruby version is "$ruby_version". You need to Ruby version 1.9.3."
  printError "    If you use RVM, you can run:"
  printError "    rvm install ruby-1.9.3-p429"
  printError "    rvm use ruby-1.9.3-p429"
  exit
else
  printOk "  + Ruby version 1.9.3 in use."
fi

#
# Check for jekyll
#
if test ! $(which jekyll); then
  printError "  x You need to install jekyll"
  exit
else
  jekyll_version="$(jekyll --version | awk -F" " '{print $2}')"
  if [ "$jekyll_version" \< "1.2.0" ]; then
    printError "  x Your current jekyll version is "$jekyll_version""
    printError "    You need to install jekyll => 1.2.0"
    exit
  else
    printOk "  + jekyll found."
  fi
fi

jekyll serve --watch --port 4000 --baseurl '/angle-grinder'
