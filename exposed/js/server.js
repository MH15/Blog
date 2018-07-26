class server {
	constructor (){
		this.search_box = document.querySelector('#SEARCH_BOX')
	}
	Search(query) {
		return new Promise((resolve, reject) => {
			var ToSend = {
				query
			}
			var request = new Request('/search', {
				method: 'POST',
				body: JSON.stringify(ToSend),
				mode: 'cors', 
				redirect: 'follow',
				headers: new Headers({
					'Content-Type': 'application/JSON'
				})
			})

			fetch(request)
			.then(function(response) {
				return response.json()
			}).then(function(json) { 
				// update page content once
				// DB call is complete
				resolve(json)
			})
			.catch(function(err) {  
				reject(err)
				console.log('Fetch Error :-S', err)
			})
		})
	}
	GetFileTree() {
		return new Promise((resolve, reject) => {
			var ToSend = {
				string: "empty"
			}
			var request = new Request('/request_file_tree', {
				method: 'POST',
				body: JSON.stringify(ToSend),
				mode: 'cors', 
				redirect: 'follow',
				headers: new Headers({
					'Content-Type': 'application/JSON'
				})
			})

			fetch(request)
			.then(function(response) {
				return response.json()
			}).then(function(json) { 
				// update page content once
				// DB call is complete
				resolve(json)
			})
			.catch(function(err) {  
				reject(err)
				throw err
				// console.log('Fetch Error :-S', err)
			})
		})
	}

	OpenFile(path) {
		return new Promise((resolve, reject) => {
			var ToSend = {
				path
			}
			var request = new Request('/edit/open_file', {
				method: 'POST',
				body: JSON.stringify(ToSend),
				mode: 'cors', 
				redirect: 'follow',
				headers: new Headers({
					'Content-Type': 'application/JSON'
				})
			})

			fetch(request)
			.then(function(response) {
				return response.text()
			}).then(function(text) { 
				// update page content once
				// DB call is complete
				resolve(text)
			})
			.catch(function(err) {  
				reject(err)
				throw err
				// console.log('Fetch Error :-S', err)
			})
		})
	}

}
