const { DataSource } = require('apollo-datasource');
const { query } = require('../database');

const analysisSelectBase = `
SELECT jobs.id,
       users.username,
       jobs.status,
       jobs.job_name AS name,
       jobs.job_description AS description,
       jobs.start_date,
       jobs.end_date,
       jobs.result_folder_path ,
       jobs.app_id,
       jobs.app_name,
       jobs.app_description,
       job_types.name AS type,
       job_types.system_id,
       jobs.planned_end_date,
       jobs.subdomain,
       jobs.notify,
       jobs.deleted
  FROM jobs
  JOIN users ON users.id = jobs.user_id
  JOIN job_types ON job_types.id = jobs.job_type_id
`

const lookupsByStatusQuery = `
${analysisSelectBase}
 WHERE jobs.status = $1
`

const lookupsByExternalIDQuery = `
${analysisSelectBase}
  JOIN job_steps ON job_steps.job_id = jobs.id
 WHERE job_steps.external_id = $1
 LIMIT 1
`
const lookupsByIDQuery = `
${analysisSelectBase}
 WHERE jobs.id = $1
`

const lookupsByIDAndUserQuery = `
${analysisSelectBase}
 WHERE jobs.id = $1
   AND users.username = $2
`

const lookupsByUserQuery = `
${analysisSelectBase}
 WHERE users.username = $1
`

const fixUsername = (username) => {
    if (!username.endsWith("@iplantcollaborative.org")) {
        username = username.concat("@iplantcollaborative.org")
    }
    return username
}

class DEDatabase extends DataSource {
    async analysisLookupsByStatus(status) {
        const normalizedStatus = status.charAt(0).toUpperCase() + status.toLowerCase().slice(1);
        const results = await query(lookupsByStatusQuery, [normalizedStatus]);
        return results.rows;
    }

    async analysisLookupsByExternalID(externalID) {
        const results = await query(lookupsByExternalIDQuery, [externalID]);
        return results.rows[0];
    }

    async analysisLookupsByID(analysisID) {
        const results = await query(lookupsByIDQuery, [analysisID]);
        return results.rows[0];
    }

    async analysisLookupsByIDAndUser(username, analysisID) {
        username = fixUsername(username);
        const results = await query(lookupsByIDAndUserQuery, [analysisID, username]);
        return results.rows[0];
    }

    async analysesLookupsByUser(username) {
        username = fixUsername(username);
        const results = await query(lookupsByUserQuery, [username]);
        return results.rows;
    }
}

module.exports = {
    DEDatabase,
};