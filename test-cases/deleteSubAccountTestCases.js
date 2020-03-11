let responseCode = require('../utilities/response-code');

const deleteSubAccountTestCases = [
{
  expectedRc: responseCode.SUCCESS,
  expectedSc: 200,
  expectedMessage: 'Deleted sub-account with apiKey : key_([a-z0-9]){32}'
}
];
module.exports = deleteSubAccountTestCases;
