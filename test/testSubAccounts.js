const assert = require('assert');
const voiceit = require('../index');
const utilities = require('../utilities/utilities');
const responseCode = require('../utilities/response-code');
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
    it(`should return SUCC`, function(done){
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
          utilities.printIfError(responseCode.SUCCESS, jsonResponse);
          assert.equal(jsonResponse.responseCode, responseCode.SUCCESS);
          assert.equal(jsonResponse.status, 201);
          assert.ok(utilities.compare(jsonResponse.message, 'Created new managed sub-account developer with apiKey : key_([a-z0-9]){32}'));
          done();
        } catch(e) {
          return done(e);
        }
      });
    });
  });

  describe('Test Create Unmanaged SubAccount', function(){
    it(`should return SUCC`, function(done){
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
          utilities.printIfError(responseCode.SUCCESS, jsonResponse);
          assert.equal(jsonResponse.responseCode, responseCode.SUCCESS);
          assert.equal(jsonResponse.status, 201);
          assert.ok(utilities.compare(jsonResponse.message, 'Created new unmanaged sub-account developer with apiKey : key_([a-z0-9]){32}'));
          done();
        } catch(e) {
          return done(e);
        }
      });
    });
  });

  describe('Test Switch SubAccount Type', function(){
    it(`should return SUCC`, function(done){
      this.timeout(MAX_TIMEOUT);
      let itThis = this;
      myVoiceIt.switchSubAccountType({
        subAccountAPIKey: subAccounts.currentSubAccountAPIKeys[1]
      }, (jsonResponse) => {
        try {
          assert.equal(jsonResponse.responseCode, 'SUCC');
          assert.equal(jsonResponse.status, 200);
          done();
        } catch(e) {
          return done(e);
        }
      });
    });
  });


  describe('Test Regenerate SubAccount API Token', function(){
    it(`should return SUCC`, function(done){
      this.timeout(MAX_TIMEOUT);
      let itThis = this;
      myVoiceIt.regenerateSubAccountAPIToken({
        subAccountAPIKey: subAccounts.currentSubAccountAPIKeys[0]
      }, (jsonResponse) => {
        if(jsonResponse.responseCode == responseCode.SUCCESS){
            subAccounts.currentSubAccountAPIKeys.push(jsonResponse.apiKey);
        }
        try {
          utilities.printIfError(responseCode.SUCCESS, jsonResponse);
          assert.equal(jsonResponse.responseCode, responseCode.SUCCESS);
          assert.equal(jsonResponse.status, 200);
          assert.ok(utilities.compare(jsonResponse.message, 'Regenerated apiToken : tok_([a-z0-9]){32} for sub-account developer with apiKey : key_([a-z0-9]){32}'));
          done();
        } catch(e) {
          return done(e);
        }
      });
    });
  });

  describe('Test Delete SubAccount', function(){
    it(`should return SUCC`, function(done){
      this.timeout(MAX_TIMEOUT);
      let itThis = this;
      myVoiceIt.deleteSubAccount({
        subAccountAPIKey: subAccounts.currentSubAccountAPIKeys[0]
      }, (jsonResponse) => {
        if(jsonResponse.responseCode == responseCode.SUCCESS){
            subAccounts.currentSubAccountAPIKeys.push(jsonResponse.apiKey);
        }
        try {
          utilities.printIfError(responseCode.SUCCESS, jsonResponse);
          assert.equal(jsonResponse.responseCode, responseCode.SUCCESS);
          assert.equal(jsonResponse.status, 200);
          assert.ok(utilities.compare(jsonResponse.message, 'Deleted sub-account developer with apiKey : key_([a-z0-9]){32}'));
          done();
        } catch(e) {
          return done(e);
        }
      });
    });
  });
});
