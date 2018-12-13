let assert = require('assert');
let config = require('../utilities/test-config');
let voiceit = require('../index');
let utilities = require('../utilities/utilities');
let responseCode = require('../utilities/response-code');
let getPhrasesTestCases = require('../test-cases/getPhrasesTestCases');
let myVoiceIt = new voiceit(process.env.VIAPIKEY, process.env.VIAPITOKEN);
let MAX_TIMEOUT = 30000;
let SETUP_TIMEOUT = 20000;
const phrases  = {
  currentUserIds: [],
  cleanup:()=>{
    phrases.currentUserIds.forEach((id)=>{
      myVoiceIt.deleteUser({ userId : id },(jsonResponse)=>{
        console.log("Done!", jsonResponse.message);
      });
    });
  }
}

describe('Testing All Phrase API Calls', function(){
  before(function(done){
    this.timeout(SETUP_TIMEOUT);
    done();
  });

  describe('Test Get Phrases', function(){
      getPhrasesTestCases.forEach(function(testCase){
        it(`should return ${testCase.expectedRc}`, function(done){
          this.timeout(MAX_TIMEOUT);
          let itThis = this;
          myVoiceIt.getPhrases(
            {
              contentLanguage : testCase.contentLanguage
            },(jsonResponse) => {
              try {
                utilities.printIfError(testCase.expectedRc, jsonResponse);
                assert.equal(jsonResponse.responseCode, testCase.expectedRc);
                assert.equal(jsonResponse.status, testCase.expectedSc);
                assert.ok(utilities.compare(jsonResponse.message, testCase.expectedMessage));
                done();
              } catch(e) {
                return done(e);
              }
            });
        });
      });
  });

});
