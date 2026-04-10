const assert = require('assert');
const config = require('../utilities/test-config');
const voiceit = require('../index');
const utilities = require('../utilities/utilities');
const responseCode = require('../utilities/response-code');
const fs = require('fs');

let myVoiceIt = new voiceit(process.env.VIAPIKEY, process.env.VIAPITOKEN);
const MAX_TIMEOUT =   1000;

describe('Testing Webhook URL', function(){

  before(function(done) {
    if (process.env.BOXFUSE_ENV === 'voiceittest') {
      fs.writeFile(process.env.HOME + "/platformVersion", myVoiceIt.axiosInstance.defaults.headers.platformVersion, function(err) {
          if(err) {
              return console.log(err);
          }
          console.log("The file was saved!");
      }); 
    }
    done();
  });

  describe('Test Webhook URL', function(){
    it(`should return the correct Notification URL`, function(done){
      this.timeout(MAX_TIMEOUT);
      let itthis = this;
      myVoiceIt.addNotificationUrl({url: 'https://voiceit.io'}, () => {
        try {
          assert.equal(myVoiceIt.notificationUrl, '?notificationURL=https%3A%2F%2Fvoiceit.io');
          done();
        } catch(e) {
          return done(e);
        }
      });
    });
  });

  describe('Test Webhook URL', function(){
    it(`should return the correct Notification URL`, function(done){
      this.timeout(MAX_TIMEOUT);
      let itthis = this;
      myVoiceIt.removeNotificationUrl(() => {
        try {
          assert.equal(myVoiceIt.notificationUrl, '');
          done();
        } catch(e) {
          return done(e);
        }
      });
    });
  });
});
