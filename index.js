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


const init = async () => {
	db.start()
	await server.register({
		// public files
		plugin: require('inert')
	})
	await server.start()
	console.log(`Server running at: ${server.info.uri}`);
};


init();

server.route({
	method: 'GET',
	path: '/',
	handler: async (request, h) => {	
		db.RecordConnection(new Date().toLocaleString(), request.info.remoteAddress)

		// TODO: handle this shite
		// if (request.path == "/")
		console.log(request.path)

		const page_body = await render("views/home.ejs", {a: "HOME"})
		return page_body
    }
});
server.route({
	method: 'GET',
	path: '/article/{name}',
	handler: async (request, h) => {	
		db.RecordConnection(new Date().toLocaleString(), request.info.remoteAddress)

		// TODO: handle this shite
		// if (request.path == "/")
		console.log(request.path)

		const page_body = await render("views/index.ejs", {a: "ARTICLE"})
		return page_body
    }
});


// serving public files
server.route({  
  method: 'GET',
  path: '/public/css/{file*}',
  handler: {
    directory: { 
      path: 'exposed/css'
    }
  }
})
server.route({  
  method: 'GET',
  path: '/public/js/{file*}',
  handler: {
    directory: { 
      path: 'exposed/js'
    }
  }
})
server.route({  
  method: 'GET',
  path: '/public/img/{file*}',
  handler: {
    directory: { 
      path: 'exposed/img'
    }
  }
})



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








