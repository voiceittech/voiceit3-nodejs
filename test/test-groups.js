const assert = require('assert');
const config = require('../utilities/test-config');
const voiceit = require('../index');
const utilities = require('../utilities/utilities');
const responseCode = require('../utilities/response-code');
const getAllGroupsTestCases = require('../test-cases/getAllGroupsTestCases');
const createGroupTestCases = require('../test-cases/createGroupTestCases');
const checkGroupExistsTestCases = require('../test-cases/checkGroupExistsTestCases');
const addUserToGroupTestCases = require('../test-cases/addUserToGroupTestCases');
const removeUserFromGroupTestCases = require('../test-cases/removeUserFromGroupTestCases');
const deleteGroupTestCases = require('../test-cases/deleteGroupTestCases');

let myVoiceIt = new voiceit(process.env.VIAPIKEY, process.env.VIAPITOKEN);
const MAX_TIMEOUT = 30000;
const SETUP_TIMEOUT = 20000;

const groups  = {
  currentUserIds: [],
  currentGroupIds: [],
  setup:(next)=>{
    myVoiceIt.createUser((jsonResponse)=>{
      if(jsonResponse.responseCode == responseCode.SUCCESS){
        groups.currentUserIds.push(jsonResponse.userId);
        myVoiceIt.createGroup({description: "Test Group Description"}, (jsonResponse)=>{
          if(jsonResponse.responseCode == responseCode.SUCCESS){
            groups.currentGroupIds.push(jsonResponse.groupId);
            next();
          } else {
            console.log("Failed to create group!");
          }
        });
      } else {
        console.log("Failed to create user!");
      }
    });
  },
  cleanup:()=>{
    groups.currentUserIds.forEach((uid)=>{
      myVoiceIt.deleteUser({ uid },(jsonResponse)=>{
        groups.currentGroupIds.forEach((gid)=>{
          myVoiceIt.deleteGroup({ gid },(jsonResponse)=>{
            console.log("Done!", jsonResponse.message);
          });
        });
      });
    });
  }
}

describe('Testing All Groups API Calls', function(){
  before(function(done){
    this.timeout(SETUP_TIMEOUT);
    groups.setup(done);
  });

  after(function(){
    groups.cleanup();
  });

  describe('Test Get All Groups', function(){
      getAllGroupsTestCases.forEach(function(testCase){
        it(`should return ${testCase.expectedRc}`, function(done){
          this.timeout(MAX_TIMEOUT);
          let itThis = this;
          myVoiceIt.getAllGroups((jsonResponse) => {
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

  describe('Test Check Group Exists', function(){
      checkGroupExistsTestCases.forEach(function(testCase){
        it(`should return ${testCase.expectedRc}`, function(done){
          this.timeout(MAX_TIMEOUT);
          let itThis = this;
          myVoiceIt.checkGroupExists(
            {
              groupId : testCase.groupId ? testCase.groupId : groups.currentGroupIds[0],
            },
            (jsonResponse) => {
              try {
                utilities.printIfError(testCase.expectedRc, jsonResponse);
                assert.equal(jsonResponse.responseCode, testCase.expectedRc);
                assert.equal(testCase.expectedExists, jsonResponse.exists);
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

  describe('Test Get All Groups', function(){
      getAllGroupsTestCases.forEach(function(testCase){
        it(`should return ${testCase.expectedRc}`, function(done){
          this.timeout(MAX_TIMEOUT);
          let itThis = this;
          myVoiceIt.getAllGroups((jsonResponse) => {
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

  describe('Test Add User To Group', function(){
      addUserToGroupTestCases.forEach(function(testCase){
        it(`should return ${testCase.expectedRc}`, function(done){
          this.timeout(MAX_TIMEOUT);
          let itThis = this;
          myVoiceIt.addUserToGroup(
            {
              userId : testCase.userId ? testCase.userId : groups.currentUserIds[0],
              groupId : testCase.groupId ? testCase.groupId : groups.currentGroupIds[0],
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

  describe('Test Remove User From Group', function(){
      removeUserFromGroupTestCases.forEach(function(testCase){
        it(`should return ${testCase.expectedRc}`, function(done){
          this.timeout(MAX_TIMEOUT);
          let itThis = this;
          myVoiceIt.removeUserFromGroup(
            {
              userId : testCase.userId ? testCase.userId : groups.currentUserIds[0],
              groupId : testCase.groupId ? testCase.groupId : groups.currentGroupIds[0],
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

  describe('Test Delete Group', function(){
      deleteGroupTestCases.forEach(function(testCase){
        it(`should return ${testCase.expectedRc}`, function(done){
          this.timeout(MAX_TIMEOUT);
          let itThis = this;
          myVoiceIt.deleteGroup(
            {
              groupId : testCase.groupId ? testCase.groupId : groups.currentGroupIds[0],
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
