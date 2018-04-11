
const pkg = require('../package.json');

module.exports = {
	register: require('hapi-swagger'),
	options: {
		info: {
			title: 'hapi-swagger',
			description: `
To see all routes, [click here](/).

To see customer routes only, [click here](/?tags=c1).

To see booking routes only, [click here](/?tags=b1).

To view the swagger.json, [click here](/swagger.json).
				`,
			// Get the version from package.json
			version: pkg.version,
			
			license: {
				// Get the license from package.json
				name: pkg.license
			}
		},
		// Setup the documentation to be the root of this host
		documentationPath: '/',
		jsonEditor: true,
		tags: [{
			'name': 'customer',
			'description': 'working with customer'
		},{
			'name': 'booking',
			'description': 'working with booking'
		}],
		// This is for use of grouping together paths.  Since each of our paths begin with `/api/v{1,2}`, we want to ignore those first to arguments in the path, since they won't help us group together resources
		
	}
};