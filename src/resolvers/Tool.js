const resolvers = {
    Tool: {
        container: async (tool, _args, { dataSources }) => {
            return dataSources.deDatabase.getContainerSettingsByToolID(tool.id);
        },

        container_image: async (tool, _args, { dataSources }) => {
            return dataSources.deDatabase.getContainerImageByToolID(tool.id);
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