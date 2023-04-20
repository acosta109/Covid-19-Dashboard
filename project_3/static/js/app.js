
const apiEndpoint = "https://api.covidactnow.org/v2/states.json";




d3.json(apiEndpoint + "?apiKey=" + api_key).then(data => {
  console.log(data);
});



// Initialize the dashboard at start up 
function init() {

    // Use D3 to select the dropdown menu
    let dropdownMenu = d3.select("#selDataset");

    // Use D3 to get sample names and populate the drop-down selector
    d3.json(apiEndpoint + "?apiKey=" + api_key).then((data) => {
        for (var i =0; i< data.length;i++){
        // Set a variable for each state
        let states = data[i].state;
        let metrics = data[i].metrics
        console.log(metrics);
            
            dropdownMenu.append("option")
             .text(states)
             .property("value", states);
            let sample_one = states[i];
        //Build the initial plots
         buildMetadata(sample_one);
         //buildBarChart(sample_one);
        // buildBubbleChart(sample_one);
        // buildGaugeChart(sample_one);
        
    }

    }
)};


 function buildMetadata(sample) {

//     // Use D3 to retrieve all of the data
d3.json(apiEndpoint + "?apiKey=" + api_key).then((data) => {

     // Retrieve all metrics
           let metrics = data.metrics;

//         // Filter based on the value of the sample
         let value = metrics.filter(result => result.state == sample);

//         // Log the array of metadata objects after the have been filtered
        console.log(value)

//         // Get the first index from the array
       let valueData = value[0];

//         // Clear out metadata
         d3.select("#sample-metadata").html("");

//         // Use Object.entries to add each key/value pair to the panel
        Object.entries(valueData).forEach(([key,value]) => {

//             // Log the individual key/value pairs as they are being appended to the metadata panel
            console.log(key,value);

           d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
        });
    });

};



//function buildBarChart(sample){

//}






init();