var express = require('express');
var router = express.Router();
//var ctrlRegistry = require('../controllers/registry');
var ctrlMain        = require('../controllers/main');
var ctrlApplication = require('../controllers/application');
var ctrlMediation   = require('../controllers/mediation');
var ctrlRefData     = require('../controllers/referenceData');
var ctrlService     = require('../controllers/service');

/* General pages */
router.get('/', ctrlMain.index);
router.get('/about', ctrlMain.about);

/* Application pages */
router.get('/applications', ctrlApplication.applicationList);
router.get('/applications/searchByName/:nameregex', ctrlApplication.applicationListSearchByName);
router.get('/application/:applicationid', ctrlApplication.applicationDetail);

/* Mediation pages */
router.get('/mediation/:mediationid', ctrlMediation.mediationDetail);

/* Reference Data */
router.get('/referenceData/categories',ctrlRefData.referenceDataCategoryList);
router.get('/referenceData/category/:categoryid',ctrlRefData.referenceDataCategoryDetail);
router.get('/referenceData/categories/searchByName/:nameregex', ctrlRefData.referenceDataCategoryListSearchByName);
router.get('/referenceData/codes/:categoryid',ctrlRefData.referenceDataCodesList);

/* Services pages */
router.get('/services', ctrlService.serviceList);
router.get('/services/searchByName/:nameregex', ctrlService.serviceListFromSearch);
router.get('/service/:serviceid', ctrlService.serviceDetail);

module.exports = router;
