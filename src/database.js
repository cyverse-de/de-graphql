const { Pool } = require('pg');

// Uses the environment variabled supported by 'pg' to configure the pool.
const deDBpool = new Pool({
    connectionString: process.env.DE_DB_URL,
});

const metadataDBpool = new Pool({
    connectionString: process.env.METADATA_DB_URL,
});

module.exports = {
    queryDEDB: (text, params) => {
        return deDBpool.query(text, params);
    },

    queryMetadataDB: (text, params) => {
        return metadataDBpool.query(text, params);
    },
};
