const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Fetch the JSON data and console log it

function buildcharts (sample){d3.json(url).then(function(data) {
    console.log(data.names[0]);
    let samples = data.samples
   
    let resultArray = samples.filter(sampleObj => sampleObj.id == sample);
    let result = resultArray[0];
  
    let otu_ids = result.otu_ids;
    let otu_labels = result.otu_labels;
    let sample_values = result.sample_values;
    let yticks = otu_ids.slice (0 , 10).map(otuID => `OTU ${otuID}`).reverse();
    let bardata = [
      {
        y: yticks,
        x: sample_values.slice(0, 10).reverse(),
        text: otu_labels.slice(0, 10).reverse(),
        type: "bar",
        orientation: "h",
      }
    ];
    let barLayout = {
      title: "Top 10 Bacteria Cultures Found",
      margin: { t: 30, l: 150 }
    };
    Plotly.newPlot("bar",bardata,barLayout)
  
  });}
function init(){
    d3.json(url).then((data) => {
    // Grab a reference to the dropdown select element
  let selector = d3.select("#selDataset");
  let sampleNames = data.names
  for (let i = 0 ; i < sampleNames.length ; i++){
    selector
        .append("option")
        .text(sampleNames[i])
        .property("value", sampleNames[i]);
  }
  // Use the list of sample names to populate the select options
    let firstSample = sampleNames[0];
    buildcharts(firstSample);
  });
}
function optionChanged (newSample){
buildcharts(newSample)
}

init()