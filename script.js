
        
// set the dimensions and margins of the graph
var margin = {top: 60, right: 30, bottom: 60, left: 120},
    width = 560 - margin.left - margin.right,
    height =400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var chart1 = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

          
//Read the data
// d3.csv("GDP_Maroc.csv")
//     .row(function(d) { return {Years : d.parseYear(), value: d.GDP_M}; })
//     .get(function(error, rows) {
//     console.log(rows);
//    var data_M = rows;// Now you can assign it

// Add X axis
  var parseYear = d3.timeParse('%Y');

  var x = d3.scaleTime()
    .domain([parseYear(2001), parseYear(2011)])
    .range([ 0, width ]);

  chart1.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll('.tick text')
    .style('font-size', 14);

// X label
chart1.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end") 
    .attr("x", width / 2)
    .attr("y",height + margin.bottom - 20 )
    .text("Years");


  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, 4000])
    .range([ height, 0]);
    chart1.append("g")
    .call(d3.axisLeft(y))
    .selectAll('.tick text')
    .style('font-size', 14);

 // Y label

 chart1.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y",  - margin.left + margin.left/2.5)
    .attr("x", - height / 4)
    .attr("transform", "rotate(-90)")
    .text("GDP per capita (Current US$)");

//Graph Tilte
chart1.append("text")
    .attr("x", (width / 2))             
    .attr("y", 0 - (margin.top / 2))
    .attr("text-anchor", "middle")  
    .style("font-size", "16px") 
    .style("text-decoration", "underline")  
    .text("GDP of Morocco per year");

// Loading CSV
    // d3.csv("CGDP.csv", function(data){
    //     console.log(data)
    // })
    

  //Add dots
//   svg.append('g')
//     .selectAll("dot")
//     .data(d)
//     .enter()
//     .append("circle")
//       .attr("cx", function (d) { return x(d.Year); } )
//       .attr("cy", function (d) { return y(d.GDP_M); } )
//       .attr("r", 1.5)
//       .style("fill", "#69b3a2")


// Define the line

// MOROCCO GRAPH PLOT
d3.csv("GDP_Maroc.csv", function(d){
        
    d.Year = parseYear(d.Year);
    d.GDP_M = +d.GDP_M;
    //console.log(d);
    chart1.selectAll("dot")
    .data(d)
    .enter()
    .append("circle")
      .attr("cx", function (d) { return x(parseYear(d.Year)); } )
      .attr("cy", function (d) { return y(+d.GDP_M); } )
      .attr("r", 3)
      .style("fill", "black")
      
      chart1.append("path")
      .datum(d)
      .attr("fill", "none")
      .attr("stroke", "#69b3a2")
      .attr("stroke-width", 2)
      .attr("d", d3.line()
        .x(function(d) { return x(parseYear(d.Year)) })
        .y(function(d) { return y(+d.GDP_M) })
        )
});




