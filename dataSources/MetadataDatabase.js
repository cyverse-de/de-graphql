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
}

module.exports = {
    MetadataDatabase,
};