const Hapi = require('hapi')
const ejs = require('ejs')
const unsure = require('unsure')
const Fuse = require('fuse.js')
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
		// db.RecordConnection(new Date().toLocaleString(), request.info.remoteAddress)
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
		// db.RecordConnection(new Date().toLocaleString(), request.info.remoteAddress)

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

let books = [{
  title: "Old Man's War fiction",
  author: 'John X',
  tags: ['war']
}, {
  title: 'Right Ho Jeeves',
  author: 'P.D. Mans',
  tags: ['fiction', 'war']
}]

let options = {
  shouldSort: true,
  threshold: 0.3,
  keys: [{
    name: 'title',
    weight: 0.8
  }, {
    name: 'tags',
    weight: 0.5
  }, {
    name: 'author',
    weight: 0.4
  }]
};

// TODO: Create a section that runs on a specified interval
// to ensure that all data + db are up to date
let fuse;

async function search() {
	let data = await db.CreateSearchData()
	fuse = new Fuse(data, options)

}

search()

// search box on all pages
// recieve query string and send back array of matching things
server.route({
	method: 'POST',
	path: '/search',
	handler: async (request, h) => {	
		// db.RecordConnection(new Date().toLocaleString(), request.info.remoteAddress)
		
		
		const outputs = fuse.search(request.payload.query)
		console.log(outputs)
		// TODO: handle this shite
		// if (request.path == "/")
		// let payload = JSON.parse(request.payload)


		return outputs
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








