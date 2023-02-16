const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

const schema = mongoose.Schema

const usuarioSchema = new schema({
    name: String,
    email: String,
    password: String,
    idusuario: String
})

const usuarioModelo = mongoose.model('usuario', usuarioSchema)

router.get('/test', (req, res) => {
    res.send('Test ruta usuario');
});

module.exports = router;