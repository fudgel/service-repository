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
    STSconsumers: [String],
    consumers: [String],
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

var referenceDataCategorySchema = new mongoose.Schema({
    id: String,
    services: [String],
    mediations: [String]
},{collection:'referenceData'});

mongoose.model('Service', serviceSchema);
mongoose.model('ServiceList', serviceListSchema);
mongoose.model('Mediation', mediationSchema);
mongoose.model('Application', applicationSchema);
mongoose.model('Category', referenceDataCategorySchema);
