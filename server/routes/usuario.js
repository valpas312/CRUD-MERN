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

//body-parser
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

//Ruta para agregar usuario
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

//Ruta para obtener lista de usuarios
router.get("/lista", (req, res) => {
    usuarioModelo.find()
        .then((data) => {
            res.send(data);
            console.log(data)
        })
        .catch((err) => {
            res.send(err);
        });
});

//Ruta para obtener usuario por id
router.post("/editar", (req, res) => {
    usuarioModelo.find({ idusuario: req.body.idusuario })
        .then((data) => {
            res.send(data);
            console.log(data)
        })
        .catch((err) => {
            res.send(err);
        });
});

//Ruta para agregar usuario
router.post("/actualizar", (req, res) => {
    usuarioModelo.updateOne({ idusuario: req.body.idusuario }, {
        $set: {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }
    })
        .then((data) => {
            res.send("Usuario actualizado");
            console.log(data)
        })
        .catch((err) => {
            res.send("Error al actualizar usuario");
            console.log(err);
        });
});

//Ruta para eliminar usuario
router.post("/eliminar", (req, res) => {
    usuarioModelo.deleteOne({ idusuario: req.body.idusuario })
        .then((data) => {
            res.send("Usuario eliminado");
            console.log(data)
        })
        .catch((err) => {
            res.send("Error al eliminar usuario");
            console.log(err);
        });
});

module.exports = router;