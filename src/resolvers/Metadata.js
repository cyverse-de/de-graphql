const resolvers = {
    AVU: {
        created_by: async (avu, _args, { dataSources }) => {
            return dataSources.functions.getUserInfo(avu.created_by);
        },

        modified_by: async (avu, _args, { dataSources }) => {
            return dataSources.functions.getUserInfo(avu.modified_by);
        },
    },

    Template: {
        attributes: async (tmpl, _args, { dataSources }) => {
            return dataSources.metadataDatabase.getTemplateAttributesByID(tmpl.id);
        },
    },

    TemplateAttribute: {
        synonyms: async (attr, _args, { dataSources }) => {
            return dataSources.metadataDatabase.getAttributeSynonyms(attr.id);
        },

        enum_values: async (attr, _args, { dataSources }) => {
            return dataSources.metadataDatabase.getAttributeEnumValues(attr.id);
        },

        settings: async (attr, _args, { dataSources }) => {
            return dataSources.metadataDatabase.getAttributeSettings(attr.id);
        },
    },
};

module.exports = {
    resolvers,
};