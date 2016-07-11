var mongoose = require('mongoose');
var Category = mongoose.model('Category');
var Codes = mongoose.model('Codes');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

/* DEPRECATED : Use referenceDataCategoryRead : GET the detail of a Reference Data Category based on name (id) */
module.exports.referenceDataCategoryReadOne = function(req, res) {
 if (req.params.categoryid) {
   Category.findOne({"id":req.params.categoryid}, function (err, category) {
     //console.log(category);
     if(!category) {
       sendJSONresponse(res, 404, {"message":"No reference data category record found for categoryid("+req.params.categoryid+")"});
       return;
     } else if (err) {
       sendJSONresponse(res, 404, err);
       return;
     }
     sendJSONresponse(res, 200, {category});
   });
 } else {
   sendJSONresponse(res, 404, {"message":"categoryid param missing"});
 }
};

/* GET the details of a Reference Data category by the name (id) */
module.exports.referenceDataCategoryRead = function(req, res) {
 if (req.params.categoryid) {
   Category.aggregate([{$match:{"id":req.params.categoryid}},{$lookup:{from:"rdCodes",localField:"id",foreignField:"category",as:"codes"}},{$project:{id:1,services:1,mediations:1,"codes.CanonicalCode":1,"codes.Description":1,"systemCodes":1}}], function (err, category) {
   //Category.aggregate([{$match:{id:"2FA_Approach_Type"}},{$lookup:{from:"rdCodes",localField:"id",foreignField:"category",as:"codes"}},{$project:{id:1,services:1,mediations:1,"codes.CanonicalCode":1,"codes.Description":1,"systemCodes":1}}], function (err, category) {
     //console.log(category);
     if(!category) {
       sendJSONresponse(res, 404, {"message":"No reference data category record found for categoryid("+req.params.categoryid+")"});
       return;
     } else if (err) {
       sendJSONresponse(res, 404, err);
       return;
     }
     sendJSONresponse(res, 200, {category});
   });
 } else {
   sendJSONresponse(res, 404, {"message":"categoryid param missing"});
 }
};

/* GET the Reference Data Codes and Mapping for a Category by the name (id) */
module.exports.referenceDataCodesList = function(req, res) {
if (req.params.categoryid) {
  Category.aggregate([{$match:{"id":req.params.categoryid}},{$lookup:{from:"rdCodes",localField:"id",foreignField:"category",as:"codes"}},{$project:{id:1,services:1,systemCodes:1,"codes":1}}] , function (err, codes) {
  // Codes.aggregate([{$match:{category:"2FA_Approach_Type"}},{$lookup:{from:"referenceData",localField:"category",foreignField:"id",as:"systemCodes"}}], function (err, codes) {
     //console.log(codes);
     if(!codes) {
       sendJSONresponse(res, 404, {"message":"No reference data codes record found for categoryid("+req.params.categoryid+")"});
       return;
     } else if (err) {
       sendJSONresponse(res, 404, err);
       return;
     }
     sendJSONresponse(res, 200, {codes});
   });
 } else {
   sendJSONresponse(res, 404, {"message":"categoryid param missing"});
 }
};

/* GET the Reference Data category List */
module.exports.referenceDataCategoryList = function(req, res) {
   Category.find({},{id:1,services:1},function(err, categoryList){
     //console.log(categoryList);
     if(!categoryList) {
       sendJSONresponse(res, 404, {"message":"No reference data categories found"});
       return;
     } else if (err) {
       sendJSONresponse(res, 404, err);
       return;
     }
     sendJSONresponse(res, 200, {categoryList});
   });
};

/* GET the results of a search Reference Data List by a regular expression in the name */
module.exports.referenceDataCategoryListByName = function(req, res) {
 if (req.params.nameregex) {
   Category.find({'id' : new RegExp(req.params.nameregex, 'i')}, {_id:0, id:1, services:1}, function(err, categoryList){
     if(!categoryList) {
       sendJSONresponse(res, 404, {"message":"No categories found using that regular expression in the category name"});
       return;
     } else if (err) {
       sendJSONresponse(res, 404, err);
       return;
     }
     sendJSONresponse(res, 200, {categoryList});
   });
 } else {
   sendJSONresponse(res, 404, {"message":"No search parameter found ("+req.params.nameregex+")"});
 }
};