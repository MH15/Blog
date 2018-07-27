class edit_server {
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

	SaveFile(path, content) {
		return new Promise((resolve, reject) => {
			var ToSend = {
				path,
				content
			}
			var request = new Request('/edit/save_file', {
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
