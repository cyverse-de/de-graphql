const { gql } = require("apollo-server");

const permissionType = gql`
    type PermissionResource {
        id: String
        name: String
        resource_type: String
    }

    type PermissionSubject {
        id: String
        subject_id: String
        subject_source_id: String
        subject_type: String
    }

    type Permission {
        id: String
        permission_level: String
        resource: PermissionResource
        subject: PermissionSubject
    }
`;

module.exports = {
    permissionType,
};