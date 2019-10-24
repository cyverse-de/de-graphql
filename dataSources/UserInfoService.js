const { RESTDataSource } = require('apollo-datasource-rest');

class UserInfoService extends RESTDataSource {
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

module.exports = {
    UserInfoService,
};