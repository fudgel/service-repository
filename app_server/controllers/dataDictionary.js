var request = require('request');
var common = require('./main');

var component = "AppServer.Controller.DataDictionary.";

var getDataDictionaryInfo = function (req, res, callback) {
  var requestOptions, path;
  path = "/api/dataDictionary/" + req.params.datadictionaryid;
  common.trace("DEBUG:"+component+"getDataDictionaryInfo","Invoked using Path=("+path+")");
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

var renderDataDictionaryDetailPage = function (req, res, dataDictionaryDetail) {
  common.trace("DEBUG:"+component+"renderDataDictionaryDetailPage","Invoked");
  res.render('dataDictionary-detail', {
    title: dataDictionaryDetail.dataDictionary.name ,
    pageHeader: {title: dataDictionaryDetail.dataDictionary.name},
    sidebar: {
      context: 'TBC'
    },
    dataDictionaryItem: dataDictionaryDetail.dataDictionary,
  });
};

var getDataDictionaryList = function (req, res, callback) {
  var requestOptions, path;
  path = "/api/dataDictionary";
  common.trace("DEBUG:"+component+"getDataDictionaryList","Invoked using Path=("+path+")");
  requestOptions = {
    url : common.apiOptions.server + path,
    method : "GET",
    json : {}
  };
  request(
    requestOptions,
    function(err, response, body) {
      common.trace("DEBUG:"+component+"getDataDictionaryList","Response=("+response.statusCode+")");
      var data = body;
      if (response.statusCode === 200) {
        common.trace("DEBUG:"+component+"getDataDictionaryList","data=("+data+")");
        callback(req, res, data);
      } else {
        common.trace("ERROR:"+component+"getDataDictionaryList","response status=("+response.statusCode+")");
        common.showError(req, res, response.statusCode);
      }
    }
  );
};

var getDataDictionaryListSearchByName = function (req, res, callback) {
  var requestOptions, path;
  path = "/api/dataDictionary/searchByName/" + req.params.nameregex;
  common.trace("DEBUG:"+component+"getDataDictionaryListSearchByName","Invoked with Path=("+path+")");
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

var getDataDictionaryListSearchByDescription = function (req, res, callback) {
  var requestOptions, path;
  path = "/api/dataDictionary/searchByDescription/" + req.params.nameregex;
  common.trace("DEBUG:"+component+"getDataDictionaryListSearchByDescription","Invoked with Path=("+path+")");
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

var renderDataDictionaryListPage = function (req, res, dataDictionaryList) {
  common.trace("DEBUG:"+component+"renderDataDictionaryListPage","DataDictionaryList Object ("+dataDictionaryList+")");
  res.render('dataDictionary-list', {
    title: 'Data Dictionary List',
    pageHeader: {title: 'Data Dictionary List'},
    sidebar: {
      context: 'TBC'
    },
    dataDictionaryItems: dataDictionaryList.dataDictionary,
  });
};

/* GET Full 'Data Dictionary List' page */
module.exports.dataDictionaryList = function(req, res){
  common.trace("DEBUG:"+component+"dataDictionaryList","Invoked");
  getDataDictionaryList(req, res, function(req, res, responseData) {
    renderDataDictionaryListPage(req, res, responseData);
  });
};

/* GET search by name for 'Data Dictionary List' page */
module.exports.dataDictionaryListSearchByName = function(req, res){
  common.trace("DEBUG:"+component+"dataDictionaryListSearchByName","Invoked");
  getDataDictionaryListSearchByName(req, res, function(req, res, responseData) {
    renderDataDictionaryListPage(req, res, responseData);
  });
};

/* GET search by description for 'Data Dictionary List' page */
module.exports.dataDictionaryListSearchByDescription = function(req, res){
  common.trace("DEBUG:"+component+"dataDictionaryListSearchByName","Invoked");
  getDataDictionaryListSearchByDescription(req, res, function(req, res, responseData) {
    renderDataDictionaryListPage(req, res, responseData);
  });
};

/* GET 'Data Dictionary Detail' page */
module.exports.dataDictionaryDetail = function(req, res){
  common.trace("DEBUG:"+component+"dataDictionaryDetail","Invoked");
  getDataDictionaryInfo(req, res, function(req, res, responseData) {
    renderDataDictionaryDetailPage(req, res, responseData);
  });
};