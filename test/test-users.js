const assert = require('assert');
const config = require('../utilities/test-config');
const voiceit = require('../index');
const utilities = require('../utilities/utilities');
const responseCode = require('../utilities/response-code');
const getAllUsersTestCases = require('../test-cases/getAllUsersTestCases');
const checkUserExistsTestCases = require('../test-cases/checkUserExistsTestCases');
const createUserTestCases = require('../test-cases/createUserTestCases');
const deleteUserTestCases = require('../test-cases/deleteUserTestCases');
const createUserTokenTestCases = require('../test-cases/createUserTokenTestCases');
const expireUserTokenTestCases = require('../test-cases/expireUserTokensTestCases');
let myVoiceIt = new voiceit(process.env.VIAPIKEY, process.env.VIAPITOKEN);
const MAX_TIMEOUT = 30000;
const SETUP_TIMEOUT = 20000;
const users  = {
  currentUserIds: [],
  setup:(next)=>{
    myVoiceIt.createUser((jsonResponse)=>{
      if(jsonResponse.responseCode == responseCode.SUCCESS){
        users.currentUserIds.push(jsonResponse.userId);
        next();
      } else {
        console.log("Failed to create user");
      }
    });
  },
  cleanup:()=>{
    users.currentUserIds.forEach((id)=>{
      myVoiceIt.deleteUser({ userId : id },(jsonResponse)=>{
        console.log("Done!", jsonResponse.message);
      });
    });
  }
}

describe('Testing All User API Calls', function(){
  before(function(done){
    this.timeout(SETUP_TIMEOUT);
    users.setup(done);
  });

  after(function(){
    users.cleanup();
  });

  describe('Test Get All Users', function(){
      getAllUsersTestCases.forEach(function(testCase){
        it(`should return ${testCase.expectedRc}`, function(done){
          this.timeout(MAX_TIMEOUT);
          let itThis = this;
          myVoiceIt.getAllUsers((jsonResponse) => {
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

  describe('Test Create User', function(){
      createUserTestCases.forEach(function(testCase){
        it(`should return ${testCase.expectedRc}`, function(done){
          this.timeout(MAX_TIMEOUT);
          let itThis = this;
          myVoiceIt.createUser((jsonResponse) => {
            if(jsonResponse.responseCode == responseCode.SUCCESS){
                users.currentUserIds.push(jsonResponse.userId);
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

  describe('Test Check User Exists', function(){
      checkUserExistsTestCases.forEach(function(testCase){
        it(`should return ${testCase.expectedRc}`, function(done){
          this.timeout(MAX_TIMEOUT);
          let itThis = this;
          myVoiceIt.checkUserExists(
            {
              userId : testCase.userId ? testCase.userId : users.currentUserIds[0],
            },
            (jsonResponse) => {
              try {
                utilities.printIfError(testCase.expectedRc, jsonResponse);
                assert.equal(jsonResponse.responseCode, testCase.expectedRc);
                assert.equal(jsonResponse.exists, testCase.expectedExists);
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

  describe('Test Create User Token', function(){
      createUserTokenTestCases.forEach(function(testCase){
        it(`should return ${testCase.expectedRc}`, function(done){
          this.timeout(MAX_TIMEOUT);
          let itThis = this;
          myVoiceIt.createUserToken(
            {
              userId: testCase.userId ? testCase.userId : users.currentUserIds[0],
            },
            (jsonResponse) => {
              try {
                utilities.printIfError(testCase.expectedRc, jsonResponse);
                assert.equal(jsonResponse.responseCode, testCase.expectedRc);
                assert.equal(jsonResponse.status, testCase.expectedSc);
                assert.ok(utilities.compare(jsonResponse.userToken, testCase.userToken));
                assert.ok(utilities.compare(jsonResponse.message, testCase.expectedMessage));
                done();
              } catch(e) {
                return done(e);
              }
            });
        });
      });
  });

  describe('Test Expire User Tokens', function(){
      createUserTokenTestCases.forEach(function(testCase){
        it(`should return ${testCase.expectedRc}`, function(done){
          this.timeout(MAX_TIMEOUT);
          let itThis = this;
          myVoiceIt.expireUserTokens(
            {
              userId: testCase.userId ? testCase.userId : users.currentUserIds[0],
            },
            (jsonResponse) => {
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

  describe('Test Delete User', function(){
      deleteUserTestCases.forEach(function(testCase){
        it(`should return ${testCase.expectedRc}`, function(done){
          this.timeout(MAX_TIMEOUT);
          let itThis = this;
          myVoiceIt.deleteUser(
            {
              userId : testCase.userId ? testCase.userId : users.currentUserIds[0],
            },
            (jsonResponse) => {
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
