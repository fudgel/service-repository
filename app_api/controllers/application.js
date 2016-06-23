var mongoose = require('mongoose');
var Application= mongoose.model('Application');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

/* GET a location by the id */
module.exports.applicationReadOne = function(req, res) {
 if (req.params.applicationid) {
   Application.findOne({"id":req.params.applicationid}, function (err, application) {
     if(!application) {
       sendJSONresponse(res, 404, {"message":"Application record for applicationid("+req.params.applicationid+") not found"});
       return;
     } else if (err) {
       sendJSONresponse(res, 404, err);
       return;
     }
     sendJSONresponse(res, 200, {application});
   });
 } else {
   sendJSONresponse(res, 404, {"message":"No applicationid parameter"});
 }
};
