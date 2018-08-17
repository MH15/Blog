const db = require('./database')
const render = require('./render')
const fs = require('fs')

class static_page_routes {
	async about(request, h) {
		let subworked = await ref.allStaticPages(request.path)
		return subworked
    }
	async team(request, h) {
		let subworked = await ref.allStaticPages(request.path)
		return subworked
    }
	async credits(request, h) {
		let subworked = await ref.allStaticPages(request.path)
		return subworked
    }
	async contact(request, h) {
		let subworked = await ref.allStaticPages(request.path)
		return subworked
    }


    // handle everything lol

    allStaticPages(page_url) {
    	return new Promise(async (resolve, reject) => {
			let retrieved_page = db.RetrieveStaticPage(page_url)
			let markdown_string = await db.LoadMarkdown(page_url, "static")
			retrieved_page.content = render.markdown(markdown_string)
			const page_body = await render.ejs({
				e: retrieved_page,
				dirname: global.dirname
			})
			resolve(page_body)
    	})
    }
}

let ref = new static_page_routes()

module.exports = ref
