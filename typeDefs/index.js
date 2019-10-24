const { 
    userType, 
    appType, 
    analysisType, 
    toolType,
    permissionType, 
} = require('./types');
const { query } = require('./query');

const typeDefs = [
    query, 
    userType, 
    appType, 
    analysisType, 
    toolType, 
    permissionType
];

module.exports = {
    typeDefs,
};