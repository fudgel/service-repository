var request = require('request');
var common = require('./main');

var component = "AppServer.Controller.Application.";

var getApplicationInfo = function (req, res, callback) {
  var requestOptions, path;
  path = "/api/application/" + req.params.applicationid;
  common.trace("DEBUG:"+component+"getApplicationInfo","Invoked using Path=("+path+")");
  requestOptions = {
    url : common.apiOptions.server + path,
    method : "GET",
    json : {}
  };
  request(
    requestOptions,
    function(err, response, body) {
      var data = body;
      if (response.statusCode === 200) {
        callback(req, res, data);
      } else {
        common.showError(req, res, response.statusCode);
      }
    }
  );
};

var renderApplicationDetailPage = function (req, res, applicationDetail) {
  common.trace("DEBUG:"+component+"renderApplicationDetailPage","Invoked");
  res.render('application-detail', {
    title: applicationDetail.application.stsRef ,
    pageHeader: {title: applicationDetail.application.stsRef},
    sidebar: {
      context: 'TBC'
    },
    application: applicationDetail.application,
  });
};

/* GET 'Application Detail' page */
module.exports.applicationDetail = function(req, res){
  common.trace("DEBUG:"+component+"applicationDetail","Invoked");
  getApplicationInfo(req, res, function(req, res, responseData) {
    renderApplicationDetailPage(req, res, responseData);
  });
};

var getApplicationsList = function (req, res, callback) {
  var requestOptions, path;
  path = "/api/applications";
  common.trace("DEBUG:"+component+"getApplicationsList","Invoked using Path=("+path+")");
  requestOptions = {
    url : common.apiOptions.server + path,
    method : "GET",
    json : {}
  };
  request(
    requestOptions,
    function(err, response, body) {
      common.trace("DEBUG:"+component+"getApplicationsList","Response=("+response.statusCode+")");
      var data = body;
      if (response.statusCode === 200) {
        common.trace("DEBUG:"+component+"getApplicationsList","data=("+data+")");
        callback(req, res, data);
      } else {
        common.trace("ERROR:"+component+"getApplicationsList","response status=("+response.statusCode+")");
        common.showError(req, res, response.statusCode);
      }
    }
  );
};

var getApplicationsListSearchByName = function (req, res, callback) {
  var requestOptions, path;
  var nameregex = req.param('name');
  common.trace("DEBUG:"+component+"getApplicationsListSearchByName","Parameters - 'nameregex'=("+nameregex+")");
  path = "/api/applications/searchByName/" + nameregex;
  common.trace("DEBUG:"+component+"getApplicationsListSearchByName","Invoked with Path=("+path+")");
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

var renderApplicationListPage = function (req, res, applicationList) {
  common.trace("DEBUG:"+component+"renderApplicationListPage","ApplicationList Object ("+applicationList+")");
  res.render('applications-list', {
    title: 'Applications List',
    pageHeader: {title: 'Application List'},
    sidebar: {
      context: 'TBC'
    },
    apps: applicationList.applicationList,
  });
};

/* GET Full 'Application List' page */
module.exports.applicationList = function(req, res){
  common.trace("DEBUG:"+component+"applicationList","Invoked");
  getApplicationsList(req, res, function(req, res, responseData) {
    renderApplicationListPage(req, res, responseData);
  });
};

/* GET search by name for 'Application List' page */
module.exports.applicationListSearchByName = function(req, res){
  common.trace("DEBUG:"+component+"applicationListSearchByName","Invoked");
  getApplicationsListSearchByName(req, res, function(req, res, responseData) {
    renderApplicationListPage(req, res, responseData);
  });
};