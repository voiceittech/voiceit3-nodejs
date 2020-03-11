let responseCode = require('../utilities/response-code');

const createManagedSubAccountTestCases = [
{
  expectedRc: responseCode.SUCCESS,
  expectedSc: 201,
  expectedMessage: 'Created new managed sub-account with apiKey : key_([a-z0-9]){32}'
}
];
module.exports = createManagedSubAccountTestCases;
