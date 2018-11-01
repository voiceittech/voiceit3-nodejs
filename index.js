const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const BASE_URL = 'https://api.voiceit.io';

function checkFileExists(filePath, callback) {
  if (!fs.existsSync(filePath)) {
    callback(Error(`File Path ${filePath} Does Not Exist`));
    return false;
  }
  return true;
}

function VoiceIt2(apk, tok) {

  this.axiosInstance = axios.create({
    auth: {
      username: apk,
      password: tok,
    },
    headers: {
      platformId: '31',
    },
  });

  /* User API Calls */

  this.getAllUsers = (callback) => {
    this.axiosInstance.get(`${BASE_URL}/users`)
      .then((httpResponse) => {
        callback(httpResponse.data);
      }).catch((error) => {
        callback(error.response.data);
      });
  };

  this.getPhrases = (options, callback) => {
    this.axiosInstance.get(`${BASE_URL}/phrases/${options.contentLanguage}`)
      .then((httpResponse) => {
        callback(httpResponse.data);
      }).catch((error) => {
        callback(error.response.data);
      });
  };

  this.createUser = (callback) => {
    this.axiosInstance.post(`${BASE_URL}/users`)
      .then((httpResponse) => {
        callback(httpResponse.data);
      }).catch((error) => {
        callback(error.response.data);
      });
  };

  this.checkUserExists = (options, callback) => {
    this.axiosInstance.get(`${BASE_URL}/users/${options.userId}`)
      .then((httpResponse) => {
        callback(httpResponse.data);
      }).catch((error) => {
        callback(error.response.data);
      });
  };

  this.deleteUser = (options, callback) => {
    this.axiosInstance.delete(`${BASE_URL}/users/${options.userId}`)
      .then((httpResponse) => {
        callback(httpResponse.data);
      }).catch((error) => {
        callback(error.response.data);
      });
  };

  this.getGroupsForUser = (options, callback) => {
    this.axiosInstance.get(`${BASE_URL}/users/${options.userId}/groups`)
      .then((httpResponse) => {
        callback(httpResponse.data);
      }).catch((error) => {
        callback(error.response.data);
      });
  };

  /* Group API Calls */

  this.getAllGroups = (callback) => {
    this.axiosInstance.get(`${BASE_URL}/groups`)
      .then((httpResponse) => {
        callback(httpResponse.data);
      }).catch((error) => {
        callback(error.response.data);
      });
  };

  this.getGroup = (options, callback) => {
    this.axiosInstance.get(`${BASE_URL}/groups/${options.groupId}`)
      .then((httpResponse) => {
        callback(httpResponse.data);
      }).catch((error) => {
        callback(error.response.data);
      });
  };

  this.checkGroupExists = (options, callback) => {
    this.axiosInstance.get(`${BASE_URL}/groups/${options.groupId}/exists`)
      .then((httpResponse) => {
        callback(httpResponse.data);
      }).catch((error) => {
        callback(error.response.data);
      });
  };

  this.createGroup = (options = {}, callback) => {
    const form = new FormData();
    form.append('description', (options.description != null) ? options.description : '');

    this.axiosInstance.post(`${BASE_URL}/groups`, form, {
      headers: form.getHeaders(),
    }).then((httpResponse) => {
      callback(httpResponse.data);
    }).catch((error) => {
      callback(error.response.data);
    });
  };

  this.addUserToGroup = (options, callback) => {
    const form = new FormData();
    form.append('userId', options.userId);
    form.append('groupId', options.groupId);

    this.axiosInstance.put(`${BASE_URL}/groups/addUser`, form, {
      headers: form.getHeaders(),
    }).then((httpResponse) => {
      callback(httpResponse.data);
    }).catch((error) => {
      callback(error.response.data);
    });
  };

  this.removeUserFromGroup = (options, callback) => {
    const form = new FormData();
    form.append('userId', options.userId);
    form.append('groupId', options.groupId);

    this.axiosInstance.put(`${BASE_URL}/groups/removeUser`, form, {
      headers: form.getHeaders(),
    }).then((httpResponse) => {
      callback(httpResponse.data);
    }).catch((error) => {
      callback(error.response.data);
    });
  };

  this.deleteGroup = (options, callback) => {
    this.axiosInstance.delete(`${BASE_URL}/groups/${options.groupId}`)
      .then((httpResponse) => {
        callback(httpResponse.data);
      }).catch((error) => {
        callback(error.response.data);
      });
  };

  /* Enrollment API Calls */

  this.getAllVoiceEnrollments = (options, callback) => {
    this.axiosInstance.get(`${BASE_URL}/enrollments/voice/${options.userId}`)
      .then((httpResponse) => {
        callback(httpResponse.data);
      }).catch((error) => {
        callback(error.response.data);
      });
  };

  this.getAllFaceEnrollments = (options, callback) => {
    this.axiosInstance.get(`${BASE_URL}/enrollments/face/${options.userId}`)
      .then((httpResponse) => {
        callback(httpResponse.data);
      }).catch((error) => {
        callback(error.response.data);
      });
  };

  this.getAllVideoEnrollments = (options, callback) => {
    this.axiosInstance.get(`${BASE_URL}/enrollments/video/${options.userId}`)
      .then((httpResponse) => {
        callback(httpResponse.data);
      }).catch((error) => {
        callback(error.response.data);
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

    this.axiosInstance.post(`${BASE_URL}/enrollments/voice`, form, {
      headers: form.getHeaders(),
    }).then((httpResponse) => {
      callback(httpResponse.data);
    }).catch((error) => {
      callback(error.response.data);
    });
  };

  this.createVoiceEnrollmentByUrl = (options, callback) => {
    const form = new FormData();
    form.append('userId', options.userId);
    form.append('contentLanguage', options.contentLanguage);
    form.append('phrase', options.phrase ? options.phrase : '');
    form.append('fileUrl', options.audioFileURL);

    this.axiosInstance.post(`${BASE_URL}/enrollments/voice/byUrl`, form, {
      headers: form.getHeaders(),
    }).then((httpResponse) => {
      callback(httpResponse.data);
    }).catch((error) => {
      callback(error.response.data);
    });
  };

  this.createFaceEnrollment = (options, callback) => {
    if (!checkFileExists(options.videoFilePath, callback)) {
      return;
    }

    const form = new FormData();
    form.append('userId', options.userId);
    form.append('video', fs.createReadStream(options.videoFilePath));

    this.axiosInstance.post(`${BASE_URL}/enrollments/face`, form, {
      headers: form.getHeaders(),
    }).then((httpResponse) => {
      callback(httpResponse.data);
    }).catch((error) => {
      callback(error.response.data);
    });
  };

  this.createFaceEnrollmentByUrl = (options, callback) => {
    const form = new FormData();
    form.append('userId', options.userId);
    form.append('fileUrl', options.videoFileURL);

    this.axiosInstance.post(`${BASE_URL}/enrollments/face/byUrl`, form, {
      headers: form.getHeaders(),
    }).then((httpResponse) => {
      callback(httpResponse.data);
    }).catch((error) => {
      callback(error.response.data);
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

    this.axiosInstance.post(`${BASE_URL}/enrollments/video`, form, {
      headers: form.getHeaders(),
    }).then((httpResponse) => {
      callback(httpResponse.data);
    }).catch((error) => {
      callback(error.response.data);
    });
  };

  this.createVideoEnrollmentByUrl = (options, callback) => {
    const form = new FormData();
    form.append('userId', options.userId);
    form.append('contentLanguage', options.contentLanguage);
    form.append('phrase', options.phrase ? options.phrase : '');
    form.append('fileUrl', options.videoFileURL);

    this.axiosInstance.post(`${BASE_URL}/enrollments/video/byUrl`, form, {
      headers: form.getHeaders(),
    }).then((httpResponse) => {
      callback(httpResponse.data);
    }).catch((error) => {
      callback(error.response.data);
    });
  };

  this.deleteFaceEnrollment = (options, callback) => {
    this.axiosInstance.delete(`${BASE_URL}/enrollments/face/${options.userId}/${options.faceEnrollmentId}`)
      .then((httpResponse) => {
        callback(httpResponse.data);
      }).catch((error) => {
        callback(error.response.data);
      });
  };

  this.deleteVoiceEnrollment = (options, callback) => {
    this.axiosInstance.delete(`${BASE_URL}/enrollments/voice/${options.userId}/${options.voiceEnrollmentId}`)
      .then((httpResponse) => {
        callback(httpResponse.data);
      }).catch((error) => {
        callback(error.response.data);
      });
  };

  this.deleteVideoEnrollment = (options, callback) => {
    this.axiosInstance.delete(`${BASE_URL}/enrollments/video/${options.userId}/${options.videoEnrollmentId}`)
      .then((httpResponse) => {
        callback(httpResponse.data);
      }).catch((error) => {
        callback(error.response.data);
      });
  };

  this.deleteAllFaceEnrollments = (options, callback) => {
    this.axiosInstance.delete(`${BASE_URL}/enrollments/${options.userId}/face`)
      .then((httpResponse) => {
        callback(httpResponse.data);
      }).catch((error) => {
        callback(error.response.data);
      });
  };

  this.deleteAllVoiceEnrollments = (options, callback) => {
    this.axiosInstance.delete(`${BASE_URL}/enrollments/${options.userId}/voice`)
      .then((httpResponse) => {
        callback(httpResponse.data);
      }).catch((error) => {
        callback(error.response.data);
      });
  };

  this.deleteAllVideoEnrollments = (options, callback) => {
    this.axiosInstance.delete(`${BASE_URL}/enrollments/${options.userId}/video`)
      .then((httpResponse) => {
        callback(httpResponse.data);
      }).catch((error) => {
        callback(error.response.data);
      });
  };

  this.deleteAllEnrollments = (options, callback) => {
    this.axiosInstance.delete(`${BASE_URL}/enrollments/${options.userId}/all`)
      .then((httpResponse) => {
        callback(httpResponse.data);
      }).catch((error) => {
        callback(error.response.data);
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

    this.axiosInstance.post(`${BASE_URL}/verification/voice`, form, {
      headers: form.getHeaders(),
    }).then((httpResponse) => {
      callback(httpResponse.data);
    }).catch((error) => {
      callback(error.response.data);
    });
  };

  this.voiceVerificationByUrl = (options, callback) => {
    const form = new FormData();
    form.append('userId', options.userId);
    form.append('contentLanguage', options.contentLanguage);
    form.append('phrase', options.phrase ? options.phrase : '');
    form.append('fileUrl', options.audioFileURL);

    this.axiosInstance.post(`${BASE_URL}/verification/voice/byUrl`, form, {
      headers: form.getHeaders(),
    }).then((httpResponse) => {
      callback(httpResponse.data);
    }).catch((error) => {
      callback(error.response.data);
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

    this.axiosInstance.post(`${BASE_URL}/verification/face`, form, {
      headers: form.getHeaders(),
    }).then((httpResponse) => {
      callback(httpResponse.data);
    }).catch((error) => {
      callback(error.response.data);
    });
  };

  this.faceVerificationByUrl = (options, callback) => {
    const form = new FormData();
    form.append('userId', options.userId);
    form.append('userId', options.userId);
    form.append('fileUrl', options.videoFileURL);

    this.axiosInstance.post(`${BASE_URL}/verification/face/byUrl`, form, {
      headers: form.getHeaders(),
    }).then((httpResponse) => {
      callback(httpResponse.data);
    }).catch((error) => {
      callback(error.response.data);
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
    form.append('userId', options.userId);
    form.append('video', fs.createReadStream(options.videoFilePath), {
      filename: 'video.mp4',
    });
    this.axiosInstance.post(`${BASE_URL}/verification/video`, form, {
      headers: form.getHeaders(),
    }).then((httpResponse) => {
      callback(httpResponse.data);
    }).catch((error) => {
      callback(error.response.data);
    });
  };

  this.videoVerificationByUrl = (options, callback) => {
    const form = new FormData();
    form.append('userId', options.userId);
    form.append('contentLanguage', options.contentLanguage);
    form.append('phrase', options.phrase ? options.phrase : '');
    form.append('userId', options.userId);
    form.append('fileUrl', options.videoFileURL);

    this.axiosInstance.post(`${BASE_URL}/verification/video/byUrl`, form, {
      headers: form.getHeaders(),
    }).then((httpResponse) => {
      callback(httpResponse.data);
    }).catch((error) => {
      callback(error.response.data);
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

    this.axiosInstance.post(`${BASE_URL}/identification/voice`, form, {
      headers: form.getHeaders(),
    }).then((httpResponse) => {
      callback(httpResponse.data);
    }).catch((error) => {
      callback(error.response.data);
    });
  };

  this.voiceIdentificationByUrl = (options, callback) => {
    const form = new FormData();
    form.append('groupId', options.groupId);
    form.append('contentLanguage', options.contentLanguage);
    form.append('phrase', options.phrase ? options.phrase : '');
    form.append('fileUrl', options.audioFileURL);

    this.axiosInstance.post(`${BASE_URL}/identification/voice/byUrl`, form, {
      headers: form.getHeaders(),
    }).then((httpResponse) => {
      callback(httpResponse.data);
    }).catch((error) => {
      callback(error.response.data);
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

    this.axiosInstance.post(`${BASE_URL}/identification/face`, form, {
      headers: form.getHeaders(),
    }).then((httpResponse) => {
      callback(httpResponse.data);
    }).catch((error) => {
      callback(error.response.data);
    });
  };

  this.faceIdentificationByUrl = (options, callback) => {
    const form = new FormData();
    form.append('groupId', options.groupId);
    form.append('fileUrl', options.videoFileURL);

    this.axiosInstance.post(`${BASE_URL}/identification/face/byUrl`, form, {
      headers: form.getHeaders(),
    }).then((httpResponse) => {
      callback(httpResponse.data);
    }).catch((error) => {
      callback(error.response.data);
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

    this.axiosInstance.post(`${BASE_URL}/identification/video`, form, {
      headers: form.getHeaders(),
    }).then((httpResponse) => {
      callback(httpResponse.data);
    }).catch((error) => {
      callback(error.response.data);
    });
  };

  this.videoIdentificationByUrl = (options, callback) => {
    const form = new FormData();
    form.append('groupId', options.groupId);
    form.append('contentLanguage', options.contentLanguage);
    form.append('phrase', options.phrase ? options.phrase : '');
    form.append('fileUrl', options.videoFileURL);

    this.axiosInstance.post(`${BASE_URL}/identification/video/byUrl`, form, {
      headers: form.getHeaders(),
    }).then((httpResponse) => {
      callback(httpResponse.data);
    }).catch((error) => {
      callback(error.response.data);
    });
  };
}

module.exports = VoiceIt2;
