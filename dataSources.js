const { RESTDataSource } = require('apollo-datasource-rest');
const { DataSource } = require('apollo-datasource');
const { query } = require('./database');

class FunctionAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = process.env.GATEWAY;
    }

    async getUserInfo(username) {
        var data =  await this.post(
            'function/get-user-info',
            {'username':username},
        )

        // Need to rename the id field to username
        data = JSON.parse(data);
        data.username = data.id
        delete data.id
        
        return data;
    }
}

class AppsAPI extends RESTDataSource {
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

class UserInfoAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = process.env.USER_INFO_URL;
    }

    async getSession(username) {
        const data = await this.get(`sessions/${username}@iplantcollaborative.org`);
        return JSON.parse(data);
    }

    async getSavedSearches(username) {
        const data = await this.get(`searches/${username}@iplantcollaborative.org`);
        return JSON.parse(data);
    }

    async getPreferences(username) {
        const data = await this.get(`preferences/${username}@iplantcollaborative.org`);
        return JSON.parse(data);
    }
}

const lookupsByStatusQuery = `
    SELECT jobs.id,
           users.username,
           jobs.status,
           jobs.job_name AS name,
           jobs.job_description AS description,
           jobs.start_date,
           jobs.end_date,
           jobs.result_folder_path AS resultfolderid,
           jobs.app_id,
           jobs.app_name,
           jobs.app_description,
           job_types.name AS type,
           job_types.system_id,
           jobs.planned_end_date,
           jobs.subdomain,
           jobs.notify,
           jobs.deleted
      FROM jobs
      JOIN users ON users.id = jobs.user_id
      JOIN job_types ON job_types.id = jobs.job_type_id
     WHERE jobs.status = $1
`

class PGDataSource extends DataSource {
    async analysisLookupsByStatus(status) {
        const normalizedStatus = status.charAt(0).toUpperCase() + status.toLowerCase().slice(1);
        const results = await query(lookupsByStatusQuery, [normalizedStatus]);
        return results.rows;
    }
}


module.exports = {
    FunctionAPI,
    AppsAPI,
    UserInfoAPI,
    PGDataSource,
}