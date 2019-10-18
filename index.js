const { ApolloServer, gql } = require('apollo-server');
const { FunctionAPI, AppsAPI, UserInfoAPI } = require('./dataSources');
const { typeDefs } = require('./typeDefs');

const GraphQLJSON = require('graphql-type-json');
const BigInt = require('graphql-bigint');

const { _ } = require('lodash');

const resolvers = {
    JSON: GraphQLJSON,
    
    BigInt: BigInt,

    Query: {
        user: async (_source, { username }, { dataSources }) => {
            return dataSources.functionAPI.getUserInfo(username);
        },
        appPermissions: async (_source, { username, appID, systemID}, { dataSources }) => {
            const data = await dataSources.appsAPI.getAppPermissions(username, appID, systemID);
            console.log(`permissions: ${data}`);
            return data;
        },
    },

    User: {
        id: async (user, _args, { dataSources }) => {
            return dataSources.appsAPI.getUserInfo(user.username)
        },

        saved_searches: async (user, _args, { dataSources }) => {
            return dataSources.userInfoAPI.getSavedSearches(user.username);
        },

        session: async (user, _args, { dataSources }) => {
            return dataSources.userInfoAPI.getSession(user.username);
        },

        preferences: async (user, _args, { dataSources }) => {
            return dataSources.userInfoAPI.getPreferences(user.username);
        },

        webhooks: async (user, _args, { dataSources }) => {
            return dataSources.appsAPI.getUserWebhooks(user.username);
        },

        accessible_apps: async (user, _args, { dataSources }) => {
            return dataSources.appsAPI.getAccessibleApps(user.username);
        },

        workspace: async (user, _args, { dataSources }) => {
            return dataSources.appsAPI.getWorkspace(user.username);
        },

        system_ids: async (user, _args, { dataSources }) => {
            return dataSources.appsAPI.getSystemIDs(user.username);
        },

        analyses: async (user, _args, { dataSources }) => {
            return dataSources.appsAPI.getAnalyses(user.username);
        },
    },

    Analysis: {
        app: async (analysis, _args, { dataSources }) => {
            return dataSources.appsAPI.getApp(analysis.username, analysis.app_id, analysis.system_id)
        }
    }
};
    
const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => {
        return {
            functionAPI: new FunctionAPI(),
            appsAPI: new AppsAPI(),
            userInfoAPI: new UserInfoAPI(),
        };
    },
});

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
