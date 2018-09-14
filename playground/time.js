// Jan 1st 1970 00:00:00 am - epoch unix time

//var date = new Date();

var moment = require('moment');

var date9 = moment().local();

console.log(date9.format('HH:mm'));