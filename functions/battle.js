'use strict';

const hero = require('../models/hero');
const monster = require('../models/monster');

exports.getBattle = email =>

    new Promise((resolve,reject) => {

        hero.find({ email: email })

        .then(heroes =>
            var currentMonster=[];
            currentMonster=heroes[0].lastEnemy;
            if(currentMonster[2]!=0){
              const newMonster = findEnemy(heroes[0].)
            }


          resolve(heroes[0]))

        .catch(err => reject({ status: 500, message: 'Internal Server Error !' }))

    });
    function findEnemy(level) {
      monster.findOne({ level: level }, function (err, person) {
  if (err) return handleError(err);
  return person; // Space Ghost is a talk show host.
});
  }
