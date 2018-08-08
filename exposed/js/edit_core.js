// Backbone of the frontend editor components

class Editor {
	constructor() {
		this.controls = {
			expandTree: document.querySelector('#expandAll'),
			collapseTree: document.querySelector('#collapseAll'),
			saveFile: document.querySelector('#saveFile'),
			jsonEditor: document.querySelector('#jsoneditor')
		}

		var options = {
			mode: 'tree',
			modes: ['code', 'form', 'text', 'tree', 'view'], // allowed modes
			onError: function (err) {
		   	alert(err.toString());
			},
			onModeChange: function (newMode, oldMode) {
		   	console.log('Mode switched from', oldMode, 'to', newMode);
			},
			onChange: function () {
		  	// console.log(editor.get())
			}
		};
		let sample = {
			"array": [1, 2, 3],
			"boolean": true,
			"null": null,
			"number": 123,
			"object": {"a": "b", "c": "d"},
			"string": "Hello World"
		}
		this.jsonEditor = new JSONEditor(this.controls.jsonEditor, options, sample)
		this.simplemde = new SimpleMDE({ element: document.querySelector("#simplemde") })


	}

	async TreeUpdate() {
		// TODO: watch filesytem for changes and respond accordingly
	}

	async TreeInit(select_callback) {
		saveFile.addEventListener('click', async () => {
			// send content back to server
			let confirmation = await eServer.Post('/edit/save_file', {
				path: CURRENT_FILE, 
				content: editor.jsonEditor.get()
			}, 'text')
			console.log(confirmation)
		})


		let file_tree = await eServer.Post('/request_file_tree', {}, 'json')

		file_tree.expanded = true
		this.tree = new TreeView(file_tree.children, 'tree_container');
		
		editor.tree.on('select', (e) => {
			select_callback(e)
		});

		this.controls.expandTree.onclick = function () { editor.tree.expandAll(); };
		this.controls.collapseTree.onclick = function () { editor.tree.collapseAll(); };

		this.tree.on('expand', function () { console.log('expand'); });
		this.tree.on('collapse', function () { console.log('collapse'); });
		this.tree.on('expandAll', function () { console.log('expand all'); });
		this.tree.on('collapseAll', function () { console.log('collapse all'); });
	}

	async HandleEditorLoad(data) {
		if (data.extension == '.json') {
			// strip file extension
			let adjustedPath = data.path.replace(/\.[^/.]+$/, "")
			console.log(adjustedPath)
			let content = await eServer.Post('/edit/open_file', {path: adjustedPath}, 'json')
			console.log(content)
			this.jsonEditor.setText(JSON.stringify(content.json))
			this.simplemde.value(content.markdown)
		}
		if (data.extension == '.md') {
			console.log('issa markdown file biotches')
		}
	}
}