const GraphQLJSON = require('graphql-type-json');
const BigInt = require('graphql-bigint');
const { _ } = require('lodash');

const resolvers = {
    JSON: GraphQLJSON,
    
    BigInt: BigInt,

    Query: {
        user: async (_source, { username }, { dataSources }) => {
            return dataSources.functions.getUserInfo(username);
        },

        appPermissions: async (_source, { username, appID, systemID}, { dataSources }) => {
            return await dataSources.appsService.getAppPermissions(username, appID, systemID);
        },

        analysis: async (_source, { username, analysisID }, { dataSources }) => {
            return await dataSources.deDatabase.analysisLookupsByIDAndUser(username, analysisID);
        },

        app: async (_source, { username, appID, systemID }, { dataSources }) => {
            return await dataSources.appsService.getApp(username, appID, systemID);
        },

        analysesByStatus: async (_source, { status }, { dataSources }) => {
            return await dataSources.deDatabase.analysisLookupsByStatus(status);
        },

        analysisByExternalID: async (_source, { externalID }, { dataSources }) => {
            return await dataSources.deDatabase.analysisLookupsByExternalID(externalID);
        },

        analysisByID: async (_source, { analysisID }, { dataSources }) => {
            return await dataSources.deDatabase.analysisLookupsByID(analysisID);
        },
    },

    User: {
        id: async (user, _args, { dataSources }) => {
            return dataSources.appsService.getUserInfo(user.username)
        },

        saved_searches: async (user, _args, { dataSources }) => {
            return dataSources.userInfoService.getSavedSearches(user.username);
        },

        session: async (user, _args, { dataSources }) => {
            return dataSources.userInfoService.getSession(user.username);
        },

        preferences: async (user, _args, { dataSources }) => {
            return dataSources.userInfoService.getPreferences(user.username);
        },

        webhooks: async (user, _args, { dataSources }) => {
            return dataSources.appsService.getUserWebhooks(user.username);
        },

        accessible_apps: async (user, _args, { dataSources }) => {
            return dataSources.appsService.getAccessibleApps(user.username);
        },

        workspace: async (user, _args, { dataSources }) => {
            return dataSources.appsService.getWorkspace(user.username);
        },

        system_ids: async (user, _args, { dataSources }) => {
            return dataSources.appsService.getSystemIDs(user.username);
        },

        analyses: async (user, _args, { dataSources }) => {
            return dataSources.appsService.getAnalyses(user.username);
        },

        tools: async (user, _args, { dataSources }) => {
            return dataSources.appsService.getTools(user.username);
        }
    },

    Analysis: {
        app: async (analysis, _args, { dataSources }) => {
            return dataSources.appsService.getApp(analysis.username, analysis.app_id, analysis.system_id)
        },

        steps: async (analysis, _args, { dataSources }) => {
            return dataSources.appsService.getAnalysisSteps(analysis.username, analysis.id);
        },

        parameters: async (analysis, _args, { dataSources }) => {
            return dataSources.appsService.getAnalysisParameters(analysis.username, analysis.id);
        }
    }
};

module.exports = {
    resolvers,
};