//API URL for states: https://api.covidactnow.org/v2/states.json?apiKey={apiKey}
//API URL for timeseries and states: https://api.covidactnow.org/v2/state/{state}.timeseries.json?apiKey=YOUR_KEY_HERE


const baseAllStatesURL = "https://api.covidactnow.org/v2/states.json?apiKey=";
//Build our timeseries URL parts
const timeSeriesURLpt1 = "https://api.covidactnow.org/v2/state/";
const timeSeriesURLpt2 = ".timeseries.json?apiKey=";
const apiKey = "e7900bbde7424392b7361225eebf01ce";

let statesQuery = baseAllStatesURL + apiKey;

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
            //console.log(state);
            //Make the drop down
           dropdownMenu.append("option").text(state).property("value",state);
        });

        // AK
       let alaska = states[0];


        // Build the initial plots
        buildLineGraph(alaska);

    });
};
function buildLineGraph(state){
    let deathsArray = [];
    let vaccinesArray = [];
    let casesArray = [];
    let datesArray = [];
    d3.select("#myChart").html("");
    //Create query URL
    let timeSeriesQuery = timeSeriesURLpt1 + state + timeSeriesURLpt2 + apiKey;
    //console.log(timeSeriesQuery);
    //Get the data
    d3.json(timeSeriesQuery).then((data) => {
        //console.log(data);
        let acutalsTimeseries = data.actualsTimeseries;
        //console.log("600", acutalsTimeseries[600]);
        //For the loop we want index = 600 to 699.
        for(index = 600; index<700; index++){
            //Gather the data we want from the API for the Line graph
            let deaths =  acutalsTimeseries[index].deaths;
            deathsArray.push(deaths);

            let vaccines = acutalsTimeseries[index].vaccinesAdministered;
            vaccinesArray.push(vaccines);

            let cases = acutalsTimeseries[index].cases;
            casesArray.push(cases);

            let date = acutalsTimeseries[index].date;
            datesArray.push(date);
        };
        //Verify we collected the data
    console.log("Deaths", deathsArray);
    console.log("Vaccines", vaccinesArray);
    console.log("Cases", casesArray);
    console.log("Dates", datesArray);

    //Construct data for line chart
    let chartData = {
        labels: datesArray,
        datasets: [
          {
            label: 'Cases',
            data: casesArray,
            borderColor: "#F91E17",
            //backgroundColor: Utils.transparentize(Utils.CHART_COLORS.red, 0.5),
            yAxisID: 'y',
          },
          {
            label: 'Deaths',
            data: deathsArray,
            borderColor: "#0A31F8",
            //backgroundColor: Utils.transparentize(Utils.CHART_COLORS.blue, 0.5),
            yAxisID: 'y',
          },
          {
            label: 'Vaccines Administered',
            data: vaccinesArray,
            borderColor: "#15950C",
            //backgroundColor: Utils.transparentize(Utils.CHART_COLORS.green, 0.5),
            yAxisID: 'y1',
          }
        ]
      };

    // Get the canvas element from the HTML file
    let canvas = document.getElementById('myChart');

    // Get the context of the canvas element
    let ctx = canvas.getContext('2d');

    let config = new Chart(ctx, {
        type: 'line',
        data: chartData,
        options: {
          responsive: true,
          interaction: {
            mode: 'index',
            intersect: false,
          },
          stacked: false,
          plugins: {
            title: {
              display: true,
              text: 'COVID-19 Cases, Deaths, and Vaccination Data'
            }
          },
          scales: {
            y: {
              type: 'linear',
              display: true,
              position: 'left',
            },
            y1: {
              type: 'linear',
              display: true,
              position: 'right',
      
              // grid line settings
              grid: {
                drawOnChartArea: false, // only want the grid lines for one axis to show up
              },
            },
          }
        },
      });

     });

    
};

function optionChanged(state) { 
    // Check to make sure we are switching values
    console.log(state); 
    // Clear the chart to change data sets
    let canvas = document.getElementById('myChart');
    Chart.getChart(canvas).destroy();
    //Change everything accordingly 
    buildLineGraph(state);
};

init();
