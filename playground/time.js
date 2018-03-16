var moment = require('moment');

 // var date = new Date();
 // console.log(date.getMonth());
//Jan 1st 1970 00:00:00 am
//UTC
// -1000 // 1000 miliseconds before 1/1/1970 00:00:00
// 1000 // 1000 miliseconds after 1/1/1970 00:00:00

// var date = moment();
// console.log(date.format('MMM Do, YYYY A'));
// console.log(moment());
// console.log(moment().add(1, 'day').subtract(24, 'hours'));
// console.log(date.format('h:mm a'))

// new Date().getTime()
var someTimestamp = moment().valueOf();
console.log(someTimestamp);

var createdAt = 1234;
var date = moment(createdAt);
console.log(date.format('h:mm a'));
