//API URL: https://api.covidactnow.org/v2/states.json?apiKey={apiKey}

const baseAllStatesURL = "https://api.covidactnow.org/v2/states.json?apiKey=";

let statesQuery = baseAllStatesURL + api_key;

d3.json(statesQuery).then(function(data) {
    console.log(data);
    //This is how we can access an individual's actuals data.
    let actuals = data[32].actuals;
    console.log("NJ Actuals", actuals);
    //This is how I can access the vaccine info in actuals
    let vaccinationsAdditionalDose = actuals.vaccinationsAdditionalDose;
    console.log("vaccinationsAdditionalDose", vaccinationsAdditionalDose)
});

// Initialise the dashboard at start up 
function init() {

    // Use D3 to select the dropdown menu
    let dropdownMenu = d3.select("#selDataset");

    // Use D3 to get sample names and populate the drop-down selector
    d3.json(statesQuery).then((data) => {
        
        // Setting the states variable
        let states = [];

        for(i = 0; i < data.length; i++){
            if(data[i].state != "DC"){
                states.push(data[i].state);
            }
            else{
                console.log("DC")
            }
            
        };
        //Checking if we logged the states for the dropdown menu
        console.log("States",states);

        // Add  samples to dropdown menu
        states.forEach((state) => {

            // Validating
            console.log(state);
            //Make the drop down
           dropdownMenu.append("option").text(state).property("value",state);
        });

        // Set the first sample from the list
       let alaska = states[0];

        // Log the value of sample_one
        console.log("First Element", alaska);

        // Build the initial plots
        buildMetadata(alaska);
        buildGaugeChart(alaska);
        buildBarChart(alaska);
        buildPieChart(alaska);
        

    });
};

function buildMetadata(state) {

    // Use D3 to retrieve all of the data
    d3.json(statesQuery).then((data) => {
        //Filter based on state we want
        let stateData = data.filter(result => result.state == state);
        //Test for how to access the information to append to the dictionary 
        console.log("State Info", stateData[0]);

        let caseMap = new Map();
        caseMap.set("Population", stateData[0].population.toLocaleString());
        caseMap.set("Total Cases", stateData[0].actuals.cases.toLocaleString());
        caseMap.set("New Cases", stateData[0].actuals.newCases.toLocaleString());
        caseMap.set("Total Deaths", stateData[0].actuals.deaths.toLocaleString());
        caseMap.set("New Deaths", stateData[0].actuals.newDeaths.toLocaleString());
        caseMap.set("Total Vaccines Administered", stateData[0].actuals.vaccinesAdministered.toLocaleString());
        caseMap.set("Bivalent Fall2022 Booster", stateData[0].actuals.vaccinationsFall2022BivalentBooster.toLocaleString());
        // Confirming everything we want is in the map for State Metrics
        console.log("State Metrics Map", caseMap);

        //Select the part of the HTML code me want
        let stateCovidData = d3.select("#sample-metadata");
        // Clear out metadata
        d3.select("#sample-metadata").html("");
        //Add each item of the map to the display area
        caseMap.forEach((value, key) => {
            stateCovidData.append("h5").text(`${key}: ${value} \n`);
          });

        
    });

};

function buildGaugeChart(state){
     // Use D3 to retrieve all of the data
     d3.json(statesQuery).then((data) => {
        //Filter based on state we want
        let stateData = data.filter(result => result.state == state);
        //Test for how to access the information to append to the dictionary 

        let infectionRate = stateData[0].riskLevels.infectionRate;
        console.log("Infection Rate", infectionRate);
        //Scale 0-5
        let gaugeChart = [
            {
              type: "indicator",
              mode: "gauge+number",
              value: infectionRate,
              title: `Infection Level for ${state}`,
              gauge: {
                axis: { range: [0, 5] },
                steps: [
                  { range: [0, 1], color: "lightblue" },
                  { range: [1, 2], color: "blue" },
                  { range: [2, 3], color: "yellow" },
                  { range: [3, 4], color: "orange" },
                  { range: [4, 5], color: "red" },
                ],
                threshold: {
                  line: { color: "black", width: 4 },
                  thickness: 0.75,
                  value: 4.0
                }
              }
            }
          ];
          
          let layout = {
            width: 500,
            height: 400,
            margin: { t: 0, b: 0 }
          };
          
          Plotly.newPlot("gauge", gaugeChart, layout);
        
    });   

};

function buildBarChart(state){
    // Use D3 to retrieve all of the data
    d3.json(statesQuery).then((data) => {
       //Filter based on state we want
       let stateData = data.filter(result => result.state == state);
       //We want total cases, deaths, and vaccines per state for the bar chart
       let barChartData = [{
           x: ["Total Cases", "Total Deaths", "Fall2022 Bivalent Booster"],
           y: [stateData[0].actuals.cases, stateData[0].actuals.deaths, stateData[0].actuals.vaccinationsFall2022BivalentBooster],
           name: `${state} Totals`,
           type: 'bar',
           marker: {
               color: ['#2CA02C', 'FFA833', 'AC33FF']
           },
           hovertext: [stateData[0].actuals.cases.toLocaleString(),
            stateData[0].actuals.deaths.toLocaleString(), stateData[0].actuals.vaccinationsFall2022BivalentBooster.toLocaleString()],
           hoverinfo: 'text'
       }];
       let layout = {
           yaxis: {
               title: 'Case and Death Totals'
             }
       };
         
       Plotly.newPlot("bar", barChartData, layout);
       
   }); 
};

function buildPieChart(state){
    // Use D3 to retrieve all of the data
    d3.json(statesQuery).then((data) => {
       //Filter based on state we want
       let stateData = data.filter(result => result.state == state);
       let pieChartData = [{
        values: [stateData[0].actuals.positiveTests, stateData[0].actuals.negativeTests],
        labels: ["Positive Tests", "Negatives Tests"],
        type: "pie",
        marker:{
            colors: ["AC33FF", "D7FF33"],
            hovertemplate: '%{label}: %{percent:.1f}%'
        }
       }];

       let layout = {
        title: "Positive vs Negative Tests"
       };

       Plotly.newPlot("pie", pieChartData, layout);
       
   }); 
}

function optionChanged(state) { 
    // Check to make sure we are switching values
    console.log(state); 
    //Change everything accordingly 
    buildMetadata(state);
    buildGaugeChart(state);
    buildBarChart(state);
    buildPieChart(state);
};

init();