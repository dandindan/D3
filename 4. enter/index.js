const data = [
    {width: 200, height: 200,fill: "purple"},
    {width: 150, height: 150,fill: "green"},
    {width: 100, height: 100,fill: "blue"},
    {width: 50, height: 50,fill: "orange"}
    ];
    
const svg = d3.select('svg');

const rects = svg.selectAll('rect')
    .data(data)
    // attr already in the DOM
    rects .attr('width', d => d.width)
    .attr('height', d => d.height)
    .attr('fill', d => d.fill);

    // append enter to the DOM
    rects.enter()
    .append('rect')
    .attr('width', d => d.width)
    .attr('height', d => d.height)
    .attr('fill', d => d.fill);
    console.log(rects);