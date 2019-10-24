const { RESTDataSource } = require('apollo-datasource-rest');

class PermissionsService extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = process.env.PERMISSIONS_URL;
    }

    async getAnalysisPermissions(analysisID) {
        const data = await this.get(`permissions/resources/analysis/${analysisID}`);
        return data.permissions;
    }

    async getAppPermissions(appID) {
        const data = await this.get(`permissions/resources/app/${appID}`);
        return data.permissions;
    }

    async getToolPermissions(toolID) {
        const data = await this.get(`permissions/resources/tool/${toolID}`);
        return data.permissions;
    }
}

module.exports = {
    PermissionsService,
};