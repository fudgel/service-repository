var express = require('express');
var router = express.Router();
var ctrlService = require('../controllers/service');
var ctrlMediation = require('../controllers/mediation');
var ctrlApplication = require('../controllers/application');
var ctrlReferenceData = require('../controllers/referenceData');
var ctrlDataDictionary = require('../controllers/dataDictionary');

// Service Detail routes
router.get('/services', ctrlService.serviceListRead);
router.get('/service/:serviceid', ctrlService.serviceReadOne);
router.get('/services/searchByName/:nameregex', ctrlService.serviceListByNameRead);

// Mediation Details by Mediation ID
router.get('/mediation/:mediationid', ctrlMediation.mediationReadOne);

// Application Detail routes
router.get('/applications', ctrlApplication.applicationListRead);
router.get('/applications/searchByName/:nameregex', ctrlApplication.applicationListByNameRead);
router.get('/application/:applicationid', ctrlApplication.applicationReadOne);

// Reference Data routes
//router.get('/referenceData/category/:categoryid', ctrlReferenceData.referenceDataCategoryReadOne);
router.get('/referenceData/category/:categoryid', ctrlReferenceData.referenceDataCategoryRead);
router.get('/referenceData/categories', ctrlReferenceData.referenceDataCategoryList);
router.get('/referenceData/categories/searchByName/:nameregex', ctrlReferenceData.referenceDataCategoryListByName);
router.get('/referenceData/codes/:categoryid', ctrlReferenceData.referenceDataCodesList);

// Data Dictionary
router.get('/dataDictionary', ctrlDataDictionary.dataDictionaryListRead);
router.get('/dataDictionary/searchByName/:nameregex', ctrlDataDictionary.dataDictionarySearchByNameListRead);
router.get('/dataDictionary/searchByDescription/:nameregex', ctrlDataDictionary.dataDictionarySearchByDescriptionListRead);
router.get('/dataDictionary/:datadictionaryid',ctrlDataDictionary.dataDictionaryReadOne);

module.exports = router;
