var max;
window.onload = function () {

    var svgHeight = document.getElementById('svg').getAttribute('height');
    var svgWidth = document.getElementById('svg').getAttribute('width') + 100;
    var margin = { top: 20, right: 20, bottom: 50, left: 50 };
    var chartWidth = svgWidth - margin.left - margin.right;
    var chartHeight = svgHeight - margin.top - margin.bottom;
    var barWidth = 50;
    var spacing = 10;
    console.log(svgHeight);

    var svg = d3.select("svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight);

    var chart = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.json(`http://localhost:3000/seatsSold`).then(function (dataset) {
        console.log(dataset);

        max = dataset[0].numTickets;
        console.log(max);
        console.log(getLargest(dataset));
        svg.attr("width", dataset.length * (barWidth + spacing + 100));

        var yScale = d3.scaleLinear()
            .domain([0, getLargest(dataset)])
            .range([chartHeight, 0]);

        var yAxis = d3.axisLeft(yScale)
            .ticks(6); // Set the number of ticks on the y-axis

        chart.append("g")
            .attr("class", "y-axis")
            .call(yAxis);

        // Add label for Y-axis
        chart.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left)
            .attr("x", 0 - (chartHeight / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("Ticket Sales");


        var tickGroup = chart.append("g")
            .attr("class", "tick-group");

        var ticks = tickGroup.selectAll(".tick")
            .data(dataset)
            .enter()
            .append("g")
            .attr("class", "tick")
            .attr("transform", function (d, i) { return "translate(" + (i * (barWidth + spacing)) + "," + (chartHeight + 5) + ")"; });

        ticks.append("text")
            .attr("x", barWidth / 2 + 15)
            .attr("y", 0)
            .attr("dy", ".71em")
            .style("text-anchor", "middle")
            .text(function (d) { return d.filmID; });


        chart.append("g")
            .attr("class", "y-axis")
            .call(yAxis);

        var xScale = d3.scaleBand()
            .domain(dataset.map(function (d) { return d.filmID; }))
            .range([0, chartWidth])
            .padding(0.1);

        var xAxis = d3.axisBottom(xScale);

        chart.append("g")
            .attr("class", "x-axis")
            .attr("transform", "translate(0," + chartHeight + ")")
            .call(xAxis);


        var elements = chart.selectAll("rect")
            .data(dataset);


        elements.enter().append("rect")
            .attr('x', function (d, i) { return (barWidth + spacing) * i + 15; })
            .attr("y", function (d, i) { return yScale(d.numTickets); })
            .attr('width', barWidth)
            .attr('height', function (d) { return chartHeight - yScale(d.numTickets); })
            .attr('fill', 'steelblue');

        elements.enter().append("text")
            .attr("x", function (d, i) { return ((barWidth + spacing) * i) + spacing + 10; })
            .attr("y", function (d) { return svgHeight - 5; })
            .attr("font-size", 15)
            .attr("fill", "black")
            .text(function (d) { return d.filmID; });

        svg.append("text")
            .attr("x", function (d) { return 240; })
            .attr("y", function (d) { return svgHeight; })
            .attr("font-size", 15)
            .attr("fill", "black")
            .text("Film ID");
    });
}

function getLargest(data) {
    for (var i = 0; i < data.length; i++) {
        if (data[i].numTickets > max) {
            max = data[i].numTickets;
        }
    }

    return max;
}
