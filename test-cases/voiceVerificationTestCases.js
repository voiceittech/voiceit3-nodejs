let config = require('../utilities/test-config');
let responseCode = require('../utilities/response-code');

const voiceVerifcationTestCases = [
{
  expectedRc: responseCode.SUCCESS,
  expectedSc: 200,
  contentLanguage: config.CONTENT_LANGUAGE_REAL,
  audioFilePath: config.VERIFICATION_FILE_NOEL_1,
  expectedText: config.ENGLISH_PHRASE,
  phrase: config.ENGLISH_PHRASE,
  expectedMessage:'Successfully verified voice for user with userId : usr_([a-z0-9]){32}'
}
];

module.exports = voiceVerifcationTestCases;
