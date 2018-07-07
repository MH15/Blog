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

}
