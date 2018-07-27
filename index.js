const Hapi = require('hapi')
const ejs = require('ejs')
const unsure = require('unsure')
const Fuse = require('fuse.js')
const Joi = require('joi')
const dirTree = require('directory-tree');
global.Unsure = new unsure(__dirname)
global.dirname = __dirname



// my libs
const db = require('./core/database')
const render = require('./core/render')

const server = Hapi.server({
	port: 3000,
	host: 'localhost'
});

let yar_options = {
    storeBlank: false,
    cookieOptions: {
        password: 'the-password-must-be-at-least-32-characters-long',
        isSecure: false // CHANGE TO true BEFORE RELEASE ON HTTPS
    }
};


const init = async () => {
	db.start()
	await server.register([
		require('inert'),
	])

	await server.register({
    	plugin: require('yar'),
    	options: yar_options
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
}


init();


// Handle home page
server.route({
	method: 'GET',
	path: '/',
	handler: async (request, h) => {
		// db.RecordConnection(new Date().toLocaleString(), request.info.remoteAddress)
		// console.log(__dirname)
		let retrieved_page = db.RetrievePage('home', 'pages')
		const page_body = await render({
			e: retrieved_page,
			dirname: __dirname
		})
		return page_body
    }
})

// Handle articles
server.route({
	method: 'GET',
	path: '/article/{name}',
	handler: async (request, h) => {	
		// db.RecordConnection(new Date().toLocaleString(), request.info.remoteAddress)

		// TODO: handle this shite
		// if (request.path == "/")
		console.log(request.path)

		let retrieved_page = db.RetrievePage(request.params.name, "pages")

		const page_body = await render({
			e: retrieved_page,
			dirname: __dirname
		})
		return page_body
    }
})

// Handle author's page
server.route({
	method: 'GET',
	path: '/author/{name}',
	handler: async (request, h) => {	
		// db.RecordConnection(new Date().toLocaleString(), request.info.remoteAddress)

		// TODO: handle this shite
		// if (request.path == "/")
		console.log(request.path)

		let retrieved_page = db.RetrievePage(request.params.name, 'authors')
		// find the author's top articles
		// let author_articles = db.RetrieveAuthorArticles(request.params.name)
		const page_body = await render({
			e: retrieved_page,
			dirname: __dirname
		})
		return page_body
    }
})




// Login
let custom_fields = {
  email     : Joi.string().email().required(), // Required
  password  : Joi.string().required().min(6)   // minimum length 6 characters
}

// console.log(custom_fields)



server.route({
    method: 'GET',
    path: '/login',
    handler: async function (request, h) {
    	// db.CreateUser('matthew349hall@hotmail.com', 'MHall123')
		let retrieved_page = db.RetrieveStaticPage('login')
		const page_body = await render({
			e: retrieved_page,
			dirname: __dirname
		})
		return page_body
    }
})




server.route({
    method: 'GET',
    path: '/logout',
    handler: function (request, reply) {
    	// remove login cookies
    	request.yar.reset();
        return reply.redirect('/');
    }
})


server.route({
	method: 'POST',
	path: '/authenticate',
	handler: async function (request, h) {
		let retrieved_page = db.RetrieveStaticPage('edit')
		const page_body = await render({
			e: retrieved_page,
			dirname: __dirname
		})
		let accepted = await db.AuthenticateUserCredentials(request.payload.email, request.payload.password)
		if (accepted) {
			console.log("we good")
			// set the thingy to remember user sessions
    		request.yar.set('state', { user_logged_in: true })
			return h.redirect('/edit')
		} else {
			console.log("ya hacker")
			return h.redirect('/login')

		}



	}
})




// Editor - a restricted route
const editor_routes = require('./core/editor_routes')
server.route({
	method: 'GET',
	path: '/edit',
	handler: editor_routes.explorer
})

server.route({
	method: 'POST',
	path: '/request_file_tree',
	handler: async (request, h) => {
    	// get file tree for editor
		// THIS IS A PROTOTYPE
		const filteredTree = dirTree('_data/')
		// TODO: sort so folders are first
		return filteredTree

	}
})

server.route({
	method: 'POST',
	path: '/edit/open_file',
	handler: async (request, h) => {
		// dsb? name for thing?
		console.log("Opening file: " + request.payload.path)
		let content = await db.OpenFile(request.payload.path)
		return content
	}
})

server.route({
	method: 'POST',
	path: '/edit/save_file',
	handler: async (request, h) => {
		// dsb? name for thing?
		console.log("Saving file: " + request.payload.path)
		let confirmation = await db.SaveFile(request.payload.path, request.payload.content)
		
		return confirmation
	}
})


// load static pages ya know
const static_page_routes = require('./core/static_page_routes')
server.route([
	{
		method: 'GET',
		path: '/about',
		handler: static_page_routes.about
	}, 
	{
		method: 'GET',
		path: '/credits',
		handler: static_page_routes.credits
	}, 
	{
		method: 'GET',
		path: '/team',
		handler: static_page_routes.team
	}, 
	{
		method: 'GET',
		path: '/contact',
		handler: static_page_routes.contact
	}, 
])



// TODO: Create a section that runs on a specified time 
// interval to ensure that all data + db are up to date
let fuse;
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
}
async function long_term_update() {
	let data = await db.CreateSearchData()
	fuse = new Fuse(data, options)
}

long_term_update()

// search box on all pages
// recieve query string and send back array of matching things
server.route({
	method: 'POST',
	path: '/search',
	handler: async (request, h) => {	
		// db.RecordConnection(new Date().toLocaleString(), request.info.remoteAddress)
		
		const outputs = fuse.search(request.payload.query)
		// TODO: handle this shite
		// if (request.path == "/")
		// let payload = JSON.parse(request.payload)
		return outputs
    }
})


// 404 Page
// TODO: make it work for all routes
server.route({ 
	method: '*', 
	path: '/{p*}', 
	handler : (request, h) => {
    	return h.response('The page was not found').code(404);
	}
})



process.on('unhandledRejection', (err) => {
	console.log(err)
	process.exit(1)
})



// process.on('exit', () => {
// 	db.PrepareToQuit()
// })
// process.on('SIGINT', () => {
// 	db.PrepareToQuit()
// 	process.exitCode = 1
// })








