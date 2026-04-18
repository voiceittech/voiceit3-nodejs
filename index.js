const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const querystring = require('querystring');
const pckg = require('./package.json');

function checkFileExists(filePath, callback) {
  if (!fs.existsSync(filePath)) {
    callback(Error(`File Path ${filePath} Does Not Exist`));
    return false;
  }
  return true;
}

function voiceit3(apk, tok, baseUrl) {
  this.baseUrl = baseUrl || 'https://api.voiceit.io';

  this.axiosInstance = axios.create({
    auth: {
      username: apk,
      password: tok,
    },
    headers: {
      platformId: '31',
      platformVersion: pckg.version,
    },
    timeout: 30000,
    maxContentLength: Infinity,
    maxBodyLength: Infinity,
  });

  this.notificationUrl = '';


  this.addNotificationUrl = (options, callback) => {
    this.notificationUrl = `?notificationURL=${querystring.escape(options.url)}`;
    callback();
  };

  this.removeNotificationUrl = (callback) => {
    this.notificationUrl = '';
    callback();
  };

  /* User API Calls */

  this.getAllUsers = (callback) => {
    this.axiosInstance.get(`${this.baseUrl}/users${this.notificationUrl}`)
      .then((httpResponse) => {
        callback(httpResponse.data);
      }).catch((error) => {
        if (error.response && error.response.data)
          callback(error.response.data);
        else
          callback({ status: 0, responseCode: 'FAIL', message: error.message });
      });
  };

  this.getPhrases = (options, callback) => {
    this.axiosInstance.get(`${this.baseUrl}/phrases/${encodeURIComponent(options.contentLanguage)}${this.notificationUrl}`)
      .then((httpResponse) => {
        callback(httpResponse.data);
      }).catch((error) => {
        if (error.response && error.response.data)
          callback(error.response.data);
        else
          callback({ status: 0, responseCode: 'FAIL', message: error.message });
      });
  };

  this.createUser = (callback) => {
    this.axiosInstance.post(`${this.baseUrl}/users${this.notificationUrl}`)
      .then((httpResponse) => {
        callback(httpResponse.data);
      }).catch((error) => {
        if (error.response && error.response.data)
          callback(error.response.data);
        else
          callback({ status: 0, responseCode: 'FAIL', message: error.message });
      });
  };

  this.createUnmanagedSubAccount = (options, callback) => {
    const form = new FormData();
    form.append('firstName', options.firstName || '');
    form.append('contentLanguage', options.contentLanguage || '');
    form.append('lastName', options.lastName || '');
    form.append('email', options.email || '');
    form.append('password', options.password || '');

    this.axiosInstance.post(`${this.baseUrl}/subaccount/unmanaged${this.notificationUrl}`, form, {
      headers: form.getHeaders(),
    }).then((httpResponse) => {
      callback(httpResponse.data);
    }).catch((error) => {
      if (error.response && error.response.data)
        callback(error.response.data);
      else
        callback({ status: 0, responseCode: 'FAIL', message: error.message });
    });
  };

  this.createManagedSubAccount = (options, callback) => {
    const form = new FormData();
    form.append('firstName', options.firstName || '');
    form.append('contentLanguage', options.contentLanguage || '');
    form.append('lastName', options.lastName || '');
    form.append('email', options.email || '');
    form.append('password', options.password || '');

    this.axiosInstance.post(`${this.baseUrl}/subaccount/managed${this.notificationUrl}`, form, {
      headers: form.getHeaders(),
    }).then((httpResponse) => {
      callback(httpResponse.data);
    }).catch((error) => {
      if (error.response && error.response.data)
        callback(error.response.data);
      else
        callback({ status: 0, responseCode: 'FAIL', message: error.message });
    });
  };


  this.regenerateSubAccountAPIToken = (options, callback) => {
    this.axiosInstance.post(`${this.baseUrl}/subaccount/${encodeURIComponent(options.subAccountAPIKey)}${this.notificationUrl}`)
      .then((httpResponse) => {
        callback(httpResponse.data);
      }).catch((error) => {
        if (error.response && error.response.data)
          callback(error.response.data);
        else
          callback({ status: 0, responseCode: 'FAIL', message: error.message });
      });
  };

  //TODO: is it ok to name the property subAccountAPIKey to be consistent with the other wrappers
  // or should it be userId? 
  this.deleteSubAccount = (options, callback) => {
    this.axiosInstance.delete(`${this.baseUrl}/subaccount/${encodeURIComponent(options.subAccountAPIKey)}${this.notificationUrl}`)
      .then((httpResponse) => {
        callback(httpResponse.data);
      }).catch((error) => {
        if (error.response && error.response.data)
          callback(error.response.data);
        else
          callback({ status: 0, responseCode: 'FAIL', message: error.message });
      });
  };


  this.checkUserExists = (options, callback) => {
    this.axiosInstance.get(`${this.baseUrl}/users/${encodeURIComponent(options.userId)}${this.notificationUrl}`)
      .then((httpResponse) => {
        callback(httpResponse.data);
      }).catch((error) => {
        if (error.response && error.response.data)
          callback(error.response.data);
        else
          callback({ status: 0, responseCode: 'FAIL', message: error.message });
      });
  };

  this.deleteUser = (options, callback) => {
    this.axiosInstance.delete(`${this.baseUrl}/users/${encodeURIComponent(options.userId)}${this.notificationUrl}`)
      .then((httpResponse) => {
        callback(httpResponse.data);
      }).catch((error) => {
        if (error.response && error.response.data)
          callback(error.response.data);
        else
          callback({ status: 0, responseCode: 'FAIL', message: error.message });
      });
  };

  this.getGroupsForUser = (options, callback) => {
    this.axiosInstance.get(`${this.baseUrl}/users/${encodeURIComponent(options.userId)}/groups${this.notificationUrl}`)
      .then((httpResponse) => {
        callback(httpResponse.data);
      }).catch((error) => {
        if (error.response && error.response.data)
          callback(error.response.data);
        else
          callback({ status: 0, responseCode: 'FAIL', message: error.message });
      });
  };

  /* Group API Calls */

  this.getAllGroups = (callback) => {
    this.axiosInstance.get(`${this.baseUrl}/groups${this.notificationUrl}`)
      .then((httpResponse) => {
        callback(httpResponse.data);
      }).catch((error) => {
        if (error.response && error.response.data)
          callback(error.response.data);
        else
          callback({ status: 0, responseCode: 'FAIL', message: error.message });
      });
  };

  this.getGroup = (options, callback) => {
    this.axiosInstance.get(`${this.baseUrl}/groups/${encodeURIComponent(options.groupId)}${this.notificationUrl}`)
      .then((httpResponse) => {
        callback(httpResponse.data);
      }).catch((error) => {
        if (error.response && error.response.data)
          callback(error.response.data);
        else
          callback({ status: 0, responseCode: 'FAIL', message: error.message });
      });
  };

  this.checkGroupExists = (options, callback) => {
    this.axiosInstance.get(`${this.baseUrl}/groups/${encodeURIComponent(options.groupId)}/exists${this.notificationUrl}`)
      .then((httpResponse) => {
        callback(httpResponse.data);
      }).catch((error) => {
        if (error.response && error.response.data)
          callback(error.response.data);
        else
          callback({ status: 0, responseCode: 'FAIL', message: error.message });
      });
  };

  this.createGroup = (options = {}, callback) => {
    const form = new FormData();
    form.append('description', (options.description != null) ? options.description : '');

    this.axiosInstance.post(`${this.baseUrl}/groups${this.notificationUrl}`, form, {
      headers: form.getHeaders(),
    }).then((httpResponse) => {
      callback(httpResponse.data);
    }).catch((error) => {
      if (error.response && error.response.data)
        callback(error.response.data);
      else
        callback({ status: 0, responseCode: 'FAIL', message: error.message });
    });
  };

  this.addUserToGroup = (options, callback) => {
    const form = new FormData();
    form.append('userId', options.userId);
    form.append('groupId', options.groupId);

    this.axiosInstance.put(`${this.baseUrl}/groups/addUser${this.notificationUrl}`, form, {
      headers: form.getHeaders(),
    }).then((httpResponse) => {
      callback(httpResponse.data);
    }).catch((error) => {
      if (error.response && error.response.data)
        callback(error.response.data);
      else
        callback({ status: 0, responseCode: 'FAIL', message: error.message });
    });
  };

  this.removeUserFromGroup = (options, callback) => {
    this.axiosInstance.delete(`${this.baseUrl}/groups/removeUser${this.notificationUrl}`, {
      params: {
        userId: options.userId,
        groupId: options.groupId,
      },
    }).then((httpResponse) => {
      callback(httpResponse.data);
    }).catch((error) => {
      if (error.response && error.response.data)
        callback(error.response.data);
      else
        callback({ status: 0, responseCode: 'FAIL', message: error.message });
    });
  };

  this.deleteGroup = (options, callback) => {
    this.axiosInstance.delete(`${this.baseUrl}/groups/${encodeURIComponent(options.groupId)}${this.notificationUrl}`)
      .then((httpResponse) => {
        callback(httpResponse.data);
      }).catch((error) => {
        if (error.response && error.response.data)
          callback(error.response.data);
        else
          callback({ status: 0, responseCode: 'FAIL', message: error.message });
      });
  };

  /* Enrollment API Calls */

  this.getAllEnrollmentsForUser = (options, callback) => {
    this.axiosInstance.get(`${this.baseUrl}/enrollments/${encodeURIComponent(options.userId)}${this.notificationUrl}`)
      .then((httpResponse) => {
        callback(httpResponse.data);
      }).catch((error) => {
        if (error.response && error.response.data)
          callback(error.response.data);
        else
          callback({ status: 0, responseCode: 'FAIL', message: error.message });
      });
  };

  this.getAllVoiceEnrollments = (options, callback) => {
    this.axiosInstance.get(`${this.baseUrl}/enrollments/voice/${encodeURIComponent(options.userId)}${this.notificationUrl}`)
      .then((httpResponse) => {
        callback(httpResponse.data);
      }).catch((error) => {
        if (error.response && error.response.data)
          callback(error.response.data);
        else
          callback({ status: 0, responseCode: 'FAIL', message: error.message });
      });
  };

  this.getAllFaceEnrollments = (options, callback) => {
    this.axiosInstance.get(`${this.baseUrl}/enrollments/face/${encodeURIComponent(options.userId)}${this.notificationUrl}`)
      .then((httpResponse) => {
        callback(httpResponse.data);
      }).catch((error) => {
        if (error.response && error.response.data)
          callback(error.response.data);
        else
          callback({ status: 0, responseCode: 'FAIL', message: error.message });
      });
  };

  this.getAllVideoEnrollments = (options, callback) => {
    this.axiosInstance.get(`${this.baseUrl}/enrollments/video/${encodeURIComponent(options.userId)}${this.notificationUrl}`)
      .then((httpResponse) => {
        callback(httpResponse.data);
      }).catch((error) => {
        if (error.response && error.response.data)
          callback(error.response.data);
        else
          callback({ status: 0, responseCode: 'FAIL', message: error.message });
      });
  };

  this.createVoiceEnrollment = (options, callback) => {
    if (!checkFileExists(options.audioFilePath, callback)) {
      return;
    }

    const form = new FormData();
    form.append('userId', options.userId);
    form.append('contentLanguage', options.contentLanguage);
    form.append('phrase', options.phrase ? options.phrase : '');
    form.append('recording', fs.createReadStream(options.audioFilePath), {
      filename: 'recording.wav',
    });
    

    this.axiosInstance.post(`${this.baseUrl}/enrollments/voice${this.notificationUrl}`, form, {
      headers: form.getHeaders(),
    }).then((httpResponse) => {
      callback(httpResponse.data);
    }).catch((error) => {
      if (error.response && error.response.data)
        callback(error.response.data);
      else
        callback({ status: 0, responseCode: 'FAIL', message: error.message });
    });
  };

  this.createVoiceEnrollmentByUrl = (options, callback) => {
    const form = new FormData();
    form.append('userId', options.userId);
    form.append('contentLanguage', options.contentLanguage);
    form.append('phrase', options.phrase ? options.phrase : '');
    form.append('fileUrl', options.audioFileURL);

    this.axiosInstance.post(`${this.baseUrl}/enrollments/voice/byUrl${this.notificationUrl}`, form, {
      headers: form.getHeaders(),
    }).then((httpResponse) => {
      callback(httpResponse.data);
    }).catch((error) => {
      if (error.response && error.response.data)
        callback(error.response.data);
      else
        callback({ status: 0, responseCode: 'FAIL', message: error.message });
    });
  };

  this.createFaceEnrollment = (options, callback) => {
    if (!checkFileExists(options.videoFilePath, callback)) {
      return;
    }

    const form = new FormData();
    form.append('userId', options.userId);
    form.append('video', fs.createReadStream(options.videoFilePath));

    const reqHeaders = form.getHeaders();

    this.axiosInstance.post(`${this.baseUrl}/enrollments/face${this.notificationUrl}`, form, {
      headers: reqHeaders,
    }).then((httpResponse) => {
      callback(httpResponse.data);
    }).catch((error) => {
      if (error.response && error.response.data)
        callback(error.response.data);
      else
        callback({ status: 0, responseCode: 'FAIL', message: error.message });
    });
  };

  this.createFaceEnrollmentByUrl = (options, callback) => {
    const form = new FormData();
    form.append('userId', options.userId);
    form.append('fileUrl', options.videoFileURL);

    this.axiosInstance.post(`${this.baseUrl}/enrollments/face/byUrl${this.notificationUrl}`, form, {
      headers: form.getHeaders(),
    }).then((httpResponse) => {
      callback(httpResponse.data);
    }).catch((error) => {
      if (error.response && error.response.data)
        callback(error.response.data);
      else
        callback({ status: 0, responseCode: 'FAIL', message: error.message });
    });
  };

  this.createPhotoEnrollment = (options, callback) => {
    if (!checkFileExists(options.photoFilePath, callback)) {
      return;
    }

    const form = new FormData();
    form.append('userId', options.userId);
    form.append('photo', fs.createReadStream(options.photoFilePath));

    const reqHeaders = form.getHeaders();

    this.axiosInstance.post(`${this.baseUrl}/enrollments/face${this.notificationUrl}`, form, {
      headers: reqHeaders,
    }).then((httpResponse) => {
      callback(httpResponse.data);
    }).catch((error) => {
      if (error.response && error.response.data)
        callback(error.response.data);
      else
        callback({ status: 0, responseCode: 'FAIL', message: error.message });
    });
  };

  this.createVideoEnrollment = (options, callback) => {
    if (!checkFileExists(options.videoFilePath, callback)) {
      return;
    }

    const form = new FormData();
    form.append('userId', options.userId);
    form.append('contentLanguage', options.contentLanguage);
    form.append('phrase', options.phrase ? options.phrase : '');
    form.append('video', fs.createReadStream(options.videoFilePath), {
      filename: 'video.mp4',
    });

    const reqHeaders = form.getHeaders();

    this.axiosInstance.post(`${this.baseUrl}/enrollments/video${this.notificationUrl}`, form, {
      headers: reqHeaders,
    }).then((httpResponse) => {
      callback(httpResponse.data);
    }).catch((error) => {
      if (error.response && error.response.data)
        callback(error.response.data);
      else
        callback({ status: 0, responseCode: 'FAIL', message: error.message });
    });
  };

  this.createVideoEnrollmentByUrl = (options, callback) => {
    const form = new FormData();
    form.append('userId', options.userId);
    form.append('contentLanguage', options.contentLanguage);
    form.append('phrase', options.phrase ? options.phrase : '');
    form.append('fileUrl', options.videoFileURL);

    this.axiosInstance.post(`${this.baseUrl}/enrollments/video/byUrl${this.notificationUrl}`, form, {
      headers: form.getHeaders(),
    }).then((httpResponse) => {
      callback(httpResponse.data);
    }).catch((error) => {
      if (error.response && error.response.data)
        callback(error.response.data);
      else
        callback({ status: 0, responseCode: 'FAIL', message: error.message });
    });
  };

  this.deleteAllEnrollments = (options, callback) => {
    this.axiosInstance.delete(`${this.baseUrl}/enrollments/${encodeURIComponent(options.userId)}/all${this.notificationUrl}`)
      .then((httpResponse) => {
        callback(httpResponse.data);
      }).catch((error) => {
        if (error.response && error.response.data)
          callback(error.response.data);
        else
          callback({ status: 0, responseCode: 'FAIL', message: error.message });
      });
  };

  /* Verification API Calls */

  this.voiceVerification = (options, callback) => {
    if (!checkFileExists(options.audioFilePath, callback)) {
      return;
    }

    const form = new FormData();
    form.append('userId', options.userId);
    form.append('contentLanguage', options.contentLanguage);
    form.append('phrase', options.phrase ? options.phrase : '');
    form.append('recording', fs.createReadStream(options.audioFilePath), {
      filename: 'recording.wav',
    });

    this.axiosInstance.post(`${this.baseUrl}/verification/voice${this.notificationUrl}`, form, {
      headers: form.getHeaders(),
    }).then((httpResponse) => {
      callback(httpResponse.data);
    }).catch((error) => {
      if (error.response && error.response.data)
        callback(error.response.data);
      else
        callback({ status: 0, responseCode: 'FAIL', message: error.message });
    });
  };

  this.voiceVerificationByUrl = (options, callback) => {
    const form = new FormData();
    form.append('userId', options.userId);
    form.append('contentLanguage', options.contentLanguage);
    form.append('phrase', options.phrase ? options.phrase : '');
    form.append('fileUrl', options.audioFileURL);

    this.axiosInstance.post(`${this.baseUrl}/verification/voice/byUrl${this.notificationUrl}`, form, {
      headers: form.getHeaders(),
    }).then((httpResponse) => {
      callback(httpResponse.data);
    }).catch((error) => {
      if (error.response && error.response.data)
        callback(error.response.data);
      else
        callback({ status: 0, responseCode: 'FAIL', message: error.message });
    });
  };

  this.faceVerification = (options, callback) => {
    if (!checkFileExists(options.videoFilePath, callback)) {
      return;
    }

    const form = new FormData();
    form.append('userId', options.userId);
    form.append('video', fs.createReadStream(options.videoFilePath), {
      filename: 'video.mp4',
    });

    const reqHeaders = form.getHeaders();

    this.axiosInstance.post(`${this.baseUrl}/verification/face${this.notificationUrl}`, form, {
      headers: reqHeaders,
    }).then((httpResponse) => {
      callback(httpResponse.data);
    }).catch((error) => {
      if (error.response && error.response.data)
        callback(error.response.data);
      else
        callback({ status: 0, responseCode: 'FAIL', message: error.message });
    });
  };

  this.faceVerificationByUrl = (options, callback) => {
    const form = new FormData();
    form.append('userId', options.userId);
    form.append('fileUrl', options.videoFileURL);

    this.axiosInstance.post(`${this.baseUrl}/verification/face/byUrl${this.notificationUrl}`, form, {
      headers: form.getHeaders(),
    }).then((httpResponse) => {
      callback(httpResponse.data);
    }).catch((error) => {
      if (error.response && error.response.data)
        callback(error.response.data);
      else
        callback({ status: 0, responseCode: 'FAIL', message: error.message });
    });
  };

  this.photoVerification = (options, callback) => {
    if (!checkFileExists(options.photoFilePath, callback)) {
      return;
    }

    const form = new FormData();
    form.append('userId', options.userId);
    form.append('photo', fs.createReadStream(options.photoFilePath));

    const reqHeaders = form.getHeaders();

    this.axiosInstance.post(`${this.baseUrl}/verification/face${this.notificationUrl}`, form, {
      headers: reqHeaders,
    }).then((httpResponse) => {
      callback(httpResponse.data);
    }).catch((error) => {
      if (error.response && error.response.data)
        callback(error.response.data);
      else
        callback({ status: 0, responseCode: 'FAIL', message: error.message });
    });
  };

  this.videoVerification = (options, callback) => {
    if (!checkFileExists(options.videoFilePath, callback)) {
      return;
    }

    const form = new FormData();
    form.append('userId', options.userId);
    form.append('contentLanguage', options.contentLanguage);
    form.append('phrase', options.phrase ? options.phrase : '');
    form.append('video', fs.createReadStream(options.videoFilePath), {
      filename: 'video.mp4',
    });

    const reqHeaders = form.getHeaders();

    this.axiosInstance.post(`${this.baseUrl}/verification/video${this.notificationUrl}`, form, {
      headers: reqHeaders,
    }).then((httpResponse) => {
      callback(httpResponse.data);
    }).catch((error) => {
      if (error.response && error.response.data)
        callback(error.response.data);
      else
        callback({ status: 0, responseCode: 'FAIL', message: error.message });
    });
  };

  this.videoVerificationByUrl = (options, callback) => {
    const form = new FormData();
    form.append('userId', options.userId);
    form.append('contentLanguage', options.contentLanguage);
    form.append('phrase', options.phrase ? options.phrase : '');
    form.append('fileUrl', options.videoFileURL);

    this.axiosInstance.post(`${this.baseUrl}/verification/video/byUrl${this.notificationUrl}`, form, {
      headers: form.getHeaders(),
    }).then((httpResponse) => {
      callback(httpResponse.data);
    }).catch((error) => {
      if (error.response && error.response.data)
        callback(error.response.data);
      else
        callback({ status: 0, responseCode: 'FAIL', message: error.message });
    });
  };

  /* Identification API Calls */

  this.voiceIdentification = (options, callback) => {
    if (!checkFileExists(options.audioFilePath, callback)) {
      return;
    }

    const form = new FormData();
    form.append('groupId', options.groupId);
    form.append('contentLanguage', options.contentLanguage);
    form.append('phrase', options.phrase ? options.phrase : '');
    form.append('recording', fs.createReadStream(options.audioFilePath), {
      filename: 'recording.wav',
    });

    this.axiosInstance.post(`${this.baseUrl}/identification/voice${this.notificationUrl}`, form, {
      headers: form.getHeaders(),
    }).then((httpResponse) => {
      callback(httpResponse.data);
    }).catch((error) => {
      if (error.response && error.response.data)
        callback(error.response.data);
      else
        callback({ status: 0, responseCode: 'FAIL', message: error.message });
    });
  };

  this.voiceIdentificationByUrl = (options, callback) => {
    const form = new FormData();
    form.append('groupId', options.groupId);
    form.append('contentLanguage', options.contentLanguage);
    form.append('phrase', options.phrase ? options.phrase : '');
    form.append('fileUrl', options.audioFileURL);

    this.axiosInstance.post(`${this.baseUrl}/identification/voice/byUrl${this.notificationUrl}`, form, {
      headers: form.getHeaders(),
    }).then((httpResponse) => {
      callback(httpResponse.data);
    }).catch((error) => {
      if (error.response && error.response.data)
        callback(error.response.data);
      else
        callback({ status: 0, responseCode: 'FAIL', message: error.message });
    });
  };

  this.faceIdentification = (options, callback) => {
    if (!checkFileExists(options.videoFilePath, callback)) {
      return;
    }

    const form = new FormData();
    form.append('groupId', options.groupId);
    form.append('video', fs.createReadStream(options.videoFilePath), {
      filename: 'video.mp4',
    });

    this.axiosInstance.post(`${this.baseUrl}/identification/face${this.notificationUrl}`, form, {
      headers: form.getHeaders(),
    }).then((httpResponse) => {
      callback(httpResponse.data);
    }).catch((error) => {
      if (error.response && error.response.data)
        callback(error.response.data);
      else
        callback({ status: 0, responseCode: 'FAIL', message: error.message });
    });
  };

  this.faceIdentificationByUrl = (options, callback) => {
    const form = new FormData();
    form.append('groupId', options.groupId);
    form.append('fileUrl', options.videoFileURL);

    this.axiosInstance.post(`${this.baseUrl}/identification/face/byUrl${this.notificationUrl}`, form, {
      headers: form.getHeaders(),
    }).then((httpResponse) => {
      callback(httpResponse.data);
    }).catch((error) => {
      if (error.response && error.response.data)
        callback(error.response.data);
      else
        callback({ status: 0, responseCode: 'FAIL', message: error.message });
    });
  };

  this.photoIdentification = (options, callback) => {
    if (!checkFileExists(options.photoFilePath, callback)) {
      return;
    }

    const form = new FormData();
    form.append('groupId', options.groupId);
    form.append('photo', fs.createReadStream(options.photoFilePath));

    this.axiosInstance.post(`${this.baseUrl}/identification/face${this.notificationUrl}`, form, {
      headers: form.getHeaders(),
    }).then((httpResponse) => {
      callback(httpResponse.data);
    }).catch((error) => {
      if (error.response && error.response.data)
        callback(error.response.data);
      else
        callback({ status: 0, responseCode: 'FAIL', message: error.message });
    });
  };

  this.videoIdentification = (options, callback) => {
    if (!checkFileExists(options.videoFilePath, callback)) {
      return;
    }

    const form = new FormData();
    form.append('groupId', options.groupId);
    form.append('contentLanguage', options.contentLanguage);
    form.append('phrase', options.phrase ? options.phrase : '');
    form.append('video', fs.createReadStream(options.videoFilePath), {
      filename: 'video.mp4',
    });

    this.axiosInstance.post(`${this.baseUrl}/identification/video${this.notificationUrl}`, form, {
      headers: form.getHeaders(),
    }).then((httpResponse) => {
      callback(httpResponse.data);
    }).catch((error) => {
      if (error.response && error.response.data)
        callback(error.response.data);
      else
        callback({ status: 0, responseCode: 'FAIL', message: error.message });
    });
  };

  this.videoIdentificationByUrl = (options, callback) => {
    const form = new FormData();
    form.append('groupId', options.groupId);
    form.append('contentLanguage', options.contentLanguage);
    form.append('phrase', options.phrase ? options.phrase : '');
    form.append('fileUrl', options.videoFileURL);

    this.axiosInstance.post(`${this.baseUrl}/identification/video/byUrl${this.notificationUrl}`, form, {
      headers: form.getHeaders(),
    }).then((httpResponse) => {
      callback(httpResponse.data);
    }).catch((error) => {
      if (error.response && error.response.data)
        callback(error.response.data);
      else
        callback({ status: 0, responseCode: 'FAIL', message: error.message });
    });
  };

  this.createUserToken = (options, callback) => {
    if (options.userId === undefined) {
      return callback({ status: 400, responseCode: 'FAIL', message: 'Missing userId argument' });
    }
    if (options.secondsToTimeout !== undefined && typeof options.secondsToTimeout !== 'number') {
      return callback({ status: 400, responseCode: 'FAIL', message: 'secondsToTimeout must be a numeric value' });
    }

    const url = options.secondsToTimeout === undefined
      ? `${this.baseUrl}/users/${encodeURIComponent(options.userId)}/token`
      : `${this.baseUrl}/users/${encodeURIComponent(options.userId)}/token?timeOut=${options.secondsToTimeout}`;

    this.axiosInstance.post(url)
      .then((httpResponse) => {
        callback(httpResponse.data);
      }).catch((error) => {
        if (error.response && error.response.data)
          callback(error.response.data);
        else
          callback({ status: 0, responseCode: 'FAIL', message: error.message });
      });
  };

  this.expireUserTokens = (options, callback) => {
    if (options.userId === undefined) {
      return callback({ status: 400, responseCode: 'FAIL', message: 'Missing userId argument' });
    }
    this.axiosInstance.post(`${this.baseUrl}/users/${encodeURIComponent(options.userId)}/expireTokens`)
      .then((httpResponse) => {
        callback(httpResponse.data);
      }).catch((error) => {
        if (error.response && error.response.data)
          callback(error.response.data);
        else
          callback({ status: 0, responseCode: 'FAIL', message: error.message });
      });
  };
}

module.exports = voiceit3;
