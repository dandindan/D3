 
const svg = d3.select('svg');

d3.json('circle.json').then(data=>{
    const circs = svg.selectAll('circle')
    .data(data)


    // attr already in the DOM
    circs.attr('cy', 200)
    .attr('cx', d => d.distance)
    .attr('r', d => d.radius)
    .attr('fill', d => d.fill);

    // append enter to the DOM
    circs.enter()
    .append('circle')
    .attr('cy', 200)
    .attr('cx', d => d.distance)
    .attr('r', d => d.radius)
    .attr('fill', d => d.fill);

})