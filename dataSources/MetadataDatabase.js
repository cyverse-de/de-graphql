const { DataSource } = require('apollo-datasource');
const { queryMetadataDB } = require('../database');

const avusQuery = `
WITH RECURSIVE getavus AS (
    SELECT id,
           attribute,
           value,
           unit,
           target_id,
           target_type,
           created_by,
           created_on,
           modified_by,
           modified_on
      FROM avus
     WHERE target_id = $2
       AND target_type = $1

    UNION

    SELECT a.id,
           a.attribute,
           a.value,
           a.unit,
           a.target_id,
           a.target_type,
           a.created_by,
           a.created_on,
           a.modified_by,
           a.modified_on
      FROM avus a JOIN getavus ON a.target_id = getavus.id
)

SELECT * FROM getavus;
`;

const templateBaseQuery = `
SELECT t.id,
       t.name,
       t.deleted,
       t.created_by,
       t.modified_by,
       t.created_on,
       t.modified_on,
       t.description
  FROM templates t
`

const templateByIDQuery = `
${templateBaseQuery}
 WHERE t.id = $1
`;

const templatesByCreatorQuery = `
${templateBaseQuery}
 WHERE t.created_by = $1
`;

const templateQuery = `
SELECT t.id,
       t.name,
       t.deleted,
       t.created_by,
       t.modified_by,
       t.created_on,
       t.modified_on,
       t.description
  FROM templates t
 WHERE t.id = $1
`

const templateAttrsQuery = `
WITH RECURSIVE gettemplateattrs AS (
    SELECT a.id,
           a.name,
           a.description,
           a.required,
           v.name AS value_type,
           a.created_by,
           a.created_on,
           a.modified_by,
           a.modified_on,
           t.display_order,
           aa.parent_id
      FROM attributes a
      JOIN value_types v ON a.value_type_id = v.id
      JOIN template_attrs t ON a.id = t.attribute_id
      LEFT JOIN attr_attrs aa ON a.id = aa.child_id
     WHERE t.template_id = $1

    UNION
     
    SELECT a1.id,
           a1.name,
           a1.description,
           a1.required,
           v.name AS value_type,
           a1.created_by,
           a1.created_on,
           a1.modified_by,
           a1.modified_on,
           gt.display_order,
           aa1.parent_id
      FROM attributes a1
      JOIN value_types v ON a1.value_type_id = v.id
      JOIN attr_attrs aa1 ON a1.id = aa1.child_id
      JOIN gettemplateattrs gt ON aa1.parent_id = gt.id 
)

SELECT * from gettemplateattrs;
`

const attrSynonymsQuery = `
WITH RECURSIVE getsynonyms AS (
    SELECT a.id,
           a.name,
           a.description,
           a.required,
           v.name AS value_type,
           a.created_by,
           a.created_on,
           a.modified_by,
           a.modified_on,
           t.display_order
      FROM attributes a
      JOIN value_types v ON a.value_type_id = v.id
      JOIN template_attrs t ON a.id = t.attribute_id
      JOIN attr_synonyms syn ON syn.attribute_id = a.id
     WHERE syn.attribute_id = $1
    
    UNION

    SELECT a1.id,
           a1.name,
           a1.description,
           a1.required,
           v1.name AS value_type,
           a1.created_by,
           a1.created_on,
           a1.modified_by,
           a1.modified_on,
           gs.display_order
      FROM attributes a1
      JOIN value_types v1 ON a1.value_type_id = v1.id
      JOIN attr_synonyms syn1 ON a1.id = syn1.synonym_id
      JOIN getsynonyms gs ON syn1.attribute_id = gs.id
)

SELECT * from getsynonyms;
`;

const attrEnumValuesQuery = `
SELECT v.id,
       v.value,
       v.is_default,
       v.display_order
  FROM attr_enum_values v
 WHERE v.attribute_id = $1
`;

const attrSettingsQuery = `
SELECT a.settings
  FROM attributes a
 WHERE a.id = $1
`;

const valid_target_types = ['analysis', 'app', 'avu', 'file', 'folder', 'user'];

class MetadataDatabase extends DataSource {
    
    async getAVUs(target_type, target_id) {
        target_type = target_type.toLowerCase();

        if (!valid_target_types.includes(target_type)) {
            throw `invalid target type: ${target_type}`;
        }

        const results = await queryMetadataDB(avusQuery, [target_type, target_id]);
        return results.rows;
    }

    async getTemplateByID(template_id) {
        const results = await queryMetadataDB(templateByIDQuery, [template_id]);
        return results.rows[0] || null;
    }

    async getTemplatesByCreator(username) {
        const results = await queryMetadataDB(templatesByCreatorQuery, [username]);
        return results.rows;
    }

    async getAllTemplates() {
        const results = await queryMetadataDB(templateBaseQuery, []);
        return results.rows;
    }

    async getTemplateAttributesByID(template_id) {
        const results = await queryMetadataDB(templateAttrsQuery, [template_id]);
        return results.rows;
    }

    async getAttributeSynonyms(attribute_id) {
        const results = await queryMetadataDB(attrSynonymsQuery, [attribute_id]);
        return results.rows;
    }

    async getAttributeEnumValues(attribute_id) {
        const results = await queryMetadataDB(attrEnumValuesQuery, [attribute_id]);
        return results.rows;
    }

    async getAttributeSettings(attribute_id) {
        const results = await queryMetadataDB(attrSettingsQuery, [attribute_id]);
        return results.rows[0] || null;
    }
}

module.exports = {
    MetadataDatabase,
};