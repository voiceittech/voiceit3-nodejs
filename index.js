let unirest = require('unirest');
const BASE_URL = 'https://api.voiceit.io';

module.exports = function(apk, tok){
    this.apiKey = apk;
    this.authToken = tok;
    const basicAuthString = `${apk}:${tok}`;
    this.authHeader = {
      user : apk,
      pass : tok,
      sendImmediately: true
    };
    this.platformHeader = {'platformId': '31'};

    /* User API Calls */

    this.getAllUsers = (callback) =>{
      unirest.get(`${BASE_URL}/users`)
      .auth(this.authHeader)
      .headers(this.platformHeader)
      .end(function (httpResponse) {
        callback(httpResponse.body);
      });
    };

    this.createUser = (callback) => {
      unirest.post(`${BASE_URL}/users`)
      .auth(this.authHeader)
      .headers(this.platformHeader)
      .end(function (httpResponse) {
        callback(httpResponse.body);
      });
    };

    this.checkUserExists = (options, callback) => {
      unirest.get(`${BASE_URL}/users/${options.userId}`)
      .auth(this.authHeader)
      .headers(this.platformHeader)
      .end(function (httpResponse) {
        callback(httpResponse.body);
      });
    };

    this.deleteUser = (options, callback) => {
      unirest.delete(`${BASE_URL}/users/${options.userId}`)
      .auth(this.authHeader)
      .headers(this.platformHeader)
      .end(function (httpResponse) {
        callback(httpResponse.body);
      });
    };

    this.getGroupsForUser = (options, callback) =>{
      unirest.get(`${BASE_URL}/users/${options.userId}/groups`)
      .auth(this.authHeader)
      .headers(this.platformHeader)
      .end(function (httpResponse) {
        callback(httpResponse.body);
      });
    };

    /* Group API Calls */

    this.getAllGroups = (callback) =>{
      unirest.get(`${BASE_URL}/groups`)
      .auth(this.authHeader)
      .headers(this.platformHeader)
      .end(function (httpResponse) {
        callback(httpResponse.body);
      });
    };

    this.getGroup = (options, callback) =>{
      unirest.get(`${BASE_URL}/groups/${options.groupId}`)
      .auth(this.authHeader)
      .headers(this.platformHeader)
      .end(function (httpResponse) {
        callback(httpResponse.body);
      });
    };

    this.checkGroupExists = (options, callback) =>{
      unirest.get(`${BASE_URL}/groups/${options.groupId}/exists`)
      .auth(this.authHeader)
      .headers(this.platformHeader)
      .end(function (httpResponse) {
        callback(httpResponse.body);
      });
    };

    this.createGroup = (options = {}, callback) => {
      unirest.post(`${BASE_URL}/groups`)
      .auth(this.authHeader)
      .headers(this.platformHeader)
      .field("description", (options.description != null) ? options.description : "")
      .end(function (httpResponse) {
        callback(httpResponse.body);
      });
    };

    this.addUserToGroup = (options = {}, callback) => {
      unirest.put(`${BASE_URL}/groups/addUser`)
      .auth(this.authHeader)
      .headers(this.platformHeader)
      .field("userId", options.userId)
      .field("groupId", options.groupId)
      .end(function (httpResponse) {
        callback(httpResponse.body);
      });
    };

    this.removeUserFromGroup = (options = {}, callback) => {
      unirest.put(`${BASE_URL}/groups/removeUser`)
      .auth(this.authHeader)
      .headers(this.platformHeader)
      .field("userId", options.userId)
      .field("groupId", options.groupId)
      .end(function (httpResponse) {
        callback(httpResponse.body);
      });
    };

    this.deleteGroup = (options, callback) => {
      unirest.delete(`${BASE_URL}/groups/${options.groupId}`)
      .auth(this.authHeader)
      .headers(this.platformHeader)
      .end(function (httpResponse) {
        callback(httpResponse.body);
      });
    };

    /* Enrollment API Calls */

    this.getAllEnrollmentsForUser = (options, callback) => {
      unirest.get(`${BASE_URL}/enrollments/${options.userId}`)
      .auth(this.authHeader)
      .headers(this.platformHeader)
      .end(function (httpResponse) {
        callback(httpResponse.body);
      });
    };

    this.getFaceEnrollmentsForUser = (options, callback) => {
      unirest.get(`${BASE_URL}/enrollments/face/${options.userId}`)
      .auth(this.authHeader)
      .headers(this.platformHeader)
      .end(function (httpResponse) {
        callback(httpResponse.body);
      });
    };

    this.createVoiceEnrollment = (options, callback) => {
      unirest.post(`${BASE_URL}/enrollments`)
      .auth(this.authHeader)
      .headers(this.platformHeader)
      .field('userId', options.userId)
      .field('contentLanguage', options.contentLanguage)
      .attach('recording', options.audioFilePath)
      .end(function (httpResponse) {
        callback(httpResponse.body);
      });
    };

    this.createVoiceEnrollmentByUrl = (options, callback) => {
      unirest.post(`${BASE_URL}/enrollments/byUrl`)
      .auth(this.authHeader)
      .headers(this.platformHeader)
      .field('userId', options.userId)
      .field('contentLanguage', options.contentLanguage)
      .field('fileUrl', options.audioFileURL)
      .end(function (httpResponse) {
        callback(httpResponse.body);
      });
    };

    this.createFaceEnrollment = (options, callback) => {
      unirest.post(`${BASE_URL}/enrollments/face`)
      .auth(this.authHeader)
      .headers(this.platformHeader)
      .field('userId', options.userId)
      .field('doBlinkDetection', (options.doBlinkDetection != null ) ? options.doBlinkDetection : false )
      .attach('video', options.videoFilePath)
      .end(function (httpResponse) {
        callback(httpResponse.body);
      });
    };

    this.createVideoEnrollment = (options, callback) => {
      unirest.post(`${BASE_URL}/enrollments/video`)
      .auth(this.authHeader)
      .headers(this.platformHeader)
      .field('userId', options.userId)
      .field('contentLanguage', options.contentLanguage)
      .field('doBlinkDetection', (options.doBlinkDetection != null ) ? options.doBlinkDetection : false )
      .attach('video', options.videoFilePath)
      .end(function (httpResponse) {
        callback(httpResponse.body);
      });
    };

    this.createVideoEnrollmentByUrl = (options, callback) => {
      unirest.post(`${BASE_URL}/enrollments/video/byUrl`)
      .auth(this.authHeader)
      .headers(this.platformHeader)
      .field('userId', options.userId)
      .field('contentLanguage', options.contentLanguage)
      .field('doBlinkDetection', (options.doBlinkDetection != null ) ? options.doBlinkDetection : false )
      .field('fileUrl', options.videoFileURL)
      .end(function (httpResponse) {
        callback(httpResponse.body);
      });
    };

    this.deleteFaceEnrollment = (options, callback) => {
      unirest.delete(`${BASE_URL}/enrollments/face/${options.userId}/${options.faceEnrollmentId}`)
      .auth(this.authHeader)
      .headers(this.platformHeader)
      .end(function (httpResponse) {
        callback(httpResponse.body);
      });
    };

    this.deleteEnrollmentForUser = (options, callback) => {
      unirest.delete(`${BASE_URL}/enrollments/${options.userId}/${options.enrollmentId}`)
      .auth(this.authHeader)
      .headers(this.platformHeader)
      .end(function (httpResponse) {
        callback(httpResponse.body);
      });
    };

    this.deleteAllEnrollmentsForUser = (options, callback) => {
      unirest.delete(`${BASE_URL}/enrollments/${options.userId}/all`)
      .auth(this.authHeader)
      .headers(this.platformHeader)
      .end(function (httpResponse) {
        callback(httpResponse.body);
      });
    };

    /* Verification API Calls */

    this.voiceVerification = (options, callback) => {
      unirest.post(`${BASE_URL}/verification`)
      .auth(this.authHeader)
      .headers(this.platformHeader)
      .field('userId', options.userId)
      .field('contentLanguage', options.contentLanguage)
      .attach('recording', options.audioFilePath)
      .end(function (httpResponse) {
        callback(httpResponse.body);
      });
    };

    this.voiceVerificationByUrl = (options, callback) => {
      unirest.post(`${BASE_URL}/verification/byUrl`)
      .auth(this.authHeader)
      .headers(this.platformHeader)
      .field('userId', options.userId)
      .field('contentLanguage', options.contentLanguage)
      .field('fileUrl', options.audioFileURL)
      .end(function (httpResponse) {
        callback(httpResponse.body);
      });
    };

    this.faceVerification = (options, callback) => {
      unirest.post(`${BASE_URL}/verification/face`)
      .auth(this.authHeader)
      .headers(this.platformHeader)
      .field('userId', options.userId)
      .field('doBlinkDetection', (options.doBlinkDetection != null ) ? options.doBlinkDetection : false )
      .attach('video', options.videoFilePath)
      .end(function (httpResponse) {
        callback(httpResponse.body);
      });
    };

    this.videoVerification = (options, callback) => {
      unirest.post(`${BASE_URL}/verification/video`)
      .auth(this.authHeader)
      .headers(this.platformHeader)
      .field('userId', options.userId)
      .field('contentLanguage', options.contentLanguage)
      .field('doBlinkDetection', (options.doBlinkDetection != null ) ? options.doBlinkDetection : false )
      .attach('video', options.videoFilePath)
      .end(function (httpResponse) {
        callback(httpResponse.body);
      });
    };

    this.videoVerificationByUrl = (options, callback) => {
      unirest.post(`${BASE_URL}/verification/video/byUrl`)
      .auth(this.authHeader)
      .headers(this.platformHeader)
      .field('userId', options.userId)
      .field('contentLanguage', options.contentLanguage)
      .field('doBlinkDetection', (options.doBlinkDetection != null ) ? options.doBlinkDetection : false )
      .field('fileUrl', options.videoFileURL)
      .end(function (httpResponse) {
        callback(httpResponse.body);
      });
    };

    /* Identification API Calls */

    this.voiceIdentification = (options, callback) => {
      unirest.post(`${BASE_URL}/identification`)
      .auth(this.authHeader)
      .headers(this.platformHeader)
      .field('groupId', options.groupId === 'NONE' ? null : options.groupId)
      .field('contentLanguage', options.contentLanguage)
      .attach('recording', options.audioFilePath)
      .end(function (httpResponse) {
        callback(httpResponse.body);
      });
    };

    this.voiceIdentificationByUrl = (options, callback) => {
      unirest.post(`${BASE_URL}/identification/byUrl`)
      .auth(this.authHeader)
      .headers(this.platformHeader)
      .field('groupId', options.groupId === 'NONE' ? null : options.groupId)
      .field('contentLanguage', options.contentLanguage)
      .field('fileUrl', options.audioFileURL)
      .end(function (httpResponse) {
        callback(httpResponse.body);
      });
    };

    this.videoIdentification = (options, callback) => {
      unirest.post(`${BASE_URL}/identification/video`)
      .auth(this.authHeader)
      .headers(this.platformHeader)
      .field('groupId', options.groupId === 'NONE' ? null : options.groupId)
      .field('contentLanguage', options.contentLanguage)
      .field('doBlinkDetection', (options.doBlinkDetection != null ) ? options.doBlinkDetection : false )
      .attach('video', options.videoFilePath)
      .end(function (httpResponse) {
        callback(httpResponse.body);
      });
    };

    this.videoIdentificationByUrl = (options, callback) => {
      unirest.post(`${BASE_URL}/identification/video/byUrl`)
      .auth(this.authHeader)
      .headers(this.platformHeader)
      .field('groupId', options.groupId === 'NONE' ? null : options.groupId)
      .field('contentLanguage', options.contentLanguage)
      .field('doBlinkDetection', (options.doBlinkDetection != null ) ? options.doBlinkDetection : false )
      .field('fileUrl', options.videoFileURL)
      .end(function (httpResponse) {
        callback(httpResponse.body);
      });
    };

}
