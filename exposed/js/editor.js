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
  // Create tree
  //
  var t = new TreeView(tree, 'tree_container');
  //
  // Attach events
  //
  expandAll.onclick = function () { t.expandAll(); };
  collapseAll.onclick = function () { t.collapseAll(); };
  t.on('select', function (e) { 
  	console.log('select')
  	console.log(e) 
  });
  t.on('expand', function () { console.log('expand'); });
  t.on('collapse', function () { console.log('collapse'); });
  t.on('expandAll', function () { console.log('expand all'); });
  t.on('collapseAll', function () { console.log('collapse all'); });