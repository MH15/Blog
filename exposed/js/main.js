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

UI.slide_left_button.addEventListener('mousedown', () => {
	UI.Slide("left")
})

UI.slide_right_button.addEventListener('mousedown', () => {
	UI.Slide("right")
})