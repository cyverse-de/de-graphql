const GraphQLJSON = require('graphql-type-json');
const BigInt = require('graphql-bigint');
const { _ } = require('lodash');

const resolvers = {
    JSON: GraphQLJSON,
    
    BigInt: BigInt,

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

    AVU: {
        created_by: async (avu, _args, { dataSources }) => {
            return dataSources.functions.getUserInfo(avu.created_by);
        },

        modified_by: async (avu, _args, { dataSources }) => {
            return dataSources.functions.getUserInfo(avu.modified_by);
        },
    },

    Template: {
        attributes: async (tmpl, _args, { dataSources }) => {
            return dataSources.metadataDatabase.getTemplateAttributesByID(tmpl.id);
        },
    },

    TemplateAttribute: {
        synonyms: async (attr, _args, { dataSources }) => {
            return dataSources.metadataDatabase.getAttributeSynonyms(attr.id);
        },

        enum_values: async (attr, _args, { dataSources }) => {
            return dataSources.metadataDatabase.getAttributeEnumValues(attr.id);
        },

        settings: async (attr, _args, { dataSources }) => {
            return dataSources.metadataDatabase.getAttributeSettings(attr.id);
        },
    },

    Tool: {
        container: async (tool, _args, { dataSources }) => {
            return dataSources.deDatabase.getContainerSettingsByToolID(tool.id);
        },

        container_image: async (tool, _args, { dataSources }) => {
            return dataSources.deDatabase.getContainerImageByToolID(tool.id);
        },
    },

    Container: {
        volumes_froms: async (container, _args, { dataSources }) => {
            return dataSources.deDatabase.getContainerVolumesFromsByContainerID(container.id);
        },

        volumes: async (container, _args, { dataSources }) => {
            return dataSources.deDatabase.getContainerVolumesByContainerID(container.id);
        },

        devices: async (container, _args, { dataSources }) => {
            return dataSources.deDatabase.getContainerDevicesByContainerID(container.id);
        }
    },

    ContainerVolumesFrom: {
        image: async (vf, _args, { dataSources }) => {
            console.log(vf);
            return dataSources.deDatabase.getContainerImageByID(vf.container_images_id);
        },
    },
};

module.exports = {
    resolvers,
};