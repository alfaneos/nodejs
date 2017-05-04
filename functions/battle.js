'use strict';

const hero = require('../models/hero');
const monster = require('../models/monster');
const findMonster=require('../functions/monster/search');

exports.getBattle = email =>

    new Promise((resolve,reject) => {

        hero.find({email:email})
        .then(heroes =>{
          if (heroes.length == 0) {
              reject({ status: 404, message: 'Hero Not Found !' });
          } else {
              return heroes;
          }
        })
        .then(heroes =>{
            var ourhero=new hero({});
              ourhero=heroes[0];
            if(ourhero.lastEnemy[3][0]==0){
              var level1=heroes[0].level[0];
              monster.find({level:level1}, function(err, monsters){
                if(err){reject({status: 500, message: 'error'});}

                  ourhero=heroes[0];

                  var rand =Math.floor(Math.random() * (monsters.length));
                  ourhero.lastEnemy[0]=monsters[rand].name;
                  ourhero.lastEnemy[1]=monsters[rand].level;
                  ourhero.lastEnemy[2]=monsters[rand].class1;
                  ourhero.lastEnemy[3]=monsters[rand].characteristics;
                  ourhero.lastEnemy[4]=monsters[rand].stats;
                  ourhero.lastEnemy[5]=monsters[rand].abilities;
                  var em = ourhero.email;


                hero.findOneAndUpdate({email:em}, {$set:{lastEnemy:ourhero.lastEnemy}}, {upsert:true}, function(err, doc){
                  if(err){reject({status:500, message: err});}
                  else{resolve({ourhero});}
                });

              });

        }else{
          if(ourhero.lastStrike==true){
            var email1=ourhero.email;
            var hp=ourhero.currentCharacteristics;
            hp[0] =ourhero.currentCharacteristics[0]-ourhero.lastEnemy[4][3];
            hero.findOneAndUpdate({email:email1}, {$set:{currentCharacteristics:hp}}, {upsert:true}, function(err, doc){
              if(err){reject({status:500, message: err});}
              else{resolve({ourhero});}
            });
          }
    
       }
     })

        .catch(err => reject({ status: 500, message: err+'as' }));

    });
