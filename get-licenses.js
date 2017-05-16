const checker = require('license-checker');
const spawn = require('child_process').spawn;
const fs = require('fs');
const orderBy = require('lodash.orderby');

const licenseAlias = {
	"Apache 2": "https://opensource.org/licenses/Apache-2.0",
	"Apache 2.0": "https://opensource.org/licenses/Apache-2.0",
	"Apache Version 2.0": "https://opensource.org/licenses/Apache-2.0",
	"Apache Software": "https://opensource.org/licenses/Apache-2.0",
	"Apache Software Version 2.0": "https://opensource.org/licenses/Apache-2.0",
	"BSD": "https://opensource.org/licenses/BSD-2-Clause",
	"BSD 3-Clause": "https://opensource.org/licenses/BSD-3-Clause",
	"BSD 3-clause": "https://opensource.org/licenses/BSD-3-Clause",
	"BSD style": "https://opensource.org/licenses/BSD-2-Clause",
	"Bouncy Castle": "https://www.bouncycastle.org/licence.html",
	"CC0": "https://creativecommons.org/publicdomain/zero/1.0/",
	"LGPL version 2.1": "https://opensource.org/licenses/LGPL-2.1",
	"New BSD": "https://opensource.org/licenses/BSD-3-Clause",
	"Public Domain": "https://creativecommons.org/publicdomain/zero/1.0/",
	"Public Domain per Creative Commons CC0": "https://creativecommons.org/publicdomain/zero/1.0/"
};

const getArgv = (name, defaultValue) => {
	return process.argv.filter(
			(arg, i, col) => i > 0 && col[i - 1] === `--${name}`
		)[0] || defaultValue;
};

const getLicenseString = license => {
	if (Array.isArray(license)) {
		if (license.indexOf('MIT') > -1) {
			license = 'MIT';
		} else {
			license = license[0];
		}
	}

	return license.replace(/\*|,|(license)(s{0,1})|(the )|(licence)/gi, '')
		.replace(/\s{2,}/gi, ' ')
		.trim();
};

const getNodeLicenses = rootPath => (
	new Promise((resolve, reject) => {
		const prodPackageDeps = require(`${rootPath}/package.json`);
		const prodDeps = prodPackageDeps && prodPackageDeps.dependencies ? prodPackageDeps.dependencies : {};
		const prodDepKeys = Object.keys(prodDeps);

		checker.init({
			start: rootPath,
			production: true,
			development: false,
			unknown: false,
		}, (err, json) => {
			if (err) {
				reject(err);
			} else {
				const deps = [];
				for (const dep in json) {
					const nameComponents = dep.split('@');
					if (prodDepKeys.indexOf(nameComponents[0]) > -1 && json[dep].licenses !== 'UNKNOWN') {
						deps.push({
							name: nameComponents[0],
							version: nameComponents[1],
							license: getLicenseString(json[dep].licenses),
						});
					}
				}
				resolve(deps);
			}
		});
	})
);

const getSbtLicenses = rootPath => (
	new Promise((resolve, reject) => {
		const child = spawn('sbt', ['dependencyLicenseInfo'], { cwd: rootPath });
		let childOut = '';
		child.stderr.on('data', data => {
			reject(data);
		});
		child.stdout.on('data', data => {
			childOut += data.toString().replace(/\u001b\[.*?m/g, '').replace(/\[.*\]\s/g, '');
		});
		child.on('close', code => {
			const childGroups = childOut.split('\n\n');
			const deps = [];
			//first output is running the command and last output is the time spent - ignore those
			childGroups.shift();
			childGroups.pop();
			childGroups.forEach(group => {
				const groupList = group.split('\n\t');
				const license = groupList.shift();
				groupList.forEach(g => {
					const nameComponents = g.trim().split(':');

					deps.push({
						name: `${nameComponents[0]}:${nameComponents[1]}`,
						version: nameComponents[2],
						license: getLicenseString(license),
					});
				});
			});
			resolve(deps);
		});
	})
);

const clientRoot = getArgv('clientRoot', '../dv-client');
const dvjsRoot = getArgv('dvjsRoot', '../dv-js');
const serverRoot = getArgv('serverRoot', '../dv-server');
const ldapRoot = getArgv('ldapRoot', '../dv-ldap');
const basicAuthRoot = getArgv('basicAuthRoot', '../dv-basic-auth');


async function getAllLicenses (promises, fileName){
	let results = await Promise.all(promises);
	const mergedResults = [].concat.apply([], results);

	const sortedResults = orderBy(mergedResults, 'name');

	let tplString = '';

	sortedResults.forEach(result => {
		if (result.name && result.version && result.license) {
			const licenseUrl = licenseAlias[result.license] || `https://opensource.org/licenses/${result.license}`;
			tplString += `tr\n\ttd ${result.name}\n\ttd ${result.version}\n\ttd: a(href="${licenseUrl}",target="_blank") ${result.license}\n`;
		}
	});

	fs.writeFile(`${__dirname}/src/licenses/${fileName}`, tplString, 'utf-8', err => {
		if (err) {
			console.log('Error compiling dependency list: ', err);
		}
		else {
			console.log(`Dependencies compiled to ${fileName}. Please re-compile app HTML to see updated license page.`)
		}
	});
}

getAllLicenses(
	[
		getNodeLicenses(clientRoot),
		getNodeLicenses(dvjsRoot),
		getSbtLicenses(serverRoot),
	],
	'core.tpl.jade'
);

getAllLicenses(
	[
		getSbtLicenses(ldapRoot),
	],
	'ldap.tpl.jade'
);

getAllLicenses(
	[
		getSbtLicenses(basicAuthRoot),
	],
	'basic-auth.tpl.jade'
);