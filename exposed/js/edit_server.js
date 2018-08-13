class EditServer {
	Post(path, body, format) {
		return new Promise((resolve, reject) => {
			var request = new Request(path, {
				method: 'POST',
				body: JSON.stringify(body),
				mode: 'cors', 
				redirect: 'follow',
				headers: new Headers({
					'Content-Type': 'application/JSON'
				})
			})

			fetch(request)
			.then(function(response) {
				if (format == 'json') {
					return response.json()
				} else {
					return response.text()
				}
			}).then(function(out) { 
				// update page content once
				// DB call is complete
				resolve(out)
			})
			.catch(function(err) {  
				reject(err)
				throw err
				// console.log('Fetch Error :-S', err)
			})
		})
	}





}
