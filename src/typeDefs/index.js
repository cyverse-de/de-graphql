const { 
    userType, 
    appType, 
    analysisType, 
    toolType,
    permissionType,
    AVUType,
    templateType,
    commentType,
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
    commentType,
];

module.exports = {
    typeDefs,
};