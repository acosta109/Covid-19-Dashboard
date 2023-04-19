var myMap = L.map("map", {
  center: [39.8283, -98.5795],
  zoom: 5
});


// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);



// var marker2 = L.marker([37.0902, 95.713]).addTo(myMap);
//console.log(marker2)

// var popup = marker2.bindPopup('<b>Hello world!</b><br />I am a popup.');
const apiEndpoint = "https://api.covidactnow.org/v2/states.json";
const apiKey = "0c417904f50d4ee1ba49933bd4d12c08";
const apiurl = 'https://api.covidactnow.org/v2/counties.json?apiKey=0c417904f50d4ee1ba49933bd4d12c08'

const state = 'https://api.covidactnow.org/v2/states.json?apiKey=0c417904f50d4ee1ba49933bd4d12c08'




const getColor = d => {
  if (d > 5000000) {
    return '#800023';
  } else if (d > 2000000) {
    return '#BD0030';
  } else if (d > 1000000) {
    return '#E31A1B';
  } else if (d > 750000) {
    return '#FC4E3A';
  } else if (d > 500000) {
    return '#FD8D3C';
  } else if (d > 250000) {
    return '#FEB25C';
  } else {
    return '#FED980';
  }
};


Promise.all([
  d3.json(apiEndpoint+ "?apiKey=" + apiKey),
  d3.json('./static/js/latlon.json')
]).then(data => {
  console.log("Data loaded from both sources:", data);
  
  // Loop through the first set of data
  for (let i = 0; i < data[0].length; i++) {
    var d1 = data[0][i];

    var d = data[0][i].actuals.cases;
    
    
    
    var markercolor = getColor(d) 
    var coord = data[1][i];
    var size = d/80000;
 
    
    var marker = L.circleMarker([coord[0], coord[1]], {
      radius: size,
      color: markercolor,
      fillOpacity: 0.5
    }).addTo(myMap)
    
    marker.bindPopup(`<h3>${data[0][i].state}</h3><hr>
                <p><b> Total Cases</b> ${d}</p> 
                <p><b>Weekly New Cases per 100k</b> ${data[0][i].metrics.weeklyNewCasesPer100k}</p>
                <p><b>Test Positivity Ratio</b> ${data[0][i].metrics.testPositivityRatio}</p>
                <p><b>Total Population</b> ${data[0][i].population}</p>
                
    
`).addTo(myMap); 
}


// Creating the legend
var legend = L.control({position: 'bottomright'});
    legend.onAdd = function () {
        var div = L.DomUtil.create('div', 'info legend');
        var labels = [" 0-250,000 ", "250,000 - 500,000", "500,000 - 750,000  ","750,000 - 1,000,000", "1,000,000 - 2,000,000 ", "2,000,000 - 5,000,000 ", " 5,000,000+ "];
        var ranges = ['#FED980','#FEB25C','#FD8D3C','#FC4E3A', '#E31A1B','#BD0030', '#800023'];
        var div = L.DomUtil.create('div', 'info legend');
        div.style.backgroundColor = 'white'; // Add this line to set the background color
        var legendInfo = "";
        for (var i = 0; i < ranges.length; i++) {
          var color = ranges[i];
          var label = labels[i];
          legendInfo += `<div class='legend-color-box' style='background-color: ${color}'></div><span>${label}</span><br>`;
      }
        div.innerHTML = legendInfo;
        return div;
    };      
legend.addTo(myMap);


}).catch(error => console.error(error));






