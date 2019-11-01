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

    type ToolRequest {
        id: String
        status: String
    }

    type ToolImplementation {
        implementor: String
        implementor_email: String
    }

    type Tool {
        id: String
        name: String
        description: String
        type: String
        restricted: Boolean
        is_public: Boolean
        container: Container
        container_image: ContainerImage
        attribution: String
        version: String
        tool_request: ToolRequest
        location: String
        implementation: ToolImplementation
        time_limit_seconds: BigInt
    }
`;

module.exports = {
    toolType,
}