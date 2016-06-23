var express = require('express');
var router = express.Router();
var ctrlRegistry = require('../controllers/registry');
var ctrlMain = require('../controllers/main');

/* General pages */
router.get('/', ctrlMain.index);
router.get('/about', ctrlMain.about);

/* Services pages */
router.get('/services', ctrlRegistry.serviceList);
router.get('/services/searchByName/:nameregex', ctrlRegistry.serviceListFromSearch);
router.get('/service/:serviceid', ctrlRegistry.serviceDetail);

/* Mediation pages */
router.get('/mediation/:mediationid', ctrlRegistry.mediationDetail);

/* Application pages */
router.get('/application/:applicationid', ctrlRegistry.applicationDetail);

/* Reference Data */
router.get('/referenceData/category/:categoryid',ctrlRegistry.referenceDataCategoryDetail);

module.exports = router;
