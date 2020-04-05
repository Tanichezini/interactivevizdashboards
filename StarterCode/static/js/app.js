
/**
 * This function runs on page load.
 */
function init() {
    // Use d3 to grab the dropdown element
    var dropdown = d3.select("#selDataset");
    var prova = dropdown.property("value");
    console.log(prova);
   
    // Use d3 to retrieve the dataset. The .then() function runs on success,
    // the .catch() function runs on error.
    d3.json("samples.json").then((data) => {
        // Log the entire dataset
        console.log(data);

        // Declare a variable to contain all of the names
        var names = data.names;

        // For each name or ID in the array run a function
        names.forEach((name) => {
            // Append an option element to the #selDataset dropdown with the id
            // in the value attribute as well as text between the open and closed
            // tags.
            dropdown.append('option')
                .attr("value", name)
                .text(name);
        });
    }).catch(function(error){
        // The .catch() function runs on error if the d3.json()
        // can't find the file. The error variable will contain
        // the normal browser error.
        console.log("I couldn't find the file specified.")
        console.log(error);
    });

    //Fire the different charts and panel data;
    
    buildCharts(940);
    panelData(940);
    buildGauge(940);
    
};

// On change to the DOM, call option()
d3.selectAll("#selDataset").on("change", optionChanged);


/**
 * When the select dropdown is changed this function will fire
 * @param {Number} selectedValue This is the selected id
 */

function optionChanged(selectedValue) {
    
    console.log(`You changed the value. It is now: ${selectedValue}`);
    buildCharts(selectedValue); 
    panelData(selectedValue);
    buildGauge(selectedValue);
};
/**
 * 
 * @param {number} dropdown 
 */
function buildCharts(currentID) {

    // selected value is my current value
    /**
     * Reading the data and assigning it to variables.
     * 
     */
    console.log(currentID);

    
    d3.json("samples.json").then((data)=> {
        // Log the entire dataset
        console.log(data);

        var samples = data.samples;
        console.log(samples);
        samples.forEach(element => {
            if(element.id == currentID){
                // Log the entire element
                console.log(element);
                var otu_ids = element.otu_ids;
                var otu_labels = element.otu_labels;
                var sample_values = element.sample_values; 

       /** store the values I need to plot
        *  */         
                console.log(otu_ids);
                console.log(otu_labels);
                console.log(sample_values);

     /** Select ten values or less of Samples_values to be plot
      *  */           
                data=[]
                IDs=[]
                labels=[]
                if (sample_values.length > 10) {
                    console.log(sample_values.length);
                    var i;
                    for (i = 0; i < 10; i++) {
                        data.push(sample_values[i]);
                        IDs.push("OTU" + otu_ids[i]);
                        labels.push(otu_labels[i]);
                    }
                 
                } else{
                    console.log("less than 10 ="+ sample_values.length);
                    var i;
                    for (i = 0; i < sample_values.length; i++) {
                        data.push(sample_values[i]);
                        IDs.push("OTU"+ otu_ids[i]);
                        labels.push(otu_labels[i]);
                    }    
                };
                console.log(data);
                console.log(IDs);
                console.log(labels);

   /**
    * Build Bar Chart
    */
        
                var trace = {
                x: data,
                y: IDs,
                type: "bar",
                orientation: 'h',
                text: labels
                };

                var data = [trace];

                var layout = {
                    title:'<b>Bar Chart</b>',
                    xaxis: { title: "Sample Values"},
                    yaxis: { title: "IDs"}
                    };

                Plotly.newPlot("bar", data, layout);

    /**
     * Build a bubble chart
     * 
     */
            var trace2 = {
                x: otu_ids,
                y: sample_values,
                text: labels,
                mode: 'markers',
                marker: {
                    size: sample_values,
                    color: otu_ids,
                    colorscale: "jet"
                }
                };

                var bubbleData = [trace2];

                var bubbleLayout = {
                title: "Bubble Chart",
                xaxis: { title: "OTU ID"},
                yaxis: { title: "Sample Values"},
                margin: {t:0},
                hovermode: 'closest'
                };
                var Bubble_id = document.getElementById('bubble');
                Plotly.newPlot(Bubble_id, bubbleData, bubbleLayout);

   
    
            
            };
        });
    }).catch(function(error){
        // The .catch() function runs on error if the d3.json()
        // can't find the file. The error variable will contain
        // the normal browser error.
        console.log("I couldn't find the file specified.")
        console.log(error);
    });

    
};

