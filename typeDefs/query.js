const { gql } = require("apollo-server");

const query = gql`
    type Query {
        user(username: String): User
        appPermissions(username: String, appID: String, systemID: String): [AppPermission]
    }
`;

module.exports = {
    query,
}