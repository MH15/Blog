const Hapi = require('hapi')
const unsure = require('unsure')
global.Unsure = new unsure(__dirname)

// my libs
const db = require('./core/database')

const server = Hapi.server({
	port: 3000,
	host: 'localhost'
});

server.route({
	method: 'GET',
	path: '/',
	handler: (request, h) => {
		return 'Hello, world!';
	}
});

server.route({
	method: 'GET',
	path: '/{name}',
	handler: (request, h) => {

		return 'Hello, ' + encodeURIComponent(request.params.name) + '!';
	}
});

const init = async () => {
	db.start()
	await server.start();
	console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {

	console.log(err);
	process.exit(1);
});


function exitHandler(options, err) {
    if (options.cleanup) console.log('clean');
    if (err) console.log(err.stack);
    if (options.exit) process.exit();
}


// save info to stats.json when we exit
// process.on('exit', db.cleanup.bind(null,{cleanup:true}));
process.on('SIGINT', db.cleanup.bind(null, {exit:true}));

init();