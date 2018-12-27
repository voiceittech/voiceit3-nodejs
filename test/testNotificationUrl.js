let assert = require('assert');
let config = require('../utilities/test-config');
let voiceit = require('../index');
let utilities = require('../utilities/utilities');
let responseCode = require('../utilities/response-code');

let myVoiceIt = new voiceit(process.env.VIAPIKEY, process.env.VIAPITOKEN);
let MAX_TIMEOUT =   1000;

describe('Testing Webhook URL', function(){

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
});
