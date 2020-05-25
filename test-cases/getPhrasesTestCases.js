let config = require('../utilities/test-config');
let responseCode = require('../utilities/response-code');

const getPhrasesTestCases = [
{
  expectedRc: responseCode.SUCCESS,
  expectedSc: 200,
  contentLanguage: config.CONTENT_LANGUAGE_REAL,
  expectedMessage: 'Successfully got all ' + config.CONTENT_LANGUAGE_REAL + ' phrases for developer account'
},
{
  expectedRc: responseCode.INVALID_CONTENT_LANGUAGE_PARAMETER,
  expectedSc: 400,
  contentLanguage: config.CONTENT_LANGUAGE_FAKE,
  expectedMessage: 'Invalid contentLanguage parameter'
}
];

module.exports = getPhrasesTestCases;
