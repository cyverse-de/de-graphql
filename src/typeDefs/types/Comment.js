const { gql } = require("apollo-server");

const commentType = gql`

type Comment {
    id: String
    value: String
    post_time: String
    retracted: Boolean
    retracted_by: String
    deleted: Boolean
    target_id: String
    target_type: String
    owner: String
}
`;

module.exports = {
    commentType,
};