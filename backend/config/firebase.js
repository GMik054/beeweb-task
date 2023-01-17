import admin from 'firebase-admin'
import config from '../service-account-credentials.js'

admin.initializeApp({
  credential: admin.credential.cert(config)
});

export default admin;
