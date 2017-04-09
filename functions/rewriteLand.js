'use strict';

const lands = require('../models/lands');


exports.rewriteLand = (newalfaX, newalfaY, newtype, newbeta) =>

    new Promise((resolve,reject) => {


        const newLands = new lands({

            alfaX: newalfaX,
            alfaY: newalfaY,
            type: newtype,
            beta: newbeta

        });



        lands.findOneAndUpdate({alfaX: newalfaX, alfaY: newalfaY}, {$set:{type: newtype, beta: newbeta}},{upsert: true},function(err, doc){
            if(err){
reject({ status: 409, message: 'Some Errorr !' });
            }

            resolve({ status: 201, message: 'Land Registered Sucessfully !' });
        });
    });
