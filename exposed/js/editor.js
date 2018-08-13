// editor
let STATUS_UPDATE_RATE = 500
let eServer = new EditServer()
let editor = new Editor()




let CURRENT_FILE = ""
//
// Grab expand/collapse buttons
//
let expandAll = document.querySelector('#expandAll');
let collapseAll = document.querySelector('#collapseAll');
let saveFile = document.querySelector('#saveFile');
//


function selectCallback(e) {
	// decide if we load the markdown or json editor
	// console.log(editor)
	// scope necessitates that we don't use 'this' here

}

editor.TreeInit(selectCallback)

editor.controls.newPage.addEventListener('click', async () => {
	// send URL of new page back to server
	let newPageURL = editor.inputs.newPageURL.value
	editor.PrintStatus('Loading')
	let confirmation = await eServer.Post('/edit/new_page', {
		path: newPageURL,
	}, 'text')
	console.log(confirmation)

	editor.PrintStatus('New Page Created', confirmation)

	// TODO: update tree to show everything. Try to avoid
	// the easy way out - just refreshing the page

	editor.TreeInit(selectCallback)
})

editor.controls.savePage.addEventListener('click', async () => {
	// send content back to server
	let adjustedPath = CURRENT_FILE.replace(/\.[^/.]+$/, "")
	let confirmation = await eServer.Post('/edit/save_page', {
		path: adjustedPath, 
		json: editor.jsonEditor.get(),
		markdown: editor.simplemde.value()
	}, 'text')
	console.log(confirmation)
	editor.PrintStatus('Page Saved', confirmation)
})

editor.controls.deletePage.addEventListener('click', async () => {
	// send path of file to delete back to server
	let adjustedPath = CURRENT_FILE.replace(/\.[^/.]+$/, "")
	let confirmation = await eServer.Post('/edit/delete_page', {
		path: adjustedPath
	}, 'text')
	console.log(confirmation)
	editor.PrintStatus('Page Deleted', confirmation)
	editor.TreeInit(selectCallback)
})


// update status every second
setInterval(editor.StatusUpdate, STATUS_UPDATE_RATE)


// async function TreeUpdate() {
// 	let file_tree = await EditServer.GetFileTree()
// // Create tree
// //
// 	file_tree.expanded = true
// 	var t = new TreeView(file_tree.children, 'tree_container');
// 	// var t = new TreeView(tree, 'tree_container');
// 	// console.log(t)
// 	expandAll.onclick = function () { t.expandAll(); };
// 	collapseAll.onclick = function () { t.collapseAll(); };
// 	t.on('select', function (e) {
// 		// decide if we load the markdown or json editor
// 		HandleEditorLoad(e.data)
// 		// UpdateJSONEditor(e.data.path)
// 		CURRENT_FILE = e.data.path
// 	});
// 	t.on('expand', function () { console.log('expand'); });
// 	t.on('collapse', function () { console.log('collapse'); });
// 	t.on('expandAll', function () { console.log('expand all'); });
// 	t.on('collapseAll', function () { console.log('collapse all'); });

// }

// // load file tree
// TreeUpdate()


// var container = document.getElementById('jsoneditor');
// var options = {
//   mode: 'tree',
//   modes: ['code', 'form', 'text', 'tree', 'view'], // allowed modes
//   onError: function (err) {
//     alert(err.toString());
//   },
//   onModeChange: function (newMode, oldMode) {
//     console.log('Mode switched from', oldMode, 'to', newMode);
//   },
//   onChange: function () {
//   	// console.log(editor.get())
//   }
// };
// // TODO: make the placeholder be some instructions
// var json = {
//   "array": [1, 2, 3],
//   "boolean": true,
//   "null": null,
//   "number": 123,
//   "object": {"a": "b", "c": "d"},
//   "string": "Hello World"
// }
// var JSONeditor = new JSONEditor(container, options, json);

// // update editor content based on the file selected
// // in the file tree
// async function HandleEditorLoad(data) {
// 	// let content = await EditServer.OpenFile(data)
// 	console.log(data)
// 	if (data.extension == '.json') {
// 		let content = await EditServer.OpenFile(data.path)
// 		JSONeditor.setText(content)
// 	}
// 	if (data.extension == '.md') {
// 		console.log('issa markdown file biotches')
// 	}
	
// }


// async function UpdateJSONEditor(path) {
// 	let content = await EditServer.OpenFile(path)
// 	JSONeditor.setText(content)
// }


// // sve current file
// saveFile.addEventListener('click', async () => {
// 	// send content back to server
// 	let confirmation = await EditServer.SaveFile(CURRENT_FILE, JSONeditor.get())
// 	console.log(confirmation)
// })

