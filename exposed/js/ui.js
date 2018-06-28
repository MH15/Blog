class ui {
	constructor() {
		this.menu_button = document.querySelector("#MENU")
		this.search_button = document.querySelector("#SEARCH")
		this.shade = document.querySelector("#SHADE")
		this.menu_grid = document.querySelector(".menu-grid")
		this.search_grid = document.querySelector(".search-grid")

		this.slide_left_button = document.querySelector("#LEFT")
		this.slide_right_button = document.querySelector("#RIGHT")
		this.slide_items = document.querySelectorAll(".splash-wrapper")
		this.slide_index_output = document.querySelector(".slide-index")

		this.state = {
			menu: false,
			search: false,
			slide_index: 1
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
		// console.log(this.state.slide_index)
		switch (direction) {
			case "left":
				if (this.state.slide_index > 1) {
					// error animation
					let value = `${-90 * (this.state.slide_index - 2)}%`
					this.slide_items.forEach(item => {
						item.style.left = value
						item.style.opacity = 0
					})
					this.slide_items[this.state.slide_index - 2].style.opacity = 1
					this.state.slide_index--
					this.slide_index_output.innerHTML = this.state.slide_index
					console.log(this.state.slide_index)
				} else {
					console.log("TOOO HAAARDD left")
					// error animation
				}
				break
			case "right":
				if (this.state.slide_index < this.slide_items.length) {
					// error animation
					let value = `${-90 * this.state.slide_index}%`
					this.slide_items.forEach(item => {
						item.style.left = value
						item.style.opacity = 0
					})
					this.slide_items[this.state.slide_index].style.opacity = 1
					this.state.slide_index++
					this.slide_index_output.innerHTML = this.state.slide_index
					console.log(this.state.slide_index)
				} else {
					console.log("TOOO HAAARDD right")
					// error animation
				}
				break
			default:
				console.log("boy. why u do.")
				break
		}
		// console.log(this.state.slide_index)
		

	}
}