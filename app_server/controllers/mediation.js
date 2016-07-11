var request = require('request');
var common = require('./main');

var component = "AppServer.Controller.Mediation.";

var getMediationInfo = function (req, res, callback) {
  var requestOptions, path;
  path = "/api/mediation/" + req.params.mediationid;
  common.trace("DEBUG:"+component+"getMediationInfo","Invoked using Path=("+path+")");
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

var renderMediationDetailPage = function (req, res, mediationDetail) {
  common.trace("DEBUG:"+component+"renderMediationDetailPage","Invoked");
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
  common.trace("DEBUG:"+component+"mediationDetail","Invoked");
  getMediationInfo(req, res, function(req, res, responseData) {
    renderMediationDetailPage(req, res, responseData);
  });
};