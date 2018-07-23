// for hashing
const bcrypt = require('bcrypt')


let options = {
	padding: 4 // saves JSON with spaces for readability
}

class Database {
	start() {
		console.log("DB Starting")
		// Unsure.loadFile('_data/stats.json')
		Unsure.loadFile('_data/data.json')
		// Unsure.loadFile('_data/users.json')


		// Unsure.setActiveFile('_data/stats.json')
		// Unsure.Edit("lastRunDate", new Date().toLocaleString())
		// Unsure.saveFile().then(data => {
			// console.log(data)
		// }).catch(err => {
			// console.log(err)
		// })
	}
	PrepareToQuit() {
		// Save all files before exit
		Unsure.saveFile(options)
	}


	// save all IP connections + date of visit for analytics
	RecordConnection(date, ip_address) {
		let entry = {
			date: date,
			remoteAddress: ip_address
		}
		Unsure.setActiveFile('_data/stats.json')
		let connections = Unsure.Query("connections")
		connections.push(entry)
		Unsure.Edit("connections", connections)
		Unsure.saveFile().then(data => {
			// console.log(data)
		}).catch(err => {
			console.log(err)
		})
	}

	RetrievePage(page_title, type) {
		// page_title is the filename, type is the directory
		Unsure.setActiveFile('_data/data.json')
		console.log(type)
		let pages_array = Unsure.Query(type)
		console.log(pages_array)
		if (pages_array.includes(page_title)) {
			Unsure.loadFile(`_data/${type}/${page_title}.json`)
			Unsure.setActiveFile(`_data/${type}/${page_title}.json`)
			
			let query = Unsure.Query('.')
			return query
		} else {
			return -1
		}
	}



	RetrieveStaticPage(page_title) {
		Unsure.loadFile(`_data/static/${page_title}.json`)
		Unsure.setActiveFile(`_data/static/${page_title}.json`)
		
		let query = Unsure.Query('.')
		return query
	}

	CreateSearchData() {
		return new Promise((resolve, reject) => {
			// get array of pages
			Unsure.loadFile('_data/data.json')
			Unsure.setActiveFile('_data/data.json')
			let pages = Unsure.Query('pages')
			// load current search data
			Unsure.loadFile('_data/search.json')
			Unsure.setActiveFile('_data/search.json')
			// let search_data = Unsure.Query('search_data')
			let search_data = []
			// load page data file for each page_string
			// + create entry in search_data.json
			pages.forEach(page_string => {
				let page_data = this.RetrievePage(page_string, "pages")
				// add entry into the search data
				// ignore Home page + do not add to search results
				if (page_data.url == "/") return
				console.log(page_data.article_url)
				search_data.push({
					title: page_data.title,
					article_url: page_data.url,
					author: page_data.author,
					author_url: page_data.author_url,
					tags: page_data.tags,
					date_edited: page_data.date_edited
				})
			})
			Unsure.setActiveFile('_data/search.json')
			Unsure.Edit("search_data", search_data)
			Unsure.saveFile().then(data => {
				// expose to main script
				resolve(search_data)
			}).catch(err => {
				console.log(err)
				reject(err)
			})
		})
	}

	// AUTHENTICATION STUFFS
	AuthenticateUserCredentials(email, password) {
		return new Promise((resolve, reject) => {
			Unsure.loadFile('_data/auth.json')
			Unsure.setActiveFile('_data/auth.json')
			let users = Unsure.Query('users')
			users.forEach(user => {
				console.log(user)
				// check if username exists
				if (user.email == email) {
					// compare passwords
					bcrypt.compare(password, user.hash, (err, res) => {
					    if (!err && res) {
					    	resolve(true)
					    } else {
					    	resolve(false)
					    }

					})
				} else {
					resolve(false)
				}
			})

		})
	}

	// Right now this is called manually.
	// TODO: put in the db setup stuff
	CreateUser(email, password) {
		const saltRounds = 10
		bcrypt.hash(password, saltRounds).then(hash => {
			console.log(hash)
		    // TODO: Store hash in password DB.
		});
	}
}

module.exports = new Database()


// function exitHandler(options, err) {
//     if (options.cleanup) console.log('clean');
//     if (err) console.log(err.stack);
//     if (options.exit) process.exit();
// }


// save info to stats.json when we exit
// process.on('SIGINT', db.cleanup.bind(null, {exit:true}));
// process.on('exit', db.cleanup.bind(null,{cleanup:true}));