const { gql } = require("apollo-server");


const appType = gql`
    scalar JSON
    scalar BigInt

    type AppRating {
        average: Float
        total: Float
        user: Int
        comment_id: Int
    }

    type AppPipelineEligibility {
        is_valid: Boolean
        reason: String
    }

    type AppPermissionSubject {
        source_id: String
        id: String
    }

    type AppPermission {
        subject: AppPermissionSubject
        permission: String
    }

    type AppRequirements {
        min_cpu_cores: Int
        min_memory_limit: BigInt
        min_disk_space: BigInt
        max_cpu_cores: Int
        memory_limit: BigInt
        step_number: Int
    }

    type App {
        id: String

        app_type: String
        beta: Boolean
        can_favor: Boolean
        can_rate: Boolean
        can_run: Boolean
        debug: Boolean
        deleted: Boolean
        description: String
        disabled: Boolean
        edited_date: String

        """Here lies a recursive data structure. Beware."""
        groups: [JSON]

        integration_date: String
        integrator_email: String
        integrator_name: String
        is_favorite: Boolean
        is_public: Boolean
        label: String
        name: String
        permission: String
        pipeline_eligibility: AppPipelineEligibility
        rating: AppRating
        requirements: [AppRequirements]
        step_count: Int
        system_id: String
        wiki_url: String
    }
`;

module.exports = {
    appType,
};