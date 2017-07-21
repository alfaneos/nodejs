'use strict';



var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');


var Schema = mongoose.Schema;
var connection = mongoose.createConnection('mongodb://localhost:27017/node-login');
autoIncrement.initialize(connection);
var monsterSchema = mongoose.Schema({



    name              : String,
    idnumber: Number,
    level : Number,//уровень, опыт
    class1 : [Number],//список классов
    characteristics : [Number],//здоровье, выносливость, мана
    stats: [Number],//телосложение, выносливость, чакры, сила, ловкость
    inventory : [Number],//список вещей
    abilities : [Number]//список способностей


});

monsterSchema.plugin(autoIncrement.plugin, 'Monster');
var Monster = connection.model('Monster', monsterSchema);


mongoose.Promise = global.Promise;


module.exports = mongoose.model('monster', monsterSchema);

//mongoose.connect('mongodb://alfaneos:C2M3IT7olhl6TkqzTZN1EKJOqwA6l0n4nElcz5739WyqVsoAcvVuWMs4thkM9ZrlWzObyxG9csN86bEGLxsw0g==@alfaneos.documents.azure.com:10250/?ssl=true');
