const resolvers = {
    Query: {
        user: async (_source, { username }, { dataSources }) => {
            var baseInfo = await dataSources.functions.getUserInfo(username);
            baseInfo["id"] = await dataSources.appsService.getUserInfo(username);
            return baseInfo;
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

        templates: async (_source, {}, { dataSources }) => {
            return dataSources.metadataDatabase.getAllTemplates();
        },
    },
};

module.exports = {
    resolvers,
};