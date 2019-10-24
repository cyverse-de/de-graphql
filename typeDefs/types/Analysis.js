const { gql } = require("apollo-server");

const analysisType = gql`
    type AnalysisBatchStatus {
        total: Int
        completed: Int
        running: Int
        submitted: Int
    }

    type AnalysisStepUpdate {
        status: String
        message: String
        timestamp: String
    }

    type AnalysisStep {
        step_number: Int
        external_id: String
        startdate: String
        enddate: String
        status: String
        app_step_number: Int
        step_type: String
        updates: [AnalysisStepUpdate]
    }

    type AnalysisParameterValue {
        value: JSON
    }

    type AnalysisParameter {
        param_type: String
        param_id: String
        info_type: String
        is_default_value: Boolean
        param_name: String
        parameter_value: AnalysisParameterValue
        is_visible: Boolean
        full_param_id: String
        data_format: String
    }

    type Analysis {
        id: String

        app: App
        batch: Boolean
        batch_status: AnalysisBatchStatus
        can_share: Boolean
        deleted: Boolean
        description: String
        enddate: String
        interactive_urls: [String]
        name: String
        notify: Boolean
        parameters: [AnalysisParameter]
        permissions: [Permission]
        parent_id: String
        planned_end_date: String
        resultfolderid: String
        startdate: String
        status: String
        steps: [AnalysisStep]
        subdomain: String
        system_id: String
        type: String
        wiki_url: String
    }

    type AnalysisListingEntry {
        id: String
        username: String
        status: String
        name: String
        description: String
        startdate: String
        enddate: String
        resultfolderid: String
        app_id: String
        app_name: String
        app_description: String
        type: String
        system_id: String
        planned_end_date: String
        subdomain: String
        notify: Boolean
        deleted: Boolean
    }
`;

module.exports = {
    analysisType,
};