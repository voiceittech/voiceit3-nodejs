let config = require('../utilities/test-config');
let responseCode = require('../utilities/response-code');

const faceIdentificationTestCases = [
  {
    expectedRc: responseCode.SUCCESS,
    expectedSc: 200,
    videoFilePath: config.VIDEO_ENROLLMENT_FILE_NOEL_1,
    user: 'Armaan',
    expectedMessage:'Successfully identified face for user with userId : usr_([a-z0-9]){32} in group with groupId : grp_([a-z0-9]){32}'
  },
  {
    expectedRc: responseCode.SUCCESS,
    expectedSc: 200,
    videoFilePath: config.VIDEO_ENROLLMENT_FILE_STEPHEN_1,
    user: 'Stephen',
    expectedMessage:'Successfully identified face for user with userId : usr_([a-z0-9]){32} in group with groupId : grp_([a-z0-9]){32}'
  }
];

module.exports = faceIdentificationTestCases;
