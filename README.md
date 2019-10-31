de-graphql
==========

Work towards exposing the Discovery Environment data model through GraphQL using Apollo Server.

# Prerequisites

You'll want the following installed to work on this:

* `node`/`npm` to install dependencies and run the service.
* `kubectl` to forward ports to services running in the DE's clusters.
* `docker` if you're going to build images locally.

# Configuration

de-graphql uses the following environment variables for configuration:

* `APPS_URL` - The base URL to the DE's [apps](https://github.com/cyverse-de/apps) service.
* `GATEWAY` - The base URL to the OpenFaaS gateway serving up the [de-functions](https://github.com/cyverse-de/de-functions) functions.
* `PERMISSIONS_URL` - The base URL to the DE's [permissions](https://github.com/cyverse-de/permissions) service.
* `USER_INFO_URL` - The base URL to the DE's [user-info](https://github.com/cyverse-de/user-info) service.
* `METADATA_DB_URL` - The connection string for the DE's [metadata](https://github.com/cyverse-de/metadata-db) database.
* `DE_DB_URL` - The connection string for the DE's [de-db](https://github.com/cyverse-de/de-db) database.

The `METADATA_DB_URL` should look like `postgres://<user>:<password>@<hostname>:<port>/metadata/sslmode=disable`.

The `DE_DB_URL` should look like `postgres://<user>:<password>@<hostname>:<port>/de?sslmode=disable`.

# Start up

To start it locally, run `npm install` and then `node src/index.js` with the above environment variables set in the top-level of the repository.

# Building

Run `docker build --rm -t <image> .` in the top-level directory of the respository. Push the image like any other Docker image.
