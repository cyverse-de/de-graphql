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
        app_step: AppStep
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
        app: App 
        avus: [AVU]
        deleted: Boolean
        description: String
        end_date: String
        id: String
        name: String
        notify: Boolean
        parameters: [AnalysisParameter]
        parent_id: String
        permissions: [Permission]
        planned_end_date: String
        result_folder_path: String
        start_date: String
        status: String
        steps: [AnalysisStep]
        subdomain: String
        system_id: String
        type: String
        username: String
    }
`;

module.exports = {
    analysisType,
};