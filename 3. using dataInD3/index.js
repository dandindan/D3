const data = [
    {width: 200, height: 200,fill: "purple"},
    {width: 150, height: 150,fill: "green"},
    {width: 100, height: 100,fill: "blue"},
    {width: 50, height: 50,fill: "orange"}
    ];
    
const svg = d3.select('svg');

svg.selectAll('rect')
    .data(data)
    .attr('width', d => d.width)
    .attr('height', d => d.height)
    .attr('fill', d => d.fill);