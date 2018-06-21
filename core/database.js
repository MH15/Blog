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
	}
	cleanup(options, err) {
		Unsure.setActiveFile('_data/stats.json')
		let quitTimes = Unsure.Query("quitTimes")
    	if (err) console.log(err.stack);
		let entry = {
			date: new Date().toLocaleString(),
			reason: "exit"
		}
		quitTimes.push(entry)
		Unsure.Edit("quitTimes", quitTimes)
		console.log(Unsure.HOME)
		Unsure.saveFile(options)
		setTimeout(process.exit, 1000)
	}
}

module.exports = new Database()