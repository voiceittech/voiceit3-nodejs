const VoiceIt3 = require('./index.js');
const fs = require('fs');
const path = require('path');

const apiKey = process.env.VOICEIT_API_KEY;
const apiToken = process.env.VOICEIT_API_TOKEN;
if (!apiKey || !apiToken) { console.log("Set VOICEIT_API_KEY and VOICEIT_API_TOKEN"); process.exit(1); }

const vi = new VoiceIt3(apiKey, apiToken);
const phrase = "Never forget tomorrow is a new day";
const td = path.join(__dirname, "test-data");
let errors = 0;
let step = 0;
const total = 7;

function check(name, res) {
  if (res instanceof Error) { console.log(`FAIL: ${name} (${res.message})`); errors++; step++; return {}; }
  const r = (typeof res === 'string') ? JSON.parse(res) : res;
  const code = r.responseCode || '?';
  if (code === 'SUCC') { console.log(`PASS: ${name} (${code})`); }
  else { console.log(`FAIL: ${name} (${code}) ${r.message || ''}`); errors++; }
  step++;
  return r;
}

vi.createUser(function(res) {
  const r = check("CreateUser", res);
  const userId = r.userId;

  // Enroll 3 videos sequentially
  vi.createVideoEnrollment({userId, contentLanguage:"en-US", phrase, videoFilePath: path.join(td, "videoEnrollmentA1.mov")}, function(res) {
    check("VideoEnrollment1", res);
    vi.createVideoEnrollment({userId, contentLanguage:"en-US", phrase, videoFilePath: path.join(td,"videoEnrollmentA2.mov")}, function(res) {
      check("VideoEnrollment2", res);
      vi.createVideoEnrollment({userId, contentLanguage:"en-US", phrase, videoFilePath: path.join(td,"videoEnrollmentA3.mov")}, function(res) {
        check("VideoEnrollment3", res);

        // Verify
        vi.videoVerification({userId, contentLanguage:"en-US", phrase, videoFilePath: path.join(td,"videoVerificationA1.mov")}, function(res) {
          const vr = check("VideoVerification", res);
          console.log(`  Voice: ${vr.voiceConfidence}, Face: ${vr.faceConfidence}`);

          // Cleanup
          vi.deleteAllEnrollments({userId}, function(res) {
            check("DeleteEnrollments", res);
            vi.deleteUser({userId}, function(res) {
              check("DeleteUser", res);
              if (errors > 0) { console.log(`\n${errors} FAILURES`); process.exit(1); }
              console.log("\nAll tests passed!");
              process.exit(0);
            });
          });
        });
      });
    });
  });
});

setTimeout(function() { console.log("TIMEOUT"); process.exit(1); }, 120000);
