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

	
	await server.start()
	console.log(`Server running at: ${server.info.uri}`);
};


init();

server.route({
	method: 'GET',
	path: '/',
	handler: async (request, h) => {
		db.RecordConnection(new Date().toLocaleString(), request.info.remoteAddress)
		// console.log(__dirname)
		let retrieved_page = db.RetrievePage('home')
		const page_body = await render("views/template.ejs", {
			e: retrieved_page,
			dirname: __dirname
		})
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

		let retrieved_page = db.RetrievePage(request.params.name)

		const page_body = await render("views/template.ejs", {
			e: retrieved_page,
			dirname: __dirname
		})
		return page_body
    }
});






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








