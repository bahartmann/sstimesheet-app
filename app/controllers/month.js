exports.show = function(response) {
	var content = JSON.parse(response);
	createActionBar(content.month);
	
	var days = content.month.days;
	createRows(days);
	
	$.monthWindow.open();
};

function createRows(days) {
	var tableData = [];
	for (var i = 0; i < days.length; i++) {
		tableData.push(createDayRow(days[i]));
	}
	$.daysTable.setData(tableData);
}

function createDayRow(day) {
	var row = Ti.UI.createTableViewRow();
	if (day.day_type == 'weekend'){
		row.setBackgroundColor('#dbdbdb');
	} else if (day.day_type == 'today'){
		row.setBackgroundColor('#18bc9c');
	}

	var dayLabel = Ti.UI.createLabel({
		text: day.day,
		top: '8dp',
		right: '14dp',
		bottom: '8dp',
		left: '14dp',
		width: '20dp'
	});
	row.add(dayLabel);
	row.add(createTasksView(day.tasks));	
	return row;
};

function createTasksView(tasks) {
	var tasksView = Titanium.UI.createView({
		layout: 'vertical',
		right: '8dp',
		left: '48dp',
		top: '4dp',
		bottom: '4dp'
	});
		
	for (var i = 0; i < tasks.length; i++) {
		var task = Ti.UI.createLabel({
			text: tasks[i].description,
			top: '4dp',
			left: '0dp'
		});
		tasksView.add(task);
	}
	return tasksView;
};

function createActionBar(month){
	$.monthWindow.addEventListener('open', function() {
		var actionBar = $.monthWindow.activity.actionBar;
		if (actionBar) {
			actionBar.title = month.name;
		}
	});
	
	$.monthWindow.activity.onCreateOptionsMenu = function(e) {
	    var menu = e.menu;
	    menu.add({ 
			title : "<",
			showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS
		}).addEventListener("click", function(e) {
			prevMonth(month.month, month.year);
		});
		menu.add({ 
			title : ">",
			showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS
		}).addEventListener("click", function(e) {
			nextMonth(month.month, month.year);
		});
	};
}

function prevMonth(month, year){
	if (month == 1){
		month = 12;
		year = year - 1;
	} else {
		month = month - 1;
	}
	goMonth(month, year);
}
function nextMonth(month, year){
	if (month == 12){
		month = 1;
		year = year + 1;
	} else {
		month = month + 1;
	}
	goMonth(month, year);
}

function goMonth(month, year){
	url = ('http://sstimesheet.herokuapp.com/month/' + year + '/' + month + '.json');
	var request = require('request').request;
	request.url = url;
	request.connect();
}
