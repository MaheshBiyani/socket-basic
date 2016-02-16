var moment = require('moment');
var now = moment();

/*console.log(now.format());

console.log(now.format('h:mma'));

console.log(now.format('MMM Do YYYY, h:mma'));*/

//unix format
console.log(now.format('X'));
//unix format with millisecond
console.log(now.format('x'));

var timeStamp = 1455528903529;

var timeStampMoment = moment.utc(timeStamp);
console.log(timeStampMoment.local().format('h:mm a'));