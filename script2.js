// set the dimensions and margins of the graph
var margin = {top: 60, right: 30, bottom: 60, left: 120},
    width = 560 - margin.left - margin.right,
    height =400 - margin.top - margin.bottom;

    var parseYear = d3.timeParse('%Y');
// append the svg object to the body of the page
var svg = d3.select("#Histo")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// get the data
d3.csv("population.csv", function(data) {
    console.log(data)
  // X axis: scale and draw:
  var x = d3.scaleTime()
      .domain([parseYear(2001), parseYear(2011)])     // can use this instead of 1000 to have the max of data: d3.max(data, function(d) { return +d.price })
      .range([0, width]);
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .style('font-size', 14)
      .call(d3.axisBottom(x))
      .selectAll('.tick text');

      svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end") 
    .attr("x", width / 2)
    .attr("y",height + margin.bottom - 20 )
    .text("Years");

  // set the parameters for the histogram
  var histogram = d3.histogram()
      .value(function(d) { return d.value; })   // I need to give the vector of value
      .domain(x.domain())  // then the domain of the graphic
      .thresholds(x.ticks(11)); // then the numbers of bins

      //Graph Tilte
    svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")  
        .style("font-size", "16px") 
        .style("text-decoration", "underline")  
        .text("Annual Growth % of Morocco per year");

  // And apply this function to data to get the bins
   var bins = histogram(data);
  //console.log(bins);

  // Y axis: scale and draw:
  var y = d3.scaleBand()
      .range([height, 0]);
      y.domain([0, 1.6]);   // d3.hist has to be called before the Y axis obviously
  svg.append("g")
        .style('font-size', 14)
      .call(d3.axisLeft(y));

    svg.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("y",  - margin.left + margin.left/2.5)
        .attr("x", - height / 4)
        .attr("transform", "rotate(-90)")
        .text("Annual %");

  // append the bar rectangles to the svg element
  svg.selectAll("rect")
  .data(bins)
  .enter()
  .append("rect")
    .attr("x", 1)
    .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
    .attr("width", function(d) { return x(d.x1) - x(d.x0) -1 ; })
    .attr("height", function(d) { return height - y(d.length); })
     .style("fill", "#69b3a2")

   

});