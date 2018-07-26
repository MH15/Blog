// editor
var tree = [{
		name: 'Vegetables',
		children: []
	}, {
		name: 'Fruits',
		children: [{
			name: 'Apple',
			children: []
		}, {
			name: 'Orange',
			children: []
		}, {
			name: 'Lemon',
			children: []
		}]
	}, {
		name: 'Candy',
		children: [{
			name: 'Gummies',
			children: []
		}, {
			name: 'Chocolate',
			children: [{
				name: 'M & M\'s',
				children: []
			}, {
				name: 'Hershey Bar',
				children: []
			}]
		}, ]
	}, {
		name: 'Bread',
		children: []
	}];
//
// Grab expand/collapse buttons
//
var expandAll = document.getElementById('expandAll');
var collapseAll = document.getElementById('collapseAll');
//


// var p = new TreeView(tree, 'tree_container_2');

async function TreeUpdate() {
	let file_tree = await Server.GetFileTree()
	console.log(file_tree)
// Create tree
//
	file_tree.expanded = true
	var t = new TreeView(file_tree.children, 'tree_container');
	console.log(t)
	// var t = new TreeView(tree, 'tree_container');
	// console.log(t)
	expandAll.onclick = function () { t.expandAll(); };
	collapseAll.onclick = function () { t.collapseAll(); };
	t.on('select', function (e) { 
		console.log('select')
		console.log(e)
		UpdateJSONEditor(e.data.path)
	});
	t.on('expand', function () { console.log('expand'); });
	t.on('collapse', function () { console.log('collapse'); });
	t.on('expandAll', function () { console.log('expand all'); });
	t.on('collapseAll', function () { console.log('collapse all'); });

}

TreeUpdate()


var container = document.getElementById('jsoneditor');
var options = {
  mode: 'tree',
  modes: ['code', 'form', 'text', 'tree', 'view'], // allowed modes
  onError: function (err) {
    alert(err.toString());
  },
  onModeChange: function (newMode, oldMode) {
    console.log('Mode switched from', oldMode, 'to', newMode);
  }
};
// TODO: make the placeholder be some instructions
var json = {
  "array": [1, 2, 3],
  "boolean": true,
  "null": null,
  "number": 123,
  "object": {"a": "b", "c": "d"},
  "string": "Hello World"
};
var editor = new JSONEditor(container, options, json);

// update editor content based on the file selected
// in the file tree
async function UpdateJSONEditor(path) {
	let content = await Server.OpenFile(path)
	console.log(content)
	editor.setText(content)
}