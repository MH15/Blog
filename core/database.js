let options = {
	padding: 4 // saves JSON with spaces for readability
}

class Database {
	start() {
		Unsure.loadFile('_data/stats.json')
		Unsure.loadFile('_data/data.json')
		Unsure.loadFile('_data/users.json')


		Unsure.setActiveFile('_data/stats.json')
		Unsure.Edit("lastRunDate", new Date().toLocaleString())
		Unsure.saveFile().then(data => {
			// console.log(data)
		}).catch(err => {
			console.log(err)
		})
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

	RetrievePage(page_title) {
		Unsure.setActiveFile('_data/data.json')
		let pages_array = Unsure.Query("pages")
		if (pages_array.includes(page_title)) {
			Unsure.loadFile(`_data/pages/${page_title}.json`)
			Unsure.setActiveFile(`_data/pages/${page_title}.json`)
			
			let query = Unsure.Query('.')
			return query
		} else {
			return -1
		}
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