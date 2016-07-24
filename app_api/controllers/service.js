var mongoose = require('mongoose');
var Service = mongoose.model('Service');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

/* GET a Service Detail by the Service Id */
module.exports.serviceReadOne = function(req, res) {
 if (req.params.serviceid) { 
   Service.findOne({"id":req.params.serviceid}, function (err, service) {
     // console.log(service);
     if(!service) {
       sendJSONresponse(res, 404, {"message":"serviceid not found"});
       return;
     } else if (err) {
       sendJSONresponse(res, 404, err);
       return;
     }
     sendJSONresponse(res, 200, {service});
   });
 } else {
   sendJSONresponse(res, 404, {"message":"No service record found for serviceid("+req.params.serviceid+")"});
 }
};

/* GET the results of a search Service List by a regular expression in the name */
module.exports.serviceListByNameRead = function(req, res) {
 if (req.params.nameregex) {
   Service.find({'name' : new RegExp(req.params.nameregex, 'i')}, {_id:0, id:1, name:1, consumers:1}, function(err, serviceList){
     if(!serviceList) {
       sendJSONresponse(res, 404, {"message":"No services found using that regular expression in the service name"});
       return;
     } else if (err) {
       sendJSONresponse(res, 404, err);
       return;
     }
     sendJSONresponse(res, 200, {serviceList});
   });
 } else {
   sendJSONresponse(res, 404, {"message":"No search parameter found ("+req.params.nameregex+")"});
 }
};

/* GET a Service List by a regular expression in the name */
module.exports.serviceListRead = function(req, res) {
   Service.find({'id' : new RegExp("SVC", 'i')}, {_id:0,id:1,name:1,consumers:1}, function(err, serviceList){
     if(!serviceList) {
       sendJSONresponse(res, 404, {"message":"No services found using that regular expression in the service name"});
       return;
     } else if (err) {
       sendJSONresponse(res, 404, err);
       return;
     }
     sendJSONresponse(res, 200, {serviceList});
   });
};
