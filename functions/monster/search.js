'use strict';

const monster = require('../../models/monster');


exports.search = (level) =>

    new Promise((resolve,reject) => {

        monster.find({level: level})

        .then(monsters => {

            if (monsters.length == 0) {

                reject({ status: 404, message: 'Monsters Not Found !' });

            } else {

                resolve({ status: 200, message: monsters });

            }
        })

        .catch(err => reject({ status: 500, message: 'Internal Server Error !' }));

    });
