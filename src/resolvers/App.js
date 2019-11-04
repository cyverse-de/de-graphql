const resolvers = {
    App: {
        parameters: async (app, _args, { dataSources }) => {
            return dataSources.deDatabase.appParametersByID(app.id);
        },

        permissions: async (app, _args, { dataSources }) => {
            return dataSources.permissionsService.getAppPermissions(app.id);
        },

        documentation: async (app, _args, { dataSources }) => {
            return dataSources.deDatabase.appDocsByID(app.id);
        },

        references: async (app, _args, { dataSources }) => {
            return dataSources.deDatabase.appReferencesByID(app.id);
        },

        avus: async (app, _args, { dataSources }) => {
            return dataSources.metadataDatabase.getAVUs('app', app.id);
        },

        comments: async (app, _args, { dataSources }) => {
            return dataSources.metadataDatabase.getComments('app', app.id);
        },

        steps: async (app, _args, { dataSources }) => {
            return dataSources.deDatabase.getAppStepsByAppID(app.id);
        },
    },

    AppStep: {
        tool: async (app, _args, { dataSources }) => {

        },
    },

    AppDocumentation: {
        created_by: async (doc, _args, { dataSources }) => {
            const username = await dataSources.deDatabase.getUsername(doc.created_by);
            if (username !== null) {
                return dataSources.functions.getUserInfo(username);
            } else {
                return null;
            }
        },

        modified_by: async (doc, _args, { dataSources }) => {
            const username = await dataSources.deDatabase.getUsername(doc.modified_by);
            if (username !== null) {
                return dataSources.functions.getUserInfo(username);
            } else {
                return null;
            }
        },
    },
};

module.exports = {
    resolvers,
};