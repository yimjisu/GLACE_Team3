const admin = require("firebase-admin");
var serviceAccount = require('../../../glace-team3-0b77bc131cb9.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://glace-team3-default-rtdb.firebaseio.com/"
});

const database = admin.database();

module.exports = database;