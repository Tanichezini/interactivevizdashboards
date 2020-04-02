// Use D3 fetch to read the JSON file
// The data from the JSON file is arbitrarily named importedData as the argument
// d3.json("samples.json", function(error, data) {
//     console.log(data); // this is your data
// });
d3.json("samples.json").then((importedData) => {
  console.log(importedData);
  var data = importedData;
});

function buildBarChart(sample){

 // @TODO: Use `d3.json` to Fetch the Sample Data for the Plots
 d3.json(`/samples/${sample}`).then((data) => {
    // @TODO: Build a Bubble Chart Using the Sample Data
    const otu_ids = data.otu_ids;
    const otu_labels = data.otu_labels;
    const sample_values = data.sample_values;

    console.log(otu_ids);
    console.log(otu_labels);
    console.log(sample_values);


 })
    

}

function init() {
    // Grab a Reference to the Dropdown Select Element
    var selector = d3.select("#selDataset");
  
    // Use the List of Sample Names to Populate the Select Options
    d3.json("/names").then((sampleNames) => {
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
  
      // Use the First Sample from the List to Build Initial Plots
      const firstSample = sampleNames[0];
      console.log(firstSample);
      buildBarChart(firstSample)
    //   buildCharts(firstSample);
    //   buildMetadata(firstSample);
    });
}

  // Initialize the Dashboard
init();