/**
 * 
 * @param {number} currentID 
 */
function panelData(currentID) {

    // selected value is my current value
    /**
     * Reading the data and assigning it to variables.
     * 
     */
    console.log(currentID);

    
    d3.json("samples.json").then((data) =>{
        // Log the entire dataset
        console.log(data);

        var info = data.metadata;
        console.log("info = " + info);
        info.forEach(element => {
            console.log(element);
            if(element.id == currentID){
                // Log the entire element
                console.log(element);

    // Reference to Panel element for sample metadata
            var Panel = document.getElementById("sample-metadata");
            // Clear any existing metadata
            Panel.innerHTML = '';
            // Loop through all of the keys in the json response and
            // create new metadata tags
                for(var key in element) {
                    console.log(key);
                    h6tag = document.createElement("h6");
                    h6Text = document.createTextNode(`${key}: ${element[key]}`);
                    h6tag.append(h6Text);
                    Panel.appendChild(h6tag);
                }

            }




        });

    }).catch(function(error){
        // The .catch() function runs on error if the d3.json()
        // can't find the file. The error variable will contain
        // the normal browser error.
        console.log("I couldn't find the file specified.")
        console.log(error);
    });


}

function buildGauge(currentID){

    console.log(currentID);

    d3.json("samples.json").then((data) =>{
        // Log the entire dataset
        console.log(data);

        var info = data.metadata;
        console.log(info);
        info.forEach(element =>{
            if(element.id == currentID) {
        // Log the entire element
                console.log(element);
        // Enter the washing frequency between 0 and 180
                var level = element.wfreq*20;
        // Trig to calc meter point
                var degrees = 180 - level,
                    radius = .5;
                var radians = degrees * Math.PI / 180;
                var x = radius * Math.cos(radians);
                var y = radius * Math.sin(radians);
        // Path: 
                var mainPath = 'M -.0 -0.05 L .0 0.05 L ',
                    pathX = String(x),
                    space = ' ',
                    pathY = String(y),
                    pathEnd = ' Z';
                var path = mainPath.concat(pathX,space,pathY,pathEnd);

                var data = [{ type: 'scatter',
                x: [0], y:[0],
                    marker: {size: 12, color:'850000'},
                    showlegend: false,
                    name: 'Freq',
                    text: level,
                    hoverinfo: 'text+name'},
                { values: [50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50],
                rotation: 90,
                text: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '1-2', '0-1', ''],
                textinfo: 'text',
                textposition:'inside',
                marker: {
                    colors:[
                        'rgba(0, 105, 11, .5)', 'rgba(10, 120, 22, .5)',
                        'rgba(14, 127, 0, .5)', 'rgba(110, 154, 22, .5)',
                        'rgba(170, 202, 42, .5)', 'rgba(202, 209, 95, .5)',
                        'rgba(210, 206, 145, .5)', 'rgba(232, 226, 202, .5)',
                        'rgba(240, 230, 215, .5)', 'rgba(255, 255, 255, 0)']},
                labels: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '1-2', '0-1', ''],
                hoverinfo: 'label',
                hole: .5,
                type: 'pie',
                showlegend: false
                }];
                var layout = {
                shapes:[{
                    type: 'path',
                    path: path,
                    fillcolor: '850000',
                    line: {
                        color: '850000'
                    }
                    }],
                title: '<b>Belly Button Washing Frequency</b> <br> Scrubs per Week',
                height: 500,
                width: 500,
                xaxis: {zeroline:false, showticklabels:false,
                            showgrid: false, range: [-1, 1]},
                yaxis: {zeroline:false, showticklabels:false,
                            showgrid: false, range: [-1, 1]}
                };
                var gauge_plot = document.getElementById('gauge');
                Plotly.newPlot(gauge_plot, data, layout);




            }


        })




    }).catch(function(error){
        // The .catch() function runs on error if the d3.json()
        // can't find the file. The error variable will contain
        // the normal browser error.
        console.log("I couldn't find the file specified.")
        console.log(error);
    });
    

}
init();