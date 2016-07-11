var request = require('request');
var common = require('./main');

var component = "AppServer.Controller.ReferenceData.";

var getReferenceDataCategoryInfo = function (req, res, callback) {
  var requestOptions, path;
  path = "/api/referenceData/category/" + req.params.categoryid;
  common.trace("DEBUG:"+component+"getReferenceDataCategoryInfo","Invoked using Path=("+path+")");
  requestOptions = {
    url : common.apiOptions.server + path,
    method : "GET",
    json : {}
  };
  request(
    requestOptions,
    function(err, response, body) {
      var data = body;
      //console.log(data);
      if (response.statusCode === 200) {
        callback(req, res, data);
      } else {
        common.showError(req, res, response.statusCode);
      }
    }
  );
};

var renderCategoryDetailPage = function (req, res, categoryDetail) {
  common.trace("DEBUG:"+component+"renderCategoryDetailPage","Invoked");
  res.render('referenceDataCategory-detail', {
    title: categoryDetail.category.id,
    pageHeader: {title: categoryDetail.category.id},
    sidebar: {
      context: 'TBC'
    },
    category: categoryDetail.category,
  });
};

/* GET 'Reference Data Category Detail' page */
module.exports.referenceDataCategoryDetail = function(req, res){
  common.trace("DEBUG:"+component+"referenceDataCategoryDetail","Invoked");
  getReferenceDataCategoryInfo(req, res, function(req, res, responseData) {
    renderCategoryDetailPage(req, res, responseData);
  });
};


var getReferenceDataCodesInfo = function (req, res, callback) {
  var requestOptions, path;
  path = "/api/referenceData/codes/" + req.params.categoryid;
  common.trace("DEBUG:"+component+"getReferenceDataCodesInfo","Invoked using Path=("+path+")");
  requestOptions = {
    url : common.apiOptions.server + path,
    method : "GET",
    json : {}
  };
  request(
    requestOptions,
    function(err, response, body) {
      var data = body;
      //console.log(data);
      if (response.statusCode === 200) {
        callback(req, res, data);
      } else {
        common.showError(req, res, response.statusCode);
      }
    }
  );
};

var renderCategoryCodesPage = function (req, res, categoryCodes) {
  common.trace("DEBUG:"+component+"renderCategoryCodesPage","Invoked");
  res.render('referenceDataCodes-detail', {
    title: categoryCodes.codes.category,
    pageHeader: {title: categoryCodes.codes.category},
    sidebar: {
      context: 'TBC'
    },
    codes: categoryCodes.codes,
  });
};

/* GET 'Reference Data Category Detail' page */
module.exports.referenceDataCodesList = function(req, res){
  common.trace("DEBUG:"+component+"referenceDataCodesList","Invoked");
  getReferenceDataCodesInfo(req, res, function(req, res, responseData) {
    renderCategoryCodesPage(req, res, responseData);
  });
};


var getReferenceDataCategoryList = function (req, res, callback) {
  var requestOptions, path;
  path = "/api/referenceData/categories/";
  common.trace("DEBUG:"+component+"getReferenceDataCategoryList","Invoked using Path=("+path+")");
  requestOptions = {
    url : common.apiOptions.server + path,
    method : "GET",
    json : {}
  };
  request(
    requestOptions,
    function(err, response, body) {
      var data = body;
      //console.log(data);
      if (response.statusCode === 200) {
        callback(req, res, data);
      } else {
        common.showError(req, res, response.statusCode);
      }
    }
  );
};

var getReferenceDataCategoryListSearchByName = function (req, res, callback) {
  var requestOptions, path;
  path = "/api/referenceData/categories/searchByName/" + req.params.nameregex;
  common.trace("DEBUG:"+component+"getReferenceDataCategoryListSearchByName","Invoked using Path=("+path+")");
  requestOptions = {
    url : common.apiOptions.server + path,
    method : "GET",
    json : {}
  };
  request(
    requestOptions,
    function(err, response, body) {
      var data = body;
      //console.log(data);
      if (response.statusCode === 200) {
        callback(req, res, data);
      } else {
        common.showError(req, res, response.statusCode);
      }
    }
  );
};

var renderCategoryListPage = function (req, res, categoryList) {
  common.trace("DEBUG:"+component+"renderCategoryListPage","Invoked");
  res.render('referenceDataCategory-list', {
    title: 'Reference Data Category List',
    pageHeader: {title: 'Reference Data Category List'},
    sidebar: {
      context: 'TBC'
    },
    categories: categoryList.categoryList,
  });
};

/* GET 'Reference Data Category List' page */
module.exports.referenceDataCategoryList = function(req, res){
  common.trace("DEBUG:"+component+"referenceDataCategoryList","Invoked");
  getReferenceDataCategoryList(req, res, function(req, res, responseData) {
    renderCategoryListPage(req, res, responseData);
  });
};

/* GET 'Reference Data Category List' page */
module.exports.referenceDataCategoryListSearchByName = function(req, res){
  common.trace("DEBUG:"+component+"referenceDataCategoryListSearchByName","Invoked");
  getReferenceDataCategoryListSearchByName(req, res, function(req, res, responseData) {
    renderCategoryListPage(req, res, responseData);
  });
};
