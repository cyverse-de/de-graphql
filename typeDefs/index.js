const { 
    userType, 
    appType, 
    analysisType, 
    toolType,
    permissionType,
    AVUType,
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
];

module.exports = {
    typeDefs,
};