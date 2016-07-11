var request = require('request');
var common = require('./main');

var component = "AppServer.Controller.Service.";

/* GET 'Services List' */
var getServiceList = function(req, res, callback){
  var requestOptions, path;
  path = '/api/services';
  common.trace("DEBUG:"+component+"getServiceList","Invoked using Path=("+path+")");
  requestOptions = {
    url : common.apiOptions.server + path,
    method : "GET",
    json : {},
    qs : {
    }
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

/* GET 'Services List' filted with name regex */
var getServiceListFromSearch = function(req, res, callback){
  var requestOptions, path;
  path = '/api/services/searchByName/' + req.params.nameregex;
  common.trace("DEBUG:"+component+"getServiceListFromSearch","Invoked using Path=("+path+")");
  requestOptions = {
    url : common.apiOptions.server + path,
    method : "GET",
    json : {},
    qs : {
    }
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

/* GET 'Services List' */
var renderServicesListPage = function (req, res, serviceList) {
  common.trace("DEBUG:"+component+"renderServicesListPage","Invoked");
  res.render('services-list', {
    title: 'RTI Services List',
    pageHeader: {title: 'RTI Services List'},
    sidebar: {
      context: 'TBC'
    },
    serviceList: serviceList.serviceList
  });
};

/* GET 'Services List' page */
module.exports.serviceList = function(req, res){
  common.trace("DEBUG:"+component+"serviceList","Invoked");
  getServiceList(req, res, function(req, res, responseData) {
    renderServicesListPage(req, res, responseData);
  });
};

/* GET 'Services List' page */
module.exports.serviceListFromSearch = function(req, res){
  common.trace("DEBUG:"+component+"serviceListFromSearch","Invoked");
  getServiceListFromSearch(req, res, function(req, res, responseData) {
    renderServicesListPage(req, res, responseData);
  });
};

var renderServiceDetailPage = function (req, res, serviceDetail) {
  common.trace("DEBUG:"+component+"renderServiceDetailPage","Invoked");
  res.render('service-detail', {
    title: serviceDetail.service.id + " " + serviceDetail.service.name,
    pageHeader: {title: serviceDetail.service.id + " " + serviceDetail.service.name},
    sidebar: {
      context: 'TBC'
    },
    service: serviceDetail.service,
    // consumers: serviceDetail.service.consumers
  });
};

var getServiceInfo = function (req, res, callback) {
  var requestOptions, path;
  path = "/api/service/" + req.params.serviceid;
  common.trace("DEBUG:"+component+"getServiceInfo","Invoked using Path=("+path+")");
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

/* GET 'Service Detail' page */
module.exports.serviceDetail = function(req, res){
  common.trace("DEBUG:"+component+"serviceDetail","Invoked");
  getServiceInfo(req, res, function(req, res, responseData) {
    renderServiceDetailPage(req, res, responseData);
  });
};
