// for hashing
const bcrypt = require('bcrypt')
const fs = require('fs')


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
		let pages_array = Unsure.Query(type)
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

	// LoadMarkdown is based off of RetrievePage but includes the
	// markdown rendering component
	LoadMarkdown(page_title, type) {
		// page_title is the filename, type is the directory
		console.log(`_data/${type}/${page_title}.md`)
		return new Promise((resolve, reject) => {
			fs.readFile(`_data/${type}/${page_title}.md`, "utf-8", (err, body) => {
				if (err) {
					reject(err)
				}
				resolve(body)
			})
		})

	}

	OpenFile(path) {
		// TODO: return both the markdown and json files
		console.log(path)
		return new Promise((resolve, reject) => {
			fs.readFile(path, 'utf-8', (err, data) => {
				if (err) {
					reject(err)
				}
				resolve(data)
			});
		})
	}
	SavePage(path, json, markdown) {
		return new Promise((resolve, reject) => {
			// console.log(json)
			// let globalErr = null
			// let edited_json = JSON.parse(json)
			// edited_json.date_edited = new Date().toLocaleString()
			fs.writeFile(path + '.json', JSON.stringify(json), 'utf8', (err, data) => {
				if (err) {
					console.log(err)
					globalErr = err
				}
				// TODO: reload relevant Unsure instances to update the 
				// pages edited without restarting the server
			})
			fs.writeFile(path + '.md', markdown, 'utf8', (err, data) => {
				if (err) {
					console.log(err)
					globalErr = err
				}
				// TODO: reload relevant Unsure instances to update the 
				// pages edited without restarting the server
			})
			
			resolve("File Save Success!")

		})
	}

	CreatePage(path) {
		return new Promise((resolve, reject) => {
			/* 
			 - make markdown and json files ✔
			 - add page entries to data.json ✔
			 - update search index?s
			*/

			console.log("EDIT START")

			let json_template = JSON.parse(fs.readFileSync(`_data/defaults/page.json`, 'utf8', { encoding: 'utf8' }))
			let markdown_template = fs.readFileSync(`_data/defaults/page.md`, 'utf8', { encoding: 'utf8' });
			json_template.url = path
			json_template.date_published = new Date().toLocaleString()
			json_template.date_edited = new Date().toLocaleString()
			json_template.template = "article"
			json_template.author_url = "author" // TODO: get this data from the login cookie
			

			json_template.date_edited = new Date().toLocaleString()
			json_template = JSON.stringify(json_template)

			fs.writeFileSync(`_data/pages/${path}.json`, json_template, { encoding: 'utf8' });
			fs.writeFileSync(`_data/pages/${path}.md`, markdown_template, { encoding: 'utf8' });

			// Add entries to page list
			Unsure.loadFile(`_data/data.json`)
			Unsure.setActiveFile(`_data/data.json`)
			let pages = Unsure.Query("pages")
			pages.push(path)
			Unsure.Edit("pages", pages)
			Unsure.saveFile(options)

			resolve("New page created.")
		})
	}


	DeletePage(path) {
		return new Promise((resolve, reject) => {
			/* 
			 - delete markdown and json files ✔
			 - remove page entries from data.json
			 - update search index?s
			*/

			fs.unlink(`${path}.json`, (err) => {
				if (err) throw err;
				console.log(`${path}.json was deleted`);
			})
			fs.unlink(`${path}.md`, (err) => {
				if (err) throw err;
				console.log(`${path}.md was deleted`);
			})

			// Remove entries from page list
			Unsure.loadFile(`_data/data.json`)
			Unsure.setActiveFile(`_data/data.json`)
			let pages = Unsure.Query("pages")
			let new_pages = []
			pages.forEach(page => {
				if ('_data/pages/' + page != path) {
					new_pages.push(page)
				}
			})
			console.log(new_pages)
			Unsure.Edit("pages", new_pages)
			Unsure.saveFile(options)


			resolve("Page Deleted")
		})
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
				// console.log(page_data.article_url)
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



	// TODO: make a new file for authentication
	// AUTHENTICATION STUFFS
	AuthenticateUserCredentials(email, password) {
		return new Promise((resolve, reject) => {
			Unsure.loadFile('_data/auth.json')
			Unsure.setActiveFile('_data/auth.json')
			let users = Unsure.Query('users')
			users.forEach(user => {
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

