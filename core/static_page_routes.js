const db = require('./database')
const render = require('./render')
const fs = require('fs')

class static_page_routes {
	async about(request, h) {
		console.log(request.path)

		let retrieved_page = db.RetrieveStaticPage('about')
		const page_body = await render.ejs({
			e: retrieved_page,
			dirname: global.dirname
		})
		return page_body
    }
	async team(request, h) {
		console.log(request.path)

		let retrieved_page = db.RetrieveStaticPage('team')
		const page_body = await render.ejs({
			e: retrieved_page,
			dirname: global.dirname
		})
		return page_body
    }
	async credits(request, h) {
		console.log(request.path)

		let retrieved_page = db.RetrieveStaticPage('credits')
		const page_body = await render.ejs({
			e: retrieved_page,
			dirname: global.dirname
		})
		return page_body
    }
	async contact(request, h) {
		console.log(request.path)

		let retrieved_page = db.RetrieveStaticPage('contact')
		const page_body = await render.ejs({
			e: retrieved_page,
			dirname: global.dirname
		})
		return page_body
    }
}

module.exports = new static_page_routes()
