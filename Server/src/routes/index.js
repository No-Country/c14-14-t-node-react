const { Router } = require('express');
const postUsers = require('../controllers/postUsers.js');

const router = Router();

//Ruta para almcenar datos del usuario
router.get('/singup', postUsers);

module.exports = router;