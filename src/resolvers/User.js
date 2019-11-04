const resolvers = {
    User: {
        // id: async (user, _args, { dataSources }) => {
        //     return dataSources.appsService.getUserInfo(user.username)
        // },

        saved_searches: async (user, _args, { dataSources }) => {
            return dataSources.deDatabase.getUserSavedSearches(user.id);
        },

        session: async (user, _args, { dataSources }) => {
            return dataSources.deDatabase.getUserSession(user.id);
        },

        preferences: async (user, _args, { dataSources }) => {
            return dataSources.deDatabase.getUserPreferences(user.id);
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
            return dataSources.deDatabase.analysesLookupsByUser(user.username);
        },

        tools: async (user, _args, { dataSources }) => {
            return dataSources.appsService.getTools(user.username);
        },

        avus: async (user, _args, { dataSources }) => {
            return dataSources.metadataDatabase.getAVUs('user', user.id);
        },
    },
};

module.exports = {
    resolvers,
};