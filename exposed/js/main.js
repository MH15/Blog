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