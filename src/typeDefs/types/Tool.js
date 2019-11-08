const { gql } = require("apollo-server");

const toolType = gql`
    type ContainerDevice {
        id: String
        host_path: String
        container_path: String
    }

    type ContainerPort {
        id: String
        host_port: String
        container_port: String
        bind_to_host: Boolean
    }

    type ContainerVolume {
        id: String
        host_path: String
        container_path: String
    }

    type ContainerVolumesFrom {
        id: String
        name_prefix: String
        read_only: Boolean
        image: ContainerImage
    }

    type ContainerImage {
        id: String
        name: String
        tag: String
        url: String
        deprecated: Boolean
        auth: String
        osg_image_path: String
    }

    type Container {
        max_cpu_cores: Float
        min_cpu_cores: Float
        uid: Int
        name: String
        min_memory_limit: BigInt
        working_directory: String
        skip_tmp_mount: Boolean
        entrypoint: String
        memory_limit: BigInt
        cpu_shares: Int
        network_mode: String
        min_disk_space: BigInt
        pid_limit: Int
        devices: [ContainerDevice]
        volumes: [ContainerVolume]
        volumes_froms: [ContainerVolumesFrom]
    }

    type ToolArchitecture {
        id: String
        name: String
        description: String
    }

    type ToolRequestStatusCode {
        id: String
        name: String
        description: String
        email_template: String
    }

    type ToolRequestStatus {
        id: String
        date_assigned: String
        comments: String

        """UUID of the user that updated the tool request"""
        updater_id: String

        status_code: ToolRequestStatusCode
    }

    type ToolRequest {
        id: String
        phone: String
        tool_name: String
        description: String
        source_url: String
        doc_url: String
        version: String
        attribution: String
        multithreaded: Boolean
        test_data_path: String
        instructions: String
        additional_info: String
        additional_data_file: String

        """UUID of the user that made the tool request"""
        requestor_id: String
        
        statuses: [ToolRequestStatus]
        tool_architecture: ToolArchitecture
    }

    type Tool {
        id: String
        name: String
        description: String
        type: String
        restricted: Boolean
        container: Container
        container_image: ContainerImage
        attribution: String
        version: String
        tool_requests: [ToolRequest]
        location: String
        integrator_name: String
        integrator_email: String
        interactive: Boolean
        time_limit_seconds: BigInt
        gpu_enabled: Boolean
    }
`;

module.exports = {
    toolType,
}