var express = require('express');
var router = express.Router();
var ctrlService = require('../controllers/service');
var ctrlMediation = require('../controllers/mediation');
var ctrlApplication = require('../controllers/application');
var ctrlReferenceData = require('../controllers/referenceData');

router.get('/services', ctrlService.serviceListRead);
router.get('/service/:serviceid', ctrlService.serviceReadOne);
router.get('/services/searchByName/:nameregex', ctrlService.serviceListByNameRead);
router.get('/mediation/:mediationid', ctrlMediation.mediationReadOne);
router.get('/application/:applicationid', ctrlApplication.applicationReadOne);
router.get('/referenceData/category/:categoryid', ctrlReferenceData.referenceDataCategoryReadOne);
router.get('/referenceData/categories', ctrlReferenceData.referenceDataCategoryList);

module.exports = router;
