let UI = new ui()
let Server = new server()

UI.menu_button.addEventListener('mousedown', () => {
	UI.ToggleMenu()
})

UI.search_button.addEventListener('mousedown', () => {
	UI.ToggleSearch()
})

UI.shade.addEventListener('mousedown', () => {
	UI.CloseAny()
})

if (UI.slide_left_button) {
	UI.slide_left_button.addEventListener('mousedown', () => {
		UI.Slide("left")
	})

	UI.slide_right_button.addEventListener('mousedown', () => {
		UI.Slide("right")
	})
}

// Top bar scroll indicator
document.addEventListener("scroll", () => {
	var scrollTop = document.documentElement["scrollTop"] || document.body["scrollTop"];
	var scrollBottom = (document.documentElement["scrollHeight"] || document.body["scrollHeight"]) - document.documentElement.clientHeight;
	scrollPercent = scrollTop / scrollBottom * 100 + "%";
	document.getElementById("progress").style.setProperty("width", scrollPercent);
},{ passive: true })



Server.search_box.addEventListener('input', async () => {
	UI.ToggleSearch()
	let search_items = await Server.Search(Server.search_box.value)
	
	// clear previously rendered results
	while (UI.search_results.hasChildNodes()) {
		UI.search_results.removeChild(UI.search_results.lastChild);
	}

	search_items = search_items.slice(0, 3)
	search_items.forEach(search_item => {
		console.log(search_item)
		// add item
		let item = document.createElement('div')
		item.classList.add('search_result')
		// add title
		let title = document.createElement('a')
		title.classList.add('title')
		title.classList.add('search_title')
		title.innerHTML = search_item.title
		title.href = window.location.origin + '/article/' + search_item.article_url
		item.appendChild(title)
		// add author
		let author = document.createElement('a')
		author.classList.add('author')
		author.classList.add('default')
		author.innerHTML = search_item.author
		author.href = window.location.origin + '/author/' + search_item.article_url
		item.appendChild(author)
		// add date edited
		let date_edited = document.createElement('div')
		date_edited.classList.add('date_edited')
		date_edited.innerHTML = search_item.date_edited
		item.appendChild(date_edited)


		UI.search_results.appendChild(item)

	})
})








