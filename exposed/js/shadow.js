let colorThief = new ColorThief()
let inset = document.querySelectorAll(".inset")

inset.forEach(img => {
	var imgTile = new Image()
	imgTile.src = window.getComputedStyle(img).backgroundImage.match(/\((.*?)\)/)[1].replace(/('|")/g,'')
	console.log(imgTile.src)
	imgTile.onload = function() {
		let colors = colorThief.getColor(imgTile)
		let r = colors[0]
		let g = colors[1]
		let b = colors[2]
		let a = 0.2
		let boxShadowString = `
rgba(${r}, ${g}, ${b}, ${a}) 0px 2px 2px,
rgba(${r}, ${g}, ${b}, ${a}) 0px 4px 4px,
rgba(${r}, ${g}, ${b}, ${a}) 0px 8px 8px,
rgba(${r}, ${g}, ${b}, ${a}) 0px 16px 16px,
rgba(${r}, ${g}, ${b}, ${a}) 0px 32px 32px,
rgba(${r}, ${g}, ${b}, ${a}) 0px 64px 64px
`
		console.log(boxShadowString)

		img.addEventListener('mouseenter', () => {
			hoverOn(boxShadowString, img)
		})	
		img.addEventListener('mouseout', () => {
			hoverOff(boxShadowString, img)
		})	
	}
})


function hoverOn(boxShadowString, el) {
	console.log("hoverOn")
	el.style.boxShadow = boxShadowString
}
function hoverOff(boxShadowString, el) {
	el.style.boxShadow = "none"
}

/*
Menu
Search
Twitter
Instagram
YouTube?
Left Arrow
Right Arrom



*/