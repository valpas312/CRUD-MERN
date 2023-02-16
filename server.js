const express = require('express');
const app = express();

//Conexion db
const db = require('./db');

//Rutas y modelu de usuario
const rutausuario = require('./routes/usuario');
app.use('/api/usuario', rutausuario);

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});