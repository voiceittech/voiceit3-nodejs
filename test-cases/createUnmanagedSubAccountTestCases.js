let responseCode = require('../utilities/response-code');

const createUnmanagedSubAccountTestCases = [
{
  expectedRc: responseCode.SUCCESS,
  expectedSc: 201,
  expectedMessage: 'Created new unmanaged sub-account with apiKey : key_([a-z0-9]){32}'
}
];
module.exports = createUnmanagedSubAccountTestCases;
