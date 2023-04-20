var myMap = L.map("map", {
    center: [39.8283, -98.5795],
    zoom: 5
  });
  console.log('hello')
  
  // Adding the tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);
  
  
  
  // var marker2 = L.marker([37.0902, 95.713]).addTo(myMap);
  //console.log(marker2)
  
  // var popup = marker2.bindPopup('<b>Hello world!</b><br />I am a popup.');
  const apiEndpoint = "https://api.covidactnow.org/v2/states.json";


  
  
  console.log(geoapify)
  const getColor = d => {
  if (d > 80000) {
    return '#000000';
  } else if (d > 70000) {
    return '#696969';
  } else if (d > 40000) {
    return '#778899';
  } else if (d > 15000) {
    return '#808080';
  } else if (d > 7500) {
    return '#C0C0C0';
  } else if (d > 5000) {
    return '#d3d3d3';
  } else {
    return  '#FFFFFE';
  }
};
  
  
  Promise.all([
    d3.json(apiEndpoint+ "?apiKey=" + api_key),
    d3.json('./static/js/latlon.json')
  ]).then(data => {
    console.log("Data loaded from both sources:", data);
    
    // Loop through the first set of data
    for (let i = 0; i < data[0].length; i++) {
     
  
      var d = data[0][i].actuals.deaths;
      
      
      
      var markercolor = getColor(d) 
      var coord = data[1][i];
      var size = d/1000;
   
      
      var marker = L.circleMarker([coord[0], coord[1]], {
        radius: size,
        color: markercolor,
        fillOpacity: 0.75
      }).addTo(myMap)
      
      marker.bindPopup(`<h3>${data[0][i].state}</h3><hr>
                  <p><b> Total Deaths:</b> ${d}</p> 
                  <p><b>Current Hospital Beds:</b> ${data[0][i].actuals.hospitalBeds.currentUsageCovid}</p>
                  <p><b>Weekly Covid Admissions:</b> ${data[0][i].actuals.hospitalBeds.weeklyCovidAdmissions}</p>
                  <p><b>Weekly Admissions per 100k:</b> ${data[0][i].metrics.weeklyCovidAdmissionsPer100k}</p>
                  
      
  `).addTo(myMap); 
  }

  var legend = L.control({position: 'bottomright'});
    legend.onAdd = function () {
        var div = L.DomUtil.create('div', 'info legend');
        var labels = [" 0-5,000 ", "5000-7500", "7,500 - 15,000  ","15,000-40,000", "40,000-70,000 ", "70,000-80,000 ", " 80,000+ "];
        var ranges = ['#FFFFFE','#d3d3d3','#C0C0C0','#808080', '#778899','#696969', '#000000'];
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