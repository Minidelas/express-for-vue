'use strict'
// Cargamos el módulo de mongoose
const mongoose = require('mongoose');
// Usaremos los esquemas
const Schema = mongoose.Schema;
// Creamos el objeto del esquema y sus atributos
const UserSchema = Schema({
    name: String,
    lastname: String,
    birthdate: Date
});

// Exportamos el modelo para usarlo en otros ficheros
module.exports = mongoose.model('users', UserSchema);
