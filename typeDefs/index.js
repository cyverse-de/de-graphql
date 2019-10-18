const { userType, appType, analysisType } = require('./types');
const { query } = require('./query');

const typeDefs = [query, userType, appType, analysisType];

module.exports = {
    typeDefs,
};