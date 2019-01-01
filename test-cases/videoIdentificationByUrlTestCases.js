let config = require('../utilities/test-config');
let responseCode = require('../utilities/response-code');

const videoIdentificationByUrlTestCases = [
  {
    expectedRc: responseCode.SUCCESS,
    expectedSc: 200,
    contentLanguage: config.CONTENT_LANGUAGE_REAL,
    videoFileURL: config.getURL(config.VIDEO_ENROLLMENT_FILE_NOEL_1),
    expectedText: config.ENGLISH_PHRASE,
    phrase: config.ENGLISH_PHRASE,
    user: 'Armaan',
    expectedMessage:'Successfully identified video for user with userId : usr_([a-z0-9]){32} in group with groupId : grp_([a-z0-9]){32}'
  },
  {
    expectedRc: responseCode.SUCCESS,
    expectedSc: 200,
    contentLanguage: config.CONTENT_LANGUAGE_REAL,
    videoFileURL: config.getURL(config.VIDEO_ENROLLMENT_FILE_STEPHEN_1),
    expectedText: config.ENGLISH_PHRASE,
    phrase: config.ENGLISH_PHRASE,
    user: 'Stephen',
    expectedMessage:'Successfully identified video for user with userId : usr_([a-z0-9]){32} in group with groupId : grp_([a-z0-9]){32}'
  }
];

module.exports = videoIdentificationByUrlTestCases;
