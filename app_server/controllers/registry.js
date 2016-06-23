var request = require('request');
var apiOptions = {
  server : "http://localhost:3000"
};

var _showError = function (req, res, status) {
  var title, content;
  if (status === 404) {
    title = "404, page not found";
    content = "Oh dear. Looks like we can't find this page. Sorry.";
  } else if (status === 500) {
    title = "500, internal server error";
    content = "How embarrassing. There's a problem with our server.";
  } else {
    title = status + ", something's gone wrong";
    content = "Something, somewhere, has gone just a little bit wrong.";
  }
  res.status(status);
  res.render('generic-text', {
    title : title,
    content : content
  });
};

/* 
var renderHomepage = function(req, res, responseBody){
  var message;
  if (!(responseBody instanceof Array)) {
    message = "API lookup error";
    responseBody = [];
  } else {
    if (!responseBody.length) {
      message = "No Service Records found";
    }
  }
  res.render('services-list', {
    title: 'RTI Services Registry',
    pageHeader: {
      title: 'RTI Services Regsitry',
      strapline: 'Find the services you need!'
    },
    sidebar: "TBC",
    locations: responseBody,
    message: message
  });
};
*/

/* GET 'Services' page */
var getServiceList = function(req, res, callback){
  var requestOptions, path;
  path = '/api/services';
  requestOptions = {
    url : apiOptions.server + path,
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
        _showError(req, res, response.statusCode);
      }
    }
  );
};

var getServiceListFromSearch = function(req, res, callback){
  var requestOptions, path;
  path = '/api/services/searchByName/' + req.params.nameregex;
  requestOptions = {
    url : apiOptions.server + path,
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
        _showError(req, res, response.statusCode);
      }
    }
  );
};

var renderServicesListPage = function (req, res, serviceList) {
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
  getServiceList(req, res, function(req, res, responseData) {
    renderServicesListPage(req, res, responseData);
  });
};

/* GET 'Services List' page */
module.exports.serviceListFromSearch = function(req, res){
  getServiceListFromSearch(req, res, function(req, res, responseData) {
    renderServicesListPage(req, res, responseData);
  });
};

var renderServiceDetailPage = function (req, res, serviceDetail) {
  /* console.log("### Check 1 ###");
  console.log(serviceDetail);
  console.log("### Check 2 ###");
  console.log(serviceDetail.service.id);
  console.log(serviceDetail.service.consumers);
  console.log("### Check 3 ###"); */
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

/* GET 'Service Detail' page */
module.exports.serviceDetail = function(req, res){
  getServiceInfo(req, res, function(req, res, responseData) {
    renderServiceDetailPage(req, res, responseData);
  });
};

var getServiceInfo = function (req, res, callback) {
  var requestOptions, path;
  path = "/api/service/" + req.params.serviceid;
  requestOptions = {
    url : apiOptions.server + path,
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
        _showError(req, res, response.statusCode);
      }
    }
  );
};

var renderServiceDetailPage = function (req, res, serviceDetail) {
  /* console.log("### Check 1 ###");
  console.log(serviceDetail);
  console.log("### Check 2 ###");
  console.log(serviceDetail.service.id);
  console.log(serviceDetail.service.consumers);
  console.log("### Check 3 ###"); */
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

/* GET 'Service Detail' page */
module.exports.serviceDetail = function(req, res){
  getServiceInfo(req, res, function(req, res, responseData) {
    renderServiceDetailPage(req, res, responseData);
  });
};

var getMediationInfo = function (req, res, callback) {
  var requestOptions, path;
  path = "/api/mediation/" + req.params.mediationid;
  requestOptions = {
    url : apiOptions.server + path,
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
        _showError(req, res, response.statusCode);
      }
    }
  );
};

var renderMediationDetailPage = function (req, res, mediationDetail) {
  /* console.log("### Check 1 ###");
  console.log(mediationDetail);
  console.log("### Check 2 ###");
  console.log(mediationDetail.mediation.id);
  console.log("### Check 3 ###"); */
  res.render('mediation-detail', {
    title: mediationDetail.mediation.id ,
    pageHeader: {title: mediationDetail.mediation.id},
    sidebar: {
      context: 'TBC'
    },
    mediation: mediationDetail.mediation,
  });
};

/* GET 'Mediation Detail' page */
module.exports.mediationDetail = function(req, res){
  getMediationInfo(req, res, function(req, res, responseData) {
    renderMediationDetailPage(req, res, responseData);
  });
};

var getApplicationInfo = function (req, res, callback) {
  var requestOptions, path;
  path = "/api/application/" + req.params.applicationid;
  requestOptions = {
    url : apiOptions.server + path,
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
        _showError(req, res, response.statusCode);
      }
    }
  );
};

var renderApplicationDetailPage = function (req, res, applicationDetail) {
  /* console.log("### Check 1 ###");
  console.log(applicationDetail);
  console.log("### Check 2 ###");
  console.log(applicationDetail.application.id);
  console.log("### Check 3 ###"); */
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
  getApplicationInfo(req, res, function(req, res, responseData) {
    renderApplicationDetailPage(req, res, responseData);
  });
};

var getReferenceDataCategoryInfo = function (req, res, callback) {
  var requestOptions, path;
  path = "/api/referenceData/category/" + req.params.categoryid;
  requestOptions = {
    url : apiOptions.server + path,
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
        _showError(req, res, response.statusCode);
      }
    }
  );
};

var renderCategoryDetailPage = function (req, res, categoryDetail) {
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
  getReferenceDataCategoryInfo(req, res, function(req, res, responseData) {
    renderCategoryDetailPage(req, res, responseData);
  });
};
