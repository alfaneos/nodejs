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
              var thisDate=new Date();
              var dif=((thisDate-ourhero.logonDate)/1000)/60;
              if(dif<1){resolve({dif});}
            if(ourhero.lastEnemy.characteristics[0]==0){
              var level1=heroes[0].level[0];
              monster.find({level:level1}, function(err, monsters){
                if(err){reject({status: 500, message: 'error'});}
                  ourhero=heroes[0];
                  var rand =Math.floor(Math.random() * (monsters.length));
                  var name1 = monsters[rand].idnumber;
                  var level1 = monsters[rand].level;
                  var class11 = monsters[rand].class1;
                  var characteristics1 = monsters[rand].characteristics;
                  var stats1 = monsters[rand].stats;
                  var abilities1 = monsters[rand].abilities;
                  var newDate = new Date();
                  var fightTime=0;

                  while((dif>=1)||(characteristics1[0]>=1)||(ourhero.currentCharacteristics[0]>1)){
                      if(ourhero.lastStrike==true){
                          ourhero.currentCharacteristics[0]-=parseInt(stats1[3]);

                      }
                      else{
                        characteristics1[0]-=parseInt(ourhero.currentStats[3]);
                      }
                      fightTime++;
                      ourhero.lastStrike=!ourhero.lastStrike;
                      dif--;
                  }
                  if(characteristics1[0]<1){   var expMod = ourhero.lastEnemy.level-ourhero.level[0];
                      if(expMod>0){expMod=1+expMod/ourhero.level[0];}
                      else if(expMod<0){expMod=1-expMod/ourhero.level[0];}
                      else if(expMod=0){expMod=1;}
                      ourhero.level[1]=ourhero.level[1]+(ourhero.level[0]*8)*expMod;}
                      if(dif>10){
                            var additionalExp = (dif/fightTime)*ourhero.level[0]*2;
                            ourhero.level[1]+=additionalExp;
                      }


                  var em = ourhero.email;

                hero.findOneAndUpdate({email:em}, {$set:{level:ourhero.level, currentCharacteristics:ourhero.currentCharacteristics,
                    lastEnemy:{name: name1,level:level1, class1:class11, characteristics:characteristics1,
                stats:stats1, abilities:abilities1}}, logonDate:newDate}, {upsert:true}, function(err, doc){
                  if(err){reject({status:500, message: err});}
                  else{resolve({ourhero});}
                });

              });

        }else{
                while((dif>0)||(ourhero.lastEnemy.characteristics[0]>0)){
          if(ourhero.lastStrike==true){
                ourhero.currentCharacteristics[0]-=parseInt(ourhero.lastEnemy.stats[3]);
                        }
          else{

                ourhero.lastEnemy.characteristics[0] -=parseInt(ourhero.currentStats[3]);
                if(ourhero.lastEnemy.characteristics[0]<1){
                    ourhero.lastEnemy.characteristics[0]=0;
                    }
                    var expMod = ourhero.lastEnemy.level-ourhero.level[0];
                if(expMod>0){expMod=1+expMod/ourhero.level[0];}
                else if(expMod<0){expMod=1-expMod/ourhero.level[0];}
                else if(expMod=0){expMod=1;}
                    ourhero.level[1]=ourhero.level[1]+(ourhero.level[0]*8)*expMod;
          }
                dif--;
                }if(dif>10){
                    var modifier=1;
                    while(dif>1){
                        modifier+=0.1;
                        dif/=5;
                    }
                    if(modifier>0){ourhero.level[0]=ourhero.level[0]*modifier;}
                }

                var email1=ourhero.email;
                    hero.findOneAndUpdate({email:email1}, {$set:{lastEnemy:ourhero.lastEnemy,
                        currentCharacteristics:ourhero.currentCharacteristics, logonDate:thisDate}},
                        {upsert:true}, function(err, doc){
                        if(err){reject({status:500, message: ourhero});}
                        else{resolve({ourhero});}
                });

       }
     })

        .catch(err => reject({ status: 500, message: err+'as' }));

    });
