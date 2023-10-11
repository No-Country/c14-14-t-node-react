const { Router } = require('express');
const postUsers = require('../controllers/postUsers.js');

const router = Router();

//Ruta para almcenar datos del usuario
router.post('/users', postUsers);

module.exports = router;