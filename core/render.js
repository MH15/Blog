const fs = require('fs')
const ejs = require('ejs')
const Remarkable = require('remarkable')
const md = new Remarkable()

let render = (data) => {

}

class Render {
	// if a second argument is provided, a base template other
	// than 'template.ejs' is used
	ejs(data, alternate_template) {
		return new Promise((resolve, reject) => {
			let file = 'views/template.ejs'
			if (alternate_template != undefined) {
				file = alternate_template
			}
			fs.readFile(file, "utf-8", (err, body) => {
				if (err) {
					reject(err)
				}
				resolve(ejs.render(body, data))
			})
		})
	}

	markdown(string) {
		let out = md.render(string)
		return out
	}
}

module.exports = new Render()