const resolvers = {
    Analysis: {
        app: async (analysis, _args, { dataSources }) => {
            return dataSources.appsService.getApp(analysis.username, analysis.app_id, analysis.system_id)
        },

        steps: async (analysis, _args, { dataSources }) => {
            return dataSources.deDatabase.getAnalysisStepsByID(analysis.id);
        },

        parameters: async (analysis, _args, { dataSources }) => {
            return dataSources.appsService.getAnalysisParameters(analysis.username, analysis.id);
        },

        permissions: async (analysis, _args, { dataSources }) => {
            return dataSources.permissionsService.getAnalysisPermissions(analysis.id);
        },

        avus: async (analysis, _args, { dataSources }) => {
            return dataSources.metadataDatabase.getAVUs('analysis', analysis.id);
        },
    },

    AnalysisStep: {
        updates: async (step, _args, { dataSources }) => {
            return dataSources.deDatabase.getAnalysisStepUpdates(step.external_id);
        },

        app_step: async (step, _args, { dataSources }) => {
            console.log(step);
            // step.app_id comes from the database but isn't in the graphql schema. which is fine.
            return dataSources.deDatabase.getAppStepByNumberAndAppID(step.app_step_number, step.app_id);
        },
    },
};

module.exports = {
    resolvers,
};