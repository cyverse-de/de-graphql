const { gql } = require("apollo-server");

const query = gql`
    type Query {
        user(username: String): User

        appPermissions(username: String, appID: String, systemID: String): [AppPermission]
        
        analysis(username: String, analysisID: String): Analysis

        app(username: String, appID: String, systemID: String): App
    }
`;

module.exports = {
    query,
}