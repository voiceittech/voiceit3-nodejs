let responseCode = require('../utilities/response-code');

const regenerateSubAccountAPITokenTestCases = [
{
  expectedRc: responseCode.SUCCESS,
  expectedSc: 200,
  expectedMessage: 'Regenerated apiToken : tok_([a-z0-9]){32} for sub-account with apiKey : key_([a-z0-9]){32}'
}
];
module.exports = regenerateSubAccountAPITokenTestCases;
