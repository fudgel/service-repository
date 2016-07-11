var request = require('request');
module.exports.apiOptions = {
  //server : "http://localhost:3000"
  server : "http://localhost:80"
  //server : "http://au2109lp2286:80"
};

var debug = true;


module.exports.trace = function (component, message) {
  if (debug) {
    console.log(component+":"+message);
  } 
};

module.exports.showError = function (req, res, status) {
  var title, content;
  if (status === 404) {
    title = "404, page not found";
    content = "Oh dear. Looks like we can't find this page. Sorry.";
  } else if (status === 500) {
    title = "500, internal server error";
    content = "How embarrassing. There's a problem with our server.";
  } else {
    title = status + ", something's gone wrong";
    content = "Something, somewhere, has gone just a little bit wrong.";
  }
  res.status(status);
  res.render('generic-text', {
    title : title,
    content : content
  });
};

/* GET home page */
module.exports.index = function(req, res){
  res.render('index', { title: 'RTI Service Registry' });
};

/* GET 'about us' page */
module.exports.about = function(req, res) {
    res.render('generic-text', {
        title: 'About RTI Service Registry',
        content: 'The RTI Service Registry is still a proof of concept.... built by someone in their precious spare time'
    });
};

module.exports.getTimeStamp = function timeStamp() {
// Create a date object with the current time
  var now = new Date();
// Create an array with the current month, day and time
  var date = [ now.getMonth() + 1, now.getDate(), now.getFullYear() ];
// Create an array with the current hour, minute and second
  var time = [ now.getHours(), now.getMinutes(), now.getSeconds() ];
// Determine AM or PM suffix based on the hour
  var suffix = ( time[0] < 12 ) ? "AM" : "PM";
// Convert hour from military time
  time[0] = ( time[0] < 12 ) ? time[0] : time[0] - 12;
// If hour is 0, set it to 12
  time[0] = time[0] || 12;
// If seconds and minutes are less than 10, add a zero
  for ( var i = 1; i < 3; i++ ) {
    if ( time[i] < 10 ) {
      time[i] = "0" + time[i];
    }
  }
// Return the formatted string
  return date.join("/") + " " + time.join(":") + " " + suffix;
}