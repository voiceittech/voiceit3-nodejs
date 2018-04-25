# voiceit2-nodejs

A NodeJS wrapper for VoiceIt's API2.0 featuring Face + Voice Verification and Identification.

* [Getting Started](#getting-started)
* [Installation](#installation)
* [API Calls](#api-calls)
  * [Initialization](#initialization)
  * [User API Calls](#user-api-calls)
      * [Get All Users](#get-all-users)
      * [Create User](#create-user)
      * [Check User Exists](#check-user-exists)
      * [Get Groups for User](#get-groups-for-user)
      * [Delete User](#delete-user)
  * [Group API Calls](#group-api-calls)
      * [Get All Groups](#get-all-groups)
      * [Create Group](#create-group)
      * [Get Group](#get-group)
      * [Delete Group](#delete-group)
      * [Check Group Exists](#check-group-exists)
      * [Add User to Group](#add-user-to-group)
      * [Remove User from Group](#remove-user-from-group)      
  * [Enrollment API Calls](#enrollment-api-calls)
      * [Get All Enrollments for User](#get-all-enrollments-for-user)
      * [Get Face Enrollments for User](#get-face-enrollments-for-user)
      * [Delete All Enrollments for User](#delete-all-enrollments-for-user)
      * [Delete Enrollment for User](#delete-enrollment-for-user)
      * [Delete Face Enrollment](#delete-face-enrollment)
      * [Create Voice Enrollment](#create-voice-enrollment)
      * [Create Voice Enrollment By URL](#create-voice-enrollment-by-url)
      * [Create Video Enrollment](#create-video-enrollment)
      * [Create Video Enrollment By URL](#create-video-enrollment-by-url)
      * [Create Face Enrollment](#create-face-enrollment)
  * [Verification API Calls](#verification-api-calls)
      * [Voice Verification](#voice-verification)
      * [Voice Verification By URL](#voice-verification-by-url)
      * [Video Verification](#video-verification)
      * [Video Verification By URL](#video-verification-by-url)
      * [Face Verification](#face-verification)
  * [Identification API Calls](#identification-api-calls)
      * [Voice Identification](#voice-identification)
      * [Voice Identification By URL](#voice-identification-by-url)
      * [Video Identification](#video-identification)
      * [Video Identification By URL](#video-identification-by-url)

## Getting Started

Sign up for a free Developer Account at [voiceit.io](https://voiceit.io/signup) and activate API 2.0 from the settings page. Then you should be able view the API Key and Token. You can also review the HTTP Documentation at [api.voiceit.io](https://api.voiceit.io)

## Installation

In order to easily integrate VoiceIt API 2 into your Node project, please install the VoiceIt Node Package by running the following command in npm project

```
npm install --save voiceit2-nodejs
```

## API Calls

### Initialization

Make Sure to add this at the top of your project file

```javascript
voiceit2 = require('voiceit2-nodejs');
```

First assign the API Credentials an initialize a VoiceIt2 struct.

```javascript
let myVoiceIt = new voiceit2("API_KEY", "API_TOKEN");
```

### User API Calls

#### Get All Users

Get all  users associated with the apiKey
```javascript
myVoiceIt.getAllUsers((jsonResponse)=>{
  console.log(jsonResponse, status);
});
```

#### Create User

Create a new user
```javascript
myVoiceIt.createUser((jsonResponse)=>{
  console.log(jsonResponse)
});
```

#### Check User Exists

Check whether a user exists for the given userId(begins with 'usr_')
```javascript
myVoiceIt.checkUserExists({
  userId:"USER_ID_HERE"
},(jsonResponse)=>{
  console.log(jsonResponse)
});
```

#### Get Groups for User

Get a list of groups that the user with given userId(begins with 'usr_') is a part of
```javascript
myVoiceIt.getGroupsForUser({
  userId:"USER_ID_HERE"
},(jsonResponse)=>{
  console.log(jsonResponse)
});
```

#### Delete User

Delete user with given userId(begins with 'usr_')
```javascript
myVoiceIt.deleteUser({
  userId:"USER_ID_HERE"
},(jsonResponse)=>{
  console.log(jsonResponse)
});
```

### Group API Calls

#### Get All Groups

Get all the groups associated with the apiKey
```javascript
myVoiceIt.getAllGroups((jsonResponse)=>{
  console.log(jsonResponse, status);
});
```

#### Create Group

Create a new group with the given description
```javascript
myVoiceIt.createGroup({
  description: "Sample Group Description"
}(jsonResponse)=>{
  console.log(jsonResponse)
});
```

#### Get Group

Returns a group for the given groupId(begins with 'grp_')
```javascript
myVoiceIt.getGroup({
  groupId: "GROUP_ID_HERE"
}(jsonResponse)=>{
  console.log(jsonResponse)
});
```

#### Delete Group

Delete group with given groupId(begins with 'grp_'), Note: This call does not delete any users, but simply deletes the group and disassociates the users from the group

```javascript
myVoiceIt.deleteGroup({
  groupId: "GROUP_ID_HERE"
},(jsonResponse)=>{
  console.log(jsonResponse)
});
```

#### Check Group Exists

Checks if group with given groupId(begins with 'grp_') exists
```javascript
myVoiceIt.checkGroupExists({
  groupId: "GROUP_ID_HERE"
},(jsonResponse)=>{
  console.log(jsonResponse)
});
```

#### Add User to Group

Adds user with given userId(begins with 'usr_') to group with given groupId(begins with 'grp_')
```javascript
myVoiceIt.addUserToGroup({
  userId: "USER_ID_HERE",
  groupId: "GROUP_ID_HERE"
},(jsonResponse)=>{
  console.log(jsonResponse)
});
```

#### Remove User from Group

Removes user with given userId(begins with 'usr_') from group with given groupId(begins with 'grp_')

```javascript
myVoiceIt.removeUserFromGroup({
  userId: "USER_ID_HERE",
  groupId: "GROUP_ID_HERE"
},(jsonResponse)=>{
  console.log(jsonResponse)
});
```

### Enrollment API Calls

#### Get All Enrollments for User

Gets all enrollment for user with given userId(begins with 'usr_')

```javascript
myVoiceIt.getAllEnrollmentsForUser({
  userId: "USER_ID_HERE"
},(jsonResponse)=>{
  console.log(jsonResponse, status);
});
```

#### Get Face Enrollments for User

Gets face enrollments for user with given userId(begins with 'usr_')

```javascript
myVoiceIt.getFaceEnrollmentsForUser({
  userId: "USER_ID_HERE"
},(jsonResponse)=>{
  console.log(jsonResponse, status);
});
```

#### Delete All Enrollments for User

Delete all enrollments for user with the given userId(begins with 'usr_')

```javascript
myVoiceIt.deleteAllEnrollmentsForUser({
  userId: "USER_ID_HERE"
},(jsonResponse)=>{
  console.log(jsonResponse, status);
});
```

#### Delete Enrollment for User

Delete enrollment for user with given userId(begins with 'usr_') and enrollmentId(integer)

```javascript
myVoiceIt.deleteEnrollmentForUser({
  userId: "USER_ID_HERE",
  enrollmentId : "ENROLLMENT_ID_HERE"
},(jsonResponse)=>{
  console.log(jsonResponse, status);
});
```

#### Delete Face Enrollment

Delete face enrollment for user with given userId(begins with 'usr_') and faceEnrollmentId(integer)

```javascript
myVoiceIt.deleteFaceEnrollment({
  userId: "USER_ID_HERE",
  faceEnrollmentId : "FACE_ENROLLMENT_ID_HERE"
},(jsonResponse)=>{
  console.log(jsonResponse, status);
});
```

#### Create Voice Enrollment

Create voice enrollment for user with given userId(begins with 'usr_') and contentLanguage('en-US','es-ES', etc.). Note: File recording need to be no less than 1.2 seconds and no more than 5 seconds

```javascript
myVoiceIt.createVoiceEnrollment({
  userId: "USER_ID_HERE",
  contentLanguage : "CONTENT_LANGUAGE_HERE",
  audioFilePath : "FULL_AUDIO_PATH"
},(jsonResponse)=>{
  console.log(jsonResponse, status);
});
```

#### Create Voice Enrollment by URL

Create voice enrollment for user with given userId(begins with 'usr_') and contentLanguage('en-US','es-ES', etc.). Note: File recording need to be no less than 1.2 seconds and no more than 5 seconds

```javascript
myVoiceIt.createVoiceEnrollmentByUrl({
  userId: "USER_ID_HERE",
  contentLanguage : "CONTENT_LANGUAGE_HERE",
  audioFileURL : "PUBLIC_URL_TO_AUDIO_FILE_HERE"
},(jsonResponse)=>{
  console.log(jsonResponse, status);
});
```

#### Create Video Enrollment

Create video enrollment for user with given userId(begins with 'usr_'), contentLanguage('en-US','es-ES', etc.) and optionally a boolean to disable blink detection. Note: File recording need to be no less than 1.2 seconds and no more than 5 seconds

```javascript
myVoiceIt.createVideoEnrollment({
  userId: "USER_ID_HERE",
  contentLanguage : "CONTENT_LANGUAGE_HERE",
  videoFilePath : "FULL_VIDEO_PATH"
},(jsonResponse)=>{
  console.log(jsonResponse, status);
});
```

or with blinkDetection disabled

```javascript
myVoiceIt.createVideoEnrollment({
  userId: "USER_ID_HERE",
  contentLanguage : "CONTENT_LANGUAGE_HERE",
  videoFilePath : "FULL_VIDEO_PATH",
  doBlinkDetection: false
},(jsonResponse)=>{
  console.log(jsonResponse, status);
});
```

#### Create Video Enrollment by URL

Create video enrollment for user with given userId(begins with 'usr_'), contentLanguage('en-US','es-ES', etc.) and optionally a boolean to disable blink detection. Note: File recording need to be no less than 1.2 seconds and no more than 5 seconds

```javascript
myVoiceIt.createVideoEnrollmentByUrl({
  userId: "USER_ID_HERE",
  contentLanguage : "CONTENT_LANGUAGE_HERE",
  videoFileURL : "PUBLIC_URL_TO_VIDEO_FILE_HERE"
},(jsonResponse)=>{
  console.log(jsonResponse, status);
});
```

or with blinkDetection disabled

```javascript
myVoiceIt.createVideoEnrollmentByUrl({
  userId: "USER_ID_HERE",
  contentLanguage : "CONTENT_LANGUAGE_HERE",
  videoFileURL : "PUBLIC_URL_TO_VIDEO_FILE_HERE",
  doBlinkDetection: false
},(jsonResponse)=>{
  console.log(jsonResponse, status);
});
```

#### Create Face Enrollment

Create face enrollment for user with given userId(begins with 'usr_') and optionally a boolean to disable blink detection. Note: It is recommended that you send a 2 second mp4 video

```javascript
myVoiceIt.createFaceEnrollment({
  userId: "USER_ID_HERE",
  videoFilePath : "FULL_VIDEO_PATH"
},(jsonResponse)=>{
  console.log(jsonResponse, status);
});
```

or with blinkDetection disabled

```javascript
myVoiceIt.createFaceEnrollment({
  userId: "USER_ID_HERE",
  videoFilePath : "FULL_VIDEO_PATH",
  doBlinkDetection: false
},(jsonResponse)=>{
  console.log(jsonResponse, status);
});
```

### Verification API Calls

#### Voice Verification

Verify user with the given userId(begins with 'usr_') and contentLanguage('en-US','es-ES', etc.). Note: File recording need to be no less than 1.2 seconds and no more than 5 seconds

```javascript
myVoiceIt.voiceVerification({
  userId: "USER_ID_HERE",
  contentLanguage : "CONTENT_LANGUAGE_HERE",
  audioFilePath : "FULL_AUDIO_PATH"
},(jsonResponse)=>{
  console.log(jsonResponse, status);
});
```
#### Voice Verification by URL

Verify user with the given userId(begins with 'usr_') and contentLanguage('en-US','es-ES', etc.). Note: File recording need to be no less than 1.2 seconds and no more than 5 seconds

```javascript
myVoiceIt.voiceVerificationByUrl({
  userId: "USER_ID_HERE",
  contentLanguage : "CONTENT_LANGUAGE_HERE",
  audioFileURL : "PUBLIC_URL_TO_AUDIO_FILE_HERE"
},(jsonResponse)=>{
  console.log(jsonResponse, status);
});
```

#### Video Verification

Verify user with given userId(begins with 'usr_'), contentLanguage('en-US','es-ES', etc.) and optionally a boolean to disable blink detection. Note: File recording needs to be no less than 1.2 seconds and no more than 5 seconds

```javascript
myVoiceIt.videoVerification({
  userId: "USER_ID_HERE",
  contentLanguage : "CONTENT_LANGUAGE_HERE",
  videoFilePath : "FULL_VIDEO_PATH"
},(jsonResponse)=>{
  console.log(jsonResponse, status);
});
```

or with blinkDetection disabled

```javascript
myVoiceIt.videoVerification({
  userId: "USER_ID_HERE",
  contentLanguage : "CONTENT_LANGUAGE_HERE",
  videoFilePath : "FULL_VIDEO_PATH",
  doBlinkDetection: false
},(jsonResponse)=>{
  console.log(jsonResponse, status);
});
```

#### Video Verification by URL

Verify user with given userId(begins with 'usr_'), contentLanguage('en-US','es-ES', etc.) and optionally a boolean to disable blink detection. Note: File recording needs to be no less than 1.2 seconds and no more than 5 seconds

```javascript
myVoiceIt.videoVerificationByUrl({
  userId: "USER_ID_HERE",
  contentLanguage : "CONTENT_LANGUAGE_HERE",
  videoFileURL : "PUBLIC_URL_TO_VIDEO_FILE_HERE"
},(jsonResponse)=>{
  console.log(jsonResponse, status);
});
```

or with blinkDetection disabled

```javascript
myVoiceIt.videoVerificationByUrl({
  userId: "USER_ID_HERE",
  contentLanguage : "CONTENT_LANGUAGE_HERE",
  videoFileURL : "PUBLIC_URL_TO_VIDEO_FILE_HERE",
  doBlinkDetection: false
},(jsonResponse)=>{
  console.log(jsonResponse, status);
});
```

#### Face Verification

Verify user's face with given userId(begins with 'usr_') and optionally a boolean to disable blink detection. Note: Provide an about 2 seconds long video(mp4 codec is recommended) of the user's face

```javascript
myVoiceIt.faceVerification({
  userId: "USER_ID_HERE",
  videoFilePath : "FULL_VIDEO_PATH"
},(jsonResponse)=>{
  console.log(jsonResponse, status);
});
```

or with blinkDetection disabled

```javascript
myVoiceIt.faceVerification({
  userId: "USER_ID_HERE",
  videoFilePath : "FULL_VIDEO_PATH",
  doBlinkDetection: false
},(jsonResponse)=>{
  console.log(jsonResponse, status);
});
```
### Identification API Calls

#### Voice Identification

Identify user inside group with the given groupId(begins with 'grp_') and contentLanguage('en-US','es-ES', etc.). Note: File recording needs to be no less than 1.2 seconds and no more than 5 seconds

```javascript
myVoiceIt.voiceIdentification({
  groupId: "GROUP_ID_HERE",
  contentLanguage : "CONTENT_LANGUAGE_HERE",
  audioFilePath : "FULL_AUDIO_PATH"
},(jsonResponse)=>{
  console.log(jsonResponse, status);
});
```
#### Voice Identification by URL

Identify user inside group with the given groupId(begins with 'grp_') and contentLanguage('en-US','es-ES', etc.). Note: File recording needs to be no less than 1.2 seconds and no more than 5 seconds

```javascript
myVoiceIt.voiceIdentificationByUrl({
  groupId: "GROUP_ID_HERE",
  contentLanguage : "CONTENT_LANGUAGE_HERE",
  audioFileURL : "PUBLIC_URL_TO_AUDIO_FILE_HERE"
},(jsonResponse)=>{
  console.log(jsonResponse, status);
});
```

#### Video Identification

Identify user inside group with the given groupId(begins with 'grp_'), contentLanguage('en-US','es-ES', etc.) and optionally a boolean to disable blink detection. Note: File recording needs to be no less than 1.2 seconds and no more than 5 seconds

```javascript
myVoiceIt.videoIdentification({
  groupId: "GROUP_ID_HERE",
  contentLanguage : "CONTENT_LANGUAGE_HERE",
  videoFilePath : "FULL_VIDEO_PATH"
},(jsonResponse)=>{
  console.log(jsonResponse, status);
});
```

or with blinkDetection disabled

```javascript
myVoiceIt.videoIdentification({
  groupId: "GROUP_ID_HERE",
  contentLanguage : "CONTENT_LANGUAGE_HERE",
  videoFilePath : "FULL_VIDEO_PATH",
  doBlinkDetection: false
},(jsonResponse)=>{
  console.log(jsonResponse, status);
});
```
#### Video Identification by URL

Identify user inside group with the given groupId(begins with 'grp_') , contentLanguage('en-US','es-ES', etc.) and optionally a boolean to disable blink detection. Note: File recording needs to be no less than 1.2 seconds and no more than 5 seconds

```javascript
myVoiceIt.videoIdentificationByUrl({
  groupId: "GROUP_ID_HERE",
  contentLanguage : "CONTENT_LANGUAGE_HERE",
  videoFileURL : "PUBLIC_URL_TO_VIDEO_FILE_HERE"
},(jsonResponse)=>{
  console.log(jsonResponse, status);
});
```

or with blinkDetection disabled

```javascript
myVoiceIt.videoIdentificationByUrl({
  groupId: "GROUP_ID_HERE",
  contentLanguage : "CONTENT_LANGUAGE_HERE",
  videoFileURL : "PUBLIC_URL_TO_VIDEO_FILE_HERE",
  doBlinkDetection: false
},(jsonResponse)=>{
  console.log(jsonResponse, status);
});
```
## Authors

Armaan Bindra, armaan@voiceit.io

## License

voiceit2-nodejs is available under the MIT license. See the LICENSE file for more info.
