var mongoose = require('mongoose');
var Mediation = mongoose.model('Mediation');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

/* GET a location by the id */
module.exports.mediationReadOne = function(req, res) {
 if (req.params.mediationid) {
   Mediation.findOne({"id":req.params.mediationid}, function (err, mediation) {
     console.log(mediation);
     if(!mediation) {
       sendJSONresponse(res, 404, {"message":"Mediation record for mediationid("+req.params.mediationid+") not found"});
       return;
     } else if (err) {
       sendJSONresponse(res, 404, err);
       return;
     }
     sendJSONresponse(res, 200, {mediation});
   });
 } else {
   sendJSONresponse(res, 404, {"message":"Missing mediationid parameter"});
 }
};
