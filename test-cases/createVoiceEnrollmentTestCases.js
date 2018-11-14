let config = require('../utilities/test-config');
let responseCode = require('../utilities/response-code');

const createVoiceEnrollmentTestCases = [
{
  expectedRc: responseCode.SUCCESS,
  expectedSc: 201,
  contentLanguage: config.CONTENT_LANGUAGE_REAL,
  audioFilePath: config.ENROLLMENT_FILE_NOEL_1,
  expectedText: config.ENGLISH_PHRASE,
  phrase: config.ENGLISH_PHRASE,
  expectedMessage:'Successfully enrolled voice for user with userId : usr_([a-z0-9]){32}'
}
];
module.exports = createVoiceEnrollmentTestCases;
