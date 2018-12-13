let assert = require('assert');
let config = require('../utilities/test-config');
let voiceit = require('../index');
let utilities = require('../utilities/utilities');
let responseCode = require('../utilities/response-code');
let myVoiceIt = new voiceit(process.env.VIAPIKEY, process.env.VIAPITOKEN);
let MAX_TIMEOUT = 30000;
let SETUP_TIMEOUT = 20000;

describe('Testing File Not Found', function(){
  before(function(done){
    this.timeout(SETUP_TIMEOUT);
    done();
  });

  describe('Test Enrollments File Not Found', function(){
        it(`Test Create Voice Enrollment File Not Found`, function(done){
          this.timeout(MAX_TIMEOUT);
          let itThis = this;
          myVoiceIt.createVoiceEnrollment(
            {
              userId : '',
              contentLanguage : config.CONTENT_LANGUAGE_REAL,
              audioFilePath : config.INVALID_FILE_PATH,
              phrase: ''
            },(jsonResponse) => {
              try {
                assert.ok(jsonResponse instanceof Error);
                assert.ok(utilities.compare(jsonResponse.message, 'File Path (\\w+) Does Not Exist'));
                done();
              } catch(e) {
                return done(e);
              }
            });
        });

        it(`Test Create Face Enrollment File Not Found`, function(done){
          this.timeout(MAX_TIMEOUT);
          let itThis = this;
          myVoiceIt.createFaceEnrollment(
            {
              userId : '',
              videoFilePath : config.INVALID_FILE_PATH,
            },(jsonResponse) => {
              try {
                assert.ok(jsonResponse instanceof Error);
                assert.ok(utilities.compare(jsonResponse.message, 'File Path (\\w+) Does Not Exist'));
                done();
              } catch(e) {
                return done(e);
              }
            });
        });

        it(`Test Create Video Enrollment File Not Found`, function(done){
          this.timeout(MAX_TIMEOUT);
          let itThis = this;
          myVoiceIt.createVideoEnrollment(
            {
              userId : '',
              contentLanguage : config.CONTENT_LANGUAGE_REAL,
              videoFilePath : config.INVALID_FILE_PATH,
              phrase: ''
            },(jsonResponse) => {
              try {
                assert.ok(jsonResponse instanceof Error);
                assert.ok(utilities.compare(jsonResponse.message, 'File Path (\\w+) Does Not Exist'));
                done();
              } catch(e) {
                return done(e);
              }
            });
        });
  });

  describe('Test Verification File Not Found', function(){
        it(`Test Voice Verification File Not Found`, function(done){
          this.timeout(MAX_TIMEOUT);
          let itThis = this;
          myVoiceIt.voiceVerification(
            {
              userId : '',
              contentLanguage : config.CONTENT_LANGUAGE_REAL,
              audioFilePath : config.INVALID_FILE_PATH,
              phrase: ''
            },(jsonResponse) => {
              try {
                assert.ok(jsonResponse instanceof Error);
                assert.ok(utilities.compare(jsonResponse.message, 'File Path (\\w+) Does Not Exist'));
                done();
              } catch(e) {
                return done(e);
              }
            });
        });

        it(`Test Face Verification File Not Found`, function(done){
          this.timeout(MAX_TIMEOUT);
          let itThis = this;
          myVoiceIt.faceVerification(
            {
              userId : '',
              videoFilePath : config.INVALID_FILE_PATH,
            },(jsonResponse) => {
              try {
                assert.ok(jsonResponse instanceof Error);
                assert.ok(utilities.compare(jsonResponse.message, 'File Path (\\w+) Does Not Exist'));
                done();
              } catch(e) {
                return done(e);
              }
            });
        });

        it(`Test Video Verification File Not Found`, function(done){
          this.timeout(MAX_TIMEOUT);
          let itThis = this;
          myVoiceIt.videoVerification(
            {
              userId : '',
              contentLanguage : config.CONTENT_LANGUAGE_REAL,
              videoFilePath : config.INVALID_FILE_PATH,
              phrase: ''
            },(jsonResponse) => {
              try {
                assert.ok(jsonResponse instanceof Error);
                assert.ok(utilities.compare(jsonResponse.message, 'File Path (\\w+) Does Not Exist'));
                done();
              } catch(e) {
                return done(e);
              }
            });
        });
  });

  describe('Test Identification File Not Found', function(){
        it(`Test Voice Identification File Not Found`, function(done){
          this.timeout(MAX_TIMEOUT);
          let itThis = this;
          myVoiceIt.voiceIdentification(
            {
              groupId : '',
              contentLanguage : config.CONTENT_LANGUAGE_REAL,
              audioFilePath : config.INVALID_FILE_PATH,
              phrase: ''
            },(jsonResponse) => {
              try {
                assert.ok(jsonResponse instanceof Error);
                assert.ok(utilities.compare(jsonResponse.message, 'File Path (\\w+) Does Not Exist'));
                done();
              } catch(e) {
                return done(e);
              }
            });
        });

        it(`Test Face Identification File Not Found`, function(done){
          this.timeout(MAX_TIMEOUT);
          let itThis = this;
          myVoiceIt.faceIdentification(
            {
              groupId : '',
              videoFilePath : config.INVALID_FILE_PATH,
            },(jsonResponse) => {
              try {
                assert.ok(jsonResponse instanceof Error);
                assert.ok(utilities.compare(jsonResponse.message, 'File Path (\\w+) Does Not Exist'));
                done();
              } catch(e) {
                return done(e);
              }
            });
        });

        it(`Test Video Identification File Not Found`, function(done){
          this.timeout(MAX_TIMEOUT);
          let itThis = this;
          myVoiceIt.videoIdentification(
            {
              groupId : '',
              contentLanguage : config.CONTENT_LANGUAGE_REAL,
              videoFilePath : config.INVALID_FILE_PATH,
              phrase: ''
            },(jsonResponse) => {
              try {
                assert.ok(jsonResponse instanceof Error);
                assert.ok(utilities.compare(jsonResponse.message, 'File Path (\\w+) Does Not Exist'));
                done();
              } catch(e) {
                return done(e);
              }
            });
        });
  });
});
