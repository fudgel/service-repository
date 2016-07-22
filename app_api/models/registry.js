var mongoose = require('mongoose');

var serviceSchema = new mongoose.Schema({
    id: String,
    platform: String,
    name: String,
    service: String,
    version: String,
    transactionalComponent: String,
    serviceGroup: String,
    organisations: [String],
    consumers: [],
    mediations: [String],
    servicePattern: String,
    servicePatternVersion: String,
    referenceData: [String]
});

var serviceListSchema = new mongoose.Schema({
    services: [serviceSchema]
});

var mediationSchema = new mongoose.Schema ({
    id: String,
    mediation: String,
    version: String,
    platform: String,
    mediationPattern: String,
    mediationPatternVersion: String,
    header: String,
    headerVersion: String,
    operation: String,
    providerPrefix: String,
    providerServiceName: String,
    statusHandler: String,
    statusHandlerVersion: String,
    providerSystemId: String,
    services: [String]
});

var applicationSchema = new mongoose.Schema({
    id: String,
    name: String,
    aliasId: String,
    stsRef: String,
    appInvRec: String
});

var referenceDataCodesSchema = new mongoose.Schema({
    id: String,
    category: String,
    CanonicalCode: String,
    Description: String,
    SAFICode: String
},{collection:'rdCodes'});

var referenceDataCategorySchema = new mongoose.Schema({
    id: String,
    services: [String],
    mediations: [String],
    systemCodes: [String]
},{collection:'referenceData'});

var dataDictionarySchema = new mongoose.Schema({
    id: String,
    name: String,
    dataType: String,
    attributeName: String,
    description: String,
    lifecycleStatus: String,
    ecdmEntity: String,
    supercededBy: String,
    resources: [String],
    modelDomains: [String]
},{collection:'dataDictionary'});

mongoose.model('Service', serviceSchema);
mongoose.model('ServiceList', serviceListSchema);
mongoose.model('Mediation', mediationSchema);
mongoose.model('Application', applicationSchema);
mongoose.model('Category', referenceDataCategorySchema);
mongoose.model('Codes', referenceDataCodesSchema);
mongoose.model('DataDictionary', dataDictionarySchema);
