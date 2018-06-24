let colorThief = new ColorThief()
let inset = document.querySelector(".inset")


var imgTile = new Image();
imgTile.src = "public/img/newyork.jpg";
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
	// inset.style.boxShadow = boxShadowString
	inset.addEventListener('mouseenter', () => {
		hoverOn(boxShadowString)
	})	
	inset.addEventListener('mouseout', () => {
		hoverOff()
	})
}

function hoverOn(boxShadowString) {
	inset.style.boxShadow = boxShadowString
}
function hoverOff() {
	inset.style.boxShadow = "none"
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