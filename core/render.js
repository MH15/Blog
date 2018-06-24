const fs = require('fs')
const ejs = require('ejs')

let render = (file, data) => {
	return new Promise((resolve, reject) => {
		fs.readFile(file, "utf8", (err, body) => {
			if (err) {
				reject(err)
			}
			resolve(ejs.render(body, data))
		})
	})
}

module.exports = render