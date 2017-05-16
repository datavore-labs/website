# Datavore<sup>&reg;</sup> Corporate Website

## Running Locally
This application is run locally through Webpack. Staging and production use webpack to compile a static bundle, which is served off of an S3 bucket.

To run the application locally:

```
npm install
npm run server
open localhost:8080
```

## Updating Licenses Page

The licenses page (datavorelabs.com/licenses) uses a custom script to automatically generate the license list based on the dependencies installed in the application repositories. To update this list, you will need to have the following repositories cloned and up-to-date in the same directory as this repository:

* [dv-client](https://github.com/datavore-labs/dv-client)
* [dv-server](https://github.com/datavore-labs/dv-server)
* [dv-js](https://github.com/datavore-labs/dv-js)
* [dv-ldap](https://github.com/datavore-labs/dv-ldap)
* [dv-basic-auth](https://github.com/datavore-labs/dv-basic-auth)

To generate the license lists (which will be saved as `.tpl` files in the  `src/licenses` directory), run:
```
npm install
babel-node get-licenses.js
```

You will then need to re-compile the static site files (or restart the server, if working locally) to see changes.

## Deployment

Deployment for the master branch is automated through [Semaphore CI](https://semaphoreci.com/datavore). 
* Pushing to master automatically deploys to [www-stage.datavorelabs.com](https://www-stage.datavorelabs.com).
* Production ([datavorelabs.com](https://datavorelabs.com)) must be deployed manually through the Semaphore console.

Each deployment pulls a specified commit, builds the project, pushes the resulting build artifacts (static bundle of the application) to an S3 bucket on the Datavore AWS account, and busts the CloudFront cache associated with that bucket. The bucket name will always match the domain to which the code is being deployed.

If you need to deploy all changes manually to a specified S3 bucket:

1. Make sure your local is up to date with master before beginning the deploy process.
2. Run the following commands, replacing `$S3_BUCKET_NAME` with the name of the bucket to which you want to deploy.

```
rm -rf node_modules
npm install
npm run compiler
npm run aws-deploy s3://$S3_BUCKET_NAME
```