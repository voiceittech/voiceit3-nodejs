let assert = require('assert');
let config = require('../utilities/test-config');
let voiceit = require('../index');
let utilities = require('../utilities/utilities');
let responseCode = require('../utilities/response-code');
let voiceIdentificationTestCases = require('../test-cases/voiceIdentificationTestCases');
let videoIdentificationTestCases = require('../test-cases/videoIdentificationTestCases');
let faceIdentificationTestCases = require('../test-cases/faceIdentificationTestCases');
let voiceIdentificationByUrlTestCases = require('../test-cases/voiceIdentificationByUrlTestCases');
let videoIdentificationByUrlTestCases = require('../test-cases/videoIdentificationByUrlTestCases');
let faceIdentificationByUrlTestCases = require('../test-cases/faceIdentificationByUrlTestCases');

let myVoiceIt = new voiceit(process.env.VIAPIKEY, process.env.VIAPITOKEN);
let MAX_TIMEOUT = 100000;
let SETUP_TIMEOUT = 500000;

const identification  = {
  currentUserIds: [],
  currentGroupIds: [],
  setupVoiceEnrollment: (id, filePath, callBack, cl) => {
    identification.counter++;
    myVoiceIt.createVoiceEnrollment(
      {
        userId : identification.currentUserIds[id],
        contentLanguage : cl ? cl : config.CONTENT_LANGUAGE_REAL,
        audioFilePath : filePath
      },(jsonResponse)=>{
        if(jsonResponse.responseCode == responseCode.SUCCESS){
          callBack();
        } else {
          console.log("Failed to add voice enrollment for user: " + id);
        }
      });
  },

  setupVideoEnrollment: (id, filePath, callBack, cl) => {
    identification.counter++;
    myVoiceIt.createVideoEnrollment(
      {
        userId : identification.currentUserIds[id],
        contentLanguage : cl ? cl : config.CONTENT_LANGUAGE_REAL,
        videoFilePath : filePath
      },(jsonResponse)=>{
        if(jsonResponse.responseCode == responseCode.SUCCESS){
          callBack();
        } else {
          console.log("Failed to add video enrollment for user: " + id);
        }
      });
  },
  counter:0,
  setup:(next)=>{
    myVoiceIt.createUser((jsonResponse)=>{
      if(jsonResponse.responseCode == responseCode.SUCCESS){
        identification.currentUserIds.push(jsonResponse.userId);
        console.log("Armaan userId : ", jsonResponse.userId);
        myVoiceIt.createUser((jsonResponse)=>{
          if(jsonResponse.responseCode == responseCode.SUCCESS){
            identification.currentUserIds.push(jsonResponse.userId);
            console.log("Stephen userId : ", jsonResponse.userId);
            myVoiceIt.createGroup(
              {
                description: "Test Group Description"
              },
              (jsonResponse)=>{
              if(jsonResponse.responseCode == responseCode.SUCCESS){
                identification.currentGroupIds.push(jsonResponse.groupId);
                myVoiceIt.addUserToGroup({
                    userId : identification.currentUserIds[0],
                    groupId : identification.currentGroupIds[0]
                  },(jsonResponse)=>{
                    if(jsonResponse.responseCode == responseCode.SUCCESS){
                      myVoiceIt.addUserToGroup({
                          userId : identification.currentUserIds[1],
                          groupId : identification.currentGroupIds[0]
                        },(jsonResponse)=>{
                          if(jsonResponse.responseCode == responseCode.SUCCESS){
                            identification.setupVoiceEnrollment(0, config.ENROLLMENT_FILE_ARMAAN_1,()=>{
                                identification.setupVoiceEnrollment(0, config.ENROLLMENT_FILE_ARMAAN_2,()=>{
                                    identification.setupVoiceEnrollment(0, config.ENROLLMENT_FILE_ARMAAN_3,()=>{
                                                identification.setupVoiceEnrollment(1, config.ENROLLMENT_FILE_STEPHEN_1,()=>{
                                                    identification.setupVoiceEnrollment(1, config.ENROLLMENT_FILE_STEPHEN_2,()=>{
                                                        identification.setupVoiceEnrollment(1, config.ENROLLMENT_FILE_STEPHEN_3,()=>{
                                                            identification.setupVideoEnrollment(0, config.VIDEO_ENROLLMENT_FILE_ARMAAN_1,()=>{
                                                                identification.setupVideoEnrollment(0, config.VIDEO_ENROLLMENT_FILE_ARMAAN_2,()=>{
                                                                    identification.setupVideoEnrollment(0, config.VIDEO_ENROLLMENT_FILE_ARMAAN_3,()=>{
                                                                                identification.setupVideoEnrollment(1, config.VIDEO_ENROLLMENT_FILE_STEPHEN_1,()=>{
                                                                                    identification.setupVideoEnrollment(1, config.VIDEO_ENROLLMENT_FILE_STEPHEN_2,()=>{
                                                                                        identification.setupVideoEnrollment(1, config.VIDEO_ENROLLMENT_FILE_STEPHEN_3,()=>{
                                                                                          console.log("Finished Setup");
                                                                                          next();
                                                                                });
                                                                            });
                                                                        });
                                                                    });
                                                                  });
                                                              });
                                                            });
                                                         });
                                                      });
                                                  });
                                                });
                                              });
                                              } else {
                                                console.log("Failed to add user2 to group!");
                                              }
                                            });
                                          } else {
                                            console.log("Failed to add user1 to group!");
                                          }
                                        });
                                      } else {
                                        console.log("Failed to create group!");
                                      }
                                    });
                                  } else {
                                    console.log("Failed to create user2!");
                                  }
                                });
                              } else {
                                console.log("Failed to create user1!");
                              }
                            });
  },
  cleanup:()=>{
    identification.currentUserIds.forEach((uid)=>{
      myVoiceIt.deleteUser({ userId : uid },(jsonResponse)=>{
        identification.currentGroupIds.forEach((gid)=>{
          myVoiceIt.deleteGroup({ groupId : gid },(jsonResponse)=>{
          });
        });
      });
    });
  }
}

