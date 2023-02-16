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

//Ruta de prueba
// router.get('/test', (req, res) => {
//     res.send('Test ruta usuario');
// });

//Ruta para agregar usuario

//body-parser
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post("/agregar", (req, res) => {
    const nuevoUsuario = new usuarioModelo({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        idusuario: req.body.idusuario
    });
    nuevoUsuario.save()
        .then((data) => {
            res.alert("Usuario agregado");
            console.log(data)
        })
        .catch((err) => {
            res.send(err);
        });
});

module.exports = router;