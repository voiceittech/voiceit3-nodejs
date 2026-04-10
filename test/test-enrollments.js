const assert = require('assert');
const config = require('../utilities/test-config');
const voiceit = require('../index');
const utilities = require('../utilities/utilities');
const responseCode = require('../utilities/response-code');
const createVoiceEnrollmentTestCases = require('../test-cases/createVoiceEnrollmentTestCases');
const createVoiceEnrollmentByUrlTestCases = require('../test-cases/createVoiceEnrollmentByUrlTestCases');
const createFaceEnrollmentTestCases = require('../test-cases/createFaceEnrollmentTestCases');
const createFaceEnrollmentByUrlTestCases = require('../test-cases/createFaceEnrollmentByUrlTestCases');
const createVideoEnrollmentTestCases = require('../test-cases/createVideoEnrollmentTestCases');
const createVideoEnrollmentByUrlTestCases = require('../test-cases/createVideoEnrollmentByUrlTestCases');

const getAllFaceEnrollmentsTestCases = require('../test-cases/getAllFaceEnrollmentsTestCases');
const getAllVoiceEnrollmentsTestCases = require('../test-cases/getAllVoiceEnrollmentsTestCases');
const getAllVideoEnrollmentsTestCases = require('../test-cases/getAllVideoEnrollmentsTestCases');

const deleteAllEnrollmentsTestCases = require('../test-cases/deleteAllEnrollmentsTestCases');

let myVoiceIt = new voiceit(process.env.VIAPIKEY, process.env.VIAPITOKEN);
const MAX_TIMEOUT =   100000;
const SETUP_TIMEOUT = 100000;

const enrollments  = {
  currentUserId:'',
  currentEnrollmentIds:[],
  currentVoiceEnrollmentIds:[],
  currentVideoEnrollmentIds:[],
  currentFaceEnrollmentIds:[],
  setup:(next)=>{
    myVoiceIt.createUser((jsonResponse)=>{
      if(jsonResponse.responseCode == responseCode.SUCCESS){
        enrollments.currentUserId = jsonResponse.userId;
        console.log("Started Node Test!", jsonResponse.message);
        next();
      } else {
        console.log("Failed to create user");
      }
    });
  },
  cleanup:()=>{
    myVoiceIt.deleteUser({ userId : enrollments.currentUserId },(jsonResponse)=>{
      console.log("Done!", jsonResponse.message);
    });
  }
};

