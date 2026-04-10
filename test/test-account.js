const assert = require('assert');
const voiceit = require('../index');
const utilities = require('../utilities/utilities');
const responseCode = require('../utilities/response-code');

let myVoiceItDisabled = new voiceit(process.env.VIAPIKEY_DISABLED || 'key_disabled', process.env.VIAPITOKEN_DISABLED || 'tok_disabled');
let myVoiceItUnauthorized = new voiceit(process.env.VIAPIKEY, 'not_a_real_api_token');

const MAX_TIMEOUT = 40000;
const SETUP_TIMEOUT = 20000;

describe('Testing Account', function(){
  before(function(done){
    this.timeout(SETUP_TIMEOUT);
    done();
  });

  describe('Test Account Disabled', function(){
    it('should return DAID', function(done){
      this.timeout(MAX_TIMEOUT);
      if (!process.env.VIAPIKEY_DISABLED || !process.env.VIAPITOKEN_DISABLED) {
        console.log('      ***Skipping DAID test: VIAPIKEY_DISABLED/VIAPITOKEN_DISABLED env vars not set***');
        this.skip();
        return;
      }
      myVoiceItDisabled.getAllUsers((jsonResponse) => {
        try {
          assert.equal(jsonResponse.responseCode, responseCode.DEVELOPER_ACCOUNT_IS_DISABLED);
          assert.equal(jsonResponse.status, 401);
          assert.ok(utilities.compare(jsonResponse.message, 'Your developer account has been disabled. Please contact us at support@voiceit.tech with any questions.'));
          done();
        } catch(e) {
          return done(e);
        }
      });
    });
  });

  describe('Test Wrong API Token', function(){
    it('should return UNAC', function(done){
      this.timeout(MAX_TIMEOUT);
      myVoiceItUnauthorized.getAllUsers((jsonResponse) => {
        try {
          assert.equal(jsonResponse.responseCode, 'UNAC');
          assert.equal(jsonResponse.status, 401);
          assert.ok(utilities.compare(jsonResponse.message, 'Unauthorized access, please ensure you have the right API key and access token'));
          done();
        } catch(e) {
          return done(e);
        }
      });
    });
  });

});
