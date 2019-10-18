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
        name: String
        description: String
        can_share: Boolean
        app: App
        batch_status: AnalysisBatchStatus
        batch: Boolean
        startdate: String
        enddate: String
        status: String
        parent_id: String
        interactive_urls: [String]
        wiki_url: String
        notify: Boolean
        resultfolderid: String
        steps: [AnalysisStep]
        parameters: [AnalysisParameter]
    }
`;

module.exports = {
    analysisType,
};