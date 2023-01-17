import admin from '../config/firebase.js'

class Middleware {
  async decodeToken(req, res, next) {
    const token = req.headers.authorization.split(' ')[1];
    try {
      const decodeValue = await admin.auth().verifyIdToken(token);
      if (decodeValue) {
        return next();
      }
      return res.json({ message: 'Unauthorized' });
    } catch (e) {
      console.log(e)
      return res.json({ message: 'Internal Error' });
    }
  };
  async getUser(req) {
    const token = req.headers.authorization.split(' ')[1];
    return await admin.auth().verifyIdToken(token);
  }
}

export default new Middleware();
