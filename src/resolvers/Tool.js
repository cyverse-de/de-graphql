const resolvers = {
    Tool: {
        container: async (tool, _args, { dataSources }) => {
            return dataSources.deDatabase.getContainerSettingsByToolID(tool.id);
        },

        container_image: async (tool, _args, { dataSources }) => {
            return dataSources.deDatabase.getContainerImageByToolID(tool.id);
        },

        tool_requests: async (tool, _args, { dataSources }) => {
            return dataSources.deDatabase.getToolRequests(tool.id);
        },

        gpu_enabled: async (tool, _args, { dataSources }) => {
            return dataSources.deDatabase.getGPUEnabled(tool.id);
        }
    },

    ToolRequest: {
        tool_architecture: async (request, _args, { dataSources }) => {
            return dataSources.deDatabase.getToolArchitecture(request.tool_architecture_id);
        },

        statuses: async (request, _args, { dataSources }) => {
            return dataSources.deDatabase.getToolRequestStatuses(request.id);
        },
    },

    ToolRequestStatus: {
        status_code: async (status, _args, { dataSources }) => {
            return dataSources.deDatabase.getToolRequestStatusCode(status.tool_request_status_code_id);
        },
    },

    Container: {
        volumes_froms: async (container, _args, { dataSources }) => {
            return dataSources.deDatabase.getContainerVolumesFromsByContainerID(container.id);
        },

        volumes: async (container, _args, { dataSources }) => {
            return dataSources.deDatabase.getContainerVolumesByContainerID(container.id);
        },

        devices: async (container, _args, { dataSources }) => {
            return dataSources.deDatabase.getContainerDevicesByContainerID(container.id);
        }
    },

    ContainerVolumesFrom: {
        image: async (vf, _args, { dataSources }) => {
            console.log(vf);
            return dataSources.deDatabase.getContainerImageByID(vf.container_images_id);
        },
    },
};

module.exports = {
    resolvers,
};