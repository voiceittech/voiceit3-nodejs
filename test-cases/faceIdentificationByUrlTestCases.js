let config = require('../utilities/test-config');
let responseCode = require('../utilities/response-code');

const faceIdentificationByUrlTestCases = [
  {
    expectedRc: responseCode.SUCCESS,
    expectedSc: 200,
    videoFileURL: config.getURL(config.VIDEO_VERIFICARTION_FILE_A_1),
    user: 'B',
    expectedMessage:'Successfully identified face for user with userId : usr_([a-z0-9]){32} in group with groupId : grp_([a-z0-9]){32}'
  },
  {
    expectedRc: responseCode.SUCCESS,
    expectedSc: 200,
    videoFileURL: config.getURL(config.VIDEO_VERIFICARTION_FILE_D_1),
    user: 'C',
    expectedMessage:'Successfully identified face for user with userId : usr_([a-z0-9]){32} in group with groupId : grp_([a-z0-9]){32}'
  }
];

module.exports = faceIdentificationByUrlTestCases;
