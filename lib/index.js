const Hapi = require('hapi')
const ejs = require('ejs')
const unsure = require('unsure')
global.Unsure = new unsure(__dirname)
global.dirname = __dirname

// my libs
const db = require('./core/database')
const render = require('./core/render')

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
	handler: async (request, h) => {	
		db.RecordConnection(new Date().toLocaleString(), request.info.remoteAddress)

		// TODO: handle this shite

		const page_body = await render("views/index.ejs", {a: "PHHHHHHZ"})
		return page_body
    }
});

const init = async () => {
	db.start()
	await server.start()
	console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
	console.log(err);
	process.exit(1);
});



// process.on('exit', () => {
// 	db.PrepareToQuit()
// })
// process.on('SIGINT', () => {
// 	db.PrepareToQuit()
// 	process.exitCode = 1
// })

init();







