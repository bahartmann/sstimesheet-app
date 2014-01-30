exports.show = function() {
	$.monthWindow.add(scrollable);
	$.monthWindow.open();
};

var isAndroid = Ti.Platform.osname === 'android';

var currentDate = new Date();
containers = renderContainers(currentDate);

var scrollable = Ti.UI.createScrollableView({
	views : containers,
	currentPage : 1
});

function scrollListener(evt) {
	switch (evt.currentPage) {
		case 0:
			Ti.API.info("Listener L, data inicio: " + currentDate);
			currentDate.setMonth(currentDate.getMonth() - 1);
			
			var prevDate = new Date();
			prevDate.setDate(15);
			prevDate.setFullYear(currentDate.getFullYear());
			prevDate.setMonth(currentDate.getMonth() - 1);
			
			containers.unshift(newView(prevDate));
			containers.pop();
			
			if (isAndroid) {
				scrollable.removeEventListener('scrollend', scrollListener);
			}
			scrollable.currentPage = 1;
			scrollable.views = containers;
			if (isAndroid) {
				scrollable.addEventListener('scrollend', scrollListener);
			}
			break;
		case 1:
			break;
		case 2:
			currentDate.setMonth(currentDate.getMonth() + 1);
				        
			var nextDate = new Date();
			nextDate.setDate(15);
			nextDate.setFullYear(currentDate.getFullYear());
			nextDate.setMonth(currentDate.getMonth() + 1);
			
			containers.push(newView(nextDate));
			containers.shift();
			
			if (isAndroid) {
				scrollable.removeEventListener('scrollend', scrollListener);
			}
			scrollable.currentPage = 1;
			scrollable.views = containers;
			if (isAndroid) {
				scrollable.addEventListener('scrollend', scrollListener);
			}
			break;
	}
}
scrollable.addEventListener('scrollend', scrollListener);

function renderContainers(myDate){
	myDate.setDate(15);
	currentDate = myDate;
	
	var pDate = new Date();
	pDate.setDate(15);
	pDate.setFullYear(myDate.getFullYear());
	pDate.setMonth(myDate.getMonth() - 1);
	
	var nDate = new Date();
	nDate.setDate(15);
	nDate.setFullYear(myDate.getFullYear());
	nDate.setMonth(myDate.getMonth() + 1);
	
	var containers = [newView(pDate), newView(myDate), newView(nDate)];
	Ti.API.info("Data atual: " + myDate);
	
	return containers;
}

function newView(date) {
	var view = Ti.UI.createView();
	var table = Ti.UI.createTableView();
	
	var month = date.getMonth() + 1;
	var year = date.getFullYear();
	goMonth(month, year, function(e) {
		var content = JSON.parse(e.responseText);
		var days = content.month.days;
		createRows(table, days);
	});
	view.add(table);
	
	return view;
};

function createRows(table, days) {
	var tableData = [];
	for (var i = 0; i < days.length; i++) {
		tableData.push(createDayRow(days[i]));
	}
	table.setData(tableData);
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

function goMonth(month, year, callback){
	url = ('http://sstimesheet.herokuapp.com/month/' + year + '/' + month + '.json');
	var request = require('request').request;
	request.url = url;
	request.success = callback;
	request.connect();
}
