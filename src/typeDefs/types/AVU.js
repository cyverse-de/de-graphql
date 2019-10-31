const { gql } = require("apollo-server");

const AVUType = gql`

    type AVU {
        id: String
        attribute: String
        value: String
        unit: String
        target_id: String
        target_type: String
        created_on: String
        created_by: User
        modified_on: String
        modified_by: User
    }

`;

module.exports = {
    AVUType,
};