const admin = require('firebase-admin');
const serviceAccount = require('./firebaseAdmin.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://tu-proyecto.firebaseio.com', // Reemplaza con la URL de tu base de datos Firebase Realtime Database
});

module.exports = admin;