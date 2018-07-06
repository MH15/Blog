let UI = new ui()

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


document.addEventListener("scroll", () => {
	var scrollTop = document.documentElement["scrollTop"] || document.body["scrollTop"];
	var scrollBottom = (document.documentElement["scrollHeight"] || document.body["scrollHeight"]) - document.documentElement.clientHeight;
	scrollPercent = scrollTop / scrollBottom * 100 + "%";
	console.log(scrollPercent)
	document.getElementById("progress").style.setProperty("width", scrollPercent);
},{ passive: true })