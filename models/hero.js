'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const heroSchema = mongoose.Schema({


    email            : String,
    name              : String,
    level : [Number],//уровень, опыт
    class : [String],//список классов
    maxCharacteristics : [Number],//максимальные характеристики: ьелосложение, выносливость, чакры, сила, ловкость
    currentCharacteristics : [Number],//текущие характеристики
    abilities : [Number],//список способностей
    inventorysize : Number,//размер массива
    inventory : [Number],//инвентарь
    currentCoordinates : [Number],//текущие координаты: альфаХ алфаУ бетаХ бетаУ
    destinationCoordinates: [Number],//координаты направления
    logonDate: Date,//дата последних изменений
    lastEnemy: [Number],//массив последнего противника: имя, модификатор, текущее здоровье
    lastStrike: Boolean//бил ли герой последним?

});

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/node-login');

module.exports = mongoose.model('hero', heroSchema);

//mongoose.connect('mongodb://alfaneos:C2M3IT7olhl6TkqzTZN1EKJOqwA6l0n4nElcz5739WyqVsoAcvVuWMs4thkM9ZrlWzObyxG9csN86bEGLxsw0g==@alfaneos.documents.azure.com:10250/?ssl=true');
