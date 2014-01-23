exports.show = function() {
	createRows(days);
	$.monthWindow.open();
};

var file = Titanium.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory, '/arquivo.json');    
var preParseData = (file.read().toString()); 
var data = JSON.parse(preParseData);

var days = data.month.days;

function createRows(days) {
	var tableData = [];
	for (var i = 0; i < days.length; i++) {
		tableData.push(createDayRow(days[i]));
	}
	$.daysTable.setData(tableData);
}

function createDayRow(day) {
	var row = Ti.UI.createTableViewRow({
		//layout: 'horizontal'
	});
	var label = Ti.UI.createLabel({
		text: day.day,
		top: '8dp',
//		right: '14dp',
		bottom: '8dp',
		left: '14dp',
		height: '32dp',
		width: '20dp'
	});
	row.add(label);
	
	row.add(createTasksView(day.tasks));
	
	return row;
};

function createTasksView(tasks) {
	var tasksView = Titanium.UI.createView({
		layout: 'vertical',
		right: '8dp',
		left: '48dp',
		top: '4dp'
	});
	
	for (var i = 0; i < tasks.length; i++) {
		var task = Ti.UI.createLabel({
			text: tasks[i].description,
			height: '32dp',
			top: '4dp',
			left: '0dp'
		});
		tasksView.add(task);
	}
		
	return tasksView;
};



$.monthWindow.addEventListener('open', function() {
	var actionBar = $.monthWindow.activity.actionBar;
	if (actionBar) {
		actionBar.title = data.month.name;
	}
});