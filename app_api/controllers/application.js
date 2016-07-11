var mongoose = require('mongoose');
var Application= mongoose.model('Application');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

/* GET application details by the application inventory id */
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

/* GET application list */
module.exports.applicationListRead = function(req, res) {
   Application.find({},{id:1,name:1,appInvRec:1}, function (err, applicationList) {
     if(!applicationList) {
       sendJSONresponse(res, 404, {"message":"No Application records found"});
       return;
     } else if (err) {
       sendJSONresponse(res, 404, err);
       return;
     }
     sendJSONresponse(res, 200, {applicationList});
   })
};

/* GET the results of a search Application List by a regular expression in the name or id */
module.exports.applicationListByNameRead = function(req, res) {
 if (req.params.nameregex) {
   Application.find({'stsRef' : new RegExp(req.params.nameregex, 'i')}, {_id:0, id:1, name:1, appInvRec:1}, function(err, applicationList){
     if(!applicationList) {
       sendJSONresponse(res, 404, {"message":"No applications found using that regular expression in the application id or name"});
       return;
     } else if (err) {
       sendJSONresponse(res, 404, err);
       return;
     }
     sendJSONresponse(res, 200, {applicationList});
   });
 } else {
   sendJSONresponse(res, 404, {"message":"No search parameter found ("+req.params.nameregex+")"});
 }
};