var mongoose = require('mongoose');
var DataDictionary= mongoose.model('DataDictionary');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

/* GET data dictionary item details by the data dictionary  id */
module.exports.dataDictionaryReadOne = function(req, res) {
 if (req.params.datadictionaryid) {
   DataDictionary.findOne({"id":req.params.datadictionaryid}, function (err, dataDictionary) {
     console.log(dataDictionary);
     if(!dataDictionary) {
       sendJSONresponse(res, 404, {"message":"Application record for datadictionaryid("+req.params.datadictionaryid+") not found"});
       return;
     } else if (err) {
       sendJSONresponse(res, 404, err);
       return;
     }
     sendJSONresponse(res, 200, {dataDictionary});
   });
 } else {
   sendJSONresponse(res, 404, {"message":"No datadictionaryid parameter"});
 }
};

/* GET data dictionary list by the name */
module.exports.dataDictionarySearchByNameListRead = function(req, res) {
 if (req.params.nameregex) {
   DataDictionary.find({'name' : new RegExp(req.params.nameregex, 'i')}, function (err, dataDictionary) {
     console.log(dataDictionary);
     if(!dataDictionary) {
       sendJSONresponse(res, 404, {"message":"Application record for datadictionaryid("+req.params.datadictionaryid+") not found"});
       return;
     } else if (err) {
       sendJSONresponse(res, 404, err);
       return;
     }
     sendJSONresponse(res, 200, {dataDictionary});
   });
 } else {
   sendJSONresponse(res, 404, {"message":"No datadictionaryid parameter"});
 }
};

/* GET data dictionary list by the name */
module.exports.dataDictionarySearchByDescriptionListRead = function(req, res) {
 if (req.params.nameregex) {
   DataDictionary.find({'description' : new RegExp(req.params.nameregex, 'i')}, function (err, dataDictionary) {
     console.log(dataDictionary);
     if(!dataDictionary) {
       sendJSONresponse(res, 404, {"message":"Data Dictionary record with description containing datadictionaryid("+req.params.datadictionaryid+") not found"});
       return;
     } else if (err) {
       sendJSONresponse(res, 404, err);
       return;
     }
     sendJSONresponse(res, 200, {dataDictionary});
   });
 } else {
   sendJSONresponse(res, 404, {"message":"No datadictionaryid parameter"});
 }
};

/* GET data dictionary list */
module.exports.dataDictionaryListRead = function(req, res) {
   DataDictionary.find({}, function (err, dataDictionary) {
     console.log(dataDictionary);
     if(!dataDictionary) {
       sendJSONresponse(res, 404, {"message":"No data dictionary records found"});
       return;
     } else if (err) {
       sendJSONresponse(res, 404, err);
       return;
     }
     sendJSONresponse(res, 200, {dataDictionary});
   })
};