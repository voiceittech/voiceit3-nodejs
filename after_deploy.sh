git clone https://${GH_TOKEN}@github.com/voiceittech/voiceit2-nodejs.git $HOME/voiceit2nodejs-gm
git config --global user.email "voiceitbot@voiceit.io"
git config --global user.name "voiceitbot"
cp package.json $HOME/voiceit2nodejs-gm/
cd $HOME/voiceit2nodejs-gm
git add package.json
git commit -m "Updated Version [skip ci]"
git push origin master
curl -X POST -H 'Content-type: application/json' --data '{"icon_url": "https://s3.amazonaws.com/voiceit-api2-testing-files/test-data/TravisCI-Mascot-1.png","username": "Release Wrapper Gate","attachments": [{"text": "Packaging VoiceIt2-NodeJS version '$NEWVERSION' succeeded.","color": "good"}]}' 'https://hooks.slack.com/services/'$SLACKPARAM1'/'$SLACKPARAM2'/'$SLACKPARAM3
