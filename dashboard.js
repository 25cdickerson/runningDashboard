function openTab(evt, tabName, subTabName,  isInnerTab) {
	// Declare all variables
	var i, tabcontent, tablinks, subtabcontent;

	// Get all elements with class="tabcontent" and hide them
	tabcontent = document.getElementsByClassName("tabcontent");
	for (i = 0; i < tabcontent.length; i++) {
		if (!isInnerTab || tabcontent[i].id === tabName) {
			tabcontent[i].style.display = "none";
		}
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
	document.getElementById(subTabName).style.display = "block";
	evt.currentTarget.className += " active";

	// Create a chart for the currently viewed table
	if (!isInnerTab && tabName === "high-school") {
		createChart("high-school-chart", "High School Performances");
	} else if (!isInnerTab && tabName === "college") {
		createChart("college-chart", "College Performances");
	}
}

  

function createChart(chartId, chartTitle) {
	var table = document.querySelector("#" + chartId).previousElementSibling;
	var dates = Array.from(table.querySelectorAll("tbody tr td:first-child")).map((date) => date.textContent);
	var times = Array.from(table.querySelectorAll("tbody tr td:last-child")).map((time) => time.textContent);

	var data = {
		labels: dates,
		datasets: [
			{
				label: "Time (MM:SS)",
				backgroundColor: "rgba(255, 99, 132, 0.2)",
				borderColor: "rgba(255, 99, 132, 1)",
				borderWidth: 1,
				hoverBackgroundColor: "rgba(255, 99, 132, 0.4)",
				hoverBorderColor: "rgba(255, 99, 132, 1)",
				data: times,
			},
		],
	};

	var options = {
		title: {
			display: true,
			text: chartTitle,
			fontSize: 18,
			fontStyle: "bold",
		},
		scales: {
			yAxes: [
				{
					scaleLabel: {
						display: true,
						labelString: "Time (MM:SS)",
						fontSize: 14,
						fontStyle: "bold",
					},
				},
			],
		},
	};

	var ctx = document.getElementById(chartId).getContext("2d");
	var myChart = new Chart(ctx, {
		type: "line",
		data: data,
		options: options,
	});
}

// Call the createChart function for the initially displayed tab
createChart("high-school-chart", "High School Performances");
