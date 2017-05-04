'use strict';

const hero = require('../../models/hero');


exports.createHero = (name, email, class1, inventorysize, inventory, abilities, level,
   maxcharacteristics, currentharacteristics, maxstats, currentstats,
   currentcoordinates, destinationcoordinates, logonDate, lastenemy, laststrike) =>

    new Promise((resolve,reject) => {



        const newHero = new hero({

            email: email,
            name: name,
            level: level,
            inventorysize: inventorysize,
            inventory: inventory,
            destinationCoordinates: destinationcoordinates,
            logonDate: logonDate,
            currentCoordinates: currentcoordinates,
            maxCharacteristics: maxcharacteristics,
            currentCharacteristics: currentharacteristics,
            maxStats: maxstats,
            currentStats: currentstats,
            lastEnemy: lastenemy,
            lastStrike: laststrike,
            class1: class1,

        });

        newHero.save()

        .then(() => resolve({ status: 201, message: 'Hero Registered Sucessfully !' }))

        .catch(err => {

            if (err.code == 11000) {

                reject({ status: 409, message: 'Hero Already Registered !' });

            } else {

                reject({ status: 500, message: 'Internal Server Error !'+err });
            }
        });
    });