describe('Testing All Enrollment API Calls', function(){
  before(function(done){
    this.timeout(SETUP_TIMEOUT);
    enrollments.setup(done);
  });

  after(function(){
    this.timeout(MAX_TIMEOUT);
    enrollments.cleanup();
  });

  describe('Test Get All Face Enrollments', function(){
      getAllFaceEnrollmentsTestCases.forEach(function(testCase){
        it(`should return ${testCase.expectedRc}`, function(done){
          this.timeout(MAX_TIMEOUT);
          let itThis = this;
          myVoiceIt.getAllFaceEnrollments(
            {
              userId : testCase.userId ? testCase.userId : enrollments.currentUserId
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

  describe('Test Get All Voice Enrollments', function(){
      getAllVoiceEnrollmentsTestCases.forEach(function(testCase){
        it(`should return ${testCase.expectedRc}`, function(done){
          this.timeout(MAX_TIMEOUT);
          let itThis = this;
          myVoiceIt.getAllVoiceEnrollments(
            {
              userId : testCase.userId ? testCase.userId : enrollments.currentUserId
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

  describe('Test Get All Video Enrollments', function(){
      getAllVideoEnrollmentsTestCases.forEach(function(testCase){
        it(`should return ${testCase.expectedRc}`, function(done){
          this.timeout(MAX_TIMEOUT);
          let itThis = this;
          myVoiceIt.getAllVideoEnrollments(
            {
              userId : testCase.userId ? testCase.userId : enrollments.currentUserId
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

  describe('Test Create Voice Enrollment', function(){
      createVoiceEnrollmentTestCases.forEach(function(testCase){
        it(`should return ${testCase.expectedRc}`, function(done){
          this.timeout(MAX_TIMEOUT);
          let itThis = this;
          myVoiceIt.createVoiceEnrollment(
            {
              userId : testCase.userId ? testCase.userId : enrollments.currentUserId,
              contentLanguage : testCase.contentLanguage,
              audioFilePath : testCase.audioFilePath,
              phrase: testCase.phrase ? testCase.phrase : ''
            },(jsonResponse) => {
              utilities.printIfError(testCase.expectedRc, jsonResponse);
              if(jsonResponse.responseCode == responseCode.SUCCESS){
                enrollments.currentVoiceEnrollmentIds.push(jsonResponse.id);
                assert.equal(utilities.low(jsonResponse.text), utilities.low(testCase.expectedText));
              }
              try {
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

  describe('Test Create Voice Enrollment by URL', function(){
      createVoiceEnrollmentByUrlTestCases.forEach(function(testCase){
        it(`should return ${testCase.expectedRc}`, function(done){
          this.timeout(MAX_TIMEOUT);
          let itThis = this;
          myVoiceIt.createVoiceEnrollmentByUrl(
            {
              userId : testCase.userId ? testCase.userId : enrollments.currentUserId,
              contentLanguage : testCase.contentLanguage,
              audioFileURL : testCase.audioFileURL,
              phrase: testCase.phrase ? testCase.phrase : ''
            },(jsonResponse) => {
              utilities.printIfError(testCase.expectedRc, jsonResponse);
              if(jsonResponse.responseCode == responseCode.SUCCESS){
                enrollments.currentVoiceEnrollmentIds.push(jsonResponse.id);
                enrollments.currentEnrollmentIds.push(jsonResponse.id);
                assert.equal(utilities.low(jsonResponse.text), utilities.low(testCase.expectedText));
              }
              try {
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

  describe('Test Create Face Enrollment', function(){
      createFaceEnrollmentTestCases.forEach(function(testCase){
        it(`should return ${testCase.expectedRc}`, function(done){
          this.timeout(MAX_TIMEOUT);
          let itThis = this;
          myVoiceIt.createFaceEnrollment(
            {
              userId : testCase.userId ? testCase.userId : enrollments.currentUserId,
              videoFilePath : testCase.videoFilePath,
            },(jsonResponse) => {
              utilities.printIfError(testCase.expectedRc, jsonResponse);
              if(jsonResponse.responseCode == responseCode.SUCCESS){
                enrollments.currentFaceEnrollmentIds.push(jsonResponse.faceEnrollmentId);
              }
              try {
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

  describe('Test Create Face Enrollment By URL', function(){
      createFaceEnrollmentByUrlTestCases.forEach(function(testCase){
        it(`should return ${testCase.expectedRc}`, function(done){
          this.timeout(MAX_TIMEOUT);
          let itThis = this;
          myVoiceIt.createFaceEnrollmentByUrl(
            {
              userId : testCase.userId ? testCase.userId : enrollments.currentUserId,
              videoFileURL : testCase.videoFileURL,
            },(jsonResponse) => {
              utilities.printIfError(testCase.expectedRc, jsonResponse);
              if(jsonResponse.responseCode == responseCode.SUCCESS){
                enrollments.currentFaceEnrollmentIds.push(jsonResponse.faceEnrollmentId);
              }
              try {
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

  describe('Test Create Video Enrollment', function(){
      createVideoEnrollmentTestCases.forEach(function(testCase){
        it(`should return ${testCase.expectedRc}`, function(done){
          this.timeout(MAX_TIMEOUT);
          let itThis = this;
          myVoiceIt.createVideoEnrollment(
            {
              userId : testCase.userId ? testCase.userId : enrollments.currentUserId,
              videoFilePath : testCase.videoFilePath,
              contentLanguage : testCase.contentLanguage,
              phrase: testCase.phrase ? testCase.phrase : '',
            },(jsonResponse) => {
              utilities.printIfError(testCase.expectedRc, jsonResponse);
              if(jsonResponse.responseCode == responseCode.SUCCESS){
                enrollments.currentVideoEnrollmentIds.push(jsonResponse.id);
                assert.equal(utilities.low(jsonResponse.text), utilities.low(testCase.expectedText));
              }
              try {
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

  describe('Test Create Video Enrollment by URL', function(){
      createVideoEnrollmentByUrlTestCases.forEach(function(testCase){
        it(`should return ${testCase.expectedRc}`, function(done){
          this.timeout(MAX_TIMEOUT);
          let itThis = this;
          myVoiceIt.createVideoEnrollmentByUrl(
            {
              userId : testCase.userId ? testCase.userId : enrollments.currentUserId,
              videoFileURL : testCase.videoFileURL,
              contentLanguage : testCase.contentLanguage,
              phrase: testCase.phrase ? testCase.phrase : ''
            },(jsonResponse) => {
              utilities.printIfError(testCase.expectedRc, jsonResponse);
              if(jsonResponse.responseCode == responseCode.SUCCESS){
                enrollments.currentVideoEnrollmentIds.push(jsonResponse.id);
                assert.equal(utilities.low(jsonResponse.text), utilities.low(testCase.expectedText));
              }
              try {
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

  describe('Delete All Enrollments', function(){
      deleteAllEnrollmentsTestCases.forEach(function(testCase){
        it(`should return ${testCase.expectedRc}`, function(done){
          this.timeout(MAX_TIMEOUT);
          let itThis = this;
          myVoiceIt.deleteAllEnrollments(
            {
              userId : testCase.userId ? testCase.userId : enrollments.currentUserId
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
