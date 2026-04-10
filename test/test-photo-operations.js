const assert = require('assert');
const config = require('../utilities/test-config');
const voiceit = require('../index');
const utilities = require('../utilities/utilities');
const responseCode = require('../utilities/response-code');
const createPhotoEnrollmentTestCases = require('../test-cases/createPhotoEnrollmentTestCases');
const photoVerificationTestCases = require('../test-cases/photoVerificationTestCases');
const photoIdentificationTestCases = require('../test-cases/photoIdentificationTestCases');

let myVoiceIt = new voiceit(process.env.VIAPIKEY, process.env.VIAPITOKEN);
const MAX_TIMEOUT = 100000;
const SETUP_TIMEOUT = 300000;

const photoOps = {
  currentUserIds: [],
  currentGroupIds: [],
  setupPhotoEnrollment: (userId, filePath, callback) => {
    myVoiceIt.createPhotoEnrollment({
      userId: userId,
      photoFilePath: filePath
    }, (jsonResponse) => {
      if (jsonResponse.responseCode == responseCode.SUCCESS) {
        callback();
      } else {
        console.log("Failed to add photo enrollment!", filePath, jsonResponse);
      }
    });
  },
  setup: (next) => {
    // Create user A for photo enrollment/verification
    myVoiceIt.createUser((jsonResponse) => {
      if (jsonResponse.responseCode == responseCode.SUCCESS) {
        photoOps.currentUserIds.push(jsonResponse.userId);
      } else {
        console.log("Failed to create user A");
      }
      // Create user B for identification
      myVoiceIt.createUser((jsonResponse) => {
        if (jsonResponse.responseCode == responseCode.SUCCESS) {
          photoOps.currentUserIds.push(jsonResponse.userId);
        } else {
          console.log("Failed to create user B");
        }
        // Create group and add users
        myVoiceIt.createGroup({ description: "Photo Test Group" }, (jsonResponse) => {
          if (jsonResponse.responseCode == responseCode.SUCCESS) {
            photoOps.currentGroupIds.push(jsonResponse.groupId);
            myVoiceIt.addUserToGroup({
              userId: photoOps.currentUserIds[0],
              groupId: photoOps.currentGroupIds[0]
            }, (jsonResponse) => {
              if (jsonResponse.responseCode == responseCode.SUCCESS) {
                myVoiceIt.addUserToGroup({
                  userId: photoOps.currentUserIds[1],
                  groupId: photoOps.currentGroupIds[0]
                }, (jsonResponse) => {
                  if (jsonResponse.responseCode == responseCode.SUCCESS) {
                    // Enroll user A with 3 photo enrollments for verification
                    photoOps.setupPhotoEnrollment(photoOps.currentUserIds[0], config.PHOTO_ENROLLMENT_FILE_B_1, () => {
                      photoOps.setupPhotoEnrollment(photoOps.currentUserIds[0], config.PHOTO_ENROLLMENT_FILE_B_2, () => {
                        photoOps.setupPhotoEnrollment(photoOps.currentUserIds[0], config.PHOTO_ENROLLMENT_FILE_B_3, () => {
                          // Enroll user B with photo enrollment for identification
                          photoOps.setupPhotoEnrollment(photoOps.currentUserIds[1], config.PHOTO_ENROLLMENT_FILE_A_1, () => {
                            next();
                          });
                        });
                      });
                    });
                  } else {
                    console.log("Failed to add user B to group");
                  }
                });
              } else {
                console.log("Failed to add user A to group");
              }
            });
          } else {
            console.log("Failed to create group");
          }
        });
      });
    });
  },
  cleanup: () => {
    photoOps.currentUserIds.forEach((id) => {
      myVoiceIt.deleteUser({ userId: id }, (jsonResponse) => {
        console.log("Deleted User : ", jsonResponse.message);
      });
    });
    photoOps.currentGroupIds.forEach((gid) => {
      myVoiceIt.deleteGroup({ groupId: gid }, (jsonResponse) => {
      });
    });
  }
};

describe('Testing Photo Operations', function() {
  before(function(done) {
    this.timeout(SETUP_TIMEOUT);
    photoOps.setup(done);
  });

  after(function() {
    this.timeout(MAX_TIMEOUT);
    photoOps.cleanup();
  });

  describe('Test Create Photo Enrollment', function() {
    createPhotoEnrollmentTestCases.forEach(function(testCase) {
      it(`should return ${testCase.expectedRc}`, function(done) {
        this.timeout(MAX_TIMEOUT);
        myVoiceIt.createPhotoEnrollment({
          userId: testCase.userId ? testCase.userId : photoOps.currentUserIds[0],
          photoFilePath: testCase.photoFilePath,
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

  describe('Test Photo Verification', function() {
    photoVerificationTestCases.forEach(function(testCase) {
      it(`should return ${testCase.expectedRc}`, function(done) {
        this.timeout(MAX_TIMEOUT);
        myVoiceIt.photoVerification({
          userId: testCase.userId ? testCase.userId : photoOps.currentUserIds[0],
          photoFilePath: testCase.photoFilePath,
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

  describe('Test Photo Identification', function() {
    photoIdentificationTestCases.forEach(function(testCase) {
      it(`should return ${testCase.expectedRc}`, function(done) {
        this.timeout(MAX_TIMEOUT);
        myVoiceIt.photoIdentification({
          groupId: testCase.groupId ? testCase.groupId : photoOps.currentGroupIds[0],
          photoFilePath: testCase.photoFilePath
        }, (jsonResponse) => {
          try {
            utilities.printIfError(testCase.expectedRc, jsonResponse);
            assert.equal(jsonResponse.responseCode, testCase.expectedRc);
            assert.equal(jsonResponse.status, testCase.expectedSc);
            assert.ok(utilities.compare(jsonResponse.message, testCase.expectedMessage));
            if (testCase.user == "A") {
              assert.equal(jsonResponse.userId, photoOps.currentUserIds[1]);
            }
            done();
          } catch(e) {
            return done(e);
          }
        });
      });
    });
  });

});
