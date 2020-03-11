const assert = require('assert');
const voiceit = require('../index');
const utilities = require('../utilities/utilities');
const responseCode = require('../utilities/response-code');
const createManagedSubAccountTestCases = require('../test-cases/createManagedSubAccountTestCases');
const createUnnanagedSubAccountTestCases = require('../test-cases/createUnmanagedSubAccountTestCases');
const regenerateSubAccountAPITokenTestCases = require('../test-cases/regenerateSubAccountAPITokenTestCases');
const deleteSubAccountTestCases = require('../test-cases/deleteSubAccountTestCases');
let myVoiceIt = new voiceit(process.env.VIAPIKEY, process.env.VIAPITOKEN);
const MAX_TIMEOUT = 30000;
const SETUP_TIMEOUT = 20000;
const subAccounts  = {
  currentSubAccountAPIKeys: [],
  setup:(next)=>{
    next();
  },
  cleanup:()=>{
    subAccounts.currentSubAccountAPIKeys.forEach((id)=>{
      if (id)
        myVoiceIt.deleteSubAccount({ subAccountAPIKey : id },(jsonResponse)=>{
          console.log("Done!", jsonResponse.message);
        });
    });
  }
}

describe('Testing All Subaccount API Calls', function(){
  before(function(done){
    this.timeout(SETUP_TIMEOUT);
    done();
  });

  after(function(){
    subAccounts.cleanup();
  });

  describe('Test Create Managed SubAccount', function(){
    createManagedSubAccountTestCases.forEach(function(testCase){
      it(`should return ${testCase.expectedRc}`, function(done){
        this.timeout(MAX_TIMEOUT);
        let itThis = this;
        myVoiceIt.createManagedSubAccount({
          firstName: "Test",
          lastName: "Node",
          email: "",
          password: "",
          contentLanguage: ""
        }, (jsonResponse) => {
          if(jsonResponse.responseCode == responseCode.SUCCESS){
              subAccounts.currentSubAccountAPIKeys.push(jsonResponse.apiKey);
          }
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

  describe('Test Create Unmanaged SubAccount', function(){
    createUnnanagedSubAccountTestCases.forEach(function(testCase){
      it(`should return ${testCase.expectedRc}`, function(done){
        this.timeout(MAX_TIMEOUT);
        let itThis = this;
        myVoiceIt.createUnmanagedSubAccount({
          firstName: "Test",
          lastName: "Node",
          email: "",
          password: "",
          contentLanguage: ""
        }, (jsonResponse) => {
          if(jsonResponse.responseCode == responseCode.SUCCESS){
              subAccounts.currentSubAccountAPIKeys.push(jsonResponse.apiKey);
          }
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

  describe('Test Regenerate SubAccount API Token', function(){
    regenerateSubAccountAPITokenTestCases.forEach(function(testCase){
      it(`should return ${testCase.expectedRc}`, function(done){
        this.timeout(MAX_TIMEOUT);
        let itThis = this;
        myVoiceIt.regenerateSubAccountAPIToken({
          subAccountAPIKey: subAccounts.currentSubAccountAPIKeys[0]
        }, (jsonResponse) => {
          if(jsonResponse.responseCode == responseCode.SUCCESS){
              subAccounts.currentSubAccountAPIKeys.push(jsonResponse.apiKey);
          }
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

  describe('Test Delete SubAccount', function(){
    deleteSubAccountTestCases.forEach(function(testCase){
      it(`should return ${testCase.expectedRc}`, function(done){
        this.timeout(MAX_TIMEOUT);
        let itThis = this;
        myVoiceIt.deleteSubAccount({
          subAccountAPIKey: subAccounts.currentSubAccountAPIKeys[0]
        }, (jsonResponse) => {
          if(jsonResponse.responseCode == responseCode.SUCCESS){
              subAccounts.currentSubAccountAPIKeys.push(jsonResponse.apiKey);
          }
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
