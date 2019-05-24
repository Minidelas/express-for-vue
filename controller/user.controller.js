'use strict'
// Cargamos los modelos para usarlos posteriormente
var User = require('../models/user.model');

// Conseguir datos 
function getUsers(req, res, next) {
    //buscar un documento por un  id
    User.find({}, (err, users) => {
        if(err) return res.status(500).send({ message: err });
        if(!users) return res.status(404).send({ message: 'no users found' });
        return res.status(200).send({
            users: users
        });
    });
}

// Conseguir datos de un usuario
function getUser(req, res) {
    var userId = req.params.id;
    //buscar un documento por un  id
    User.findById(userId, (err, user) => {
        if (err) return res.status(500).send({ message: 'Error en la petición' });
        if (!user) return res.status(404).send({ message: 'EL usuario no existe' });
        return res.status(200).send({
            user: user
        });
    });
}

function saveUser(req, res, next) {
    
    const names = ['Aaron', 'Desiree', 'Alicia', 'Francisco', 'Diego'];
    const lastnames = ['Alcazar', 'Benut', 'Chartas', 'Gómez', 'Filett'];
    
    for (let i = 0; i < 50; i++) {
        const user = new User({
            name: names[Math.floor(Math.random() * 4) + 1],
            lastname: lastnames[Math.floor(Math.random() * 4) + 1],
            birthdate: new Date()
        });
        
        // user.save((err, result) => {
        //     res.io.emit('userAdded');
        //     console.log(err);
        //     console.log(result);
        // });
    }
    
    // if (err) return res.status(500).send({ message: err });
    return res.status(200).send({
        message: "User save successfuly",
    });


}

function searchUser(req, res, next) {
    const searchData = {};

    if (req.query.name && req.query.name !== '') {
        searchData.name = { $regex: req.query.name, $options: 'i' }
    }

    User.find(searchData, (err, users) => {
        if (err) return res.status(500).send({ message: err });
        if (!users) return res.status(404).send({ message: 'no users found' });
        return res.status(200).send({
            users: users
        });
    });
}

module.exports = {
    getUsers:   getUsers,
    getUser:    getUser,
    saveUser:   saveUser,
    searchUser: searchUser
}
