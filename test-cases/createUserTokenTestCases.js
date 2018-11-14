let config = require('../utilities/test-config');
let responseCode = require('../utilities/response-code');

const createUserTestCases = [
{
  expectedRc: responseCode.SUCCESS,
  expectedSc: 201,
  message: 'Successfully created userToken for usr_([a-z0-9]){32}',
  userToken: 'utk_([a-z0-9]){32}_([0-9]){13}'
}
];
module.exports = createUserTestCases;
