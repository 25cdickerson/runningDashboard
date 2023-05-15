function openTab(evt, tabName, subTabName,  isInnerTab) {
	// Declare all variables
	var i, tabcontent, tablinks, subtabcontent;

	// Get all elements with class="tabcontent" and hide them
	tabcontent = document.getElementsByClassName("tabcontent");
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}

	// Get all elements with class="subtabcontent" and hide them
	subtabcontent = document.getElementsByClassName("subtabcontent");
	for(i = 0; i < subtabcontent.length; i++){
		subtabcontent[i].style.display = "none";
	}

	// Get all elements with class="tablinks" and remove the class "active"
	tablinks = document.getElementsByClassName("tablinks");
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(" active", "");
	}

	// Show the current tab, and add an "active" class to the button that opened the tab
	document.getElementById(tabName).style.display = "block";
	if(subTabName != "null"){
		createGraph(subTabName, subTabName + "Table");
		document.getElementById(subTabName).style.display = "flex";
	}

	if(tabName == 'strava'){
		getLatestActivity();
	}
	evt.currentTarget.className += " active";
}

function createGraph(subTabName, tableID){
	// Extract the data from the table
	console.log(tableID);
	var table = document.getElementById(tableID);
	var data = [];
	for (var i = 1; i < table.rows.length; i++) {
		var row = table.rows[i];
		var dateParts = row.cells[1].innerHTML.split("/");
		var date = new Date(dateParts[2], dateParts[0] - 1, dateParts[1]);
		var timeParts = row.cells[2].innerHTML.split(":");
		var time = parseInt(timeParts[0]) * 60 + parseFloat(timeParts[1]);
		data.push({ meet: row.cells[0].innerHTML, date: date, time: time, place: parseInt(row.cells[3].innerHTML) });
	}

	// Sort the data by date
	data.sort(function(a, b) {
		return a.date.getTime() - b.date.getTime();
	});

	// Extract the sorted data into separate arrays
	var dates = data.map(function(d) { return d.date.toLocaleDateString(); });
	var times = data.map(function(d) { return d.time; });
	var places = data.map(function(d) { return d.place; });
	var meets = data.map(function(d) { return d.meet; });

	// Set the PR
	var pr = times.reduce((a, b) => { return Math.min(a, b) });
	pr = (Math.floor(pr / 60)).toString().padStart(2, '0') + ':' + ((pr % 60).toPrecision(2)).toString().padStart(2, '0');
	if(pr.charAt(4) == '.'){
		pr = pr.substring(0, 3) + '0' + pr.substring(3, pr.length);
	}
	document.getElementById(subTabName + "PR").innerHTML = "PR: " + pr;
	// Create the plot
	var trace1 = {
	x: dates,
	y: times,
	mode: 'lines+markers',
	name: 'Time (MM:SS)',
	marker: {
		color: 'rgb(219, 64, 82)',
		size: 8
	},
	line: {
		color: 'rgb(219, 64, 82)',
		width: 1
	},
	hovertemplate: 'Time: %{text}<br>Date: %{x}<extra></extra>',
	text: times.map(function(d) { return (Math.floor(d / 60)).toString().padStart(2, '0') + ':' + ((d % 60).toPrecision(2)).toString().padStart(2, '0'); })
	};

	var trace2 = {
	x: dates,
	y: places,
	mode: 'lines+markers',
	name: 'Place',
	marker: {
		color: 'rgb(55, 128, 191)',
		size: 8
	},
	line: {
		color: 'rgb(55, 128, 191)',
		width: 1
	},
	yaxis: 'y2'
	};

	var data = [trace1, trace2];

	// Calculate the tick values and corresponding labels
	var tickvals = [];
	var ticktext = [];

	// Calculate the number of ticks needed
	var numTicks = Math.ceil(times[times.length - 1] / 15);

	for (var i = 0; i < numTicks; i++) {
		// Calculate the time for the current tick
		var tickTime = i * 15;
		var minutes = Math.floor(tickTime / 60);
		var seconds = tickTime % 60;

		// Add the tick to the arrays
		tickvals.push(tickTime);
		ticktext.push(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
	}

	var layout = {
		xaxis: {
			title: 'Date'
		},
		yaxis: {
			title: 'Time',
			tickvals: tickvals,
			ticktext: ticktext,
			dtick: 50
		},
		yaxis2: {
			title: 'Place',
			overlaying: 'y',
			side: 'right',
			range: [places[0] - 10, places[places.length - 1] + 10]
		}
	};
			  
	var graph = Plotly.newPlot(subTabName + '-chart', data, layout);

	document.querySelector('[data-title="Autoscale"]').click()
}


function getLatestActivity() {
	var StravaApiV3 = require('strava_api_v3');
	var defaultClient = StravaApiV3.ApiClient.instance;

	// Configure OAuth2 access token for authorization: strava_oauth
	var strava_oauth = defaultClient.authentications['7832a932d1f19f6939f9b7d104511402dec85af9'];

	// Update the access token using the refresh token
	var stravaRefreshToken = "0dfcf1ff89233b7d2ccf5f248f50b087d5ce1734";
	var authApi = new StravaApiV3.AuthenticationApi();
	var opts = {
	'clientId': "104478",
	'clientSecret': "e4e2e01761772413c752cd7af1d3e5ad0e2f1e25",
	'grantType': "refresh_token",
	'refreshToken': stravaRefreshToken
	};

	authApi.getToken(opts, function(error, data, response) {
	if (error) {
		console.error(error);
	} else {
		// Update the access token with the new value
		strava_oauth.accessToken = data.access_token;

		// Use the updated access token for API calls
		var api = new StravaApiV3.ActivitiesApi();
		var opts = { 
		'page': 1, // Specify the page number (defaults to 1)
		'perPage': 1 // Specify the number of items per page (set to 1 for only the most recent activity)
		};

		var callback = function(error, data, response) {
		if (error) {
			console.error(error);
		} else {
			console.log('API called successfully. Returned data: ' + data);
		}
		};

		api.getLoggedInAthleteActivities(opts, callback);
	}
	});

}