describe('Testing Identification Calls', function(){
  before(function(done){
    this.timeout(SETUP_TIMEOUT);
    identification.setup(done);
  });

  after(function(){
    identification.cleanup();
  });

  describe('Test Voice Identification', function(){
      voiceIdentificationTestCases.forEach(function(testCase){
        it(`should return ${testCase.expectedRc}`, function(done){
          this.timeout(MAX_TIMEOUT);
          let itThis = this;
          myVoiceIt.voiceIdentification(
            {
              groupId : testCase.groupId ? testCase.groupId : identification.currentGroupIds[0],
              audioFilePath : testCase.audioFilePath,
              contentLanguage : testCase.contentLanguage,
              phrase: testCase.phrase ? testCase.phrase : ''
            },
            (jsonResponse) => {
              utilities.printIfError(testCase.expectedRc, jsonResponse);
              if(jsonResponse.responseCode == responseCode.SUCCESS){
                assert.equal(utilities.low(jsonResponse.text), utilities.low(testCase.expectedText));
              }
              assert.equal(jsonResponse.responseCode, testCase.expectedRc);
              assert.equal(jsonResponse.status, testCase.expectedSc);
              assert.ok(utilities.compare(jsonResponse.message, testCase.expectedMessage));
              if(testCase.user == "Armaan"){
                assert.equal(jsonResponse.userId, identification.currentUserIds[0])
              }
              if(testCase.user == "Stephen"){
                assert.equal(jsonResponse.userId, identification.currentUserIds[1])
              }
              done();
            });
        });
      });
  });

  describe('Test Voice Identification By URL', function(){
      voiceIdentificationByUrlTestCases.forEach(function(testCase){
        it(`should return ${testCase.expectedRc}`, function(done){
          this.timeout(MAX_TIMEOUT);
          let itThis = this;
          myVoiceIt.voiceIdentificationByUrl(
            {
              groupId : testCase.groupId ? testCase.groupId : identification.currentGroupIds[0],
              audioFileURL : testCase.audioFileURL,
              contentLanguage : testCase.contentLanguage,
              phrase: testCase.phrase ? testCase.phrase : ''
            },
            (jsonResponse) => {
              utilities.printIfError(testCase.expectedRc, jsonResponse);
              if(jsonResponse.responseCode == responseCode.SUCCESS){
                assert.equal(utilities.low(jsonResponse.text), utilities.low(testCase.expectedText));
              }
              assert.equal(jsonResponse.responseCode, testCase.expectedRc);
              assert.equal(jsonResponse.status, testCase.expectedSc);
              assert.ok(utilities.compare(jsonResponse.message, testCase.expectedMessage));
              if(testCase.user == "Armaan"){
                assert.equal(jsonResponse.userId, identification.currentUserIds[0])
              }
              if(testCase.user == "Stephen"){
                assert.equal(jsonResponse.userId, identification.currentUserIds[1])
              }
              done();
            });
        });
      });
  });

  describe('Test Video Identification', function(){
      videoIdentificationTestCases.forEach(function(testCase){
        it(`should return ${testCase.expectedRc}`, function(done){
          this.timeout(MAX_TIMEOUT);
          let itThis = this;
          myVoiceIt.videoIdentification(
            {
              groupId : testCase.groupId ? testCase.groupId : identification.currentGroupIds[0],
              videoFilePath : testCase.videoFilePath,
              contentLanguage : testCase.contentLanguage,
              phrase: testCase.phrase ? testCase.phrase : '',
            },
            (jsonResponse) => {
              utilities.printIfError(testCase.expectedRc, jsonResponse);
              if(jsonResponse.responseCode == responseCode.SUCCESS){
                assert.equal(utilities.low(jsonResponse.text), utilities.low(testCase.expectedText));
              }
              assert.equal(jsonResponse.responseCode, testCase.expectedRc);
              assert.equal(jsonResponse.status, testCase.expectedSc);
              assert.ok(utilities.compare(jsonResponse.message, testCase.expectedMessage));
              if(testCase.user == "Armaan"){
                assert.equal(jsonResponse.userId, identification.currentUserIds[0])
              }
              if(testCase.user == "Stephen"){
                assert.equal(jsonResponse.userId, identification.currentUserIds[1])
              }
              done();
            });
        });
      });
  });

  describe('Test Video Identification By URL', function(){
      videoIdentificationByUrlTestCases.forEach(function(testCase){
        it(`should return ${testCase.expectedRc}`, function(done){
          this.timeout(MAX_TIMEOUT);
          let itThis = this;
          myVoiceIt.videoIdentificationByUrl(
            {
              groupId : testCase.groupId ? testCase.groupId : identification.currentGroupIds[0],
              videoFileURL : testCase.videoFileURL,
              contentLanguage : testCase.contentLanguage,
              phrase: testCase.phrase ? testCase.phrase : '',
            },
            (jsonResponse) => {
              utilities.printIfError(testCase.expectedRc, jsonResponse);
              if(jsonResponse.responseCode == responseCode.SUCCESS){
                assert.equal(utilities.low(jsonResponse.text), utilities.low(testCase.expectedText));
              }
              assert.equal(jsonResponse.responseCode, testCase.expectedRc);
              assert.equal(jsonResponse.status, testCase.expectedSc);
              assert.ok(utilities.compare(jsonResponse.message, testCase.expectedMessage));
              if(testCase.user == "Armaan"){
                assert.equal(jsonResponse.userId, identification.currentUserIds[0])
              }
              if(testCase.user == "Stephen"){
                assert.equal(jsonResponse.userId, identification.currentUserIds[1])
              }
              done();
            });
        });
      });
    });

    describe('Test Face Identification', function(){
        faceIdentificationTestCases.forEach(function(testCase){
          it(`should return ${testCase.expectedRc}`, function(done){
            this.timeout(MAX_TIMEOUT);
            let itThis = this;
            myVoiceIt.faceIdentification(
              {
                groupId : testCase.groupId ? testCase.groupId : identification.currentGroupIds[0],
                videoFilePath : testCase.videoFilePath,
              },
              (jsonResponse) => {
                utilities.printIfError(testCase.expectedRc, jsonResponse);
                assert.equal(jsonResponse.responseCode, testCase.expectedRc);
                assert.equal(jsonResponse.status, testCase.expectedSc);
                assert.ok(utilities.compare(jsonResponse.message, testCase.expectedMessage));
                if(testCase.user == "Armaan"){
                  assert.equal(jsonResponse.userId, identification.currentUserIds[0])
                }
                if(testCase.user == "Stephen"){
                  assert.equal(jsonResponse.userId, identification.currentUserIds[1])
                }
                done();
              });
          });
        });
    });

    describe('Test Face Identification By URL', function(){
        faceIdentificationByUrlTestCases.forEach(function(testCase){
          it(`should return ${testCase.expectedRc}`, function(done){
            this.timeout(MAX_TIMEOUT);
            let itThis = this;
            myVoiceIt.faceIdentificationByUrl(
              {
                groupId : testCase.groupId ? testCase.groupId : identification.currentGroupIds[0],
                videoFileURL : testCase.videoFileURL,
              },
              (jsonResponse) => {
                utilities.printIfError(testCase.expectedRc, jsonResponse);
                assert.equal(jsonResponse.responseCode, testCase.expectedRc);
                assert.equal(jsonResponse.status, testCase.expectedSc);
                assert.ok(utilities.compare(jsonResponse.message, testCase.expectedMessage));
                if(testCase.user == "Armaan"){
                  assert.equal(jsonResponse.userId, identification.currentUserIds[0])
                }
                if(testCase.user == "Stephen"){
                  assert.equal(jsonResponse.userId, identification.currentUserIds[1])
                }
                done();
              });
          });
        });
      });

  });
