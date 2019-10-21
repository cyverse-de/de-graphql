const { Pool } = require('pg');

console.log(`DE_DB_URL: ${process.env.DE_DB_URL}`);

// Uses the environment variabled supported by 'pg' to configure the pool.
const pool = new Pool({
    connectionString: process.env.DE_DB_URL,
});

module.exports = {
    query: (text, params) => {
        return pool.query(text, params);
    },
};
