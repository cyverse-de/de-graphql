const { Pool } = require('pg');

// Uses the environment variabled supported by 'pg' to configure the pool.
const pool = new Pool();

module.exports = {
    query: (text, params) => {
        return pool.query(text, params);
    },
};