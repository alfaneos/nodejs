'use strict';

const monster = require('../../models/monster');


exports.createMonster = (name, level, class1, characteristics, inventory, abilities) =>

    new Promise((resolve,reject) => {



        const newMonster = new monster({

            name: name,
            level: level,
            class1: class1,
            characteristics: characteristics,
            inventory: inventory,
            abilities: abilities
        });

        newMonster.save()

        .then(() => resolve({ status: 201, message: 'Monster Registered Sucessfully !' }))

        .catch(err => {

            if (err.code == 11000) {

                reject({ status: 409, message: 'Monster Already Registered !' });

            } else {

                reject({ status: 500, message: 'Internal Server Error !'+err });
            }
        });
    });
