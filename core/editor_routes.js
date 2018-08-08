const db = require('./database')
const render = require('./render')
const fs = require('fs')
const dirTree = require('directory-tree');

class editor_routes {
	// The 'explorer' shows all the editable JSON and markdown files
	// and allows the user to select and edit them
	async explorer (request, h) {
		let retrieved_page = db.RetrieveStaticPage('edit')
		const page_body = await render.ejs({
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

	// TODO: routes to POST's that edit the file structure
	// by saving, editing, deleting _data files etc
	// request_file_tree (request, h) {
 //    	// get file tree for editor
	// 	// THIS IS A PROTOTYPE
	// 	console.log("ACTIVATED")
	// 	const filteredTree = dirTree('_data')
	// 	console.log("a")
	// 	return filteredTree

	// }
}

module.exports = new editor_routes()
