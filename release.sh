#!/bin/bash
rm -r test-data
commit=$(git log -1 --pretty=%B | head -n 1)
version=$(echo $(npm search voiceit2 | grep voiceit2 | awk '{print $11}') | tr "." "\n")
set -- $version

major=$1
minor=$2
patch=$3
wrapperplatformversion=$(cat ~/platformVersion)
reponame=$(basename $(git remote get-url origin) | sed 's/.\{4\}$//')

oldversion=$major'.'$minor'.'$patch

if [[ $commit = *"RELEASE"* ]];
then

  if [[ $major = "" ]] || [[ $minor = "" ]] || [[ $patch = "" ]];
  then
    curl -X POST -H 'Content-type: application/json' --data '{
      "icon_url": "https://s3.amazonaws.com/voiceit-api2-testing-files/test-data/TravisCI-Mascot-1.png",
      "username": "Release Wrapper Gate",
        "attachments": [
            {
                "text": "Packaging '$reponame' failed. because script could not get current version",
                "color": "danger"
            }
        ]
    }' 'https://hooks.slack.com/services/'$SLACKPARAM1'/'$SLACKPARAM2'/'$SLACKPARAM3
    echo "Unable to get current version: cannot release." 1>&2
    exit 1
  fi

  echo 'old version='$oldversion

  if [[ $commit = *"RELEASEMAJOR"* ]];
  then
    releasetype="RELEASEMAJOR"
    major=$(($major+1))
    minor=0
    patch=0
  elif [[ $commit = *"RELEASEMINOR"* ]];
  then
    releasetype="RELEASEMINOR"
    minor=$(($minor+1))
    patch=0
  elif [[ $commit = *"RELEASEPATCH"* ]];
  then
    releasetype="RELEASEPATCH"
    patch=$(($patch+1))
  else
    echo "Must specify RELEASEMAJOR, RELEASEMINOR, or RELEASEPATCH in the title." 1>&2
    exit 1
  fi

  echo 'new version='$major'.'$minor'.'$patch
  version=$major'.'$minor'.'$patch

  if [[ $wrapperplatformversion = $version ]];
  then
    REPLACE_VERSION='s/'$oldversion'/'$version'/g'
    sed -i $REPLACE_VERSION package.json
    cat package.json | awk 'NR==3'
    export DO_DEPLOY=YES
    echo "DO_DEPLOY=YES" >> ~/.profile
    export NEWVERSION=$version
    echo "NEWVERSION="$version >> ~/.profile
  else
    export DO_DEPLOY=NO
    echo "DO_DEPLOY=NO" >> ~/.profile
    export NEWVERSION=$version
    echo "NEWVERSION="$version >> ~/.profile
    curl -X POST -H 'Content-type: application/json' --data '{
      "icon_url": "https://s3.amazonaws.com/voiceit-api2-testing-files/test-data/TravisCI-Mascot-1.png",
      "username": "Release Wrapper Gate",
        "attachments": [
            {
                "text": "Packaging '$reponame' version '$version' failed because the specified release version to update package management (specified by including '$releasetype' in the commit title) does not match the platform version inside the wrapper.",
                "color": "danger"
            }
        ]
    }' 'https://hooks.slack.com/services/'$SLACKPARAM1'/'$SLACKPARAM2'/'$SLACKPARAM3
    echo "Specified release version to update package management (specified by including "$releasetype" in the commit title) does not match the platform version in wrapper source." 1>&2
    exit 1
  fi

else
  export DO_DEPLOY=NO
  echo "DO_DEPLOY=NO" >> ~/.profile
  export NEWVERSION=$version
  echo "NEWVERSION="$version >> ~/.profile
  echo "Tests passed but did not deploy"
  exit 0
fi
