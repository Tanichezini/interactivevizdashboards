/**
 * It is a good habit to write down the steps to take in a comment block like this
 *      1) First fill the dropdown element with all of the names ids
 *      2) Create an event listener that will change values when an ID is selected in the dropdown
 *          a) this should fire off a function to update the bar chart
 *          b) this should also fire off a function to update the bubble chart
 *          c) The metadata also needs to be updated in the #sample-metadata div element
 */

/**
 * This function runs on page load.
 */
function init() {
    // Use d3 to grab the dropdown element
    var dropdown = d3.select("#selDataset");

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
}

// Run the initialize function on page load.
init();


/**
 * When the select dropdown is changed this function will fire
 * @param {Number} selectedValue This is the selected id
 */
function optionChanged(selectedValue) {
    console.log(`You changed the value. It is now: ${selectedValue}`);
}


/**
 * This block of code helps to show how to step through the dataset and get to 
 * the values that you need to work with
 */
d3.json("samples.json").then((data)=> {
    // Log the entire dataset
    console.log(data);

    // Log just the names property of the entire dataset
    console.log(data.names);

    // Declare some variables that will contain each 
    // section of the dataset
    var names = data.names;
    var metadata = data.metadata;
    var samples = data.samples;

    // We tested our foreach loop with a static number,
    // The goal is to make this dynamic by working with the 
    // selected ID in the dropdown
    var currentID = 948;

    // Create a loop that will work with each samples value
    samples.forEach(element => {
        // Use a logic test to find the element that matches
        // the selected ID named currentID in this case.
        if(element.id == currentID){
            // Log the entire element
            console.log(element);

            // Select an html element to work with
            d3.select()
                .data(element)
                .enter()
                .append('p')
                .text(`${element.id}`);

            // The other option is to work with the object entries as
            // an array using Object.entries(Your Data)
            Object.entries(element).forEach((key, value) => {
                // This will log each dictionary key and value that were inside 
                // the element variable.
                console.log(`key: ${key} | value: ${value}`)
            });
        }
        
    });
});

