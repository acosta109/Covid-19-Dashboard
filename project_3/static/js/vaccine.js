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
    if (d > 0.8) {
      return '#006400';
    } else if (d > 0.75) {
      return '#008000';
    } else if (d > 0.70) {
      return '#00FF00';
    } else if (d > 0.65) {
      return '#FF0000';
    } else if (d > 0.60) {
      return '#FC4E3A';
    } else if (d > 0.55) {
      return '#BD0030';
    } else {
      return  '#800023';
    }
  };

  [" <55% ", "55%-60%", "60%-65%  ","65%-70%", "70%-75% ", "75%-80% ", " 80%+ "]
  
  Promise.all([
    d3.json(apiEndpoint+ "?apiKey=" + apiKey),
    d3.json('./static/js/latlon.json')
  ]).then(data => {
    console.log("Data loaded from both sources:", data);
    
    // Loop through the first set of data
    for (let i = 0; i < data[0].length; i++) {
      
  
      var d = data[0][i].metrics.vaccinationsCompletedRatio;
      
      
      
      var markercolor = getColor(d) 
      var coord = data[1][i];
      var size = d*50;
   
      
      var marker = L.circleMarker([coord[0], coord[1]], {
        radius: size,
        color: markercolor,
        fillOpacity: 0.7
      }).addTo(myMap)
      
      marker.bindPopup(`<h3>${data[0][i].state}</h3><hr>
                  <p><b> Vaccines Completed:</b> ${d}</p> 
                  <p><b>Additional Booster:</b> ${data[0][i].metrics.vaccinationsAdditionalDoseRatio}</p>
                  <p><b>BiValent Booster:</b> ${data[0][i].metrics.vaccinationsFall2022BivalentBoosterRatio}</p>
                  <p><b>Total Population:</b> ${data[0][i].population}</p>
                  
      
  `).addTo(myMap); 
  }

  var legend = L.control({position: 'bottomright'});
  legend.onAdd = function () {
      var div = L.DomUtil.create('div', 'info legend');
      var labels = [" <55% ", "55%-60%", "60%-65%  ","65%-70%", "70%-75% ", "75%-80% ", " 80%+ "];
      var ranges = ['#800023','#BD0030','#FC4E3A','#FF0000', '#00FF00','#008000', '#006400'];
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