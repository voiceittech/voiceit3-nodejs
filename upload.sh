#!/bin/bash
rm -r test-data
commit=$(git log -1 --pretty=%B | head -n 1)
version=$(echo $(npm search voiceit2 | grep voiceit2 | awk '{print $11}') | tr "." "\n")
set -- $version

major=$1
minor=$2
patch=$3

oldversion=$major'.'$minor'.'$patch

if [[ $commit = *"RELEASE"* ]];
then
  if [[ $commit = *"RELEASEMAJOR"* ]];
  then
    major=$(($major+1))
    minor=0
    patch=0
  elif [[ $commit = *"RELEASEMINOR"* ]];
  then
    minor=$(($minor+1))
    patch=0
  elif [[ $commit = *"RELEASEPATCH"* ]];
  then
    patch=$(($patch+1))
  else
    echo "Must specify RELEASEMAJOR, RELEASEMINOR, or RELEASEPATCH in the title." 1>&2
    exit 1
  fi

  version=$major'.'$minor'.'$patch
  REPLACE_VERSION='s/'$oldversion'/'$version'/g'
  sed -i $REPLACE_VERSION package.json
  cat package.json | awk 'NR==3'
  export DO_DEPLOY=YES
  echo "DO_DEPLOY=YES" >> ~/.profile
else
    export DO_DEPLOY=NO
    echo "DO_DEPLOY=NO" >> ~/.profile
    echo "Tests passed but did not deploy"
    exit 0
fi
