const { merge } = require('lodash');
const GraphQLJSON = require('graphql-type-json');
const BigInt = require('graphql-bigint');

const Analysis = require('./Analysis');
const App = require('./App');
const Metadata = require('./Metadata');
const Query = require('./Query');
const Tool = require('./Tool');
const User = require('./User');

const resolvers = merge(
    {
        JSON: GraphQLJSON,
        BigInt: BigInt,
    }, 
    Analysis.resolvers,
    App.resolvers,
    Metadata.resolvers,
    Query.resolvers,
    Tool.resolvers,
    User.resolvers
);

module.exports = resolvers;