'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = mongoose.Schema({

    name             : String,
    email            : String,
    hashed_password    : String,
    created_at        : String,
    temp_password    : String,
    temp_password_time: String,
    landsDiscovered: String//список ячеек в которых он был (открытых)


});

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/node-login');

module.exports = mongoose.model('user', userSchema);

//mongoose.connect('mongodb://alfaneos:C2M3IT7olhl6TkqzTZN1EKJOqwA6l0n4nElcz5739WyqVsoAcvVuWMs4thkM9ZrlWzObyxG9csN86bEGLxsw0g==@alfaneos.documents.azure.com:10250/?ssl=true');
