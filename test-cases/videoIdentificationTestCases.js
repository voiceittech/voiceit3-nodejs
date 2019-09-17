let config = require('../utilities/test-config');
let responseCode = require('../utilities/response-code');

const videoIdentificationTestCases = [
  {
    expectedRc: responseCode.SUCCESS,
    expectedSc: 200,
    contentLanguage: config.CONTENT_LANGUAGE_REAL,
    videoFilePath: config.VIDEO_VERIFICARTION_FILE_A_1,
    expectedText: config.ENGLISH_PHRASE,
    phrase: config.ENGLISH_PHRASE,
    user: 'B',
    expectedMessage:'Successfully identified video for user with userId : usr_([a-z0-9]){32} in group with groupId : grp_([a-z0-9]){32}'
  },
  {
    expectedRc: responseCode.SUCCESS,
    expectedSc: 200,
    contentLanguage: config.CONTENT_LANGUAGE_REAL,
    videoFilePath: config.VIDEO_VERIFICARTION_FILE_D_1,
    expectedText: config.ENGLISH_PHRASE,
    phrase: config.ENGLISH_PHRASE,
    user: 'C',
    expectedMessage:'Successfully identified video for user with userId : usr_([a-z0-9]){32} in group with groupId : grp_([a-z0-9]){32}'
  }
];

module.exports = videoIdentificationTestCases;
