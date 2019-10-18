const { userType, appType, analysisType, toolType } = require('./types');
const { query } = require('./query');

const typeDefs = [query, userType, appType, analysisType, toolType];

module.exports = {
    typeDefs,
};