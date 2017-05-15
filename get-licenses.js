const checker = require('license-checker');
const spawn = require('child_process').spawn;
const fs = require('fs');

const getArgv = (name, defaultValue) => {
	return process.argv.filter(
			(arg, i, col) => i > 0 && col[i - 1] === `--${name}`
		)[0] || defaultValue;
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
		}, (err, json) => {
			if (err) {
				reject(err);
			} else {
				const deps = [];
				for (const dep in json) {
					const nameComponents = dep.split('@');
					if (prodDepKeys.indexOf(nameComponents[0]) > -1) {
						deps.push({
							name: nameComponents[0],
							version: nameComponents[1],
							license: json[dep].licenses,
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
						license
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


async function getAllLicenses (){
	const promises = [
		getNodeLicenses(clientRoot),
		getNodeLicenses(dvjsRoot),
		getSbtLicenses(serverRoot),
	];

	let results = await Promise.all(promises);
	const mergedResults = [].concat.apply([], results);

	let tplString = 'tr\n\tth Package Name\n\tth Version\n\tth License\n';

	mergedResults.forEach(result => {
		if (result.name && result.version && result.license) {
			tplString += `tr\n\ttd ${result.name}\n\ttd ${result.version}\n\ttd ${result.license}\n`;
		}
	});

	fs.writeFile(`${__dirname}/src/licenses/packages.tpl.jade`, tplString, 'utf-8', err => {
		if (err) {
			console.log('Error compiling dependency list: ', err);
		}
		else {
			console.log('Dependencies compiled. Please re-compile app HTML to see updated license page.')
		}
	});
}

getAllLicenses();