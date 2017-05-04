'use strict';

const monster = require('../../models/monster');


exports.search = (name) =>

    new Promise((resolve,reject) => {

        monster.find({name: name})

        .then(monsters => {

            if (monsters.length == 0) {

                reject({ status: 404, message: 'Monsters Not Found !' });

            } else {
        var n = new monster({});
        n = monsters[0]
                resolve({n})
                //resolve({ status: 200, message: monsters});

            }
        })

        .catch(err => reject({ status: 500, message: 'Internal Server Error !' }));

    });
