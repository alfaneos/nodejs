'use strict';

const lands = require('../models/lands');
const user = require('../models/user');
const constant = require('../constant/constant');

exports.findAllLands = (newemail) =>


    new Promise((resolve,reject) => {

        lands.find({})

        .then(lands => {

            if (lands.length == 0) {

                reject({ status: 404, message: 'Lands Not Found !' });

            } else {

                return lands;

            }
        })

        .then(lands => {
            var arr;

            var filteredArr=[];
          user.find({email:newemail}, function(err, users){

            if(err){
              reject({ status: 500, message: 'Internal Server Error !1' });
            }

            arr=users[0].landsDiscovered;
              var arr2=arr.split(",");

              arr2.forEach(function(value){

                  lands.forEach(function(oneland){
                    if((parseInt(oneland.alfaX)*constant.LANDSHEIGHT+parseInt(oneland.alfaY))==value){
                      filteredArr.push(oneland);
                    }
                  });
                });
resolve(filteredArr);


          });

        })


        .catch(err => reject({ status: 500, message: 'Internal Server Error !' }));

    });





    /*
    arr.forEach(function(value){
        filteredArr.pushlands(landsarr[value]);
      });
*/


/*
new Promise((resolve,reject) => {

    user.find({ email: userid })

    .then(users => {
      var filteredArr=[];
      var landsarr=[];
      var arr=users[0].landsDiscovered;
            lands.find({}, function (err, land) {
        if (err) reject({ status: 500, message: 'Internal Server Error 1!' });
        landsarr = land;
        resolve({ status: 201, message: 'Lands visited list '+land});
      });

      arr.forEach(function(value){
          filteredArr.pushlands(landsarr[value]);
        });
    resolve({ status: 201, message: 'Lands visited list '+landsarr[0]});
    })

    .catch(err => reject({ status: 500, message: 'Internal Server Error !' }));

});
*/

    /*
                  user.findOne({ id: userid },  function (err, user) {
                      if (err) reject({ status: 404, message: 'User Not Found !' });
                      else{
                          arr=user.landsDiscovered;
                      }

                    });



                    arr.forEach(function(value){
                      if(value!=0){
                        filteredArr.pushlands(lands[i]);
                        i++;
                      }

                    });



                    return filteredArr;
                    */
