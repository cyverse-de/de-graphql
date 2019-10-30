const { 
    userType, 
    appType, 
    analysisType, 
    toolType,
    permissionType,
    AVUType,
    templateType,
} = require('./types');
const { query } = require('./query');

const typeDefs = [
    query, 
    userType, 
    appType, 
    analysisType, 
    toolType, 
    permissionType,
    AVUType,
    templateType,
];

module.exports = {
    typeDefs,
};