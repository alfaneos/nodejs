'use strict';

const lands = require('../models/lands');
const user = require('../models/user');


exports.goToLand = (newemail, newland) =>

new Promise((resolve,reject) => {
  user.find({ email: newemail })

  .then(users => {


var landstring = users[0].landsDiscovered;
var arr = landstring.split(",");
arr.push(newland);
arr.sort(function(a,b){
  return a-b;
});

    user.findOneAndUpdate({email:newemail},{landsDiscovered:arr}, function(err, doc){
      if(err)reject({ status: 500, message: 'Internal Server Error 2!'+newland });
      else resolve({ status: 201, message: 'Land visited successfully update' +arr[0]});
    });
    resolve({ status: 201, message: 'Land visited successfully' +arr[3]});
})

  .catch(err => reject({ status: 500, message: 'Internal Server Error !' }));

});
