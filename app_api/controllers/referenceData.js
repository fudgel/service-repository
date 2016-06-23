var mongoose = require('mongoose');
var Category = mongoose.model('Category');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

/* GET a location by the id */
module.exports.referenceDataCategoryReadOne = function(req, res) {
 if (req.params.categoryid) {
   Category.findOne({"id":req.params.categoryid}, function (err, category) {
     console.log(category);
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

/* GET a Reference Data category List */
module.exports.referenceDataCategoryList = function(req, res) {
   Category.find(function(err, categoryList){
     console.log(categoryList);
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
