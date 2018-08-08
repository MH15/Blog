const fs = require('fs')
const ejs = require('ejs')
const Remarkable = require('remarkable')
const md = new Remarkable()

let render = (data) => {

}

class Render {
	ejs(data) {
		return new Promise((resolve, reject) => {
			fs.readFile('views/template.ejs', "utf-8", (err, body) => {
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