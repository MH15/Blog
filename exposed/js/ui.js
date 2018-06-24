class ui {
	constructor() {
		this.menu_button = document.querySelector("#MENU")
		this.search_button = document.querySelector("#SEARCH")
		this.shade = document.querySelector("#SHADE")
		this.menu_grid = document.querySelector(".menu-grid")
		this.search_grid = document.querySelector(".search-grid")

		this.state = {
			menu: false,
			search: false
		}
	}
	ToggleMenu() {
		this.shade.style.visibility = "visible"
		this.shade.style.opacity = "1"
		this.menu_grid.style.top = "-40vh"
	}

	ToggleSearch() {
		this.shade.style.visibility = "visible"
		this.shade.style.opacity = "1"
		this.search_grid.style.top = "-40vh"

	}

	CloseAny() {
		this.shade.style.opacity = 0
		this.menu_grid.style.top = "-80vh"
		this.search_grid.style.top = "-80vh"
		setTimeout(() => {
			this.shade.style.visibility = "hidden"
		}, 300)
	}

	Slide(direction) {

	}
}