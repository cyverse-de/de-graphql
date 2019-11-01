const { RESTDataSource } = require('apollo-datasource-rest');
const { _ } = require('lodash');

class AppsService extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = process.env.APPS_URL;
    }

    async getUserInfo(username) {
        username = username.replace("@iplantcollaborative.org", "")
        const data = await this.get(`users/authenticated?user=${username}`);
        return data.id;
    }

    async getUserWebhooks(username) {
        username = username.replace("@iplantcollaborative.org", "")
        const data = await this.get(`webhooks?user=${username}`);
        return data.webhooks;
    }

    async getAccessibleApps(username) {
        username = username.replace("@iplantcollaborative.org", "")
        const data = await this.get(`apps?user=${username}`);
        return data.apps;
    }

    async getSystemIDs(username) {
        username = username.replace("@iplantcollaborative.org", "")
        const data = await this.get(`bootstrap?user=${username}`);
        return data.system_ids;
    }

    async getWorkspace(username) {
        username = username.replace("@iplantcollaborative.org", "")
        const data = await this.get(`workspaces?user=${username}`);
        const { 'user_id': _, ...newData } = data;
        return newData;
    }

    async getTools(username) {
        username = username.replace("@iplantcollaborative.org", "")
        const data = await this.get(`tools?user=${username}`);
        return data.tools;
    }

    async getAppPermissions(username, appID, systemID) {
        username = username.replace("@iplantcollaborative.org", "")
        const data = await this.post(
            `apps/permission-lister?user=${username}`,
            {
                'apps' : [
                    {
                        'system_id' : systemID,
                        'app_id': appID,
                    },
                ],
            },
        )
        return data.apps[0].permissions;
    }

    async getAnalyses(username) {
        username = username.replace("@iplantcollaborative.org", "")
        const data = await this.get(`analyses?user=${username}`);
        return data.analyses;
    }

    async getAnalysis(username, analysisID) {
        username = username.replace("@iplantcollaborative.org", "")
        const filter = JSON.stringify([{'field':'id', 'value':analysisID}])
        const data = await this.get(`analyses?user=${username}&filter=${filter}`);
        return data.analyses[0];
    }

    async getAnalysisSteps(username, analysisID) {
        username = username.replace("@iplantcollaborative.org", "")
        const data = await this.get(`analyses/${analysisID}/history?user=${username}`);
        return data.steps;
    }

    async getAnalysisParameters(username, analysisID) {
        username = username.replace("@iplantcollaborative.org", "")
        const data = await this.get(`analyses/${analysisID}/parameters?user=${username}`);
        return data.parameters;
    }

    async getApp(username, appID, systemID) {
        username = username.replace("@iplantcollaborative.org", "")
        return await this.get(`apps/${systemID}/${appID}?user=${username}`);
    }
}

module.exports = {
    AppsService,
};