const { gql } = require("apollo-server");

const templateType = gql`

    type TemplateAttributeValueType {
        id: String
        name: String
    }

    type TemplateAttributeEnumValue {
        id: String
        value: String
        is_default: Boolean
        display_order: Int
    }

    type TemplateAttributeSynonym {
        id: String
        name: String
        description: String
        required: Boolean
        value_type: TemplateAttributeValueType
        created_by: String
        modified_by: String
        created_on: String
        modified_on: String
        settings: JSON
        display_order: Int
        enum_values: [TemplateAttributeEnumValue]
    }

    type TemplateAttribute {
        id: String
        name: String
        description: String
        required: Boolean
        value_type: TemplateAttributeValueType
        created_by: String
        modified_by: String
        created_on: String
        modified_on: String
        settings: JSON
        display_order: Int
        parent_id: String
        enum_values: [TemplateAttributeEnumValue]

        """Recursive"""
        synonyms: [TemplateAttributeSynonym]
    }

    type Template {
        id: String
        name: String
        deleted: Boolean
        created_by: String
        modified_by: String
        created_on: String
        modified_on: String
        description: String

        """Recursive, will contain attributes of attributes"""
        attributes: [TemplateAttribute] 

    }

`;

module.exports = {
    templateType,
};