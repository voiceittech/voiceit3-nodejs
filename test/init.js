/* eslint-disable */
const voiceit2 = require('../index.js');
const assert = require('assert');

describe('Constructor', function() {
    it('Test whether constructor properly initialized parameters', function() {
      const myVoiceIt = new voiceit2('<apiKey>', '<apiToken>');
      assert.equal(myVoiceIt.apiKey, '<apiKey>');
      assert.equal(myVoiceIt.authToken, '<apiToken>');
    });
});

describe('Test API', function(){
    it('Test whether wrapper can communicate with API', function(){
	const myVoiceIt = new voiceit2('<apiKey>', '<apiToken>');
	myVoiceIt.getAllUsers(function(jsonResponse){
	     asset.equal(jsonResponse.responceCode,'UNAC');
	     done();
	});
     });
});
