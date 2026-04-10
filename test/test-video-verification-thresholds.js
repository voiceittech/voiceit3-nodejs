const assert = require('assert');
const config = require('../utilities/test-config');
const voiceit = require('../index');
const utilities = require('../utilities/utilities');
const responseCode = require('../utilities/response-code');
const videoVerificationThresholdsTestCases = require('../test-cases/videoVerificationThresholdsTestCases');

let myVoiceIt = new voiceit(process.env.VIAPIKEY, process.env.VIAPITOKEN);
const MAX_TIMEOUT = 100000;
const SETUP_TIMEOUT = 600000;

const thresholds = {
  currentUserIds: [],
  currentVideoEnrollmentIds: [],
  setupVideoEnrollment: (filePath, callback) => {
    myVoiceIt.createVideoEnrollment({
      userId: thresholds.currentUserIds[0],
      contentLanguage: config.CONTENT_LANGUAGE_REAL,
      phrase: config.ENGLISH_PHRASE,
      videoFilePath: filePath
    }, (jsonResponse) => {
      if (jsonResponse.responseCode == responseCode.SUCCESS) {
        thresholds.currentVideoEnrollmentIds.push(jsonResponse.id);
        callback();
      } else {
        console.log("Failed to add video enrollment!", filePath, jsonResponse);
      }
    });
  },
  setup: (next) => {
    myVoiceIt.createUser((jsonResponse) => {
      if (jsonResponse.responseCode == responseCode.SUCCESS) {
        thresholds.currentUserIds.push(jsonResponse.userId);
        thresholds.setupVideoEnrollment(config.VIDEO_ENROLLMENT_FILE_B_1, () => {
          thresholds.setupVideoEnrollment(config.VIDEO_ENROLLMENT_FILE_B_2, () => {
            thresholds.setupVideoEnrollment(config.VIDEO_ENROLLMENT_FILE_B_3, () => {
              next();
            });
          });
        });
      } else {
        console.log("Failed to create user");
      }
    });
  },
  cleanup: () => {
    thresholds.currentUserIds.forEach((id) => {
      myVoiceIt.deleteUser({ userId: id }, (jsonResponse) => {
        console.log("Deleted User : ", jsonResponse.message);
      });
    });
  }
};

describe('Testing Video Verification Thresholds', function() {
  before(function(done) {
    this.timeout(SETUP_TIMEOUT);
    thresholds.setup(done);
  });

  after(function() {
    this.timeout(MAX_TIMEOUT);
    thresholds.cleanup();
  });

  describe('Test Video Verification Thresholds (cross-modal failures)', function() {
    videoVerificationThresholdsTestCases.forEach(function(testCase) {
      it(`should return ${testCase.expectedRc}`, function(done) {
        this.timeout(MAX_TIMEOUT);
        myVoiceIt.videoVerification({
          userId: testCase.userId ? testCase.userId : thresholds.currentUserIds[0],
          videoFilePath: testCase.videoFilePath,
          contentLanguage: testCase.contentLanguage,
          phrase: testCase.phrase ? testCase.phrase : ''
        }, (jsonResponse) => {
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
