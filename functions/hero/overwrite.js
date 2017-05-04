'use strict';

const hero = require('../../models/hero');


exports.rewriteHero = (newhero) =>

    new Promise((resolve,reject) => {

      var email= newhero.email;
      var level = newhero.level;
      var inventorysize= newhero.inventorysize;
      var inventory= newhero.inventory;
      var destinationCoordinates= newhero.destinationcoordinates;
      var logonDate= newhero.logonDate;
      var currentCoordinates= newhero.currentcoordinates;
      var maxCharacteristics= newhero.maxcharacteristics;
      var currentCharacteristics= newhero.currentharacteristics;
      var maxStats=newhero.maxstats;
      var currentStats=newhero.currentstats;
      var lastEnemy= newhero.lastenemy;
      var lastStrike= newhero.laststrike;
      var class1= newhero.class1;

var hh=newhero;



        hero.findOneAndUpdate({email:email}, {$set:{level: level, inventorysize: inventorysize, inventory: inventory,
        destinationCoordinates: destinationCoordinates, logonDate: logonDate, currentCoordinates:currentCoordinates,
      maxCharacteristics: maxCharacteristics, currentCharacteristics: currentCharacteristics,
      maxStats:maxStats, currentStats: currentStats, lastEnemy: lastEnemy,
    lastStrike: lastStrike, class1: class1}},{upsert: true},function(err, doc){
            if(err){
reject({ status: 409, message: 'Some Errorr !'+hh });
            }

            resolve({ status: 201, message: 'Hero Changed Sucessfully !' });
        });
    });
