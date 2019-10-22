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
            return await dataSources.appsAPI.getAppPermissions(username, appID, systemID);
        },

        analysis: async (_source, { username, analysisID }, { dataSources }) => {
            return await dataSources.appsAPI.getAnalysis(username, analysisID);
        },

        app: async (_source, { username, appID, systemID }, { dataSources }) => {
            return await dataSources.appsAPI.getApp(username, appID, systemID);
        },

        analysesByStatus: async (_source, { status }, { dataSources }) => {
            return await dataSources.pgAPI.analysisLookupsByStatus(status);
        },

        analysisByExternalID: async (_source, { externalID }, { dataSources }) => {
            return await dataSources.pgAPI.analysisLookupsByExternalID(externalID);
        }


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

        tools: async (user, _args, { dataSources }) => {
            return dataSources.appsAPI.getTools(user.username);
        }
    },

    Analysis: {
        app: async (analysis, _args, { dataSources }) => {
            return dataSources.appsAPI.getApp(analysis.username, analysis.app_id, analysis.system_id)
        },

        steps: async (analysis, _args, { dataSources }) => {
            return dataSources.appsAPI.getAnalysisSteps(analysis.username, analysis.id);
        },

        parameters: async (analysis, _args, { dataSources }) => {
            return dataSources.appsAPI.getAnalysisParameters(analysis.username, analysis.id);
        }
    }
};

module.exports = {
    resolvers,
};