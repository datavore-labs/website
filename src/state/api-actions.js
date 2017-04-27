import fp from 'lodash/fp';
import rest from 'rest';
import mime from 'rest/interceptor/mime';
import env from 'environment';

const client = rest.wrap(mime, { mime: 'application/json' });

export const getReleaseIssues = (releaseNumber) => (
	client({
		method: 'GET',
		path: `${env.apiRoot}/releases/${releaseNumber}`,
	})
		.then(response => (fp.getOr([], 'entity.issues', response)))
		.catch(error => ([]))
);

export const requestDownload = (email, releaseNumber) => {
	return client({
		method: 'POST',
		path: `${env.apiRoot}/releases/${releaseNumber}/download`,
		entity: {
			email,
		},
	})
		.then(response => (response.entity))
		.catch(error => (error))
};
