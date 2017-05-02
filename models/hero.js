'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const heroSchema = mongoose.Schema({


    email            : String,
    name              : String,
    level : [Number],
    class : [String],
    maxCharacteristics : [Number],
    currentCharacteristics : [Number],
    abilities : [Number],
    inventorysize : Number,
    inventory : [Number],
    currentCoordinates : [Number],
    destinationCoordinates: [Number],
    logonDate: Date,
    lastEnemy: [Number],
    lastStrike: Boolean

});

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/node-login');

module.exports = mongoose.model('hero', heroSchema);

//mongoose.connect('mongodb://alfaneos:C2M3IT7olhl6TkqzTZN1EKJOqwA6l0n4nElcz5739WyqVsoAcvVuWMs4thkM9ZrlWzObyxG9csN86bEGLxsw0g==@alfaneos.documents.azure.com:10250/?ssl=true');
