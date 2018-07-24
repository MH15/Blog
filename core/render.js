const fs = require('fs')
const ejs = require('ejs')

let render = (data) => {
	return new Promise((resolve, reject) => {
		fs.readFile('views/template.ejs', "utf-8", (err, body) => {
			if (err) {
				reject(err)
			}
			resolve(ejs.render(body, data))
		})
	})
}

module.exports = render