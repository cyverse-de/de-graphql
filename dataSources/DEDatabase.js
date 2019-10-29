const { DataSource } = require('apollo-datasource');
const { queryDEDB } = require('../database');

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

// Query to get the parameters for an app.
const appParametersQuery = `
SELECT p.id,
       p.name,
       p.description,
       p.label,
       (SELECT pv.value AS default_value
          FROM parameter_values pv
         WHERE pv.parameter_id = p.id
           AND pv.is_default = true) AS default_value,
       p.is_visible,
       p.ordering,
       p.parameter_type AS type,
       p.value_type,
       p.is_implicit,
       p.info_type,
       p.data_format,
       s.id AS step_id,
       t.external_app_id
  FROM task_param_listing p
  JOIN app_steps s ON s.task_id = p.task_id
  JOIN tasks t ON p.task_id = t.id
  JOIN apps ON apps.id = s.app_id
 WHERE apps.id = $1
`

// Query to get the app references for an app.
const appReferencesQuery = `
SELECT r.id,
       r.reference_text
  FROM app_references r
 WHERE app_id = $1
`

// Query to get the app documentation
const appDocsQuery = `
SELECT d.value,
       d.created_on,
       d.modified_on,
       d.created_by,
       d.modified_by
  FROM app_documentation d
 WHERE d.app_id = $1
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
        const results = await queryDEDB(lookupsByStatusQuery, [normalizedStatus]);
        return results.rows;
    }

    // Returns a single analysis found by an external ID. Returns null if nothing is found. 
    // Check the analysisBaseSelect string to see the names of the keys in the object returned, the
    // column names become the field names in the object.
    async analysisLookupsByExternalID(externalID) {
        const results = await queryDEDB(lookupsByExternalIDQuery, [externalID]);
        return results.rows[0] || null;
    }

    // Returns a single analysis found by its UUID. Returns null if nothing is found. 
    // Check the analysisBaseSelect string to see the names of the keys in the object returned, the
    // column names become the field names in the object.
    async analysisLookupsByID(analysisID) {
        const results = await queryDEDB(lookupsByIDQuery, [analysisID]);
        return results.rows[0] || null;
    }

    // Returns a single analysis found by the username of the user that launched it and the UUID it
    // was assigned. Returns null if nothing is found. Check the analysisBaseSelect string to see 
    // the names of the keys in the object returned, the column names become the field names in the object.
    async analysisLookupsByIDAndUser(username, analysisID) {
        username = fixUsername(username);
        const results = await queryDEDB(lookupsByIDAndUserQuery, [analysisID, username]);
        return results.rows[0] || null;
    }

    // Returns a list of analyses found by the username of the user that launched them. Returns an empty
    // list if nothing is found. Check the analysisBaseSelect string to see the names of the keys in the 
    // objects returned. The column names become the field names in the objects.
    async analysesLookupsByUser(username) {
        username = fixUsername(username);
        const results = await queryDEDB(lookupsByUserQuery, [username]);
        return results.rows;
    }

    // Returns a list of app parameters for the app indicated by the UUID passed in. Returns an empty
    // list of nothing is found. Check the appParametersQuery string to see the name of the keys in the
    // objects returned, the column names become of the field names in the objects.
    async appParametersByID(appID) {
        const results =  await queryDEDB(appParametersQuery, [appID]);
        return results.rows;
    }

    // Returns a list of app references for the app indicated by the UUID passed in. Returns an empty
    // list if nothing is found. Check the appReferencesQuery string to find the names of the keys in
    // objects returned. The column names become the field names in the objects.
    async appReferencesByID(appID) {
        const results = await queryDEDB(appReferencesQuery, [appID]);
        return results.rows;
    }

    // Returns an app documentation object for the app specified by the UUID passed in. Returns a null
    // if nothing is found. Check the appDocsQuery string to find the field names for the object, the
    // column names are converted to the field names.
    async appDocsByID(appID) {
        const results = await queryDEDB(appDocsQuery, [appID]);
        return results.rows[0] || null;
    }

    // Returns the username associated with the user UUID passed in. Returns null if nothing is found.
    async getUsername(userID) {
        const results = await queryDEDB(`SELECT username FROM users WHERE id = $1`, [userID]);
        return results.rows[0]["username"] || null;
    }
}

module.exports = {
    DEDatabase,
};