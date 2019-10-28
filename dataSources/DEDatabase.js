const { DataSource } = require('apollo-datasource');
const { query } = require('../database');

// Common fields and joins for getting information about an analysis
// from the database.
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

// Added to the analysisSelectBase to allow for finding analyses by their
// current status.
const lookupsByStatusQuery = `
${analysisSelectBase}
 WHERE jobs.status = $1
`

// Added to the analysisSelectBase to allow for finding analyses by the
// external id of a job step.
const lookupsByExternalIDQuery = `
${analysisSelectBase}
  JOIN job_steps ON job_steps.job_id = jobs.id
 WHERE job_steps.external_id = $1
 LIMIT 1
`

// Added to the analysisSelectBase to allow for finding an analysis by
// its UUID.
const lookupsByIDQuery = `
${analysisSelectBase}
 WHERE jobs.id = $1
`

// Added to the analysisSelectBase to allow for finding an analysis by
// its UUID and the username of the user that launched it.
const lookupsByIDAndUserQuery = `
${analysisSelectBase}
 WHERE jobs.id = $1
   AND users.username = $2
`

// Added to the analysisSelectBase to allow for finding analyses by
// the username of the user that launched them.
const lookupsByUserQuery = `
${analysisSelectBase}
 WHERE users.username = $1
`

// Adds '@iplantcollaborative.org' to the username if it's not already
// present. The database uses <user>@iplantcollaborative.org, while
// most of the services only need the <user> part.
const fixUsername = (username) => {
    if (!username.endsWith("@iplantcollaborative.org")) {
        username = username.concat("@iplantcollaborative.org")
    }
    return username
}

// A custom Apollo data source capable of getting information out of the DE database.
class DEDatabase extends DataSource {

    // Returns a list of analyses found by their current status. Check the analysisBaseSelect
    // string to see the names of the keys in the objects returned. The column names become the
    // field names in the objects.
    async analysisLookupsByStatus(status) {
        const normalizedStatus = status.charAt(0).toUpperCase() + status.toLowerCase().slice(1);
        const results = await query(lookupsByStatusQuery, [normalizedStatus]);
        return results.rows;
    }

    // Returns a single analysis found by an external ID. Returns null if nothing is found. 
    // Check the analysisBaseSelect string to see the names of the keys in the object returned, the
    // column names become the field names in the object.
    async analysisLookupsByExternalID(externalID) {
        const results = await query(lookupsByExternalIDQuery, [externalID]);
        return results.rows[0] || null;
    }

    // Returns a single analysis found by its UUID. Returns null if nothing is found. 
    // Check the analysisBaseSelect string to see the names of the keys in the object returned, the
    // column names become the field names in the object.
    async analysisLookupsByID(analysisID) {
        const results = await query(lookupsByIDQuery, [analysisID]);
        return results.rows[0] || null;
    }

    // Returns a single analysis found by the username of the user that launched it and the UUID it
    // was assigned. Returns null if nothing is found. Check the analysisBaseSelect string to see 
    // the names of the keys in the object returned, the column names become the field names in the object.
    async analysisLookupsByIDAndUser(username, analysisID) {
        username = fixUsername(username);
        const results = await query(lookupsByIDAndUserQuery, [analysisID, username]);
        return results.rows[0] || null;
    }

    // Returns a list of analyses found by the username of the user that launched them. Returns an empty
    // list if nothing is found. Check the analysisBaseSelect string to see the names of the keys in the 
    // objects returned. The column names become the field names in the objects.
    async analysesLookupsByUser(username) {
        username = fixUsername(username);
        const results = await query(lookupsByUserQuery, [username]);
        return results.rows;
    }
}

module.exports = {
    DEDatabase,
};