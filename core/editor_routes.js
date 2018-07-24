const db = require('./database')
const render = require('./render')
const fs = require('fs')

class editor_routes {
	// The 'explorer' shows all the editable JSON and markdown files
	// and allows the user to select and edit them
	async explorer (request, h) {
		let retrieved_page = db.RetrieveStaticPage('edit')
		const page_body = await render({
			e: retrieved_page,
			dirname: global.dirname
		})
	    const state = request.yar.get('state')
	    // if authenticated, display the editor screen
	    // else redirect to login
	    if (state == undefined || !state.user_logged_in) {
			return h.redirect('/login')	 
	    } else if (state.user_logged_in) {   
			return page_body
		}
	}
}

module.exports = new editor_routes()
