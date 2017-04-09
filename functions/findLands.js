'use strict';

const lands = require('../models/lands');


exports.findLands = (alfaX, alfaY) =>

    new Promise((resolve,reject) => {

        lands.find({alfaX: alfaX, alfaY:alfaY})

        .then(lands => {

            if (lands.length == 0) {

                reject({ status: 404, message: 'Land Not Found !' });

            } else {

                return lands[0];

            }
        })

        .then(lands => {

            const beta = lands.beta;
            const type = lands.type;

            if (beta) {

                resolve({ status: 200, message: type+","+beta});

            } else {

                reject({ status: 401, message: 'Invalid data' });
            }
        })

        .catch(err => reject({ status: 500, message: 'Internal Server Error !' }));

    });
